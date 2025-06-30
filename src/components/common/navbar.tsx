import { useRef, useState } from 'react';
import { QrCodeIcon, MenuIcon, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import { Logo } from '@/components/common/logo';
import { CartSidebar } from '@/components/common/cart-sidebar';
import {
  MagneticBackground,
  MagneticCursor,
} from '@/components/common/magnetic-cursor';

import { useScroll } from '@/hooks/use-scroll';
import { useCartTotals } from '@/stores/cart-store';
import { config } from '@/config';
import { cn } from '@/lib/utils';
import { DEFAULT_MESSAGES } from '@/constants/messages';

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const buttonContainerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const { isScrolled } = useScroll();
  const { itemCount } = useCartTotals();

  const handleMenuClose = (): void => {
    setIsOpen(false);
  };

  const handleCartOpen = (): void => {
    setIsCartOpen(true);
  };

  const handleCartClose = (): void => {
    setIsCartOpen(false);
  };

  return (
    <div
      className={cn(
        'fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 w-full transition-all duration-300',
        isScrolled && 'bg-background/80 backdrop-blur-sm shadow-sm'
      )}
    >
      <Logo />

      <div className='hidden flex-1 md:flex items-center justify-end gap-6'>
        <div ref={buttonContainerRef} className='flex items-center'>
          <MagneticBackground parentRef={buttonContainerRef} />
          <div className='flex'>
            {config.navigationLinks.map(link => (
              <MagneticCursor key={link.href}>
                <Link
                  to={link.href}
                  className='transition-colors hover:text-primary'
                >
                  {t(link.nameKey)}
                </Link>
              </MagneticCursor>
            ))}
          </div>
        </div>

        <Button
          variant='ghost'
          size='sm'
          onClick={handleCartOpen}
          className='relative'
          aria-label={t('common.cart') || DEFAULT_MESSAGES.ACCESSIBILITY.CART}
        >
          <ShoppingCart className='h-5 w-5' />
          {itemCount > 0 && (
            <span
              className='absolute -top-1 -right-1 h-5 w-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center'
              aria-label={`${itemCount} items in cart`}
            >
              {itemCount}
            </span>
          )}
          <span className='sr-only'>{DEFAULT_MESSAGES.ACCESSIBILITY.CART}</span>
        </Button>

        <Button asChild size='sm'>
          <Link to='/qr'>
            {t('common.getStarted')} <QrCodeIcon className='size-4' />
          </Link>
        </Button>
      </div>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild className='md:hidden'>
          <Button
            variant='ghost'
            size='icon'
            aria-label={t('common.menu') || DEFAULT_MESSAGES.ACCESSIBILITY.MENU}
          >
            <MenuIcon className='h-5 w-5' />
            <span className='sr-only'>
              {DEFAULT_MESSAGES.ACCESSIBILITY.TOGGLE}{' '}
              {DEFAULT_MESSAGES.ACCESSIBILITY.MENU}
            </span>
          </Button>
        </SheetTrigger>
        <SheetContent side='right' className='flex flex-col'>
          <div className='flex flex-col gap-4 pt-8'>
            {config.navigationLinks.map(link => (
              <Link
                key={link.href}
                to={link.href}
                className='flex items-center gap-2 text-lg font-medium transition-colors hover:text-primary'
                onClick={handleMenuClose}
              >
                <link.icon className='h-5 w-5' />
                {t(link.nameKey)}
              </Link>
            ))}

            <Button
              asChild
              className='mt-4 bg-primary hover:bg-primary/90 flex items-center gap-2'
            >
              <Link to='/qr' onClick={handleMenuClose}>
                {t('common.getStarted')} <QrCodeIcon className='ml-1 h-4 w-4' />
              </Link>
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      <CartSidebar isOpen={isCartOpen} onClose={handleCartClose} />
    </div>
  );
};

Navbar.displayName = 'Navbar';

export { Navbar };
