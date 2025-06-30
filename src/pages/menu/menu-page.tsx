import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Menu } from '@/components/sections/menu';

export default function MenuPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

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
