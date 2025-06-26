import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useThemeStore } from '@/stores/theme-store';

/**
 * Theme editor component for customizing theme colors
 */
export function ThemeEditor() {
  const {
    customTheme,
    setCustomTheme,
    clearCustomTheme,
    useCustomTheme,
    getCurrentThemeColors,
  } = useThemeStore();

  const currentColors = getCurrentThemeColors();

  const [colors, setColors] = useState({
    primary: customTheme?.primary || currentColors.primary,
    secondary: customTheme?.secondary || currentColors.secondary,
    tertiary: customTheme?.tertiary || currentColors.tertiary,
    accent: customTheme?.accent || currentColors.accent,
  });

  const handleColorChange = (colorKey: keyof typeof colors, value: string) => {
    const newColors = { ...colors, [colorKey]: value };
    setColors(newColors);
    setCustomTheme(newColors);
  };

  const resetColors = () => {
    const defaultColors = {
      primary: currentColors.primary,
      secondary: currentColors.secondary,
      tertiary: currentColors.tertiary,
      accent: currentColors.accent,
    };
    setColors(defaultColors);
    clearCustomTheme();
  };

  const presetThemes = [
    {
      name: 'Default',
      colors: {
        primary: '#ED8A42',
        secondary: '#E4B020',
        tertiary: '#3E7EA6',
        accent: '#D1D1CA',
      },
    },
  ];

  const applyPreset = (preset: (typeof presetThemes)[0]) => {
    setColors(preset.colors);
    setCustomTheme(preset.colors);
  };

  return (
    <div className='space-y-6 p-6 border rounded-lg'>
      <div className='flex items-center justify-between'>
        <h3 className='text-lg font-semibold'>Theme Editor</h3>
        <div className='flex gap-2'>
          <Button variant='outline' size='sm' onClick={resetColors}>
            Reset
          </Button>
          <Button variant='outline' size='sm' onClick={clearCustomTheme}>
            Clear Custom
          </Button>
        </div>
      </div>

      {/* Color Inputs */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {Object.entries(colors).map(([key, value]) => (
          <div key={key} className='space-y-2'>
            <Label htmlFor={key} className='capitalize'>
              {key} Color
            </Label>
            <div className='flex gap-2'>
              <Input
                id={key}
                type='color'
                value={value}
                onChange={e =>
                  handleColorChange(key as keyof typeof colors, e.target.value)
                }
                className='w-12 h-10 p-1 border rounded cursor-pointer'
              />
              <Input
                value={value}
                onChange={e =>
                  handleColorChange(key as keyof typeof colors, e.target.value)
                }
                placeholder='#000000'
                className='flex-1'
              />
            </div>
          </div>
        ))}
      </div>

      {/* Live Preview */}
      <div className='space-y-2'>
        <Label>Live Preview</Label>
        <div className='grid grid-cols-4 gap-2'>
          {Object.entries(colors).map(([key, value]) => (
            <div key={key} className='text-center'>
              <div
                className='w-full h-12 rounded border'
                style={{ backgroundColor: value }}
              />
              <span className='text-xs font-medium capitalize'>{key}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Preset Themes */}
      <div className='space-y-2'>
        <Label>Preset Themes</Label>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
          {presetThemes.map(preset => (
            <Button
              key={preset.name}
              variant='outline'
              className='justify-start h-auto p-3'
              onClick={() => applyPreset(preset)}
            >
              <div className='flex items-center gap-3'>
                <div className='flex gap-1'>
                  {Object.values(preset.colors).map((color, index) => (
                    <div
                      key={index}
                      className='w-4 h-4 rounded-full border'
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <span className='text-sm font-medium'>{preset.name}</span>
              </div>
            </Button>
          ))}
        </div>
      </div>

      {/* Theme Status */}
      {useCustomTheme && (
        <div className='p-3 bg-primary/10 border border-primary/20 rounded-lg'>
          <p className='text-sm text-primary font-medium'>
            ✨ Custom theme is active
          </p>
        </div>
      )}
    </div>
  );
}
