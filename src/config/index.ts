import { HomeIcon, UtensilsIcon } from 'lucide-react';

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
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'Menu', href: '/menu', icon: UtensilsIcon },
  ],
};
