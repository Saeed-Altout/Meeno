import {
  HomeIcon,
  UtensilsIcon,
  ShoppingBagIcon,
  MonitorPlayIcon,
  ClipboardListIcon,
} from 'lucide-react';

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
  navigationLinks: [
    { nameKey: 'navigation.home', href: '/', icon: HomeIcon },
    {
      nameKey: 'navigation.products',
      href: '/products',
      icon: ShoppingBagIcon,
    },
    { nameKey: 'navigation.menu', href: '/menu', icon: UtensilsIcon },
    { nameKey: 'navigation.demo', href: '/demo', icon: MonitorPlayIcon },
    { nameKey: 'navigation.orders', href: '/orders', icon: ClipboardListIcon },
  ],
};
