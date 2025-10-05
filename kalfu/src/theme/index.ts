import { colors, gradients } from './colors';
import { typography, spacing, borderRadius, shadows } from './typography';

export const theme = {
  colors,
  gradients,
  typography,
  spacing,
  borderRadius,
  shadows,
};

export type Theme = typeof theme;

export { colors, gradients, typography, spacing, borderRadius, shadows };