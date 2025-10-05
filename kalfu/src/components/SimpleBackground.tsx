import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { colors } from '../theme/colors';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface ParticleProps {
  index: number;
  type: 'bubble' | 'energy';
}

const BubbleParticle: React.FC<ParticleProps> = ({ index }) => {
  const translateY = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const startX = 5 + (index % 7) * 15;
  const spiralRadius = 25 + (index % 4) * 20;
  const direction = index % 2 === 0 ? 1 : -1;
  const speed = 10000 + (index % 5) * 2000;

  useEffect(() => {
    const animate = () => {
      translateY.setValue(0);
      translateX.setValue(0);
      opacity.setValue(0);

      Animated.parallel([
        Animated.timing(translateY, {
          toValue: -SCREEN_HEIGHT - 100 - (index % 4) * 150,
          duration: speed,
          useNativeDriver: true,
          delay: index * 200,
        }),
        Animated.sequence([
          Animated.timing(opacity, {
            toValue: 0.6,
            duration: speed * 0.2,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0,
            duration: speed * 0.3,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(translateX, {
            toValue: spiralRadius * direction,
            duration: speed * 0.33,
            useNativeDriver: true,
          }),
          Animated.timing(translateX, {
            toValue: -spiralRadius * direction,
            duration: speed * 0.33,
            useNativeDriver: true,
          }),
          Animated.timing(translateX, {
            toValue: 0,
            duration: speed * 0.34,
            useNativeDriver: true,
          }),
        ]),
      ]).start(() => {
        animate();
      });
    };

    animate();
  }, [index]);

  return (
    <Animated.View
      style={[
        styles.particle,
        {
          left: `${startX}%`,
          bottom: -20,
          opacity,
          transform: [{ translateY }, { translateX }],
        },
      ]}
    />
  );
};

const EnergyParticle: React.FC<ParticleProps> = ({ index }) => {
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const isLeftToRight = index % 2 === 0;
  const startX = isLeftToRight ? 3 + (index % 4) * 8 : 85 - (index % 4) * 8;
  const endX = isLeftToRight ? 85 - (index % 4) * 8 : 3 + (index % 4) * 8;
  const amplitude = 35 + (index % 5) * 25;
  const distance = (endX - startX) * (SCREEN_WIDTH / 100);

  useEffect(() => {
    const animate = () => {
      translateX.setValue(0);
      translateY.setValue(0);
      opacity.setValue(0);

      Animated.parallel([
        Animated.timing(translateX, {
          toValue: distance,
          duration: 7000 + index * 300,
          useNativeDriver: true,
          delay: index * 400,
        }),
        Animated.sequence([
          Animated.timing(translateY, {
            toValue: amplitude,
            duration: 3500 + index * 150,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: 0,
            duration: 3500 + index * 150,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(opacity, {
            toValue: 0.8,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0,
            duration: 3000,
            useNativeDriver: true,
          }),
        ]),
      ]).start(() => {
        animate();
      });
    };

    animate();
  }, [index]);

  return (
    <Animated.View
      style={[
        styles.energyParticle,
        {
          left: `${startX}%`,
          top: `${10 + (index % 6) * 12}%`,
          opacity,
          transform: [{ translateX }, { translateY }],
        },
      ]}
    />
  );
};

export const SimpleBackground: React.FC = () => {
  const pulseScale = useRef(new Animated.Value(0.8)).current;
  const pulseOpacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const pulse = () => {
      Animated.parallel([
        Animated.sequence([
          Animated.timing(pulseScale, {
            toValue: 1.2,
            duration: 3000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseScale, {
            toValue: 0.8,
            duration: 3000,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(pulseOpacity, {
            toValue: 0.1,
            duration: 3000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseOpacity, {
            toValue: 0.3,
            duration: 3000,
            useNativeDriver: true,
          }),
        ]),
      ]).start(() => {
        pulse();
      });
    };

    pulse();
  }, []);

  return (
    <View style={styles.container}>
     

      {[...Array(35)].map((_, i) => (
        <BubbleParticle key={`bubble-${i}`} index={i} type="bubble" />
      ))}

      {[...Array(20)].map((_, i) => (
        <EnergyParticle key={`energy-${i}`} index={i} type="energy" />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  particle: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.whiteAlpha[90],
    shadowColor: colors.white,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 4,
    elevation: 5,
  },
  energyParticle: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.whiteAlpha[90],
    shadowColor: colors.white,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 6,
    elevation: 5,
  },
  pulseCircle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 384,
    height: 384,
    marginLeft: -192,
    marginTop: -192,
    borderRadius: 192,
    backgroundColor: colors.rebeccaPurple,
    opacity: 0.05,
  },
});