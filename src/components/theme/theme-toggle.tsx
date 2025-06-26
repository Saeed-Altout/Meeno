import { Button } from '../ui/button';
import { useThemeStore } from '../../stores/theme-store';

/**
 * Theme toggle button component
 * Switches between light and dark themes
 */
export function ThemeToggle() {
  const { toggleTheme, isDarkMode } = useThemeStore();

  return (
    <Button variant='outline' size='sm' onClick={toggleTheme} className='gap-2'>
      {isDarkMode() ? (
        <>
          <span>🌞</span>
          <span>Light</span>
        </>
      ) : (
        <>
          <span>🌙</span>
          <span>Dark</span>
        </>
      )}
    </Button>
  );
}

/**
 * Theme color preview component
 * Shows the current theme colors
 */
export function ThemeColorPreview() {
  const { getCurrentThemeColors, getClasses } = useThemeStore();
  const colors = getCurrentThemeColors();
  const classes = getClasses();

  return (
    <div className='grid grid-cols-4 gap-2 p-4 border rounded-lg'>
      <div className='text-center'>
        <div
          className={`w-12 h-12 rounded-lg ${classes.bg.primary} mx-auto mb-2`}
        />
        <span className='text-xs font-medium'>Primary</span>
        <p className='text-xs text-muted-foreground'>{colors.primary}</p>
      </div>
      <div className='text-center'>
        <div
          className={`w-12 h-12 rounded-lg ${classes.bg.secondary} mx-auto mb-2`}
        />
        <span className='text-xs font-medium'>Secondary</span>
        <p className='text-xs text-muted-foreground'>{colors.secondary}</p>
      </div>
      <div className='text-center'>
        <div
          className={`w-12 h-12 rounded-lg ${classes.bg.tertiary} mx-auto mb-2`}
        />
        <span className='text-xs font-medium'>Tertiary</span>
        <p className='text-xs text-muted-foreground'>{colors.tertiary}</p>
      </div>
      <div className='text-center'>
        <div
          className={`w-12 h-12 rounded-lg ${classes.bg.accent} mx-auto mb-2`}
        />
        <span className='text-xs font-medium'>Accent</span>
        <p className='text-xs text-muted-foreground'>{colors.accent}</p>
      </div>
    </div>
  );
}

/**
 * Advanced theme controls component
 * Provides additional theme customization options
 */
export function ThemeControls() {
  const {
    themeMode,
    setThemeMode,
    useCustomTheme,
    toggleCustomTheme,
    clearCustomTheme,
    resetTheme,
  } = useThemeStore();

  return (
    <div className='space-y-4 p-4 border rounded-lg'>
      <h3 className='text-lg font-semibold'>Theme Controls</h3>

      {/* Theme Mode Selection */}
      <div className='space-y-2'>
        <label className='text-sm font-medium'>Theme Mode</label>
        <div className='flex gap-2'>
          <Button
            variant={themeMode === 'light' ? 'default' : 'outline'}
            size='sm'
            onClick={() => setThemeMode('light')}
          >
            Light
          </Button>
          <Button
            variant={themeMode === 'dark' ? 'default' : 'outline'}
            size='sm'
            onClick={() => setThemeMode('dark')}
          >
            Dark
          </Button>
          <Button
            variant={themeMode === 'system' ? 'default' : 'outline'}
            size='sm'
            onClick={() => setThemeMode('system')}
          >
            System
          </Button>
        </div>
      </div>

      {/* Custom Theme Controls */}
      <div className='space-y-2'>
        <label className='text-sm font-medium'>Custom Theme</label>
        <div className='flex gap-2'>
          <Button
            variant={useCustomTheme ? 'default' : 'outline'}
            size='sm'
            onClick={toggleCustomTheme}
          >
            {useCustomTheme ? 'Disable' : 'Enable'} Custom
          </Button>
          <Button variant='outline' size='sm' onClick={clearCustomTheme}>
            Clear Custom
          </Button>
          <Button variant='outline' size='sm' onClick={resetTheme}>
            Reset All
          </Button>
        </div>
      </div>
    </div>
  );
}
