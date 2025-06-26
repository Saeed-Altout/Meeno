export const COLORS = {
  // New palette colors
  primary: '#ED8A42', // Orange
  secondary: '#E4B020', // Yellow
  tertiary: '#3E7EA6', // Blue
  accent: '#D1D1CA', // Light gray
} as const;

export type Color = (typeof COLORS)[keyof typeof COLORS];
