import { useState } from 'react';
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
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useCartStore } from '@/stores/cart-store';
import { useFavoritesStore } from '@/stores/favorites-store';
import { extendedMenuData, type MenuItem } from '@/data';
import { DEFAULT_MESSAGES } from '@/constants/messages';

interface ProductPageParams extends Record<string, string | undefined> {
  id: string;
}

const DEFAULT_RATING = 4.5;
const DEFAULT_REVIEWS_COUNT = 24;
const PREP_TIME = '15-20 min';
const SERVING_SIZE = '1-2 people';
const RELATED_ITEMS_LIMIT = 8;

// Helper functions for extended menu data
const getItemById = (id: string): MenuItem | undefined => {
  for (const category of Object.values(extendedMenuData)) {
    const item = category.find(item => item.id === id);
    if (item) return item;
  }
  return undefined;
};

const getAllItems = (): MenuItem[] => {
  return Object.values(extendedMenuData).flat();
};

const ProductPage: React.FC = () => {
  const { id } = useParams<ProductPageParams>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [quantity, setQuantity] = useState<number>(1);
  const [notes, setNotes] = useState<string>('');
  const { addToCart, getItemQuantity, addNote } = useCartStore();
  const { addToFavorites, removeFromFavorites, isFavorite } =
    useFavoritesStore();

  // Get the item from real data
  const item: MenuItem | undefined = getItemById(id!);

  const handleGoBack = (): void => {
    navigate(-1);
  };

  const handleGoHome = (): void => {
    navigate('/');
  };

  if (!item) {
    return (
      <div className='min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
            {t('productDetail.notFound') || 'Product Not Found'}
          </h1>
          <Button onClick={handleGoHome}>
            <ArrowLeft className='h-4 w-4 mr-2' />
            {t('common.backToMenu') || 'Back to Menu'}
          </Button>
        </div>
      </div>
    );
  }

  const currentCartQuantity = getItemQuantity(item.id);
  const isInFavorites = isFavorite(item.id);

  const handleAddToCart = (): void => {
    addToCart(item, quantity);
    if (notes.trim()) {
      addNote(item.id, notes.trim());
    }
  };

  const handleToggleFavorite = (): void => {
    if (isInFavorites) {
      removeFromFavorites(item.id);
    } else {
      addToFavorites(item);
    }
  };

  const handleQuantityChange = (delta: number): void => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  const handleNotesChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setNotes(event.target.value);
  };

  const renderStars = (rating: number = DEFAULT_RATING): React.ReactNode => {
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

  // Get more diverse related items from the same category and other categories
  const currentCategoryItems = getAllItems()
    .filter(i => i.id !== item.id && i.category === item.category)
    .slice(0, 4);

  const otherCategoryItems = getAllItems()
    .filter(i => i.id !== item.id && i.category !== item.category)
    .slice(0, 4);

  const relatedItems = [...currentCategoryItems, ...otherCategoryItems].slice(
    0,
    RELATED_ITEMS_LIMIT
  );

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
      {/* Header */}
      <div className='bg-white dark:bg-gray-800 shadow-sm pt-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
          <Button
            variant='ghost'
            onClick={handleGoBack}
            className='flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors'
          >
            <ArrowLeft className='h-4 w-4' />
            {t('common.back') || DEFAULT_MESSAGES.ACCESSIBILITY.CLOSE}
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
                alt={t(item.nameKey)}
                className='w-full h-full object-cover'
              />
            </div>

            {/* Floating Action Buttons */}
            <Button
              variant='outline'
              size='sm'
              onClick={handleToggleFavorite}
              className='absolute top-4 right-4 bg-white/95 hover:bg-white text-gray-900 rounded-full p-3 shadow-lg'
              aria-label={
                isInFavorites
                  ? DEFAULT_MESSAGES.ACCESSIBILITY.UNFAVORITE
                  : DEFAULT_MESSAGES.ACCESSIBILITY.FAVORITE
              }
            >
              <Heart
                className={`h-5 w-5 ${
                  isInFavorites ? 'text-red-500 fill-red-500' : 'text-gray-600'
                }`}
              />
            </Button>

            {item.featured && (
              <Badge className='absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm px-3 py-1'>
                {t('productDetail.featured') || 'Featured'}
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
                {t(item.nameKey)}
              </h1>

              {/* Rating and Info */}
              <div className='flex items-center justify-between mb-6'>
                <div className='flex items-center gap-2'>
                  {renderStars()}
                  <span className='text-gray-600 dark:text-gray-400 ml-2'>
                    ({DEFAULT_RATING}) • {DEFAULT_REVIEWS_COUNT}{' '}
                    {t('productDetail.reviews') || 'reviews'}
                  </span>
                </div>
              </div>

              <div className='flex items-center gap-6 text-gray-600 dark:text-gray-400 mb-6'>
                <div className='flex items-center gap-2'>
                  <Clock className='h-5 w-5' />
                  <span>{PREP_TIME}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Users className='h-5 w-5' />
                  <span>{SERVING_SIZE}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-3'>
                {t('productDetail.description') || 'Description'}
              </h3>
              <p className='text-gray-600 dark:text-gray-400 leading-relaxed text-lg'>
                {t(item.descriptionKey)}
              </p>
            </div>

            {/* Ingredients */}
            <div>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-3'>
                <ChefHat className='h-5 w-5 inline mr-2' />
                {t('productDetail.ingredients.title') || 'Ingredients'}
              </h3>
              <div className='flex flex-wrap gap-2'>
                {[
                  t('productDetail.ingredients.freshTomatoes') ||
                    'Fresh Tomatoes',
                  t('productDetail.ingredients.mozzarella') || 'Mozzarella',
                  t('productDetail.ingredients.basil') || 'Basil',
                  t('productDetail.ingredients.oliveOil') || 'Olive Oil',
                ].map(ingredient => (
                  <Badge
                    key={ingredient}
                    variant='outline'
                    className='text-sm px-3 py-1'
                  >
                    {ingredient}
                  </Badge>
                ))}
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
                    onClick={() => handleQuantityChange(-1)}
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
                    onClick={() => handleQuantityChange(1)}
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
                  onChange={handleNotesChange}
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
            <div className='text-center mb-8'>
              <h2 className='text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-2'>
                You Might Also Like
              </h2>
              <p className='text-gray-600 dark:text-gray-400'>
                Discover more delicious items from our menu
              </p>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
              {relatedItems.map(relatedItem => (
                <Card
                  key={relatedItem.id}
                  className='cursor-pointer hover:shadow-lg transition-shadow overflow-hidden'
                  onClick={() => navigate(`/menu/${relatedItem.id}`)}
                >
                  <div className='relative'>
                    <img
                      src={relatedItem.image}
                      alt={relatedItem.nameKey}
                      className='w-full h-48 object-cover'
                    />
                    {relatedItem.featured && (
                      <Badge className='absolute top-2 left-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs'>
                        Featured
                      </Badge>
                    )}
                  </div>
                  <div className='p-4'>
                    <h3 className='font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1'>
                      {t(relatedItem.nameKey, `Item ${relatedItem.id}`)}
                    </h3>
                    <p className='text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2'>
                      {t(relatedItem.descriptionKey, 'Delicious menu item')}
                    </p>

                    {/* Rating */}
                    <div className='flex items-center gap-1 mb-3'>
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < Math.floor(relatedItem.rating || 4.5)
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className='text-xs text-gray-500 ml-1'>
                        ({(relatedItem.rating || 4.5).toFixed(1)})
                      </span>
                    </div>

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
};

ProductPage.displayName = 'ProductPage';

export default ProductPage;
