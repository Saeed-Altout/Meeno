import { useTranslation } from 'react-i18next';
import { useThemeStore } from '@/stores/theme-store';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Palette, Sun, Moon, Monitor, Check } from 'lucide-react';

/**
 * Theme Manager Props
 */
interface ThemeManagerProps {
  className?: string;
}

/**
 * Theme Mode Selector Component
 */
const ThemeModeSelector = () => {
  const { t } = useTranslation();
  const { themeMode, setThemeMode } = useThemeStore();

  const modes = [
    {
      value: 'light',
      label: t('appearance.lightMode'),
      icon: Sun,
    },
    {
      value: 'dark',
      label: t('appearance.darkMode'),
      icon: Moon,
    },
    {
      value: 'system',
      label: t('appearance.systemMode'),
      icon: Monitor,
    },
  ] as const;

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-lg'>
          <Palette className='h-5 w-5' />
          {t('appearance.theme')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
          {modes.map(mode => {
            const isActive = themeMode === mode.value;
            return (
              <div
                key={mode.value}
                className='transition-all duration-300 hover:scale-102 active:scale-98'
              >
                <Button
                  variant={isActive ? 'default' : 'outline'}
                  onClick={() => setThemeMode(mode.value)}
                  className={cn(
                    'w-full h-auto p-4 flex flex-col items-center gap-2 relative transition-all duration-300',
                    isActive && 'ring-2 ring-primary ring-offset-2'
                  )}
                >
                  <mode.icon className='h-6 w-6' />
                  <span className='text-sm font-medium'>{mode.label}</span>
                  {isActive && (
                    <div className='absolute top-2 right-2 transition-all duration-300 animate-in zoom-in-50'>
                      <Check className='h-4 w-4' />
                    </div>
                  )}
                </Button>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

/**
 * Main Theme Manager Component
 */
export const ThemeManager = ({ className }: ThemeManagerProps) => {
  return (
    <div
      className={cn(
        'space-y-6 transition-all duration-300 animate-in fade-in-0 slide-in-from-bottom-4',
        className
      )}
    >
      <ThemeModeSelector />
    </div>
  );
};
