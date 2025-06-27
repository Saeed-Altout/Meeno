import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  Heart,
  Star,
  Plus,
  ArrowRight,
  Pizza,
  Apple,
  Cookie,
  Coffee,
  Sandwich,
  Beef,
  IceCream,
  Cake,
  Fish,
  Salad,
  Wine,
  ChefHat,
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';
import { useFavoritesStore } from '../../stores/favorites-store';
import type { MenuItem } from '../../data';

export const Favorites: React.FC = () => {
  const { t } = useTranslation();
  const { addToFavorites, removeFromFavorites, isFavorite } =
    useFavoritesStore();
  const [activeCategory, setActiveCategory] = useState<string>('pizza');

  // Enhanced category configuration with more categories and better icons
  const categories = [
    {
      id: 'pizza',
      name: 'Pizza',
      icon: Pizza,
      color: 'from-orange-500 to-red-500',
    },
    {
      id: 'fruits',
      name: 'Fruits',
      icon: Apple,
      color: 'from-green-400 to-emerald-500',
    },
    {
      id: 'snacks',
      name: 'Snacks',
      icon: Cookie,
      color: 'from-yellow-400 to-orange-400',
    },
    {
      id: 'veggies',
      name: 'Veggies',
      icon: Salad,
      color: 'from-emerald-400 to-green-500',
    },
    {
      id: 'hotdog',
      name: 'Hotdog',
      icon: Beef,
      color: 'from-red-500 to-pink-500',
    },
    {
      id: 'burger',
      name: 'Burger',
      icon: Sandwich,
      color: 'from-purple-500 to-indigo-500',
    },
    {
      id: 'drink',
      name: 'Drinks',
      icon: Coffee,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'desserts',
      name: 'Desserts',
      icon: IceCream,
      color: 'from-pink-500 to-rose-500',
    },
    {
      id: 'seafood',
      name: 'Seafood',
      icon: Fish,
      color: 'from-cyan-500 to-teal-500',
    },
    {
      id: 'bakery',
      name: 'Bakery',
      icon: Cake,
      color: 'from-amber-500 to-yellow-500',
    },
    {
      id: 'wine',
      name: 'Wine',
      icon: Wine,
      color: 'from-purple-600 to-violet-600',
    },
    {
      id: 'specials',
      name: 'Chef Special',
      icon: ChefHat,
      color: 'from-gray-700 to-gray-900',
    },
  ];

  // Sample menu items that match the design
  const menuItems: Record<string, MenuItem[]> = {
    pizza: [
      {
        id: 'spaghetti',
        nameKey: 'Spaghetti',
        descriptionKey: 'Classic Italian pasta with rich tomato sauce',
        price: 7.29,
        image:
          'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop&auto=format',
        category: 'mains',
      },
      {
        id: 'veggie-pizza',
        nameKey: 'Vegetable Pizza',
        descriptionKey: 'Fresh vegetables on crispy pizza base',
        price: 5.49,
        image:
          'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop&auto=format',
        category: 'mains',
      },
      {
        id: 'mushroom-pizza',
        nameKey: 'Mushroom Pizza',
        descriptionKey: 'Delicious mushroom pizza with cheese',
        price: 7.49,
        image:
          'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop&auto=format',
        category: 'mains',
        featured: true,
      },
      {
        id: 'sweet-dessert',
        nameKey: 'Sweets',
        descriptionKey: 'Delicious sweet dessert',
        price: 6.49,
        image:
          'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop&auto=format',
        category: 'desserts',
      },
    ],
    fruits: [
      {
        id: 'fruit-salad',
        nameKey: 'Fresh Fruit Salad',
        descriptionKey: 'Mixed seasonal fruits',
        price: 4.99,
        image:
          'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=400&h=300&fit=crop&auto=format',
        category: 'starters',
      },
      {
        id: 'berry-bowl',
        nameKey: 'Berry Bowl',
        descriptionKey: 'Fresh berries with yogurt',
        price: 5.99,
        image:
          'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=400&h=300&fit=crop&auto=format',
        category: 'starters',
      },
    ],
    snacks: [
      {
        id: 'bruschetta',
        nameKey: 'Bruschetta',
        descriptionKey: 'Toasted bread with tomatoes and basil',
        price: 6.99,
        image:
          'https://images.unsplash.com/photo-1506280754576-f6fa8a873550?w=400&h=300&fit=crop&auto=format',
        category: 'starters',
      },
    ],
    veggies: [
      {
        id: 'caesar-salad',
        nameKey: 'Caesar Salad',
        descriptionKey: 'Fresh romaine with parmesan',
        price: 8.99,
        image:
          'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop&auto=format',
        category: 'starters',
      },
    ],
    hotdog: [
      {
        id: 'italian-sausage',
        nameKey: 'Italian Sausage',
        descriptionKey: 'Grilled Italian sausage with peppers',
        price: 9.99,
        image:
          'https://images.unsplash.com/photo-1551058045-6942c0e0ce2f?w=400&h=300&fit=crop&auto=format',
        category: 'mains',
      },
    ],
    burger: [
      {
        id: 'classic-burger',
        nameKey: 'Classic Burger',
        descriptionKey: 'Beef patty with lettuce and tomato',
        price: 12.99,
        image:
          'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop&auto=format',
        category: 'mains',
      },
    ],
    drink: [
      {
        id: 'italian-coffee',
        nameKey: 'Italian Coffee',
        descriptionKey: 'Authentic Italian espresso',
        price: 3.99,
        image:
          'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop&auto=format',
        category: 'drinks',
      },
    ],
    desserts: [],
    seafood: [],
    bakery: [],
    wine: [],
    specials: [],
  };

  const currentItems = menuItems[activeCategory] || [];

  const handleToggleFavorite = (item: MenuItem) => {
    if (isFavorite(item.id)) {
      removeFromFavorites(item.id);
    } else {
      addToFavorites(item);
    }
  };

  const renderStars = (rating: number = 3) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3.5 w-3.5 ${
          i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  // Image error handling
  const handleImageError = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      const target = e.target as HTMLImageElement;
      target.src = `https://via.placeholder.com/400x300/f97316/ffffff?text=${encodeURIComponent(
        target.alt || 'Food Image'
      )}`;
    },
    []
  );

  return (
    <section
      id='favorites'
      className='py-16 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800'
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='flex items-center justify-between mb-8'>
          <div>
            <motion.h2
              className='text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-2'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {t('favorites.title', 'Menu Categories')}
            </motion.h2>
            <motion.p
              className='text-gray-600 dark:text-gray-400 max-w-md'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Discover our delicious selection across all categories
            </motion.p>
          </div>
          <Button
            variant='ghost'
            className='text-orange-500 hover:text-orange-600 font-medium hover:bg-orange-50 dark:hover:bg-orange-950/20 group'
          >
            {t('favorites.viewAll', 'View All')}
            <ArrowRight className='h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform' />
          </Button>
        </div>

        {/* Category Carousel */}
        <div className='mb-12 px-4'>
          <Carousel
            opts={{
              align: 'start',
              loop: false,
            }}
            className='w-full'
          >
            <CarouselContent className='-ml-2 md:-ml-4 py-2'>
              {categories.map((category, index) => {
                const Icon = category.icon;
                const isActive = activeCategory === category.id;
                const itemCount = menuItems[category.id]?.length || 0;

                return (
                  <CarouselItem
                    key={category.id}
                    className='pl-2 md:pl-4 basis-auto'
                  >
                    <div className='p-2'>
                      <motion.button
                        onClick={() => setActiveCategory(category.id)}
                        className={`relative flex flex-col items-center p-4 md:p-6 rounded-2xl min-w-[100px] md:min-w-[120px] transition-all duration-300 group ${
                          isActive
                            ? `bg-gradient-to-br ${category.color} text-white shadow-xl shadow-orange-500/25`
                            : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:shadow-lg border border-gray-100 dark:border-gray-700'
                        }`}
                        whileHover={{ scale: isActive ? 1.08 : 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <div
                          className={`p-3 md:p-4 rounded-xl mb-3 transition-all duration-300 ${
                            isActive
                              ? 'bg-white/20 backdrop-blur-sm'
                              : 'bg-gradient-to-br from-orange-50 to-orange-100 dark:from-gray-700 dark:to-gray-600 group-hover:from-orange-100 group-hover:to-orange-200'
                          }`}
                        >
                          <Icon
                            className={`h-5 w-5 md:h-6 md:w-6 transition-all duration-300 ${
                              isActive
                                ? 'text-white'
                                : 'text-orange-500 group-hover:text-orange-600'
                            }`}
                          />
                        </div>
                        <span className='text-xs md:text-sm font-semibold mb-1'>
                          {category.name}
                        </span>

                        {/* Item count badge */}
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                            isActive
                              ? 'bg-white/30 text-white'
                              : 'bg-orange-500 text-white group-hover:bg-orange-600'
                          }`}
                        >
                          {itemCount}
                        </div>

                        {/* Active indicator */}
                        {isActive && (
                          <motion.div
                            className='absolute -bottom-1 left-1/2 w-2 h-2 bg-white rounded-full'
                            layoutId='activeIndicator'
                            initial={false}
                            style={{ x: '-50%' }}
                          />
                        )}
                      </motion.button>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className='hidden md:flex -left-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800' />
            <CarouselNext className='hidden md:flex -right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800' />
          </Carousel>
        </div>

        {/* Menu Items Grid */}
        <AnimatePresence mode='wait'>
          <motion.div
            key={activeCategory}
            className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className={`group pt-0 h-full flex flex-col overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer border-0 ${
                    item.featured
                      ? 'ring-2 ring-orange-400 shadow-lg shadow-orange-500/25 bg-gradient-to-br from-orange-50 to-white dark:from-orange-950/30 dark:to-gray-800'
                      : 'bg-white dark:bg-gray-800 hover:shadow-xl shadow-gray-500/10 dark:shadow-black/20'
                  }`}
                >
                  <div className='relative overflow-hidden'>
                    <img
                      src={item.image}
                      alt={item.nameKey}
                      onError={handleImageError}
                      className='w-full h-44 md:h-48 object-cover group-hover:scale-110 transition-transform duration-700'
                    />

                    {/* Gradient overlay */}
                    <div className='absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent group-hover:from-black/30 transition-all duration-300' />

                    <button
                      onClick={() => handleToggleFavorite(item)}
                      className='absolute top-3 right-3 p-2.5 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110'
                    >
                      <Heart
                        className={`h-4 w-4 transition-all duration-300 ${
                          isFavorite(item.id)
                            ? 'text-red-500 fill-red-500 scale-110'
                            : 'text-gray-500 hover:text-red-500 hover:scale-110'
                        }`}
                      />
                    </button>

                    {item.featured && (
                      <Badge className='absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 shadow-lg font-semibold'>
                        {t('favorites.featured', 'Featured')}
                      </Badge>
                    )}
                  </div>

                  <div className='p-4 md:p-5 flex flex-col flex-1'>
                    <div className='flex-1'>
                      <h3 className='font-bold text-lg md:text-xl text-gray-900 dark:text-white mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300'>
                        {item.nameKey}
                      </h3>

                      <p className='text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2 min-h-[2.5rem]'>
                        {item.descriptionKey}
                      </p>

                      {/* Rating */}
                      <div className='flex items-center gap-1 mb-4'>
                        {renderStars()}
                        <span className='text-sm text-gray-500 ml-1'>
                          (4.5)
                        </span>
                      </div>
                    </div>

                    <div className='flex items-center justify-between mt-auto'>
                      <div className='flex items-center gap-2'>
                        <span className='text-lg md:text-xl font-bold text-gray-900 dark:text-white'>
                          ${item.price.toFixed(2)}
                        </span>
                        {item.featured && (
                          <span className='text-sm text-gray-500 line-through'>
                            ${(item.price + 2).toFixed(2)}
                          </span>
                        )}
                      </div>
                      <Button
                        size='sm'
                        className='bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-full p-0 h-10 w-10 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110'
                      >
                        <Plus className='h-4 w-4' />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {currentItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className='text-center py-16'
          >
            <div className='bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-12 max-w-md mx-auto'>
              <div className='text-gray-400 dark:text-gray-500 mb-6'>
                <div className='w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-950 dark:to-orange-900 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <Pizza className='h-8 w-8 text-orange-500' />
                </div>
                <h3 className='text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2'>
                  Coming Soon!
                </h3>
                <p className='text-gray-500 dark:text-gray-400'>
                  {t(
                    'favorites.noItems',
                    "We're working on delicious items for this category"
                  )}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};
