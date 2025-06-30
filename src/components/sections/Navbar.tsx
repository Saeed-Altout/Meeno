import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  ChefHat,
  Menu as MenuIcon,
  Globe,
  Home,
  UtensilsCrossed,
  ArrowRight,
  ShoppingCart,
  ClipboardList,
  QrCode,
} from 'lucide-react';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { Badge } from '../ui/badge';
import { ThemeToggle } from '../common/theme-toggle';
import { CartSidebar } from '../common/cart-sidebar';
import { useCartTotals } from '../../stores/cart-store';
import { Logo } from '../common/logo';

interface NavbarProps {
  activeSection: string;
  onNavClick: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavClick,
}) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { itemCount } = useCartTotals();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
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

  const handleNavClick = (sectionId: string, route?: string) => {
    if (route) {
      navigate(route);
    } else {
      onNavClick(sectionId);
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { key: 'home', label: t('navigation.home'), icon: Home, route: '/' },
    {
      key: 'demo',
      label: t('navigation.demo'),
      icon: QrCode,
      route: '/demo',
    },
    {
      key: 'menu',
      label: t('navigation.menu'),
      icon: UtensilsCrossed,
      route: '/menu',
    },
    {
      key: 'products',
      label: t('navigation.products'),
      icon: UtensilsCrossed,
      route: '/products',
    },
    {
      key: 'orders',
      label: t('navigation.orders'),
      icon: ClipboardList,
      route: '/orders',
    },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white dark:bg-gray-900/95 backdrop-blur-md shadow-lg'
          : 'bg-white dark:bg-gray-900/80 backdrop-blur-sm'
      }`}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          <Logo />

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center space-x-8 rtl:space-x-reverse'>
            {navItems.map(item => {
              // For pages with routes, use route-based highlighting
              // For home page sections, use activeSection only when on home page
              const isRouteActive =
                item.route && location.pathname === item.route;
              const isSectionActive =
                location.pathname === '/' && activeSection === item.key;
              const isActive = isRouteActive || isSectionActive;

              return (
                <button
                  key={item.key}
                  onClick={() => handleNavClick(item.key, item.route)}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-amber-600'
                      : 'text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400'
                  }`}
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

          {/* Controls (Cart, Language, Theme) */}
          <div className='hidden md:flex items-center space-x-4 rtl:space-x-reverse'>
            {/* Cart Button */}
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
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className='md:hidden flex items-center space-x-2 rtl:space-x-reverse'>
            {/* Mobile Cart Button */}
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
            <ThemeToggle />

            {/* Mobile Menu Sheet */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant='ghost' size='sm' aria-label='Toggle menu'>
                  <MenuIcon className='h-6 w-6' />
                </Button>
              </SheetTrigger>
              <SheetContent
                side={isRTL ? 'left' : 'right'}
                className='w-80 p-0 bg-white dark:bg-gray-950 border-none shadow-2xl overflow-hidden'
              >
                <div className='flex flex-col h-full'>
                  {/* Sheet Header */}
                  <div className='px-6 py-8 bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800'>
                    <div className='flex items-center space-x-3 rtl:space-x-reverse'>
                      <div className='w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center shadow-lg'>
                        <ChefHat className='h-6 w-6 text-white' />
                      </div>
                      <div>
                        <h2 className='text-xl font-bold text-gray-900 dark:text-white'>
                          La Tavola
                        </h2>
                        <p className='text-sm text-gray-500 dark:text-gray-400 mt-0.5'>
                          {t('nav.welcome')}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Navigation Links */}
                  <nav className='flex-1 px-6 py-8'>
                    <div className='space-y-3'>
                      {navItems.map((item, index) => {
                        const Icon = item.icon;
                        // Apply same logic as desktop navigation
                        const isRouteActive =
                          item.route && location.pathname === item.route;
                        const isSectionActive =
                          location.pathname === '/' &&
                          activeSection === item.key;
                        const isActive = isRouteActive || isSectionActive;

                        return (
                          <motion.button
                            key={item.key}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.3 }}
                            onClick={() => handleNavClick(item.key, item.route)}
                            className={`group w-full flex items-center space-x-4 rtl:space-x-reverse px-4 py-4 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${
                              isActive
                                ? 'bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 shadow-sm border border-amber-100 dark:border-amber-900/50'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-amber-600 dark:hover:text-amber-400 hover:shadow-sm'
                            }`}
                          >
                            <div
                              className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 ${
                                isActive
                                  ? 'bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400'
                                  : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 group-hover:bg-amber-100 dark:group-hover:bg-amber-900/50 group-hover:text-amber-600 dark:group-hover:text-amber-400'
                              }`}
                            >
                              <Icon className='h-5 w-5' />
                            </div>
                            <span className='font-medium text-base flex-1'>
                              {item.label}
                            </span>
                            <ArrowRight
                              className={`h-4 w-4 transition-all duration-300 ${
                                isRTL ? 'rotate-180' : ''
                              } ${
                                isActive
                                  ? 'opacity-100 translate-x-0'
                                  : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
                              }`}
                            />
                          </motion.button>
                        );
                      })}
                    </div>
                  </nav>

                  {/* Sheet Footer */}
                  <div className='px-6 py-6 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800'>
                    <div className='space-y-3'>
                      {/* Language Toggle */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className='flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow duration-200'
                      >
                        <div className='flex items-center space-x-3 rtl:space-x-reverse'>
                          <div className='w-10 h-10 bg-blue-50 dark:bg-blue-950/50 rounded-xl flex items-center justify-center'>
                            <Globe className='h-5 w-5 text-blue-600 dark:text-blue-400' />
                          </div>
                          <span className='font-medium text-gray-900 dark:text-white'>
                            {t('common.language')}
                          </span>
                        </div>
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={toggleLanguage}
                          className='h-9 px-4 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-blue-950/50 hover:border-blue-200 dark:hover:border-blue-800 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200'
                        >
                          <span className='text-sm font-medium'>
                            {currentLanguage === 'en' ? 'عربي' : 'English'}
                          </span>
                        </Button>
                      </motion.div>

                      {/* Theme Toggle */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className='flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow duration-200'
                      >
                        <div className='flex items-center space-x-3 rtl:space-x-reverse'>
                          <div className='w-10 h-10 bg-purple-50 dark:bg-purple-950/50 rounded-xl flex items-center justify-center'>
                            <div className='w-5 h-5 text-purple-600 dark:text-purple-400'>
                              <svg
                                className='w-full h-full'
                                fill='currentColor'
                                viewBox='0 0 24 24'
                              >
                                <path d='M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2Z' />
                              </svg>
                            </div>
                          </div>
                          <span className='font-medium text-gray-900 dark:text-white'>
                            {t('common.theme')}
                          </span>
                        </div>
                        <ThemeToggle />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </motion.nav>
  );
};
