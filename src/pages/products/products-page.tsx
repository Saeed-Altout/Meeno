import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Filter,
  Grid,
  List,
  Star,
  Clock,
  TrendingUp,
  Calendar,
  ChevronDown,
  X,
  ArrowLeft,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getAllItems, type MenuItem } from '@/data';
import { useCartStore } from '@/stores/cart-store';
import { AddToCartModal } from '@/components/common/add-to-cart-modal';

type ViewMode = 'grid' | 'list';
type SortOption = 'name' | 'price-low' | 'price-high' | 'popular' | 'newest';

const sortOptions = [
  { value: 'name', labelKey: 'products.sortOptions.name', icon: Calendar },
  {
    value: 'price-low',
    labelKey: 'products.sortOptions.priceLow',
    icon: TrendingUp,
  },
  {
    value: 'price-high',
    labelKey: 'products.sortOptions.priceHigh',
    icon: TrendingUp,
  },
  { value: 'popular', labelKey: 'products.sortOptions.popular', icon: Star },
  { value: 'newest', labelKey: 'products.sortOptions.newest', icon: Clock },
];

export default function ProductsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { addToCart } = useCartStore();

  // Get all menu items
  const allMenuItems = getAllItems();

  // State management
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = [...new Set(allMenuItems.map(item => item.category))];
    return ['all', ...cats];
  }, [allMenuItems]);

  // Add popularity score to items (simulated)
  const itemsWithPopularity = useMemo(() => {
    return allMenuItems.map((item, index) => ({
      ...item,
      popularity: Math.floor(Math.random() * 100) + 1,
      dateAdded: new Date(2024, 0, index + 1),
    }));
  }, [allMenuItems]);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    const filtered = itemsWithPopularity.filter(item => {
      const matchesSearch =
        item.nameKey.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.descriptionKey.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.nameKey.localeCompare(b.nameKey);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'popular':
          return b.popularity - a.popularity;
        case 'newest':
          return b.dateAdded.getTime() - a.dateAdded.getTime();
        default:
          return 0;
      }
    });

    return filtered;
  }, [itemsWithPopularity, searchTerm, selectedCategory, sortBy]);

  const handleAddToCart = (item: MenuItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleQuickAdd = (item: MenuItem) => {
    addToCart(item, 1);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSortBy('name');
  };

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (searchTerm) count++;
    if (selectedCategory !== 'all') count++;
    if (sortBy !== 'name') count++;
    return count;
  }, [searchTerm, selectedCategory, sortBy]);

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-amber-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-amber-950/20'>
      {/* Background Pattern */}
      <div className='absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23f59e0b" fill-opacity="0.03"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")] dark:opacity-20' />

      {/* Header */}
      <div className='relative bg-white/95 dark:bg-gray-900/95 shadow-lg pt-16 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          {/* Back Button and Title Section */}
          <div className='flex items-center gap-4 mb-8'>
            <Button
              variant='ghost'
              onClick={() => navigate(-1)}
              className='flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/20 transition-all duration-200 rounded-xl px-3 py-2'
            >
              <ArrowLeft className='h-5 w-5' />
              <span className='font-medium'>{t('common.back', 'Back')}</span>
            </Button>
          </div>

          {/* Title and View Toggle Row */}
          <div className='flex items-center justify-between mb-8'>
            <div>
              <h1 className='text-4xl font-bold text-gray-900 dark:text-white mb-2 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent'>
                {t('products.title')}
              </h1>
              <div className='flex items-center gap-2'>
                <div className='w-2 h-2 bg-amber-500 rounded-full'></div>
                <p className='text-gray-600 dark:text-gray-400 font-medium'>
                  {filteredAndSortedProducts.length}{' '}
                  {t('products.productsFound')}
                </p>
              </div>
            </div>

            {/* Enhanced View Toggle */}
            <div className='flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-1 shadow-inner'>
              <Button
                variant='ghost'
                size='sm'
                onClick={() => setViewMode('grid')}
                className={`rounded-lg px-4 py-2 transition-all duration-200 ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-gray-700 shadow-md text-amber-600 dark:text-amber-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                <Grid className='h-4 w-4 mr-2' />
                <span className='hidden sm:inline'>Grid</span>
              </Button>
              <Button
                variant='ghost'
                size='sm'
                onClick={() => setViewMode('list')}
                className={`rounded-lg px-4 py-2 transition-all duration-200 ${
                  viewMode === 'list'
                    ? 'bg-white dark:bg-gray-700 shadow-md text-amber-600 dark:text-amber-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                <List className='h-4 w-4 mr-2' />
                <span className='hidden sm:inline'>List</span>
              </Button>
            </div>
          </div>

          {/* Enhanced Search and Filters */}
          <div className='space-y-6'>
            {/* Search Bar */}
            <div className='relative max-w-xl mx-auto lg:mx-0'>
              <Search className='absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
              <Input
                placeholder={t('products.searchPlaceholder')}
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className='pl-12 pr-12 py-3 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 rounded-xl shadow-sm focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 dark:focus:border-amber-400 transition-all duration-200'
              />
              {searchTerm && (
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => setSearchTerm('')}
                  className='absolute right-3 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors'
                >
                  <X className='h-4 w-4' />
                </Button>
              )}
            </div>

            {/* Enhanced Filter Controls */}
            <div className='flex flex-wrap items-center gap-4'>
              {/* Category Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant='outline'
                    className='flex items-center gap-2 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 rounded-xl shadow-sm hover:shadow-md hover:border-amber-300 dark:hover:border-amber-600 transition-all duration-200 px-4 py-2.5'
                  >
                    <Filter className='h-4 w-4 text-amber-600 dark:text-amber-400' />
                    <span className='font-medium'>
                      {t('products.filters.category')}
                    </span>
                    {selectedCategory !== 'all' && (
                      <Badge
                        variant='secondary'
                        className='ml-1 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
                      >
                        {selectedCategory}
                      </Badge>
                    )}
                    <ChevronDown className='h-3 w-3 text-gray-400' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {categories.map(category => (
                    <DropdownMenuItem
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={
                        selectedCategory === category
                          ? 'bg-amber-50 dark:bg-amber-950'
                          : ''
                      }
                    >
                      {category === 'all'
                        ? t('products.filters.allCategories')
                        : category.charAt(0).toUpperCase() + category.slice(1)}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Sort Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant='outline'
                    className='flex items-center gap-2 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 rounded-xl shadow-sm hover:shadow-md hover:border-amber-300 dark:hover:border-amber-600 transition-all duration-200 px-4 py-2.5'
                  >
                    <TrendingUp className='h-4 w-4 text-amber-600 dark:text-amber-400' />
                    <span className='font-medium'>
                      {t('products.filters.sort')}
                    </span>
                    <ChevronDown className='h-3 w-3 text-gray-400' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {sortOptions.map(option => (
                    <DropdownMenuItem
                      key={option.value}
                      onClick={() => setSortBy(option.value as SortOption)}
                      className={
                        sortBy === option.value
                          ? 'bg-amber-50 dark:bg-amber-950'
                          : ''
                      }
                    >
                      <option.icon className='h-4 w-4 mr-2' />
                      {t(option.labelKey)}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Clear Filters */}
              {activeFiltersCount > 0 && (
                <Button
                  variant='ghost'
                  onClick={clearFilters}
                  className='text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl px-4 py-2.5 transition-all duration-200 font-medium'
                >
                  <X className='h-4 w-4 mr-2' />
                  {t('products.clearFilters')} ({activeFiltersCount})
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid/List */}
      <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <AnimatePresence mode='wait'>
          {filteredAndSortedProducts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className='text-center py-12'
            >
              <div className='w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4'>
                <Search className='h-8 w-8 text-gray-400' />
              </div>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
                {t('products.noProductsFound')}
              </h3>
              <p className='text-gray-600 dark:text-gray-400 mb-4'>
                {t('products.adjustFilters')}
              </p>
              <Button onClick={clearFilters} variant='outline'>
                {t('products.clearFilters')}
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key={viewMode}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                  : 'space-y-4'
              }
            >
              {filteredAndSortedProducts.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {viewMode === 'grid' ? (
                    <ProductGridCard
                      item={item}
                      onAddToCart={handleAddToCart}
                      onQuickAdd={handleQuickAdd}
                      onViewDetails={() => navigate(`/product/${item.id}`)}
                      t={t}
                    />
                  ) : (
                    <ProductListCard
                      item={item}
                      onAddToCart={handleAddToCart}
                      onQuickAdd={handleQuickAdd}
                      onViewDetails={() => navigate(`/product/${item.id}`)}
                      t={t}
                    />
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Add to Cart Modal */}
      <AddToCartModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedItem(null);
        }}
      />
    </div>
  );
}

