import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Svg, { Defs, RadialGradient as SvgRadialGradient, Stop, Rect } from 'react-native-svg';
import { colors } from '../theme/colors';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const GradientBackground: React.FC = () => {
  return (
    <View style={styles.container}>
      <Svg height={SCREEN_HEIGHT} width={SCREEN_WIDTH}>
        <Defs>
          <SvgRadialGradient
            id="radialGradient"
            cx="50%"
            cy="50%"
            r="50%"
            gradientUnits="userSpaceOnUse"
          >
            <Stop offset="0%" stopColor={colors.rebeccaPurple} stopOpacity="1" />
            <Stop offset="100%" stopColor={colors.darkPurple} stopOpacity="1" />
          </SvgRadialGradient>
        </Defs>
        <Rect
          x="0"
          y="0"
          width={SCREEN_WIDTH}
          height={SCREEN_HEIGHT}
          fill="url(#radialGradient)"
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});