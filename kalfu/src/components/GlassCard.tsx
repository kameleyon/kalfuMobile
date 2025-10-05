import React from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { colors } from '../theme';

interface GlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  intensity?: number;
  tint?: 'light' | 'dark' | 'default';
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  style,
  intensity = 16,
  tint = 'dark',
}) => {
  return (
    <View style={[styles.container, style]}>
      <BlurView intensity={intensity} tint={tint} style={styles.blur}>
        <View style={styles.content}>{children}</View>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: colors.whiteAlpha[5],
    borderWidth: 1,
    borderColor: colors.whiteAlpha[10],
  },
  blur: {
    overflow: 'hidden',
  },
  content: {
    padding: 16,
  },
});