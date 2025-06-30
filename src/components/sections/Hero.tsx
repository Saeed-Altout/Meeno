import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  QrCode,
  Sparkles,
  Users,
  ChefHat,
  Star,
  type LucideIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

import { UI_CONSTANTS } from '@/constants/ui';

interface HeroStat {
  number: string;
  labelKey: string;
  icon: LucideIcon;
}

const HERO_STATS: HeroStat[] = [
  { number: '500+', labelKey: 'hero.stats.customers', icon: Users },
  { number: '50+', labelKey: 'hero.stats.dishes', icon: ChefHat },
  { number: '5★', labelKey: 'hero.stats.rating', icon: Star },
];

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

        {/* Stats or Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: ANIMATION_DELAYS.STATS,
            duration: ANIMATION_DURATIONS.STANDARD,
          }}
          className='grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto mb-20'
        >
          {HERO_STATS.map((stat, index) => (
            <motion.div
              key={stat.labelKey}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: ANIMATION_DELAYS.STAT_BASE + index * 0.15,
                duration: ANIMATION_DURATIONS.FAST,
                type: 'spring',
                stiffness: 100,
              }}
              whileHover={{
                y: -8,
                scale: 1.05,
                rotate: [0, -1, 1, 0],
                transition: { duration: ANIMATION_DURATIONS.NORMAL },
              }}
              whileTap={{ scale: 0.95 }}
              className='group text-center p-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden relative'
            >
              {/* Background glow effect */}
              <motion.div
                className='absolute inset-0 bg-gradient-to-r from-amber-400/10 to-orange-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                initial={false}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{
                  duration: ANIMATION_DURATIONS.SLOW,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              {/* Icon */}
              <motion.div
                className='mb-2 flex justify-center'
                whileHover={{
                  scale: 1.2,
                  rotate: [0, -10, 10, 0],
                  transition: { duration: 0.5 },
                }}
              >
                <stat.icon className='w-8 h-8 text-amber-600 dark:text-amber-400' />
              </motion.div>

              {/* Number with counting animation */}
              <motion.div
                className='text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-2 relative z-10'
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: ANIMATION_DELAYS.STAT_NUMBER_BASE + index * 0.1,
                    duration: ANIMATION_DURATIONS.STANDARD,
                  }}
                >
                  {stat.number}
                </motion.span>
              </motion.div>

              {/* Label */}
              <motion.div
                className='text-sm text-gray-600 dark:text-gray-400 font-medium relative z-10 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: ANIMATION_DELAYS.STAT_LABEL_BASE + index * 0.1,
                  duration: ANIMATION_DURATIONS.FAST,
                }}
              >
                {t(stat.labelKey)}
              </motion.div>

              {/* Floating particles effect */}
              <motion.div
                className='absolute top-2 right-2 w-2 h-2 bg-amber-400/30 rounded-full'
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: ANIMATION_DURATIONS.SLOW + index * 0.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <motion.div
                className='absolute bottom-3 left-3 w-1.5 h-1.5 bg-orange-400/30 rounded-full'
                animate={{
                  y: [0, -8, 0],
                  opacity: [0.2, 0.6, 0.2],
                }}
                transition={{
                  duration: ANIMATION_DURATIONS.VERY_SLOW + index * 0.3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1,
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

Hero.displayName = 'Hero';

export { Hero };