// Grid Card Component
interface ProductCardProps {
  item: MenuItem & { popularity: number; dateAdded: Date };
  onAddToCart: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem) => void;
  onViewDetails: () => void;
  t: (key: string) => string;
}

const ProductGridCard: React.FC<ProductCardProps> = ({
  item,
  onAddToCart,
  onViewDetails,
  t,
}) => {
  return (
    <Card className='group overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white dark:bg-gray-800 border-0 shadow-lg rounded-2xl'>
      <div className='relative overflow-hidden'>
        <img
          src={item.image}
          alt={item.nameKey}
          className='w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500'
        />

        {/* Popularity Badge */}
        <div className='absolute top-3 left-3'>
          <Badge className='bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-lg'>
            <Star className='h-3 w-3 mr-1 fill-current' />
            {item.popularity}
          </Badge>
        </div>

        {/* Category Badge */}
        <div className='absolute top-3 right-3'>
          <Badge
            variant='secondary'
            className='bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300 text-xs font-medium px-2 py-1 rounded-full shadow-lg backdrop-blur-sm'
          >
            {item.category}
          </Badge>
        </div>

        {/* Gradient Overlay */}
        <div className='absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
      </div>

      <div className='p-5'>
        <h3 className='font-bold text-lg text-gray-900 dark:text-white mb-2 line-clamp-1 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-200'>
          {t(item.nameKey)}
        </h3>
        <p className='text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 leading-relaxed'>
          {t(item.descriptionKey)}
        </p>

        {/* Price */}
        <div className='flex items-center justify-between mb-4'>
          <span className='text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent'>
            ${item.price.toFixed(2)}
          </span>
        </div>

        {/* Action Buttons */}
        <div className='flex gap-2'>
          <Button
            onClick={onViewDetails}
            variant='outline'
            size='sm'
            className='flex-1 border-gray-200 dark:border-gray-600 hover:border-amber-300 dark:hover:border-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950/20 transition-all duration-200 rounded-xl'
          >
            {t('products.viewDetails')}
          </Button>
          <Button
            onClick={() => onAddToCart(item)}
            size='sm'
            className='bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-4 shadow-lg hover:shadow-xl transition-all duration-200 rounded-xl'
          >
            {t('products.addToCart')}
          </Button>
        </div>
      </div>
    </Card>
  );
};

