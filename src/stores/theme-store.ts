import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ThemeVariant, ThemePalette } from '@/config/theme';
import { getThemeColors, themeClasses } from '@/config/theme';

/**
 * Available theme modes
 */
export type ThemeMode = 'light' | 'dark' | 'system';

/**
 * Custom theme configuration
 */
interface CustomTheme {
  primary?: string;
  secondary?: string;
  tertiary?: string;
  accent?: string;
  primaryForeground?: string;
  secondaryForeground?: string;
  tertiaryForeground?: string;
  accentForeground?: string;
}

/**
 * Theme store state interface
 */
interface ThemeStoreState {
  // Core theme state
  themeMode: ThemeMode;
  themeVariant: ThemeVariant;
  customTheme: CustomTheme | null;
  useCustomTheme: boolean;

  // Actions
  setThemeMode: (mode: ThemeMode) => void;
  setThemeVariant: (variant: ThemeVariant) => void;
  toggleTheme: () => void;
  setCustomTheme: (theme: CustomTheme) => void;
  clearCustomTheme: () => void;
  toggleCustomTheme: () => void;
  applyTheme: () => void;
  resetTheme: () => void;

  // Getters
  getCurrentThemeColors: () => ThemePalette;
  getEffectiveTheme: () => ThemeVariant;
  isDarkMode: () => boolean;
  isLightMode: () => boolean;
  getClasses: () => typeof themeClasses;
  getCSSVariable: (variable: string) => string;
  setCSSVariable: (variable: string, value: string) => void;
}

/**
 * Default theme settings
 */
const defaultTheme = {
  themeMode: 'system' as ThemeMode,
  themeVariant: 'light' as ThemeVariant,
  customTheme: null as CustomTheme | null,
  useCustomTheme: false,
};

/**
 * Apply theme to DOM
 */
const applyThemeToDOM = (
  variant: ThemeVariant,
  customTheme?: CustomTheme | null
) => {
  const root = document.documentElement;

  // Apply theme class
  if (variant === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }

  // Apply custom theme if enabled
  if (customTheme) {
    Object.entries(customTheme).forEach(([key, value]) => {
      if (value) {
        const cssVar = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
        root.style.setProperty(cssVar, value);
      }
    });
  } else {
    // Reset custom properties
    const properties = [
      '--primary',
      '--secondary',
      '--tertiary',
      '--accent',
      '--primary-foreground',
      '--secondary-foreground',
      '--tertiary-foreground',
      '--accent-foreground',
    ];
    properties.forEach(prop => root.style.removeProperty(prop));
  }
};

/**
 * Get effective theme based on system preference
 */
const getEffectiveThemeVariant = (
  mode: ThemeMode,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _variant: ThemeVariant
): ThemeVariant => {
  if (mode === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }
  return mode === 'dark' ? 'dark' : 'light';
};

/**
 * Zustand store for theme management with persistence
 */
export const useThemeStore = create<ThemeStoreState>()(
  persist(
    (set, get) => ({
      // Initial state
      ...defaultTheme,

      // Actions
      setThemeMode: (themeMode: ThemeMode) => {
        set({ themeMode });
        const state = get();
        const effectiveTheme = getEffectiveThemeVariant(
          themeMode,
          state.themeVariant
        );
        applyThemeToDOM(
          effectiveTheme,
          state.useCustomTheme ? state.customTheme : null
        );
      },

      setThemeVariant: (themeVariant: ThemeVariant) => {
        set({ themeVariant });
        const state = get();
        const effectiveTheme = getEffectiveThemeVariant(
          state.themeMode,
          themeVariant
        );
        applyThemeToDOM(
          effectiveTheme,
          state.useCustomTheme ? state.customTheme : null
        );
      },

      toggleTheme: () => {
        const state = get();
        const newVariant = state.themeVariant === 'light' ? 'dark' : 'light';
        set({ themeVariant: newVariant, themeMode: newVariant });
        applyThemeToDOM(
          newVariant,
          state.useCustomTheme ? state.customTheme : null
        );
      },

      setCustomTheme: (customTheme: CustomTheme) => {
        set({ customTheme, useCustomTheme: true });
        const state = get();
        const effectiveTheme = getEffectiveThemeVariant(
          state.themeMode,
          state.themeVariant
        );
        applyThemeToDOM(effectiveTheme, customTheme);
      },

      clearCustomTheme: () => {
        set({ customTheme: null, useCustomTheme: false });
        const state = get();
        const effectiveTheme = getEffectiveThemeVariant(
          state.themeMode,
          state.themeVariant
        );
        applyThemeToDOM(effectiveTheme, null);
      },

      toggleCustomTheme: () => {
        const state = get();
        const newUseCustom = !state.useCustomTheme;
        set({ useCustomTheme: newUseCustom });
        const effectiveTheme = getEffectiveThemeVariant(
          state.themeMode,
          state.themeVariant
        );
        applyThemeToDOM(
          effectiveTheme,
          newUseCustom ? state.customTheme : null
        );
      },

      applyTheme: () => {
        const state = get();
        const effectiveTheme = getEffectiveThemeVariant(
          state.themeMode,
          state.themeVariant
        );
        applyThemeToDOM(
          effectiveTheme,
          state.useCustomTheme ? state.customTheme : null
        );
      },

      resetTheme: () => {
        set({ ...defaultTheme });
        applyThemeToDOM('light', null);
      },

      // Getters
      getCurrentThemeColors: () => {
        const state = get();
        const effectiveTheme = getEffectiveThemeVariant(
          state.themeMode,
          state.themeVariant
        );
        const baseColors = getThemeColors(effectiveTheme);

        if (state.useCustomTheme && state.customTheme) {
          return { ...baseColors, ...state.customTheme };
        }

        return baseColors;
      },

      getEffectiveTheme: () => {
        const state = get();
        return getEffectiveThemeVariant(state.themeMode, state.themeVariant);
      },

      isDarkMode: () => {
        const state = get();
        return (
          getEffectiveThemeVariant(state.themeMode, state.themeVariant) ===
          'dark'
        );
      },

      isLightMode: () => {
        const state = get();
        return (
          getEffectiveThemeVariant(state.themeMode, state.themeVariant) ===
          'light'
        );
      },

      getClasses: () => themeClasses,

      getCSSVariable: (variable: string) => {
        return getComputedStyle(document.documentElement)
          .getPropertyValue(variable)
          .trim();
      },

      setCSSVariable: (variable: string, value: string) => {
        document.documentElement.style.setProperty(variable, value);
      },
    }),
    {
      name: 'theme-settings',
      onRehydrateStorage: () => state => {
        // Apply theme on store rehydration
        if (state) {
          const effectiveTheme = getEffectiveThemeVariant(
            state.themeMode,
            state.themeVariant
          );
          applyThemeToDOM(
            effectiveTheme,
            state.useCustomTheme ? state.customTheme : null
          );
        }
      },
    }
  )
);

// Listen for system theme changes
if (typeof window !== 'undefined') {
  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', () => {
      const state = useThemeStore.getState();
      if (state.themeMode === 'system') {
        state.applyTheme();
      }
    });
}
