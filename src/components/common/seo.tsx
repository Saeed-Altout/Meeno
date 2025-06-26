import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { DEFAULT_SEO } from '@/config/seo';

interface SEOProps {
  children?: ReactNode;
  title?: string;
  description?: string;
  keywords?: readonly string[] | string[];
}

/**
 * Simple SEO Component for managing basic page metadata
 *
 * @component
 * @example
 * ```tsx
 * <SEO
 *   title="Dashboard - Meeno"
 *   description="User dashboard with analytics and management tools"
 *   keywords={['dashboard', 'analytics', 'management']}
 * >
 *   <DashboardContent />
 * </SEO>
 * ```
 */
export function SEO({ children, title, description, keywords = [] }: SEOProps) {
  const seoTitle = title || DEFAULT_SEO.title;
  const seoDescription = description || DEFAULT_SEO.description;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const seoKeywords = [...DEFAULT_SEO.keywords, ...keywords];

  useEffect(() => {
    // Set page title
    document.title = seoTitle;

    // Helper function to create or update meta tags
    const setMetaTag = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`);

      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        document.head.appendChild(meta);
      }

      meta.setAttribute('content', content);
    };

    // Set basic meta tags
    setMetaTag('description', seoDescription);
    setMetaTag('keywords', seoKeywords.join(', '));

    // Cleanup function - reset to default title when component unmounts
    return () => {
      document.title = DEFAULT_SEO.title;
    };
  }, [seoTitle, seoDescription, seoKeywords]);

  return <>{children}</>;
}
