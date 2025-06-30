import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  X,
  Plus,
  Minus,
  Star,
  Heart,
  ShoppingCart,
  Clock,
  Users,
  ChefHat,
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { useCartStore } from '../../stores/cart-store';
import { useFavoritesStore } from '../../stores/favorites-store';
import type { MenuItem } from '../../data';

interface ProductDetailsProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  relatedItems: MenuItem[];
  onItemClick: (item: MenuItem) => void;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({
  item,
  isOpen,
  onClose,
  relatedItems,
  onItemClick,
}) => {
  const { t } = useTranslation();
  const [quantity, setQuantity] = useState(1);
  const { addToCart, getItemQuantity } = useCartStore();
  const { addToFavorites, removeFromFavorites, isFavorite } =
    useFavoritesStore();

  if (!item) return null;

  const currentCartQuantity = getItemQuantity(item.id);
  const isInFavorites = isFavorite(item.id);

  const handleAddToCart = () => {
    addToCart(item, quantity);
    setQuantity(1);
  };

  const handleToggleFavorite = () => {
    if (isInFavorites) {
      removeFromFavorites(item.id);
    } else {
      addToFavorites(item);
    }
  };

  const renderStars = (rating: number = 4.5) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-yellow-400'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-w-4xl max-h-[90vh] overflow-hidden p-0'>
        <div className='grid grid-cols-1 lg:grid-cols-2 h-full'>
          {/* Image Section */}
          <div className='relative h-64 lg:h-full'>
            <img
              src={item.image}
              alt={item.nameKey}
              className='w-full h-full object-cover'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent' />

            {/* Close Button */}
            <Button
              variant='ghost'
              size='sm'
              onClick={onClose}
              className='absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-900 rounded-full p-2'
            >
              <X className='h-4 w-4' />
            </Button>

            {/* Favorite Button */}
            <Button
              variant='ghost'
              size='sm'
              onClick={handleToggleFavorite}
              className='absolute top-4 left-4 bg-white/90 hover:bg-white text-gray-900 rounded-full p-2'
            >
              <Heart
                className={`h-4 w-4 ${
                  isInFavorites ? 'text-red-500 fill-red-500' : 'text-gray-600'
                }`}
              />
            </Button>

            {item.featured && (
              <Badge className='absolute bottom-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white'>
                Featured
              </Badge>
            )}
          </div>

          {/* Content Section */}
          <div className='p-6 lg:p-8 flex flex-col h-full'>
            <DialogHeader className='space-y-4 mb-6'>
              <DialogTitle className='text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white'>
                {item.nameKey}
              </DialogTitle>

              {/* Rating and Info */}
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  {renderStars()}
                  <span className='text-sm text-gray-600 dark:text-gray-400'>
                    (4.5)
                  </span>
                </div>
                <div className='flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400'>
                  <div className='flex items-center gap-1'>
                    <Clock className='h-4 w-4' />
                    <span>15-20 min</span>
                  </div>
                  <div className='flex items-center gap-1'>
                    <Users className='h-4 w-4' />
                    <span>1-2 people</span>
                  </div>
                </div>
              </div>
            </DialogHeader>

            <div className='flex-1 space-y-6'>
              {/* Description */}
              <div>
                <h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
                  Description
                </h3>
                <p className='text-gray-600 dark:text-gray-400 leading-relaxed'>
                  {item.descriptionKey}
                </p>
              </div>

              {/* Ingredients */}
              <div>
                <h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
                  <ChefHat className='h-4 w-4 inline mr-2' />
                  Ingredients
                </h3>
                <div className='flex flex-wrap gap-2'>
                  {[
                    t('productDetail.ingredients.freshTomatoes'),
                    t('productDetail.ingredients.mozzarella'),
                    t('productDetail.ingredients.basil'),
                    t('productDetail.ingredients.oliveOil'),
                  ].map(ingredient => (
                    <Badge
                      key={ingredient}
                      variant='outline'
                      className='text-xs'
                    >
                      {ingredient}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Nutritional Info */}
              <div className='grid grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg'>
                <div className='text-center'>
                  <div className='font-semibold text-gray-900 dark:text-white'>
                    320
                  </div>
                  <div className='text-xs text-gray-600 dark:text-gray-400'>
                    Calories
                  </div>
                </div>
                <div className='text-center'>
                  <div className='font-semibold text-gray-900 dark:text-white'>
                    12g
                  </div>
                  <div className='text-xs text-gray-600 dark:text-gray-400'>
                    Protein
                  </div>
                </div>
                <div className='text-center'>
                  <div className='font-semibold text-gray-900 dark:text-white'>
                    8g
                  </div>
                  <div className='text-xs text-gray-600 dark:text-gray-400'>
                    Fat
                  </div>
                </div>
              </div>
            </div>

            {/* Price and Actions */}
            <div className='border-t pt-6 space-y-4'>
              <div className='flex items-center justify-between'>
                <div>
                  <span className='text-2xl font-bold text-gray-900 dark:text-white'>
                    ${item.price.toFixed(2)}
                  </span>
                  {currentCartQuantity > 0 && (
                    <div className='text-sm text-green-600 font-medium'>
                      {currentCartQuantity} in cart
                    </div>
                  )}
                </div>

                {/* Quantity Selector */}
                <div className='flex items-center gap-3'>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className='h-4 w-4' />
                  </Button>
                  <span className='font-semibold w-8 text-center'>
                    {quantity}
                  </span>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className='h-4 w-4' />
                  </Button>
                </div>
              </div>

              <Button
                onClick={handleAddToCart}
                className='w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3'
                size='lg'
              >
                <ShoppingCart className='h-4 w-4 mr-2' />
                Add {quantity} to Cart - ${(item.price * quantity).toFixed(2)}
              </Button>
            </div>

            {/* Related Items */}
            {relatedItems.length > 0 && (
              <div className='border-t pt-6'>
                <h3 className='font-semibold text-gray-900 dark:text-white mb-4'>
                  You Might Also Like
                </h3>
                <div className='grid grid-cols-2 gap-3'>
                  {relatedItems.slice(0, 4).map(relatedItem => (
                    <Card
                      key={relatedItem.id}
                      className='cursor-pointer hover:shadow-md transition-shadow p-3'
                      onClick={() => onItemClick(relatedItem)}
                    >
                      <img
                        src={relatedItem.image}
                        alt={relatedItem.nameKey}
                        className='w-full h-20 object-cover rounded mb-2'
                      />
                      <h4 className='font-medium text-sm text-gray-900 dark:text-white mb-1 line-clamp-1'>
                        {relatedItem.nameKey}
                      </h4>
                      <div className='text-sm font-semibold text-orange-600'>
                        ${relatedItem.price.toFixed(2)}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
