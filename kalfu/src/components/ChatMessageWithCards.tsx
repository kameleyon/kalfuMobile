import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import Markdown from 'react-native-markdown-display';
import { colors, spacing, typography } from '../theme';
import { ChatMessage as ChatMessageType } from '../types/database';
import { TarotCard } from './TarotCard';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';

interface ChatMessageWithCardsProps {
  message: ChatMessageType;
  showCards?: boolean;
  onCardsAnimationComplete?: () => void;
}

export const ChatMessageWithCards: React.FC<ChatMessageWithCardsProps> = ({
  message,
  showCards = true,
  onCardsAnimationComplete
}) => {
  const { user } = useAuth();
  const isUser = message.role === 'user';
  const userInitial = user?.email?.charAt(0).toUpperCase() || 'U';
  
  // Debug log to check if cards are being passed
  console.log('ChatMessageWithCards - Rendering:', {
    hasCards: !!message.cards,
    cardCount: message.cards?.length,
    showCards,
    firstCard: message.cards?.[0]
  });
  
  // Animation values
  const messageOpacity = useRef(new Animated.Value(0)).current;
  const cardsOpacity = useRef(new Animated.Value(0)).current;
  const messageSlideY = useRef(new Animated.Value(20)).current;
  
  useEffect(() => {
    // Animate message appearance
    Animated.timing(messageOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    Animated.timing(messageSlideY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // Animate cards if they exist - IMMEDIATELY show them
    if (message.cards && message.cards.length > 0 && showCards) {
      // Immediately set opacity to 1 - no animation for now to ensure they show
      cardsOpacity.setValue(1);
      console.log('Cards opacity set to 1 immediately');
    }
  }, [message.cards, showCards, isUser]);

  // Create animation values for each card - start at 1 (visible)
  const cardAnimations = useRef(
    message.cards?.map(() => new Animated.Value(1)) || []
  ).current;

  const renderCards = () => {
    console.log('renderCards called:', {
      hasCards: !!message.cards,
      cardCount: message.cards?.length,
      showCards
    });
    
    if (!message.cards || message.cards.length === 0 || !showCards) {
      console.log('Not rendering cards - missing data or showCards is false');
      return null;
    }

    console.log('Rendering cards:', message.cards.map(c => c.name));

    return (
      <Animated.View style={[styles.cardsContainer, { opacity: cardsOpacity }]}>
        <View style={styles.cardsGrid}>
          {message.cards.map((card, index) => {
            console.log(`Rendering TarotCard ${index}:`, card.name);
            return (
              <TarotCard
                key={`${card.id}-${index}`}
                card={card}
                size="small"
                showDetails={true}
                animationValue={cardAnimations[index]}
              />
            );
          })}
        </View>
      </Animated.View>
    );
  };

  return (
    <Animated.View 
      style={[
        styles.container, 
        isUser && styles.userContainer,
        {
          opacity: messageOpacity,
          transform: [{ translateY: messageSlideY }]
        }
      ]}
    >
      <Animated.View
        style={[
          styles.messageCard,
          isUser ? styles.userMessage : styles.assistantMessage,
        ]}
      >
        {!isUser && (
          <View style={styles.headerRow}>
            <View style={styles.iconContainer}>
              <View style={styles.iconStack}>
                <MaterialCommunityIcons 
                  name="hat-fedora" 
                  size={12} 
                  color={colors.whiteAlpha[90]} 
                  style={styles.hatIcon} 
                />
                <MaterialCommunityIcons 
                  name="glasses" 
                  size={10} 
                  color={colors.whiteAlpha[90]} 
                  style={styles.glassesIcon} 
                />
              </View>
            </View>
          </View>
        )}
        
        {isUser && (
          <View style={styles.userHeaderRow}>
            <View style={styles.userIconContainer}>
              <Text style={styles.userIconText}>{userInitial}</Text>
            </View>
          </View>
        )}
        
        <Markdown
          style={{
            body: styles.messageText,
            paragraph: styles.messageText,
          }}
        >
          {message.content}
        </Markdown>
        
        {renderCards()}
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
    alignItems: 'flex-start',
    paddingHorizontal: spacing.md,
  },
  userContainer: {
    alignItems: 'flex-end',
  },
  messageCard: {
    maxWidth: '85%',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: 16,
  },
  userMessage: {
    backgroundColor: colors.whiteAlpha[20],
    borderTopRightRadius: 4,
  },
  assistantMessage: {
    backgroundColor: colors.whiteAlpha[10],
    borderTopLeftRadius: 4,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  userHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
    justifyContent: 'flex-end',
  },
  iconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.whiteAlpha[20],
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  iconStack: {
    position: 'relative',
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hatIcon: {
    position: 'absolute',
    top: -1,
  },
  glassesIcon: {
    position: 'absolute',
    bottom: -1,
  },
  userIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.whiteAlpha[20],
    alignItems: 'center',
    justifyContent: 'center',
  },
  userIconText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
    color: colors.white,
  },
  messageText: {
    fontSize: typography.fontSize.base,
    color: colors.white,
    lineHeight: typography.fontSize.base * 1.5,
  },
  cardsContainer: {
    marginTop: spacing.lg,
    width: '100%',
  },
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginHorizontal: -spacing.sm / 2,
  },
});