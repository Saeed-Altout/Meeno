import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { RouterProvider } from 'react-router-dom';

import { router } from '@/routes';
import { Spinner } from '@/components/common/spinner';
import { useThemeStore } from '@/stores/theme-store';

export default function App() {
  const { applyTheme } = useThemeStore();
  const { i18n } = useTranslation();

  // Apply theme on component mount
  useEffect(() => {
    applyTheme();
  }, [applyTheme]);

  // Show loading spinner while i18n is initializing
  if (!i18n.isInitialized) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <Spinner />
      </div>
    );
  }

  return <RouterProvider router={router} />;
}