// List Card Component
const ProductListCard: React.FC<ProductCardProps> = ({
  item,
  onAddToCart,
  onQuickAdd,
  onViewDetails,
  t,
}) => {
  return (
    <Card className='group overflow-hidden hover:shadow-xl hover:border-amber-200 dark:hover:border-amber-700 transition-all duration-300 bg-white dark:bg-gray-800 border-0 shadow-lg rounded-2xl'>
      <div className='flex items-center p-6 gap-6'>
        <div className='relative flex-shrink-0'>
          <img
            src={item.image}
            alt={item.nameKey}
            className='w-28 h-28 object-cover rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300'
          />

          {/* Popularity Badge */}
          <div className='absolute -top-2 -left-2'>
            <Badge className='bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-lg'>
              <Star className='h-3 w-3 mr-1 fill-current' />
              {item.popularity}
            </Badge>
          </div>
        </div>

        <div className='flex-1 min-w-0'>
          <div className='flex items-start justify-between mb-3'>
            <div className='flex-1 mr-4'>
              <h3 className='font-bold text-xl text-gray-900 dark:text-white mb-1 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-200'>
                {t(item.nameKey)}
              </h3>
              <div className='flex items-center gap-2 mb-2'>
                <Badge
                  variant='outline'
                  className='text-xs bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600'
                >
                  {item.category}
                </Badge>
              </div>
            </div>

            <div className='text-right'>
              <span className='text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent'>
                ${item.price.toFixed(2)}
              </span>
            </div>
          </div>

          <p className='text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 leading-relaxed text-sm'>
            {t(item.descriptionKey)}
          </p>

          {/* Action Buttons */}
          <div className='flex gap-3'>
            <Button
              onClick={onViewDetails}
              variant='outline'
              size='sm'
              className='border-gray-200 dark:border-gray-600 hover:border-amber-300 dark:hover:border-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950/20 transition-all duration-200 rounded-xl'
            >
              {t('products.viewDetails')}
            </Button>
            <Button
              onClick={() => onAddToCart(item)}
              size='sm'
              className='bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 rounded-xl'
            >
              {t('products.addToCart')}
            </Button>
            <Button
              onClick={() => onQuickAdd(item)}
              variant='ghost'
              size='sm'
              className='text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-950/20 transition-all duration-200 rounded-xl'
            >
              {t('products.quickAdd')}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
