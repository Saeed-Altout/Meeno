import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeState {
  mode: ThemeMode;
  isDarkMode: boolean;
  setMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
  setTheme: (isDark: boolean) => void;
}

const THEME_STORAGE_KEY = 'theme-storage' as const;
const DARK_CLASS = 'dark' as const;
const DARK_MEDIA_QUERY = '(prefers-color-scheme: dark)' as const;

const getSystemTheme = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia(DARK_MEDIA_QUERY).matches;
};

const applyTheme = (isDark: boolean): void => {
  if (typeof document === 'undefined') return;

  const { documentElement } = document;
  if (isDark) {
    documentElement.classList.add(DARK_CLASS);
  } else {
    documentElement.classList.remove(DARK_CLASS);
  }
};

const getEffectiveTheme = (mode: ThemeMode): boolean => {
  switch (mode) {
    case 'light':
      return false;
    case 'dark':
      return true;
    case 'system':
      return getSystemTheme();
    default:
      return false;
  }
};

const handleSystemThemeChange = (): void => {
  const store = useThemeStore.getState();
  if (store.mode === 'system') {
    const systemIsDark = getSystemTheme();
    applyTheme(systemIsDark);
    useThemeStore.setState({ isDarkMode: systemIsDark });
  }
};

export const useThemeStore = create<ThemeState>()(
  persist(
    set => ({
      mode: 'system',
      isDarkMode: getSystemTheme(),

      setMode: (mode: ThemeMode): void =>
        set(() => {
          const isDark = getEffectiveTheme(mode);
          applyTheme(isDark);
          return { mode, isDarkMode: isDark };
        }),

      toggleTheme: (): void =>
        set(state => {
          const newMode: ThemeMode = state.mode === 'light' ? 'dark' : 'light';
          const isDark = getEffectiveTheme(newMode);
          applyTheme(isDark);
          return { mode: newMode, isDarkMode: isDark };
        }),

      setTheme: (isDark: boolean): void =>
        set(() => {
          const mode: ThemeMode = isDark ? 'dark' : 'light';
          applyTheme(isDark);
          return { mode, isDarkMode: isDark };
        }),
    }),
    {
      name: THEME_STORAGE_KEY,
      onRehydrateStorage: () => state => {
        if (state) {
          const isDark = getEffectiveTheme(state.mode);
          applyTheme(isDark);
          // Update the state with the current effective theme
          state.isDarkMode = isDark;

          // Listen for system theme changes when in system mode
          if (typeof window !== 'undefined' && state.mode === 'system') {
            const mediaQuery = window.matchMedia(DARK_MEDIA_QUERY);
            const handleChange = (): void => {
              const store = useThemeStore.getState();
              if (store.mode === 'system') {
                const systemIsDark = mediaQuery.matches;
                applyTheme(systemIsDark);
                useThemeStore.setState({ isDarkMode: systemIsDark });
              }
            };
            mediaQuery.addEventListener('change', handleChange);
          }
        }
      },
    }
  )
);

// Listen for system theme changes
if (typeof window !== 'undefined') {
  const mediaQuery = window.matchMedia(DARK_MEDIA_QUERY);
  mediaQuery.addEventListener('change', handleSystemThemeChange);
}
