export const UI_CONSTANTS = {
  // Navigation
  NAVBAR_HEIGHT: 64,
  NAVBAR_SCROLL_OFFSET: 100,

  // Animations
  SCROLL_BEHAVIOR_SMOOTH_DELAY: 500,
  LOADING_ANIMATION_DELAY: 500,
  LOADING_ANIMATION_DURATION: 500,

  // Component sizes
  LOGO_HEIGHT: 40,
  BUTTON_MIN_HEIGHT: 56,

  // Responsive breakpoints (following Tailwind defaults)
  BREAKPOINTS: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // Z-index layers
  Z_INDEX: {
    NAVBAR: 40,
    MODAL: 50,
    LOADING_OVERLAY: 50,
    TOOLTIP: 60,
  },

  // Animation durations (in milliseconds)
  ANIMATION: {
    FAST: 200,
    NORMAL: 300,
    SLOW: 500,
    VERY_SLOW: 800,
  },

  // Timeouts
  TIMEOUT: {
    API_DEFAULT: 30000,
    DEBOUNCE_DEFAULT: 300,
  },
} as const;

export type UIConstants = typeof UI_CONSTANTS;
