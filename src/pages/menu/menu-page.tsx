import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Menu } from '@/components/sections/menu';

// Simple JWT token validation
const validateTableToken = (token: string): boolean => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return false;

    const payload = JSON.parse(atob(parts[1]));
    const currentTime = Math.floor(Date.now() / 1000);

    // Check if token is expired
    if (payload.exp && payload.exp < currentTime) return false;

    // Check if token has table information
    if (!payload.table) return false;

    return true;
  } catch {
    return false;
  }
};

export default function MenuPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    const tableNumber = searchParams.get('table');

    // Redirect to home if no token or invalid token
    if (!token || !tableNumber || !validateTableToken(token)) {
      navigate('/', { replace: true });
      return;
    }
  }, [navigate, searchParams]);

  return (
    <div className='min-h-screen'>
      {/* Back Button Header */}
      <div className='bg-white dark:bg-gray-800 shadow-sm pt-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
          <Button
            variant='ghost'
            onClick={() => navigate('/')}
            className='flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors'
          >
            <ArrowLeft className='h-4 w-4' />
            {t('common.back')}
          </Button>
        </div>
      </div>

      {/* Menu Content */}
      <Menu />
    </div>
  );
}
