import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, QrCode } from 'lucide-react';
import { Button } from '../ui/button';
import { restaurantInfo } from '../../data';

interface HeroProps {
  onScrollToMenu: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToMenu }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section
      id='home'
      className='relative min-h-screen flex items-center justify-center overflow-hidden'
    >
      {/* Background Image with Overlay */}
      <div className='absolute inset-0'>
        <div
          className='absolute inset-0 bg-cover bg-center bg-no-repeat'
          style={{
            backgroundImage: `url(${restaurantInfo.images.hero})`,
          }}
        />
        <div className='absolute inset-0 bg-black/60' />
      </div>

      {/* Animated Background Elements */}
      <div className='absolute inset-0 overflow-hidden'>
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: 'linear',
          }}
          className='absolute -top-10 -right-10 w-32 h-32 border border-amber-400/20 rounded-full'
        />
        <motion.div
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 80,
            repeat: Infinity,
            ease: 'linear',
          }}
          className='absolute -bottom-16 -left-16 w-48 h-48 border border-amber-400/10 rounded-full'
        />
      </div>

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial='hidden'
        animate='visible'
        className='relative z-10 text-center text-white max-w-4xl mx-auto px-4'
      >
        <motion.h1
          variants={itemVariants}
          className='text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight'
        >
          {t('hero.title')}
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className='text-xl md:text-2xl mb-4 font-light text-gray-200'
        >
          {t('hero.subtitle')}
        </motion.p>

        <motion.p
          variants={itemVariants}
          className='text-lg mb-8 text-gray-300 max-w-2xl mx-auto leading-relaxed'
        >
          {t('hero.description')}
        </motion.p>

        <motion.div
          variants={itemVariants}
          className='flex flex-col sm:flex-row gap-4 justify-center items-center'
        >
          <Button
            size='lg'
            onClick={onScrollToMenu}
            className='bg-amber-600 hover:bg-amber-700 text-white text-lg px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105'
          >
            {t('hero.cta')}
          </Button>
          <Button
            size='lg'
            variant='outline'
            onClick={() => navigate('/demo')}
            className='border-2 border-white text-white hover:bg-white hover:text-gray-900 text-lg px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105'
          >
            <QrCode className='w-5 h-5 mr-2' />
            {t('hero.demo')}
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className='absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white'
      >
        <motion.button
          onClick={onScrollToMenu}
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className='flex flex-col items-center space-y-2 hover:text-amber-400 transition-colors'
          aria-label='Scroll to menu'
        >
          <span className='text-sm font-medium opacity-80'>
            {t('common.viewMenu')}
          </span>
          <ChevronDown className='h-6 w-6' />
        </motion.button>
      </motion.div>

      {/* Floating Decorative Elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className='absolute top-1/4 left-10 w-4 h-4 bg-amber-400/30 rounded-full blur-sm'
      />

      <motion.div
        animate={{
          y: [0, -15, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
        className='absolute top-1/3 right-16 w-6 h-6 bg-amber-400/20 rounded-full blur-sm'
      />

      <motion.div
        animate={{
          y: [0, -25, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
        className='absolute bottom-1/4 left-1/4 w-3 h-3 bg-amber-400/40 rounded-full blur-sm'
      />
    </section>
  );
};
