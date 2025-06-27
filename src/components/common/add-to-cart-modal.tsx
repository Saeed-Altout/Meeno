import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Plus, Minus, ShoppingCart, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { useCartStore } from '../../stores/cart-store';
import type { MenuItem } from '../../data';

interface AddToCartModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const AddToCartModal: React.FC<AddToCartModalProps> = ({
  item,
  isOpen,
  onClose,
}) => {
  const { t } = useTranslation();
  const { addToCart, getItemQuantity } = useCartStore();
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');

  const currentQuantity = item ? getItemQuantity(item.id) : 0;

  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  const handleAddToCart = () => {
    if (!item) return;

    // Add to cart with quantity
    addToCart(item, quantity);

    // Add notes if provided
    if (notes.trim()) {
      useCartStore.getState().addNote(item.id, notes.trim());
    }

    // Reset form and close
    setQuantity(1);
    setNotes('');
    onClose();
  };

  const handleClose = () => {
    setQuantity(1);
    setNotes('');
    onClose();
  };

  if (!item) return null;

  const totalPrice = item.price * quantity;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle className='flex items-center justify-between'>
            <span>{t('cart.addToCart', 'Add to Cart')}</span>
            <Button
              variant='ghost'
              size='sm'
              onClick={handleClose}
              className='h-6 w-6 p-0'
            >
              <X className='h-4 w-4' />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className='space-y-6'>
          {/* Item Info */}
          <div className='flex gap-4'>
            <img
              src={item.image}
              alt={item.nameKey}
              className='w-20 h-20 object-cover rounded-lg'
            />
            <div className='flex-1'>
              <h3 className='font-semibold text-lg text-gray-900 dark:text-white'>
                {item.nameKey}
              </h3>
              <p className='text-sm text-gray-600 dark:text-gray-400 mt-1'>
                {item.descriptionKey}
              </p>
              <p className='text-lg font-bold text-amber-600 mt-2'>
                ${item.price.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Quantity Selector */}
          <div className='space-y-2'>
            <Label className='text-sm font-medium'>
              {t('cart.quantity', 'Quantity')}
            </Label>
            <div className='flex items-center gap-3'>
              <Button
                variant='outline'
                size='sm'
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                className='h-8 w-8 p-0'
              >
                <Minus className='h-4 w-4' />
              </Button>
              <span className='text-lg font-semibold min-w-[2rem] text-center'>
                {quantity}
              </span>
              <Button
                variant='outline'
                size='sm'
                onClick={() => handleQuantityChange(1)}
                className='h-8 w-8 p-0'
              >
                <Plus className='h-4 w-4' />
              </Button>
            </div>
          </div>

          {/* Notes */}
          <div className='space-y-2'>
            <Label htmlFor='notes' className='text-sm font-medium'>
              {t('cart.notes', 'Special Notes')} (
              {t('cart.optional', 'Optional')})
            </Label>
            <Textarea
              id='notes'
              placeholder={t(
                'cart.notesPlaceholder',
                'Add any special instructions...'
              )}
              value={notes}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setNotes(e.target.value)
              }
              className='min-h-[80px] resize-none'
              maxLength={200}
            />
            <p className='text-xs text-gray-500 dark:text-gray-400'>
              {notes.length}/200 {t('cart.characters', 'characters')}
            </p>
          </div>

          {/* Current Cart Info */}
          {currentQuantity > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className='bg-amber-50 dark:bg-amber-950/20 rounded-lg p-3'
            >
              <p className='text-sm text-amber-700 dark:text-amber-400'>
                {t('cart.currentlyInCart', 'Currently in cart')}:{' '}
                {currentQuantity} {t('cart.items', 'items')}
              </p>
            </motion.div>
          )}

          {/* Total Price */}
          <div className='flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg'>
            <span className='font-medium text-gray-700 dark:text-gray-300'>
              {t('cart.total', 'Total')}:
            </span>
            <span className='text-xl font-bold text-gray-900 dark:text-white'>
              ${totalPrice.toFixed(2)}
            </span>
          </div>

          {/* Action Buttons */}
          <div className='flex gap-3'>
            <Button variant='outline' onClick={handleClose} className='flex-1'>
              {t('common.cancel', 'Cancel')}
            </Button>
            <Button
              onClick={handleAddToCart}
              className='flex-1 bg-amber-600 hover:bg-amber-700'
            >
              <ShoppingCart className='h-4 w-4 mr-2' />
              {t('cart.addToCart', 'Add to Cart')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
