import Constants from 'expo-constants';
import { Platform } from 'react-native';

const OPENROUTER_API_KEY = Constants.expoConfig?.extra?.EXPO_PUBLIC_OPENROUTER_API_KEY || process.env.EXPO_PUBLIC_OPENROUTER_API_KEY || '';
const OPENROUTER_MODEL = Constants.expoConfig?.extra?.EXPO_PUBLIC_OPENROUTER_MODEL || process.env.EXPO_PUBLIC_OPENROUTER_MODEL || 'anthropic/claude-sonnet-4.5';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

// Check if streaming is supported (web only for now)
const supportsStreaming = Platform.OS === 'web';

export const streamChatCompletion = async (
  messages: Message[],
  onChunk: (chunk: string) => void,
  onComplete: () => void,
  onError: (error: Error) => void
): Promise<void> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 second timeout

  try {
    if (!OPENROUTER_API_KEY) {
      throw new Error('API key not configured');
    }

    console.log('Starting streaming request...');
    
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://kalfu.app',
        'X-Title': 'Kalfu Tarot',
      },
      body: JSON.stringify({
        model: OPENROUTER_MODEL,
        messages,
        stream: true,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', response.status, errorText);
      
      if (response.status === 502 || response.status === 503) {
        throw new Error('Server is temporarily unavailable. Please try again in a moment.');
      } else if (response.status === 429) {
        throw new Error('Too many requests. Please wait a moment and try again.');
      } else if (response.status === 401) {
        throw new Error('API key is invalid. Please check your configuration.');
      } else {
        throw new Error(`API error: ${response.status}. Please try again.`);
      }
    }

    console.log('Response received, starting stream...');

    // For mobile: Simulate typing effect with chunks
    if (!supportsStreaming) {
      const text = await response.text();
      const lines = text.split('\n').filter(line => line.trim().startsWith('data: '));
      
      let fullContent = '';
      for (const line of lines) {
        if (line.trim() === 'data: [DONE]') continue;
        
        try {
          const data = JSON.parse(line.slice(6));
          const content = data.choices?.[0]?.delta?.content;
          if (content) {
            fullContent += content;
          }
        } catch (e) {
          console.error('Error parsing SSE data:', e);
        }
      }
      
      // Simulate typing effect by sending words incrementally
      const words = fullContent.split(' ');
      for (let i = 0; i < words.length; i++) {
        onChunk(words[i] + (i < words.length - 1 ? ' ' : ''));
        await new Promise(resolve => setTimeout(resolve, 30)); // 30ms delay between words
      }
      
      onComplete();
      return;
    }

    // For web: Use streaming
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) {
      throw new Error('Response body is not readable');
    }

    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      
      if (done) {
        onComplete();
        break;
      }

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (line.trim() === '') continue;
        if (line.trim() === 'data: [DONE]') continue;
        
        if (line.startsWith('data: ')) {
          try {
            const data = JSON.parse(line.slice(6));
            const content = data.choices?.[0]?.delta?.content;
            if (content) {
              onChunk(content);
            }
          } catch (e) {
            console.error('Error parsing SSE data:', e);
          }
        }
      }
    }
  } catch (error) {
    clearTimeout(timeoutId);
    console.error('Stream error:', error);
    if ((error as Error).name === 'AbortError') {
      onError(new Error('Request timeout - please try again'));
    } else {
      onError(error as Error);
    }
  }
};

export const getChatCompletion = async (messages: Message[]): Promise<string> => {
  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://kalfu.app',
        'X-Title': 'Kalfu Tarot',
      },
      body: JSON.stringify({
        model: OPENROUTER_MODEL,
        messages,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || '';
  } catch (error) {
    throw error;
  }
};