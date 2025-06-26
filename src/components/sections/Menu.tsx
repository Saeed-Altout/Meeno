import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Badge } from '../ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { menuData, type MenuCategory } from '../../data';

export const Menu: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<string>('starters');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.2 },
    },
  };

  const activeItems =
    menuData.find(cat => cat.id === activeCategory)?.items || [];

  return (
    <section id='menu' className='py-20 bg-gray-50 dark:bg-gray-900'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='text-center mb-12'
        >
          <h2 className='text-4xl font-bold text-gray-900 dark:text-white mb-4'>
            {t('menu.title')}
          </h2>
          <p className='text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto'>
            {t('menu.subtitle')}
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className='flex justify-center mb-12'
        >
          <div className='flex flex-wrap gap-2 p-1 bg-white dark:bg-gray-800 rounded-xl shadow-lg'>
            {menuData.map((category: MenuCategory) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`relative px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'text-white bg-amber-600 shadow-md'
                    : 'text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {t(category.nameKey)}
                {activeCategory === category.id && (
                  <motion.div
                    layoutId='activeTab'
                    className='absolute inset-0 bg-amber-600 rounded-lg -z-10'
                    initial={false}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Menu Items Grid */}
        <AnimatePresence mode='wait'>
          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial='hidden'
            animate='visible'
            exit='hidden'
            className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
          >
            {activeItems.map((item, index) => (
              <motion.div
                key={item.id}
                variants={cardVariants}
                custom={index}
                whileHover={{
                  y: -5,
                  transition: { duration: 0.2 },
                }}
                className='group'
              >
                <Card className='h-full overflow-hidden hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'>
                  <div className='relative h-48 overflow-hidden'>
                    <motion.img
                      src={item.image}
                      alt={t(item.nameKey)}
                      className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-110'
                      loading='lazy'
                    />
                    {item.featured && (
                      <div className='absolute top-3 left-3'>
                        <Badge className='bg-amber-600 text-white border-0'>
                          ⭐ Special
                        </Badge>
                      </div>
                    )}
                    <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                  </div>

                  <CardHeader className='pb-2'>
                    <div className='flex justify-between items-start'>
                      <CardTitle className='text-lg font-semibold text-gray-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors'>
                        {t(item.nameKey)}
                      </CardTitle>
                      <Badge
                        variant='secondary'
                        className='text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800 font-bold'
                      >
                        {t('menu.currency')}
                        {item.price}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <CardDescription className='text-gray-600 dark:text-gray-400 leading-relaxed'>
                      {t(item.descriptionKey)}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Category Item Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className='text-center mt-8'
        >
          <p className='text-sm text-gray-500 dark:text-gray-400'>
            {activeItems.length} {activeItems.length === 1 ? 'item' : 'items'}{' '}
            in {t(`menu.categories.${activeCategory}`)}
          </p>
        </motion.div>
      </div>
    </section>
  );
};
