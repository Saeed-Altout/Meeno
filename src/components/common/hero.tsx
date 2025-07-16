import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { QrCode, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { UI_CONSTANTS } from '@/constants/ui';

const ANIMATION_DELAYS = {
  BADGE: 0.2,
  TITLE: 0.4,
  SUBTITLE: 0.6,
  DESCRIPTION: 0.8,
  CTA_BUTTONS: 1,
  STATS: 1.2,
  STAT_BASE: 1.4,
  STAT_NUMBER_BASE: 1.6,
  STAT_LABEL_BASE: 1.8,
} as const;

const ANIMATION_DURATIONS = {
  STANDARD: 0.8,
  FAST: 0.6,
  NORMAL: 0.3,
  SLOW: 2,
  VERY_SLOW: 3,
} as const;

const Hero = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleDemoClick = (): void => {
    navigate('/demo');
  };

  return (
    <section
      id='home'
      className='relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-amber-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-amber-950/20 pt-20 pb-32'
    >
      {/* Modern Background Pattern */}
      <div className='absolute inset-0 z-0'>
        <div className='absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23f59e0b" fill-opacity="0.03"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")] dark:opacity-20' />

        {/* Gradient Orbs */}
        <div className='absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-amber-400/20 to-orange-400/20 rounded-full blur-3xl animate-pulse' />
        <div className='absolute bottom-32 right-20 w-96 h-96 bg-gradient-to-r from-orange-400/15 to-red-400/15 rounded-full blur-3xl animate-pulse delay-1000' />
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-amber-300/10 to-yellow-300/10 rounded-full blur-2xl animate-pulse delay-500' />
      </div>

      {/* Content Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, staggerChildren: 0.15 }}
        className='relative z-20 text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: ANIMATION_DELAYS.BADGE,
            duration: ANIMATION_DURATIONS.FAST,
          }}
          className='inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full border border-amber-200/50 dark:border-amber-800/50 shadow-lg mb-8'
        >
          <Sparkles className='w-4 h-4 text-amber-600 dark:text-amber-400' />
          <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>
            {t('nav.welcome')}
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: ANIMATION_DELAYS.TITLE,
            duration: ANIMATION_DURATIONS.STANDARD,
          }}
          className='text-5xl sm:text-6xl lg:text-8xl font-bold mb-6 leading-tight'
        >
          <span className='bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent'>
            {t('hero.title')}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: ANIMATION_DELAYS.SUBTITLE,
            duration: ANIMATION_DURATIONS.STANDARD,
          }}
          className='text-xl sm:text-2xl lg:text-3xl mb-6 font-light text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed'
        >
          {t('hero.subtitle')}
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: ANIMATION_DELAYS.DESCRIPTION,
            duration: ANIMATION_DURATIONS.STANDARD,
          }}
          className='text-lg sm:text-xl mb-12 text-gray-500 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed'
        >
          {t('hero.description')}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: ANIMATION_DELAYS.CTA_BUTTONS,
            duration: ANIMATION_DURATIONS.STANDARD,
          }}
          className='flex flex-col sm:flex-row gap-4 justify-center items-center mb-16'
        >
          <Button
            size='lg'
            onClick={handleDemoClick}
            className='group bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white text-lg px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0'
            style={{ minHeight: UI_CONSTANTS.BUTTON_MIN_HEIGHT }}
          >
            <span className='flex items-center gap-2'>
              <QrCode className='w-5 h-5 group-hover:rotate-12 transition-transform' />
              {t('hero.demo')}
            </span>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

Hero.displayName = 'Hero';

export { Hero };
