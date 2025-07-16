import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  Heart,
  Star,
  Plus,
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
  ShoppingCart,
  Loader2,
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
import { useCartStore } from '../../stores/cart-store';
import { useFavoritesStore } from '../../stores/favorites-store';
import { AddToCartModal } from '../common/add-to-cart-modal';

import type { MenuItem } from '../../data';
import {
  extendedMenuData,
  getItemsPage,
  simulateLoadingDelay,
} from '../../data/extended-menu-data';

export const Menu: React.FC = () => {
  const { t } = useTranslation();
  const { getItemQuantity } = useCartStore();
  const { addToFavorites, removeFromFavorites, isFavorite } =
    useFavoritesStore();
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState<string>('pizza');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Infinite scroll state
  const [displayedItems, setDisplayedItems] = useState<MenuItem[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);

  const observerRef = useRef<IntersectionObserver | null>(null);

  const categories = [
    {
      id: 'pizza',
      nameKey: 'menu.categories.pizza',
      icon: Pizza,
      color: 'from-orange-500 to-red-500',
    },
    {
      id: 'fruits',
      nameKey: 'menu.categories.fruits',
      icon: Apple,
      color: 'from-green-400 to-emerald-500',
    },
    {
      id: 'snacks',
      nameKey: 'menu.categories.snacks',
      icon: Cookie,
      color: 'from-yellow-400 to-orange-400',
    },
    {
      id: 'veggies',
      nameKey: 'menu.categories.veggies',
      icon: Salad,
      color: 'from-emerald-400 to-green-500',
    },
    {
      id: 'hotdog',
      nameKey: 'menu.categories.hotdog',
      icon: Beef,
      color: 'from-red-500 to-pink-500',
    },
    {
      id: 'burger',
      nameKey: 'menu.categories.burger',
      icon: Sandwich,
      color: 'from-purple-500 to-indigo-500',
    },
    {
      id: 'drink',
      nameKey: 'menu.categories.drinks',
      icon: Coffee,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'desserts',
      nameKey: 'menu.categories.desserts',
      icon: IceCream,
      color: 'from-pink-500 to-rose-500',
    },
    {
      id: 'seafood',
      nameKey: 'menu.categories.seafood',
      icon: Fish,
      color: 'from-cyan-500 to-teal-500',
    },
    {
      id: 'bakery',
      nameKey: 'menu.categories.bakery',
      icon: Cake,
      color: 'from-amber-500 to-yellow-500',
    },
    {
      id: 'wine',
      nameKey: 'menu.categories.wine',
      icon: Wine,
      color: 'from-purple-600 to-violet-600',
    },
    {
      id: 'specials',
      nameKey: 'menu.categories.specials',
      icon: ChefHat,
      color: 'from-gray-700 to-gray-900',
    },
  ];

  const loadMoreItems = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    // Simulate loading delay
    await simulateLoadingDelay(1200);

    const { items: newItems, hasMore: moreAvailable } = getItemsPage(
      activeCategory,
      currentPage,
      8
    );

    setDisplayedItems(prev => [...prev, ...newItems]);
    setHasMore(moreAvailable);
    setCurrentPage(prev => prev + 1);
    setIsLoading(false);
  }, [activeCategory, currentPage, isLoading, hasMore]);

  const lastItemRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading || !node) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreItems();
        }
      });
      observerRef.current.observe(node);
    },
    [isLoading, hasMore, loadMoreItems]
  );

  const loadInitialItems = useCallback(async () => {
    setIsLoading(true);

    try {
      // Simulate loading delay for initial load
      if (isInitialLoad) {
        await simulateLoadingDelay(800);
        setIsInitialLoad(false);
      }

      const { items, hasMore: moreAvailable } = getItemsPage(
        activeCategory,
        0,
        8
      );

      setDisplayedItems(items);
      setHasMore(moreAvailable);
      setCurrentPage(1);
      setIsInitialLoad(false);
    } catch (error) {
      console.error('Error loading initial items:', error);
      // Set empty array on error
      setDisplayedItems([]);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  }, [activeCategory, isInitialLoad]);

  // Load initial items when category changes
  useEffect(() => {
    setDisplayedItems([]);
    setCurrentPage(0);
    setHasMore(true);
    setIsInitialLoad(true);
    loadInitialItems();
  }, [activeCategory, loadInitialItems]);

  const handleToggleFavorite = (item: MenuItem) => {
    if (isFavorite(item.id)) {
      removeFromFavorites(item.id);
    } else {
      addToFavorites(item);
    }
  };

  const handleAddToCart = (item: MenuItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCardClick = (item: MenuItem) => {
    navigate(`/menu/${item.id}`);
  };

  const renderStars = (rating: number = 4) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3.5 w-3.5 ${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-yellow-400'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const handleImageError = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      const target = e.target as HTMLImageElement;
      target.src = `https://via.placeholder.com/400x300/f97316/ffffff?text=${encodeURIComponent(
        target.alt || 'Food Image'
      )}`;
    },
    []
  );

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  return (
    <>
      <section
        id='menu'
        className='py-16 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800'
      >
        <div className='max-w-7xl mx-auto px-0 sm:px-4 lg:px-8'>
          {/* Header */}
          <div className='flex items-center justify-between mb-8 px-4 sm:px-0'>
            <div>
              <motion.h2
                className='text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-2'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                {t('menu.title', 'Our Menu')}
              </motion.h2>
              <motion.p
                className='text-gray-600 dark:text-gray-400 max-w-md'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                {t(
                  'menu.subtitle',
                  'Discover our delicious selection of authentic Italian cuisine'
                )}
              </motion.p>
            </div>
          </div>

          {/* Category Carousel */}
          <div className='mb-12 px-4 sm:px-0'>
            <Carousel opts={{ align: 'start', loop: false }} className='w-full'>
              <CarouselContent className='-ml-2 md:-ml-4 py-2'>
                {categories.map((category, index) => {
                  const Icon = category.icon;
                  const isActive = activeCategory === category.id;
                  const itemCount = extendedMenuData[category.id]?.length || 0;

                  return (
                    <CarouselItem
                      key={category.id}
                      className='pl-2 md:pl-4 basis-auto'
                    >
                      <div className='p-2'>
                        <motion.button
                          onClick={() => handleCategoryChange(category.id)}
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
                            {t(category.nameKey)}
                          </span>
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                              isActive
                                ? 'bg-white/30 text-white'
                                : 'bg-orange-500 text-white group-hover:bg-orange-600'
                            }`}
                          >
                            {itemCount}
                          </div>
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
              className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 px-4 sm:px-0'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {displayedItems.map((item, index) => {
                const cartQuantity = getItemQuantity(item.id);
                const isLastItem = index === displayedItems.length - 1;

                return (
                  <motion.div
                    key={item.id}
                    ref={isLastItem ? lastItemRef : null}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card
                      className={`group pt-0 h-full flex flex-col overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer border-0 ${
                        item.featured
                          ? 'ring-2 ring-orange-400 shadow-lg shadow-orange-500/25 bg-gradient-to-br from-orange-50 to-white dark:from-orange-950/30 dark:to-gray-800'
                          : 'bg-white dark:bg-gray-800 hover:shadow-xl shadow-gray-500/10 dark:shadow-black/20'
                      }`}
                      onClick={() => handleCardClick(item)}
                    >
                      <div className='relative overflow-hidden'>
                        <img
                          src={item.image}
                          alt={t(item.nameKey)}
                          onError={handleImageError}
                          className='w-full h-44 md:h-48 object-cover group-hover:scale-110 transition-transform duration-700'
                        />
                        <div className='absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent group-hover:from-black/30 transition-all duration-300' />

                        <button
                          onClick={e => {
                            e.stopPropagation();
                            handleToggleFavorite(item);
                          }}
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
                            {t('menu.featured', 'Featured')}
                          </Badge>
                        )}

                        {cartQuantity > 0 && (
                          <Badge className='absolute bottom-3 left-3 bg-green-500 text-white border-0 shadow-lg font-semibold'>
                            {cartQuantity} {t('cart.inCart', 'in cart')}
                          </Badge>
                        )}
                      </div>

                      <div className='p-4 md:p-5 flex flex-col flex-1'>
                        <div className='flex-1'>
                          <h3 className='font-bold text-lg md:text-xl text-gray-900 dark:text-white mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300'>
                            {t(item.nameKey, `Item ${index + 1}`)}
                          </h3>
                          <p className='text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2 min-h-[2.5rem]'>
                            {t(
                              item.descriptionKey,
                              'Delicious menu item made with fresh ingredients'
                            )}
                          </p>
                          <div className='flex items-center gap-1 mb-4'>
                            {renderStars(item.rating)}
                            <span className='text-sm text-gray-500 ml-1'>
                              ({item.rating?.toFixed(1) || '4.5'})
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
                            onClick={e => {
                              e.stopPropagation();
                              handleAddToCart(item);
                            }}
                            className='bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-full p-0 h-10 w-10 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110'
                          >
                            {cartQuantity > 0 ? (
                              <ShoppingCart className='h-4 w-4' />
                            ) : (
                              <Plus className='h-4 w-4' />
                            )}
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* Loading Spinner */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className='flex items-center justify-center py-12'
            >
              <div className='flex flex-col items-center space-y-4'>
                <div className='relative'>
                  <Loader2 className='h-12 w-12 text-orange-500 animate-spin' />
                  <div className='absolute inset-0 h-12 w-12 rounded-full border-2 border-orange-200 border-t-transparent animate-pulse' />
                </div>
                <div className='text-center'>
                  <p className='text-lg font-medium text-gray-700 dark:text-gray-300'>
                    {t('menu.loading.title', 'Loading delicious items...')}
                  </p>
                  <p className='text-sm text-gray-500 dark:text-gray-400'>
                    {t(
                      'menu.loading.subtitle',
                      'Please wait while we prepare your menu'
                    )}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* No More Items Message */}
          {!hasMore && displayedItems.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className='text-center py-8'
            >
              <div className='bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/30 dark:to-orange-900/30 rounded-2xl p-8 max-w-md mx-auto'>
                <div className='w-16 h-16 bg-gradient-to-br from-orange-200 to-orange-300 dark:from-orange-800 dark:to-orange-700 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <ChefHat className='h-8 w-8 text-orange-600 dark:text-orange-400' />
                </div>
                <h3 className='text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2'>
                  {t(
                    'menu.endOfList.title',
                    "You've seen all our delicious items!"
                  )}
                </h3>
                <p className='text-gray-600 dark:text-gray-400 text-sm'>
                  {t(
                    'menu.endOfList.subtitle',
                    'Try exploring other categories for more amazing dishes'
                  )}
                </p>
              </div>
            </motion.div>
          )}

          {/* Empty State */}
          {displayedItems.length === 0 && !isLoading && (
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
                    {t('menu.comingSoon', 'Coming Soon!')}
                  </h3>
                  <p className='text-gray-500 dark:text-gray-400'>
                    {t(
                      'menu.noItems',
                      "We're working on delicious items for this category"
                    )}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Add to Cart Modal */}
      <AddToCartModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
