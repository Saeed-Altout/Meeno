import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { RotateCcw, Star, Plus, Clock } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { useCartStore } from '../../stores/cart-store';
import { useFavoritesStore } from '../../stores/favorites-store';
import type { MenuItem } from '../../data';

export const OrderAgain: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { addToCart } = useCartStore();
  const { favorites } = useFavoritesStore();

  // Mock recent orders - in a real app this would come from a recent orders store/API
  const recentOrders: MenuItem[] = [
    {
      id: 'spaghetti',
      nameKey: 'menuItems.spaghetti.name',
      descriptionKey: 'menuItems.spaghetti.description',
      price: 7.29,
      image:
        'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop&auto=format',
      category: 'mains',
    },
    {
      id: 'mushroom-pizza',
      nameKey: 'menuItems.mushroomPizza.name',
      descriptionKey: 'menuItems.mushroomPizza.description',
      price: 7.49,
      image:
        'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop&auto=format',
      category: 'mains',
      featured: true,
    },
    {
      id: 'caesar-salad',
      nameKey: 'menuItems.caesarSalad.name',
      descriptionKey: 'menuItems.caesarSalad.description',
      price: 8.99,
      image:
        'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop&auto=format',
      category: 'starters',
    },
  ];

  const handleAddToCart = (item: MenuItem) => {
    addToCart(item, 1);
  };

  const handleCardClick = (item: MenuItem) => {
    navigate(`/product/${item.id}`);
  };

  const renderItemCard = (item: MenuItem, source: 'recent' | 'favorite') => (
    <Card
      key={`${source}-${item.id}`}
      className='group p-4 h-full flex flex-col bg-white dark:bg-gray-800 hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700 cursor-pointer'
      onClick={() => handleCardClick(item)}
    >
      <div className='relative mb-3'>
        <img
          src={item.image}
          alt={item.nameKey}
          className='w-full h-32 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300'
        />
        <div className='absolute top-2 left-2'>
          {source === 'recent' ? (
            <Badge className='bg-blue-500 text-white text-xs'>
              <Clock className='h-3 w-3 mr-1' />
              {t('common.recent')}
            </Badge>
          ) : (
            <Badge className='bg-red-500 text-white text-xs'>
              <Star className='h-3 w-3 mr-1' />
              {t('common.favorite')}
            </Badge>
          )}
        </div>
      </div>

      <div className='flex-1'>
        <h3 className='font-semibold text-gray-900 dark:text-white mb-2 text-sm'>
          {t(item.nameKey)}
        </h3>
        <p className='text-xs text-gray-600 dark:text-gray-400 mb-3 line-clamp-2'>
          {t(item.descriptionKey)}
        </p>
      </div>

      <div className='flex items-center justify-between mt-auto'>
        <span className='font-bold text-gray-900 dark:text-white'>
          ${item.price.toFixed(2)}
        </span>
        <Button
          size='sm'
          onClick={e => {
            e.stopPropagation();
            handleAddToCart(item);
          }}
          className='bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-full p-0 h-8 w-8 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110'
        >
          <Plus className='h-4 w-4' />
        </Button>
      </div>
    </Card>
  );

  if (recentOrders.length === 0 && favorites.length === 0) {
    return null;
  }

  return (
    <section className='py-12 bg-gray-50 dark:bg-gray-900'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='text-center mb-8'
        >
          <h2 className='text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2'>
            <RotateCcw className='h-6 w-6 inline mr-2 text-orange-500' />
            {t('orderAgain.title', 'Order Again')}
          </h2>
          <p className='text-gray-600 dark:text-gray-400'>
            {t('orderAgain.subtitle')}
          </p>
        </motion.div>

        <div className='space-y-8'>
          {/* Recent Orders */}
          {recentOrders.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                {t('orderAgain.recentOrders')}
              </h3>
              <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3'>
                {recentOrders
                  .slice(0, 6)
                  .map(item => renderItemCard(item, 'recent'))}
              </div>
            </motion.div>
          )}

          {/* Favorites */}
          {favorites.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                {t('orderAgain.yourFavorites')}
              </h3>
              <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3'>
                {favorites
                  .slice(0, 6)
                  .map(item => renderItemCard(item, 'favorite'))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
