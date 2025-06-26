export const config = {
  api: {
    baseURL: import.meta.env.VITE_API_URL || '/api',
    timeout: 30000,
  },
  linksRoutes: {
    home: '/',
    menu: '/menu',
    qr: '/qr',
  },
  defaultLanguage: 'en',
  defaultTheme: 'light',
  defaultViewMode: 'list',
  defaultAnimation: 'fadeIn',
  defaultAnimationDuration: 300,
  defaultSlideDirection: 'left',
};

export * from './theme';
