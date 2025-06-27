import React, { useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';
import {
  useCartStore,
  useCartTotals,
  type CartItem,
} from '../../stores/cart-store';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

// Memoized cart item component to prevent unnecessary re-renders
const CartItemComponent = React.memo<{ item: CartItem }>(({ item }) => {
  const { updateQuantity, removeFromCart } = useCartStore();

  const handleQuantityChange = useCallback(
    (newQuantity: number) => {
      if (newQuantity <= 0) {
        removeFromCart(item.id);
      } else {
        updateQuantity(item.id, newQuantity);
      }
    },
    [item.id, updateQuantity, removeFromCart]
  );

  const handleRemove = useCallback(() => {
    removeFromCart(item.id);
  }, [item.id, removeFromCart]);

  const itemTotal = useMemo(
    () => (item.price * item.quantity).toFixed(2),
    [item.price, item.quantity]
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className='flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700'
    >
      <img
        src={item.image}
        alt={item.nameKey}
        className='w-16 h-16 object-cover rounded-lg'
      />

      <div className='flex-1'>
        <h4 className='font-semibold text-gray-900 dark:text-white text-sm mb-1'>
          {item.nameKey}
        </h4>
        <p className='text-xs text-gray-600 dark:text-gray-400 mb-2'>
          ${item.price.toFixed(2)} each
        </p>

        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <Button
              variant='outline'
              size='sm'
              onClick={() => handleQuantityChange(item.quantity - 1)}
              className='h-7 w-7 p-0'
            >
              <Minus className='h-3 w-3' />
            </Button>
            <span className='font-medium text-sm w-8 text-center'>
              {item.quantity}
            </span>
            <Button
              variant='outline'
              size='sm'
              onClick={() => handleQuantityChange(item.quantity + 1)}
              className='h-7 w-7 p-0'
            >
              <Plus className='h-3 w-3' />
            </Button>
          </div>

          <div className='flex items-center gap-2'>
            <span className='font-bold text-sm text-gray-900 dark:text-white'>
              ${itemTotal}
            </span>
            <Button
              variant='ghost'
              size='sm'
              onClick={handleRemove}
              className='h-7 w-7 p-0 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20'
            >
              <Trash2 className='h-3 w-3' />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

CartItemComponent.displayName = 'CartItemComponent';

export const CartSidebar: React.FC<CartSidebarProps> = ({
  isOpen,
  onClose,
}) => {
  const items = useCartStore(state => state.items);
  const clearCart = useCartStore(state => state.clearCart);
  const { total, itemCount } = useCartTotals();

  // Memoize calculated values to prevent unnecessary recalculations
  const deliveryFee = 3.99;
  const taxRate = 0.08;

  const calculations = useMemo(() => {
    const tax = total * taxRate;
    const finalTotal = total + deliveryFee + tax;
    return {
      tax: tax.toFixed(2),
      finalTotal: finalTotal.toFixed(2),
    };
  }, [total, taxRate, deliveryFee]);

  const handleClearCart = useCallback(() => {
    clearCart();
  }, [clearCart]);

  // Empty cart content memoized
  const emptyCartContent = useMemo(
    () => (
      <div className='flex flex-col items-center justify-center h-full text-center py-12'>
        <div className='w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4'>
          <ShoppingBag className='h-8 w-8 text-gray-400' />
        </div>
        <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
          Your cart is empty
        </h3>
        <p className='text-gray-600 dark:text-gray-400 mb-4'>
          Add some delicious items to get started!
        </p>
        <Button onClick={onClose} variant='outline' className='px-6 py-2'>
          Continue Shopping
        </Button>
      </div>
    ),
    [onClose]
  );

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className='w-full sm:max-w-md p-0 flex flex-col h-full'>
        {/* Fixed Header */}
        <div className='border-b border-gray-200 dark:border-gray-700 p-6 pb-4'>
          <SheetHeader className='space-y-0'>
            <div className='flex items-center justify-between'>
              <SheetTitle className='text-xl font-bold'>
                Your Cart
                {itemCount > 0 && (
                  <Badge className='ml-2 bg-orange-500 text-white text-xs px-2 py-1'>
                    {itemCount} {itemCount === 1 ? 'item' : 'items'}
                  </Badge>
                )}
              </SheetTitle>
              <Button
                variant='ghost'
                size='sm'
                onClick={onClose}
                className='h-8 w-8 p-0 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800'
              >
                <X className='h-4 w-4' />
              </Button>
            </div>
          </SheetHeader>
        </div>

        {/* Scrollable Cart Items */}
        <div className='flex-1 overflow-hidden flex flex-col px-6'>
          <div className='flex-1 overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800'>
            {items.length === 0 ? (
              emptyCartContent
            ) : (
              <div className='space-y-3 pr-2'>
                <AnimatePresence>
                  {items.map(item => (
                    <CartItemComponent key={item.id} item={item} />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>

        {/* Fixed Bottom Summary */}
        {items.length > 0 && (
          <div className='border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 pt-4 space-y-4'>
            {/* Summary */}
            <div className='space-y-2'>
              <div className='flex justify-between text-sm'>
                <span className='text-gray-600 dark:text-gray-400'>
                  Subtotal
                </span>
                <span className='font-medium'>${total.toFixed(2)}</span>
              </div>
              <div className='flex justify-between text-sm'>
                <span className='text-gray-600 dark:text-gray-400'>
                  Delivery
                </span>
                <span className='font-medium'>${deliveryFee.toFixed(2)}</span>
              </div>
              <div className='flex justify-between text-sm'>
                <span className='text-gray-600 dark:text-gray-400'>Tax</span>
                <span className='font-medium'>${calculations.tax}</span>
              </div>
              <div className='border-t border-gray-200 dark:border-gray-700 pt-2'>
                <div className='flex justify-between text-lg font-bold'>
                  <span>Total</span>
                  <span>${calculations.finalTotal}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className='space-y-3'>
              <Button
                className='w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 h-12 text-base shadow-lg hover:shadow-xl transition-all duration-200'
                size='lg'
              >
                Proceed to Checkout
              </Button>
              <Button
                variant='outline'
                onClick={handleClearCart}
                className='w-full text-red-500 border-red-200 hover:bg-red-50 dark:hover:bg-red-950/20 py-2 h-10'
              >
                Clear Cart
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
