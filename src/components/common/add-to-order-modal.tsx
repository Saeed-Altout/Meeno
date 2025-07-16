import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Plus, Minus, ShoppingCart } from 'lucide-react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { useOrderStore } from '../../stores/order-store';
import type { MenuItem } from '../../data';

interface AddToOrderModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
}

// Helper to humanize translation keys
function humanizeKey(key: string): string {
  if (!key) return '';
  // Try to extract the last part after the last dot
  const last = key.split('.').pop() || key;
  // Remove camelCase and numbers, replace with spaces, capitalize
  return last
    .replace(/([A-Z])/g, ' $1')
    .replace(/([0-9]+)/g, ' $1')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .replace(/([a-zA-Z])([0-9])/g, '$1 $2')
    .replace(/([0-9])([a-zA-Z])/g, '$1 $2')
    .replace(/_/g, ' ')
    .replace(/-/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/^./, s => s.toUpperCase())
    .trim();
}

export const AddToOrderModal: React.FC<AddToOrderModalProps> = ({
  item,
  isOpen,
  onClose,
}) => {
  const { t } = useTranslation();
  const { addToOrder, getItemQuantity } = useOrderStore();
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');

  const currentQuantity = item ? getItemQuantity(item.id) : 0;

  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  const handleAddToOrder = () => {
    if (!item) return;
    addToOrder(item, quantity);
    if (notes.trim()) {
      useOrderStore.getState().addNote(item.id, notes.trim());
    }
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

  // Try translation, fallback to humanized key
  const itemName = t(item.nameKey);
  const itemNameDisplay =
    itemName === item.nameKey ? humanizeKey(item.nameKey) : itemName;
  const itemDesc = t(item.descriptionKey);
  const itemDescDisplay =
    itemDesc === item.descriptionKey
      ? humanizeKey(item.descriptionKey)
      : itemDesc;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle className='flex items-center justify-between'>
            <span>{t('order.addToOrder', 'Add to Order')}</span>
          </DialogTitle>
        </DialogHeader>

        <div className='space-y-6'>
          {/* Item Info */}
          <div className='flex gap-4'>
            <img
              src={item.image}
              alt={itemNameDisplay}
              className='w-20 h-20 object-cover rounded-lg'
            />
            <div className='flex-1'>
              <h3 className='font-semibold text-lg text-gray-900 dark:text-white'>
                {itemNameDisplay}
              </h3>
              <p className='text-sm text-gray-600 dark:text-gray-400 mt-1'>
                {itemDescDisplay}
              </p>
              <p className='text-lg font-bold text-amber-600 mt-2'>
                ${item.price.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Quantity Selector */}
          <div className='space-y-2'>
            <Label className='text-sm font-medium'>
              {t('order.quantity', 'Quantity')}
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
              {t('order.notes', 'Special Notes')} (
              {t('order.optional', 'Optional')})
            </Label>
            <Textarea
              id='notes'
              placeholder={t(
                'order.notesPlaceholder',
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
              {notes.length}/200 {t('order.characters', 'characters')}
            </p>
          </div>

          {/* Current Order Info */}
          {currentQuantity > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className='bg-amber-50 dark:bg-amber-950/20 rounded-lg p-3'
            >
              <p className='text-sm text-amber-700 dark:text-amber-400'>
                {t('order.currentlyInOrder', 'Currently in order')}:{' '}
                {currentQuantity} {t('order.items', 'items')}
              </p>
            </motion.div>
          )}

          {/* Total Price */}
          <div className='flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg'>
            <span className='font-medium text-gray-700 dark:text-gray-300'>
              {t('order.total', 'Total')}:
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
              onClick={handleAddToOrder}
              className='flex-1 bg-amber-600 hover:bg-amber-700'
            >
              <ShoppingCart className='h-4 w-4 mr-2' />
              {t('order.addToOrder', 'Add to Order')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
