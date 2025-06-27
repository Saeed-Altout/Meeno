import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  ArrowLeft,
  Plus,
  Minus,
  Star,
  Heart,
  ShoppingCart,
  Clock,
  Users,
  ChefHat,
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Textarea } from '../../components/ui/textarea';
import { Label } from '../../components/ui/label';
import { useCartStore } from '../../stores/cart-store';
import { useFavoritesStore } from '../../stores/favorites-store';
import type { MenuItem } from '../../data';

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const { addToCart, getItemQuantity, addNote } = useCartStore();
  const { addToFavorites, removeFromFavorites, isFavorite } =
    useFavoritesStore();

  // Mock data - in a real app this would come from an API or store
  const menuItems: MenuItem[] = [
    {
      id: 'spaghetti',
      nameKey: 'Spaghetti',
      descriptionKey:
        'Classic Italian pasta with rich tomato sauce and fresh herbs. Made with premium durum wheat pasta and slow-cooked tomato sauce.',
      price: 7.29,
      image:
        'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&h=600&fit=crop&auto=format',
      category: 'mains',
    },
    {
      id: 'veggie-pizza',
      nameKey: 'Vegetable Pizza',
      descriptionKey:
        'Fresh vegetables on crispy pizza base with mozzarella cheese, bell peppers, mushrooms, and olives.',
      price: 5.49,
      image:
        'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&h=600&fit=crop&auto=format',
      category: 'mains',
    },
    {
      id: 'mushroom-pizza',
      nameKey: 'Mushroom Pizza',
      descriptionKey:
        'Delicious mushroom pizza with cheese, featuring fresh mushrooms, garlic, and herbs on our signature pizza base.',
      price: 7.49,
      image:
        'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&h=600&fit=crop&auto=format',
      category: 'mains',
      featured: true,
    },
    {
      id: 'sweet-dessert',
      nameKey: 'Sweets',
      descriptionKey:
        'Delicious sweet dessert with chocolate and vanilla cream.',
      price: 6.49,
      image:
        'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&h=600&fit=crop&auto=format',
      category: 'desserts',
    },
  ];

  const item = menuItems.find(item => item.id === id);

  if (!item) {
    return (
      <div className='min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
            Product Not Found
          </h1>
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className='h-4 w-4 mr-2' />
            Back to Menu
          </Button>
        </div>
      </div>
    );
  }

  const currentCartQuantity = getItemQuantity(item.id);
  const isInFavorites = isFavorite(item.id);

  const handleAddToCart = () => {
    addToCart(item, quantity);
    if (notes.trim()) {
      addNote(item.id, notes.trim());
    }
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
        className={`h-5 w-5 ${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-yellow-400'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const relatedItems = menuItems
    .filter(i => i.id !== item.id && i.category === item.category)
    .slice(0, 4);

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
      {/* Header */}
      <div className='bg-white dark:bg-gray-800 shadow-sm pt-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
          <Button
            variant='ghost'
            onClick={() => navigate(-1)}
            className='flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors'
          >
            <ArrowLeft className='h-4 w-4' />
            {t('common.back')}
          </Button>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12'>
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className='relative'
          >
            <div className='aspect-square rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-lg'>
              <img
                src={item.image}
                alt={item.nameKey}
                className='w-full h-full object-cover'
              />
            </div>

            {/* Floating Action Buttons */}
            <Button
              variant='outline'
              size='sm'
              onClick={handleToggleFavorite}
              className='absolute top-4 right-4 bg-white/95 hover:bg-white text-gray-900 rounded-full p-3 shadow-lg'
            >
              <Heart
                className={`h-5 w-5 ${
                  isInFavorites ? 'text-red-500 fill-red-500' : 'text-gray-600'
                }`}
              />
            </Button>

            {item.featured && (
              <Badge className='absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm px-3 py-1'>
                Featured
              </Badge>
            )}
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className='space-y-6'
          >
            {/* Header */}
            <div>
              <h1 className='text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4'>
                {item.nameKey}
              </h1>

              {/* Rating and Info */}
              <div className='flex items-center justify-between mb-6'>
                <div className='flex items-center gap-2'>
                  {renderStars()}
                  <span className='text-gray-600 dark:text-gray-400 ml-2'>
                    (4.5) • 24 reviews
                  </span>
                </div>
              </div>

              <div className='flex items-center gap-6 text-gray-600 dark:text-gray-400 mb-6'>
                <div className='flex items-center gap-2'>
                  <Clock className='h-5 w-5' />
                  <span>15-20 min</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Users className='h-5 w-5' />
                  <span>1-2 people</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-3'>
                Description
              </h3>
              <p className='text-gray-600 dark:text-gray-400 leading-relaxed text-lg'>
                {item.descriptionKey}
              </p>
            </div>

            {/* Ingredients */}
            <div>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-3'>
                <ChefHat className='h-5 w-5 inline mr-2' />
                Ingredients
              </h3>
              <div className='flex flex-wrap gap-2'>
                {['Fresh Tomatoes', 'Mozzarella', 'Basil', 'Olive Oil'].map(
                  ingredient => (
                    <Badge
                      key={ingredient}
                      variant='outline'
                      className='text-sm px-3 py-1'
                    >
                      {ingredient}
                    </Badge>
                  )
                )}
              </div>
            </div>

            {/* Nutritional Info */}
            <div className='grid grid-cols-3 gap-4 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm'>
              <div className='text-center'>
                <div className='text-2xl font-bold text-gray-900 dark:text-white'>
                  320
                </div>
                <div className='text-sm text-gray-600 dark:text-gray-400'>
                  Calories
                </div>
              </div>
              <div className='text-center'>
                <div className='text-2xl font-bold text-gray-900 dark:text-white'>
                  12g
                </div>
                <div className='text-sm text-gray-600 dark:text-gray-400'>
                  Protein
                </div>
              </div>
              <div className='text-center'>
                <div className='text-2xl font-bold text-gray-900 dark:text-white'>
                  8g
                </div>
                <div className='text-sm text-gray-600 dark:text-gray-400'>
                  Fat
                </div>
              </div>
            </div>

            {/* Price and Actions */}
            <div className='bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm space-y-4'>
              <div className='flex items-center justify-between'>
                <div>
                  <span className='text-3xl font-bold text-gray-900 dark:text-white'>
                    ${item.price.toFixed(2)}
                  </span>
                  {currentCartQuantity > 0 && (
                    <div className='text-sm text-green-600 font-medium mt-1'>
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
                    className='h-10 w-10 p-0'
                  >
                    <Minus className='h-4 w-4' />
                  </Button>
                  <span className='font-semibold text-xl w-12 text-center'>
                    {quantity}
                  </span>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => setQuantity(quantity + 1)}
                    className='h-10 w-10 p-0'
                  >
                    <Plus className='h-4 w-4' />
                  </Button>
                </div>
              </div>

              {/* Special Notes */}
              <div className='space-y-2'>
                <Label
                  htmlFor='notes'
                  className='text-sm font-medium text-gray-700 dark:text-gray-300'
                >
                  {t('cart.notes')}{' '}
                  <span className='text-gray-500'>({t('cart.optional')})</span>
                </Label>
                <Textarea
                  id='notes'
                  placeholder={t('cart.notesPlaceholder')}
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  className='resize-none'
                  rows={3}
                  maxLength={200}
                />
                <div className='text-xs text-gray-500 dark:text-gray-400 text-right'>
                  {notes.length}/200 {t('cart.characters')}
                </div>
              </div>

              <Button
                onClick={handleAddToCart}
                className='w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-4 text-lg'
                size='lg'
              >
                <ShoppingCart className='h-5 w-5 mr-2' />
                Add {quantity} to Cart - ${(item.price * quantity).toFixed(2)}
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Related Items */}
        {relatedItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-6'>
              You Might Also Like
            </h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
              {relatedItems.map(relatedItem => (
                <Card
                  key={relatedItem.id}
                  className='cursor-pointer hover:shadow-lg transition-shadow overflow-hidden'
                  onClick={() => navigate(`/product/${relatedItem.id}`)}
                >
                  <img
                    src={relatedItem.image}
                    alt={relatedItem.nameKey}
                    className='w-full h-40 object-cover'
                  />
                  <div className='p-4'>
                    <h3 className='font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1'>
                      {relatedItem.nameKey}
                    </h3>
                    <p className='text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2'>
                      {relatedItem.descriptionKey}
                    </p>
                    <div className='flex items-center justify-between'>
                      <span className='font-bold text-orange-600 text-lg'>
                        ${relatedItem.price.toFixed(2)}
                      </span>
                      <Button
                        size='sm'
                        onClick={e => {
                          e.stopPropagation();
                          addToCart(relatedItem, 1);
                        }}
                        className='bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-full p-0 h-8 w-8'
                      >
                        <Plus className='h-4 w-4' />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
