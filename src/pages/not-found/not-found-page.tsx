import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  Home,
  Search,
  ShoppingBag,
  FileText,
  Phone,
  ArrowLeft,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function NotFoundPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const suggestions = [
    {
      icon: Home,
      title: t('notFound.browseMenu'),
      description: t('notFound.descriptions.exploreMenu'),
      path: '/menu',
      color: 'from-amber-500 to-orange-500',
    },
    {
      icon: ShoppingBag,
      title: t('products.title'),
      description: t('notFound.descriptions.browseProducts'),
      path: '/products',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: FileText,
      title: t('notFound.viewOrders'),
      description: t('notFound.descriptions.checkOrders'),
      path: '/orders',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Phone,
      title: t('notFound.contactUs'),
      description: t('notFound.descriptions.getTouchTeam'),
      path: '/contact',
      color: 'from-purple-500 to-pink-500',
    },
  ];

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-amber-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-amber-950/20'>
      {/* Background Pattern */}
      <div className='absolute inset-0 opacity-20 dark:opacity-10'>
        <div
          className='absolute inset-0 bg-amber-100 dark:bg-amber-900/20'
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, #f59e0b 1px, transparent 0)',
            backgroundSize: '20px 20px',
          }}
        />
      </div>

      {/* Header with Back Button */}
      <div className='relative bg-white/80 dark:bg-gray-800/80 shadow-sm pt-16 backdrop-blur-sm'>
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

      <div className='relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='text-center mb-12'
        >
          {/* 404 Number */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className='mb-8'
          >
            <h1 className='text-9xl md:text-[12rem] font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent leading-none'>
              404
            </h1>
          </motion.div>

          {/* Title and Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className='mb-8'
          >
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4'>
              {t('notFound.title')}
            </h2>
            <p className='text-lg text-gray-600 dark:text-gray-400 mb-2'>
              {t('notFound.subtitle')}
            </p>
            <p className='text-gray-500 dark:text-gray-500 max-w-2xl mx-auto'>
              {t('notFound.description')}
            </p>
          </motion.div>

          {/* Primary Action Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className='mb-12'
          >
            <Button
              onClick={() => navigate('/')}
              size='lg'
              className='bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-3 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300'
            >
              <Home className='h-5 w-5 mr-2' />
              {t('notFound.backToHome')}
            </Button>
          </motion.div>
        </motion.div>

        {/* Suggestions Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className='text-xl font-semibold text-gray-900 dark:text-white text-center mb-8'>
            {t('notFound.suggestions')}
          </h3>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {suggestions.map((suggestion, index) => (
              <motion.div
                key={suggestion.path}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <Card
                  className='p-6 h-full cursor-pointer group hover:shadow-lg transition-all duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:border-amber-200 dark:hover:border-amber-800'
                  onClick={() => navigate(suggestion.path)}
                >
                  <div className='text-center'>
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${suggestion.color} mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <suggestion.icon className='h-6 w-6 text-white' />
                    </div>
                    <h4 className='font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors'>
                      {suggestion.title}
                    </h4>
                    <p className='text-sm text-gray-600 dark:text-gray-400'>
                      {suggestion.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Search Suggestion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className='text-center mt-12'
        >
          <div className='flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400'>
            <Search className='h-4 w-4' />
            <span className='text-sm'>{t('notFound.searchSuggestion')}</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
