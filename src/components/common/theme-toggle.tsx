import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Sun, Moon, Monitor, Check } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useThemeStore, type ThemeMode } from '@/stores/theme-store';
import { DEFAULT_MESSAGES } from '@/constants/messages';
import { UI_CONSTANTS } from '@/constants/ui';

interface ThemeOption {
  mode: ThemeMode;
  icon: React.ReactNode;
  label: string;
}

const ThemeToggle: React.FC = () => {
  const { t } = useTranslation();
  const { mode, setMode } = useThemeStore();

  const themeOptions: ThemeOption[] = [
    {
      mode: 'light',
      icon: <Sun className='h-4 w-4' />,
      label: t('theme.light'),
    },
    {
      mode: 'dark',
      icon: <Moon className='h-4 w-4' />,
      label: t('theme.dark'),
    },
    {
      mode: 'system',
      icon: <Monitor className='h-4 w-4' />,
      label: t('theme.system'),
    },
  ];

  const getCurrentIcon = (): React.ReactNode => {
    switch (mode) {
      case 'light':
        return <Sun className='h-4 w-4' />;
      case 'dark':
        return <Moon className='h-4 w-4' />;
      case 'system':
        return <Monitor className='h-4 w-4' />;
      default:
        return <Monitor className='h-4 w-4' />;
    }
  };

  const handleThemeChange = (selectedMode: ThemeMode): void => {
    setMode(selectedMode);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='sm'
          className='flex items-center space-x-2 rtl:space-x-reverse'
          aria-label={
            t('common.theme') || DEFAULT_MESSAGES.ACCESSIBILITY.TOGGLE
          }
        >
          <motion.div
            key={mode}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: UI_CONSTANTS.ANIMATION.FAST / 1000 }}
          >
            {getCurrentIcon()}
          </motion.div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='end'
        className='w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg'
      >
        {themeOptions.map(option => (
          <DropdownMenuItem
            key={option.mode}
            onClick={() => handleThemeChange(option.mode)}
            className={`flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
              mode === option.mode
                ? 'bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400'
                : 'text-gray-700 dark:text-gray-300'
            }`}
          >
            <div className='flex items-center space-x-3 rtl:space-x-reverse'>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`p-1.5 rounded-lg transition-colors ${
                  mode === option.mode
                    ? 'bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                }`}
              >
                {option.icon}
              </motion.div>
              <span className='font-medium'>{option.label}</span>
            </div>
            {mode === option.mode && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: UI_CONSTANTS.ANIMATION.FAST / 1000 }}
              >
                <Check className='h-4 w-4 text-amber-600 dark:text-amber-400' />
              </motion.div>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

ThemeToggle.displayName = 'ThemeToggle';

export { ThemeToggle };
