/**
 * SEO Configuration
 */

export const DEFAULT_SEO = {
  title: 'Meeno - Menu App',
  description:
    'A modern, fast, and secure menu app built with React and TypeScript.',
  keywords: ['react', 'typescript', 'menu app', 'modern', 'secure'],
  siteName: 'Meeno Menu App',
} as const;

/**
 * Page-specific SEO configurations
 */
export const PAGE_SEO = {
  home: {
    title: 'Meeno Menu App - Home',
    description:
      'Experience the future of menu apps with our modern, fast, and secure platform.',
    keywords: ['modern', 'menu app', 'secure', 'fast', 'platform'],
  },
  menu: {
    title: 'Meeno Menu App - Menu',
    description:
      'Experience the future of menu apps with our modern, fast, and secure platform.',
    keywords: ['modern', 'menu app', 'secure', 'fast', 'platform'],
  },
  qr: {
    title: 'Meeno Menu App - QR Code',
    description:
      'Experience the future of QR codes with our modern, fast, and secure platform.',
    keywords: ['modern', 'qr code', 'secure', 'fast', 'platform'],
  },
  notFound: {
    title: 'Page Not Found - Meeno Menu App',
    description: 'The page you are looking for could not be found.',
    keywords: ['404', 'not found', 'error'],
  },
} as const;
