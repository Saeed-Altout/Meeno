export const DEFAULT_MESSAGES = {
  ERRORS: {
    GENERIC: 'An unexpected error occurred',
    NETWORK: 'Network error. Please check your connection.',
    TIMEOUT: 'Request timed out. Please try again.',
    NOT_FOUND: 'Resource not found',
    UNAUTHORIZED: 'You are not authorized to perform this action',
    VALIDATION: 'Please check your input and try again',
  },

  SUCCESS: {
    ITEM_ADDED: 'Item added to order',
    ORDER_PLACED: 'Order placed successfully',
    SETTINGS_SAVED: 'Settings saved',
  },

  LOADING: {
    GENERIC: 'Loading...',
    MENU: 'Loading menu...',
    ORDER: 'Processing order...',
  },

  PLACEHOLDERS: {
    SEARCH: 'Search menu items...',
    NAME: 'Enter your name',
    EMAIL: 'Enter your email',
    NOTES: 'Add special instructions...',
  },

  ACCESSIBILITY: {
    CLOSE: 'Close',
    OPEN: 'Open',
    TOGGLE: 'Toggle',
    MENU: 'Menu',
    ORDER: 'Order',
    FAVORITE: 'Add to favorites',
    UNFAVORITE: 'Remove from favorites',
  },
} as const;

export type DefaultMessages = typeof DEFAULT_MESSAGES;
