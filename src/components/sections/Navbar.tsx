import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Menu as MenuIcon,
  Globe,
  Home,
  ArrowRight,
  ShoppingCart,
  QrCode,
  X,
  Sun,
} from 'lucide-react';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ModeToggle } from '@/components/common/mode-toggle';
import { CartSidebar } from '@/components/common/cart-sidebar';
import { Logo } from '@/components/common/logo';

import { useCartTotals } from '@/stores/cart-store';
import { useScroll } from '@/hooks/use-scroll';
import { cn } from '@/lib/utils';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const { itemCount } = useCartTotals();
  const { isScrolled } = useScroll();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const currentLanguage = i18n.language;
  const isRTL = currentLanguage === 'ar';

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLanguage;
  }, [isRTL, currentLanguage]);

  const toggleLanguage = () => {
    const newLang = currentLanguage === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
  };

  const handleNavClick = (route: string) => {
    navigate(route);
  };

  const navItems = [
    { key: 'home', label: t('navigation.home'), icon: Home, route: '/' },
    {
      key: 'demo',
      label: t('navigation.demo'),
      icon: QrCode,
      route: '/demo',
    },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        'bg-white dark:bg-gray-900/80 fixed top-0 w-full z-50 transition-all duration-300',
        isScrolled && 'backdrop-blur-md shadow-lg'
      )}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          <Logo />
          <div className='hidden md:flex items-center space-x-8 rtl:space-x-reverse'>
            {navItems.map(item => {
              const isRouteActive =
                item.route && location.pathname === item.route;
              const isActive = isRouteActive;

              return (
                <button
                  key={item.key}
                  onClick={() => handleNavClick(item.route)}
                  className={cn(
                    'relative px-3 py-2 text-sm font-medium transition-colors dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-600 duration-300 cursor-pointer',
                    isActive && 'text-amber-600 dark:text-amber-600'
                  )}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId='activeSection'
                      className='absolute bottom-0 left-0 right-0 h-0.5 bg-amber-600'
                      initial={false}
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className='hidden md:flex items-center space-x-4 rtl:space-x-reverse'>
            <Button
              variant='ghost'
              size='sm'
              onClick={() => setIsCartOpen(true)}
              className='relative'
              aria-label={t('nav.cart')}
            >
              <ShoppingCart className='h-4 w-4' />
              {itemCount > 0 && (
                <Badge className='absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-amber-600 hover:bg-amber-600'>
                  {itemCount}
                </Badge>
              )}
            </Button>

            <Button
              variant='ghost'
              size='sm'
              onClick={toggleLanguage}
              aria-label={t('common.language')}
            >
              <Globe className='h-4 w-4' />
              {currentLanguage === 'en' ? 'عربي' : 'English'}
            </Button>
          </div>

          <div className='md:hidden flex items-center space-x-2 rtl:space-x-reverse'>
            <Button
              variant='ghost'
              size='sm'
              onClick={() => setIsCartOpen(true)}
              className='relative'
              aria-label={t('nav.cart')}
            >
              <ShoppingCart className='h-4 w-4' />
              {itemCount > 0 && (
                <Badge className='absolute -top-1 -right-1 h-4 w-4 p-0 text-xs bg-amber-600 hover:bg-amber-600 flex items-center justify-center'>
                  {itemCount}
                </Badge>
              )}
            </Button>

            <Button
              variant='ghost'
              size='sm'
              onClick={toggleLanguage}
              aria-label={t('common.language')}
            >
              <Globe className='h-4 w-4' />
            </Button>

            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant='ghost' size='sm' aria-label='Toggle menu'>
                  <MenuIcon className='h-6 w-6' />
                </Button>
              </SheetTrigger>
              <SheetContent
                side={isRTL ? 'left' : 'right'}
                className='w-80 p-0'
              >
                <div className='flex flex-col h-full'>
                  <div className='flex justify-between items-center px-6 py-4 border-b border-gray-100 dark:border-gray-800'>
                    <Logo />
                    <SheetClose asChild>
                      <Button
                        variant='ghost'
                        size='icon'
                        className='rounded-full h-8 w-8'
                        aria-label='Close menu'
                      >
                        <X className='h-4 w-4' />
                      </Button>
                    </SheetClose>
                  </div>

                  <nav className='flex-1 py-4'>
                    <div className='space-y-1 px-3'>
                      {navItems.map((item, index) => {
                        const Icon = item.icon;
                        const isRouteActive =
                          item.route && location.pathname === item.route;

                        return (
                          <motion.button
                            key={item.key}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05, duration: 0.2 }}
                            onClick={() => handleNavClick(item.route)}
                            className={cn(
                              'flex items-center w-full px-3 py-2.5 rounded-lg transition-all duration-200',
                              isRouteActive
                                ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-600'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                            )}
                          >
                            <div
                              className={cn(
                                'flex items-center justify-center w-8 h-8 rounded-md mr-3 rtl:mr-0 rtl:ml-3',
                                isRouteActive
                                  ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-600'
                                  : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                              )}
                            >
                              <Icon className='h-4 w-4' />
                            </div>
                            <span className='font-medium text-sm flex-1 text-start'>
                              {item.label}
                            </span>
                            {isRouteActive && (
                              <ArrowRight
                                className={cn(
                                  'h-4 w-4 text-amber-600 dark:text-amber-600',
                                  isRTL ? 'rotate-180' : ''
                                )}
                              />
                            )}
                          </motion.button>
                        );
                      })}
                    </div>
                  </nav>

                  <div className='px-4 py-4 space-y-2 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800'>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className='flex items-center justify-between p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700'
                    >
                      <div className='flex items-center space-x-3 rtl:space-x-reverse'>
                        <div className='w-8 h-8 bg-blue-50 dark:bg-blue-900/20 rounded-md flex items-center justify-center'>
                          <Globe className='h-4 w-4 text-blue-600 dark:text-blue-400' />
                        </div>
                        <span className='font-medium text-sm text-gray-900 dark:text-white'>
                          {t('common.language')}
                        </span>
                      </div>
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={toggleLanguage}
                        className='h-8 px-3 text-xs font-medium'
                      >
                        {currentLanguage === 'en' ? 'عربي' : 'English'}
                      </Button>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className='flex items-center justify-between p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700'
                    >
                      <div className='flex items-center space-x-3 rtl:space-x-reverse'>
                        <div className='w-8 h-8 bg-purple-50 dark:bg-purple-900/20 rounded-md flex items-center justify-center'>
                          <Sun className='h-4 w-4 text-purple-600 dark:text-purple-400' />
                        </div>
                        <span className='font-medium text-sm text-gray-900 dark:text-white'>
                          {t('common.theme')}
                        </span>
                      </div>
                      <ModeToggle />
                    </motion.div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </motion.nav>
  );
}

export { Navbar };
