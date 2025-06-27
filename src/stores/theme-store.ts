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

const getSystemTheme = (): boolean => {
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  return false;
};

const applyTheme = (isDark: boolean) => {
  if (typeof document !== 'undefined') {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
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

export const useThemeStore = create<ThemeState>()(
  persist(
    set => ({
      mode: 'system',
      isDarkMode: getSystemTheme(),

      setMode: (mode: ThemeMode) =>
        set(() => {
          const isDark = getEffectiveTheme(mode);
          applyTheme(isDark);
          return { mode, isDarkMode: isDark };
        }),

      toggleTheme: () =>
        set(state => {
          const newMode = state.mode === 'light' ? 'dark' : 'light';
          const isDark = getEffectiveTheme(newMode);
          applyTheme(isDark);
          return { mode: newMode, isDarkMode: isDark };
        }),

      setTheme: (isDark: boolean) =>
        set(() => {
          const mode = isDark ? 'dark' : 'light';
          applyTheme(isDark);
          return { mode, isDarkMode: isDark };
        }),
    }),
    {
      name: 'theme-storage',
      onRehydrateStorage: () => state => {
        if (state) {
          const isDark = getEffectiveTheme(state.mode);
          applyTheme(isDark);
          // Update the state with the current effective theme
          state.isDarkMode = isDark;

          // Listen for system theme changes when in system mode
          if (typeof window !== 'undefined' && state.mode === 'system') {
            const mediaQuery = window.matchMedia(
              '(prefers-color-scheme: dark)'
            );
            const handleChange = () => {
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
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const handleSystemThemeChange = () => {
    const store = useThemeStore.getState();
    if (store.mode === 'system') {
      const systemIsDark = mediaQuery.matches;
      applyTheme(systemIsDark);
      useThemeStore.setState({ isDarkMode: systemIsDark });
    }
  };
  mediaQuery.addEventListener('change', handleSystemThemeChange);
}
