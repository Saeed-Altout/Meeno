export interface ThemeColors {
  primary: string;
  secondary: string;
  tertiary: string;
  accent: string;
}

export interface ThemePalette extends ThemeColors {
  primaryForeground: string;
  secondaryForeground: string;
  tertiaryForeground: string;
  accentForeground: string;
}

/**
 * Main theme color palette
 * Orange-based restaurant theme with warm and inviting colors
 */
export const mainTheme: ThemeColors = {
  primary: '#ED8A42', // Orange - main brand color
  secondary: '#E4B020', // Yellow - accent color
  tertiary: '#3E7EA6', // Blue-teal - complementary color
  accent: '#D1D1CA', // Light gray - neutral accent
} as const;

/**
 * Light mode theme palette with foreground colors
 */
export const lightTheme: ThemePalette = {
  ...mainTheme,
  primaryForeground: '#ffffff',
  secondaryForeground: '#ffffff',
  tertiaryForeground: '#000000',
  accentForeground: '#000000',
} as const;

/**
 * Dark mode theme palette with adjusted colors and foreground colors
 */
export const darkTheme: ThemePalette = {
  primary: '#ED8A42', // Orange - main brand color
  secondary: '#E4B020', // Yellow - accent color
  tertiary: '#3E7EA6', // Blue-teal - complementary color
  accent: '#D1D1CA', // Light gray - neutral accent
  primaryForeground: '#000000',
  secondaryForeground: '#000000',
  tertiaryForeground: '#000000',
  accentForeground: '#ffffff',
} as const;

/**
 * Available theme variants
 */
export const themeVariants = ['light', 'dark'] as const;
export type ThemeVariant = (typeof themeVariants)[number];

/**
 * Theme configuration for different contexts
 */
export const themeConfig = {
  light: lightTheme,
  dark: darkTheme,
} as const;

/**
 * Utility function to get theme colors for current mode
 */
export const getThemeColors = (
  variant: ThemeVariant = 'light'
): ThemePalette => {
  return themeConfig[variant];
};

/**
 * CSS custom property names for theme colors
 */
export const cssVariables = {
  primary: '--primary',
  secondary: '--secondary',
  tertiary: '--tertiary',
  accent: '--accent',
  primaryForeground: '--primary-foreground',
  secondaryForeground: '--secondary-foreground',
  tertiaryForeground: '--tertiary-foreground',
  accentForeground: '--accent-foreground',
} as const;

/**
 * Tailwind CSS classes for theme colors
 */
export const themeClasses = {
  text: {
    primary: 'text-primary',
    secondary: 'text-secondary',
    tertiary: 'text-tertiary',
    accent: 'text-accent',
  },
  bg: {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    tertiary: 'bg-tertiary',
    accent: 'bg-accent',
  },
  border: {
    primary: 'border-primary',
    secondary: 'border-secondary',
    tertiary: 'border-tertiary',
    accent: 'border-accent',
  },
  ring: {
    primary: 'ring-primary',
    secondary: 'ring-secondary',
    tertiary: 'ring-tertiary',
    accent: 'ring-accent',
  },
} as const;
