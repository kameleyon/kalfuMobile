import React from 'react';
import { View, Text, Image, StyleSheet, Animated } from 'react-native';
import { colors, spacing, typography } from '../theme';
import { TarotCard as TarotCardType } from '../types/database';
import { getCardImage } from '../utils/cardImages';

interface TarotCardProps {
  card: TarotCardType;
  size?: 'small' | 'medium' | 'large';
  showDetails?: boolean;
  animationValue?: Animated.Value;
}

export const TarotCard: React.FC<TarotCardProps> = ({
  card,
  size = 'medium',
  showDetails = true,
  animationValue
}) => {
  const cardImage = getCardImage(card.name);
  
  const sizeStyles = {
    small: styles.cardSmall,
    medium: styles.cardMedium,
    large: styles.cardLarge,
  };

  const imageStyles = {
    small: styles.imageSmall,
    medium: styles.imageMedium,
    large: styles.imageLarge,
  };

  const animatedStyle = animationValue ? {
    opacity: animationValue,
    transform: [
      {
        scale: animationValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0.8, 1],
        }),
      },
      {
        translateY: animationValue.interpolate({
          inputRange: [0, 1],
          outputRange: [20, 0],
        }),
      },
    ],
  } : {};

  return (
    <Animated.View style={[styles.container, sizeStyles[size], animatedStyle]}>
      {cardImage ? (
        <Image
          source={cardImage}
          style={[styles.image, imageStyles[size], card.reversed && styles.reversedImage]}
          resizeMode="cover"
        />
      ) : (
        <View style={[styles.image, imageStyles[size], styles.placeholderImage]}>
          <Text style={styles.placeholderText}>{card.name}</Text>
        </View>
      )}
      
      {showDetails && (
        <View style={styles.details}>
          <Text style={styles.cardName}>
            {card.name}{card.reversed ? ' (R)' : ''}
          </Text>
          
          <Text style={styles.meaning}>
            {card.reversed ? card.reversed_meaning : card.upright_meaning}
          </Text>
          
          {size !== 'small' && card.keywords && card.keywords.length > 0 && (
            <Text style={styles.modernInterpretation}>
              {card.keywords.join(' • ')}
            </Text>
          )}
        </View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.whiteAlpha[10],
    borderRadius: 12,
    padding: spacing.md,
    margin: spacing.sm / 2,
    borderWidth: 1,
    borderColor: colors.whiteAlpha[20],
  },
  cardSmall: {
    width: 120,
  },
  cardMedium: {
    width: 180,
  },
  cardLarge: {
    width: 240,
  },
  image: {
    borderRadius: 8,
    marginBottom: spacing.sm,
  },
  imageSmall: {
    width: 88,
    height: 150,
  },
  imageMedium: {
    width: 148,
    height: 250,
  },
  imageLarge: {
    width: 208,
    height: 350,
  },
  reversedImage: {
    transform: [{ rotate: '180deg' }],
  },
  details: {
    marginTop: spacing.xs,
  },
  cardName: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.medium,
    color: colors.lavenderWeb,
    textAlign: 'center',
  },
  meaning: {
    fontSize: typography.fontSize.sm,
    color: colors.whiteAlpha[70],
    fontStyle: 'italic',
    textAlign: 'center',
  },
  modernInterpretation: {
    fontSize: typography.fontSize.sm,
    color: colors.white,
    lineHeight: typography.fontSize.sm * 1.4,
    textAlign: 'left',
  },
  placeholderImage: {
    backgroundColor: colors.whiteAlpha[20],
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: typography.fontSize.xs,
    color: colors.whiteAlpha[70],
    textAlign: 'center',
  },
});