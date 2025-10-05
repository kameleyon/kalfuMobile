import Constants from 'expo-constants';

const OPENROUTER_API_KEY = Constants.expoConfig?.extra?.EXPO_PUBLIC_OPENROUTER_API_KEY || process.env.EXPO_PUBLIC_OPENROUTER_API_KEY || '';
const OPENROUTER_MODEL = Constants.expoConfig?.extra?.EXPO_PUBLIC_OPENROUTER_MODEL || process.env.EXPO_PUBLIC_OPENROUTER_MODEL || 'anthropic/claude-sonnet-4.5';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export const streamChatCompletion = async (
  messages: Message[],
  onChunk: (chunk: string) => void,
  onComplete: () => void,
  onError: (error: Error) => void
): Promise<void> => {
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
        stream: true,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

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
    onError(error as Error);
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