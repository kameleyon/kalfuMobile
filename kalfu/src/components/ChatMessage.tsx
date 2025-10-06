import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Markdown from 'react-native-markdown-display';
import { colors, spacing, typography } from '../theme';
import { ChatMessage as ChatMessageType } from '../types/database';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const { user } = useAuth();
  const isUser = message.role === 'user';
  const userInitial = user?.email?.charAt(0).toUpperCase() || 'U';

  return (
    <View style={[styles.container, isUser && styles.userContainer]}>
      <View style={styles.messageRow}>
        {!isUser && (
          <View style={styles.iconContainer}>
            <View style={styles.iconStack}>
              <MaterialCommunityIcons name="hat-fedora" size={16} color={colors.whiteAlpha[90]} style={styles.hatIcon} />
              <MaterialCommunityIcons name="glasses" size={14} color={colors.whiteAlpha[90]} style={styles.glassesIcon} />
            </View>
          </View>
        )}
        <View
          style={[
            styles.messageCard,
            isUser ? styles.userMessage : styles.assistantMessage,
          ]}
        >
          <Markdown
            style={{
              body: styles.messageText,
              paragraph: styles.messageText,
            }}
          >
            {message.content}
          </Markdown>
          {message.cards && message.cards.length > 0 && (
            <View style={styles.cardsContainer}>
              {message.cards.map((card, index) => (
                <View key={index} style={styles.cardChip}>
                  <Text style={styles.cardText}>
                    {card.name} {card.reversed ? '(R)' : ''}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
        {isUser && (
          <View style={styles.userIconContainer}>
            <Text style={styles.userIconText}>{userInitial}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.sm,
  },
  userContainer: {
    alignItems: 'flex-end',
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    maxWidth: '85%',
  },
  messageCard: {
    flex: 1,
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
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.whiteAlpha[20],
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginRight: spacing.sm,
    marginTop: spacing.xs,
  },
  iconStack: {
    position: 'relative',
    width: 20,
    height: 20,
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
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.whiteAlpha[20],
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.sm,
    marginTop: spacing.xs,
  },
  userIconText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.white,
  },
  label: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.normal,
    color: colors.lavenderWeb,
  },
  messageText: {
    fontSize: typography.fontSize.base,
    color: colors.white,
    lineHeight: typography.fontSize.base * 1.5,
  },
  cardsContainer: {
    marginTop: spacing.md,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing.xs / 2,
  },
  cardChip: {
    backgroundColor: colors.russianVioletMid,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 12,
    margin: spacing.xs / 2,
  },
  cardText: {
    fontSize: typography.fontSize.xs,
    color: colors.lavenderWeb,
    fontWeight: typography.fontWeight.medium,
  },
});