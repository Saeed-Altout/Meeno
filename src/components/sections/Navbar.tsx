import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ChefHat, Menu as MenuIcon, X, Globe, Sun, Moon } from 'lucide-react';
import { Button } from '../ui/button';
import { useThemeStore } from '../../stores/theme-store';

interface NavbarProps {
  activeSection: string;
  onNavClick: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavClick,
}) => {
  const { t, i18n } = useTranslation();
  const { isDarkMode, toggleTheme } = useThemeStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const currentLanguage = i18n.language;
  const isRTL = currentLanguage === 'ar';

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update document direction when language changes
  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLanguage;
  }, [isRTL, currentLanguage]);

  const toggleLanguage = () => {
    const newLang = currentLanguage === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
  };

  const handleNavClick = (sectionId: string) => {
    onNavClick(sectionId);
    setIsMenuOpen(false);
  };

  const navItems = [
    { key: 'home', label: t('nav.home') },
    { key: 'menu', label: t('nav.menu') },
    { key: 'about', label: t('nav.about') },
    { key: 'contact', label: t('nav.contact') },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          {/* Logo */}
          <motion.div
            className='flex-shrink-0 cursor-pointer'
            onClick={() => handleNavClick('home')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className='flex items-center space-x-2 rtl:space-x-reverse'>
              <ChefHat className='h-8 w-8 text-amber-600' />
              <span className='text-2xl font-bold text-gray-900 dark:text-white'>
                La Tavola
              </span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center space-x-8 rtl:space-x-reverse'>
            {navItems.map(item => (
              <button
                key={item.key}
                onClick={() => handleNavClick(item.key)}
                className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                  activeSection === item.key
                    ? 'text-amber-600'
                    : 'text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400'
                }`}
              >
                {item.label}
                {activeSection === item.key && (
                  <motion.div
                    layoutId='activeSection'
                    className='absolute bottom-0 left-0 right-0 h-0.5 bg-amber-600'
                    initial={false}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Controls (Language, Theme) */}
          <div className='hidden md:flex items-center space-x-4 rtl:space-x-reverse'>
            {/* Language Toggle */}
            <Button
              variant='ghost'
              size='sm'
              onClick={toggleLanguage}
              className='flex items-center space-x-2 rtl:space-x-reverse'
              aria-label={t('common.language')}
            >
              <Globe className='h-4 w-4' />
              <span className='text-sm font-medium'>
                {currentLanguage === 'en' ? 'عربي' : 'English'}
              </span>
            </Button>

            {/* Theme Toggle */}
            <Button
              variant='ghost'
              size='sm'
              onClick={toggleTheme}
              aria-label={t('common.theme')}
            >
              {isDarkMode ? (
                <Sun className='h-4 w-4' />
              ) : (
                <Moon className='h-4 w-4' />
              )}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className='md:hidden flex items-center space-x-2 rtl:space-x-reverse'>
            {/* Mobile Language Toggle */}
            <Button
              variant='ghost'
              size='sm'
              onClick={toggleLanguage}
              aria-label={t('common.language')}
            >
              <Globe className='h-4 w-4' />
            </Button>

            {/* Mobile Theme Toggle */}
            <Button
              variant='ghost'
              size='sm'
              onClick={toggleTheme}
              aria-label={t('common.theme')}
            >
              {isDarkMode ? (
                <Sun className='h-4 w-4' />
              ) : (
                <Moon className='h-4 w-4' />
              )}
            </Button>

            {/* Hamburger Menu */}
            <Button
              variant='ghost'
              size='sm'
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label='Toggle menu'
            >
              {isMenuOpen ? (
                <X className='h-6 w-6' />
              ) : (
                <MenuIcon className='h-6 w-6' />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className='md:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-800'
          >
            <div className='px-4 py-2 space-y-1'>
              {navItems.map(item => (
                <button
                  key={item.key}
                  onClick={() => handleNavClick(item.key)}
                  className={`block w-full text-left px-3 py-2 text-base font-medium rounded-md transition-colors ${
                    activeSection === item.key
                      ? 'text-amber-600 bg-amber-50 dark:bg-amber-900/20'
                      : 'text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
