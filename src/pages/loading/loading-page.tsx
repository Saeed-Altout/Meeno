import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Loader2, UtensilsCrossed } from 'lucide-react';

export default function LoadingPage() {
  const { t } = useTranslation();

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-amber-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-amber-950/20 flex items-center justify-center relative'>
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

      <div className='relative text-center'>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className='mb-8'
        >
          {/* Logo/Icon */}
          <div className='inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl mb-6 shadow-lg'>
            <UtensilsCrossed className='h-10 w-10 text-white' />
          </div>

          {/* Title */}
          <h1 className='text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-2'>
            {t('loading.title')}
          </h1>

          {/* Subtitle */}
          <p className='text-gray-600 dark:text-gray-400 text-lg mb-6'>
            {t('loading.subtitle')}
          </p>
        </motion.div>

        {/* Animated Loading Spinner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className='flex items-center justify-center gap-3 mb-4'
        >
          <Loader2 className='h-6 w-6 text-amber-500 animate-spin' />
          <span className='text-gray-600 dark:text-gray-400'>
            {t('loading.message')}
          </span>
        </motion.div>

        {/* Animated Dots */}
        <div className='flex justify-center gap-1'>
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              className='w-2 h-2 bg-amber-500 rounded-full'
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
