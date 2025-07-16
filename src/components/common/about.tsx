import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ChefHat } from 'lucide-react';
import { restaurantInfo } from '../../data';

export const About: React.FC = () => {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.3,
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

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section id='about' className='py-20 bg-white dark:bg-gray-800'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-100px' }}
          className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'
        >
          {/* Content */}
          <motion.div variants={itemVariants} className='space-y-6'>
            <div>
              <motion.h2
                variants={itemVariants}
                className='text-4xl font-bold text-gray-900 dark:text-white mb-4'
              >
                {t('about.title')}
              </motion.h2>
              <motion.p
                variants={itemVariants}
                className='text-lg text-amber-600 dark:text-amber-400 font-medium'
              >
                {t('about.subtitle')}
              </motion.p>
            </div>

            <motion.p
              variants={itemVariants}
              className='text-lg text-gray-600 dark:text-gray-300 leading-relaxed'
            >
              {t('about.content')}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className='flex items-center space-x-4 rtl:space-x-reverse p-6 bg-gray-50 dark:bg-gray-700 rounded-xl'
            >
              <div className='flex-shrink-0'>
                <div className='w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center'>
                  <ChefHat className='h-8 w-8 text-white' />
                </div>
              </div>
              <div>
                <h3 className='font-semibold text-gray-900 dark:text-white text-lg'>
                  {t('about.chef')}
                </h3>
                <p className='text-gray-600 dark:text-gray-400'>
                  {t('about.chefTitle')}
                </p>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className='grid grid-cols-2 gap-6 pt-6'
            >
              <div className='text-center'>
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                  className='text-4xl font-bold text-amber-600 dark:text-amber-400 mb-2'
                >
                  35+
                </motion.div>
                <p className='text-gray-600 dark:text-gray-400 font-medium'>
                  {t('about.experience')}
                </p>
              </div>
              <div className='text-center'>
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7, type: 'spring', stiffness: 200 }}
                  className='text-4xl font-bold text-amber-600 dark:text-amber-400 mb-2'
                >
                  1000+
                </motion.div>
                <p className='text-gray-600 dark:text-gray-400 font-medium'>
                  Happy Customers
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div variants={imageVariants} className='relative'>
            <div className='relative overflow-hidden rounded-2xl shadow-2xl'>
              <motion.img
                src={restaurantInfo.images.about}
                alt='Chef Giuseppe in the kitchen'
                className='w-full h-96 object-cover'
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/30 to-transparent' />
            </div>

            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className='absolute -bottom-6 -left-6 bg-amber-600 text-white p-6 rounded-xl shadow-xl'
            >
              <div className='text-center'>
                <p className='font-bold text-2xl'>1985</p>
                <p className='text-sm opacity-90'>Established</p>
              </div>
            </motion.div>

            {/* Decorative Elements */}
            <motion.div
              animate={{
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className='absolute -top-4 -right-4 w-8 h-8 bg-amber-400/30 rounded-full blur-sm'
            />

            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1,
              }}
              className='absolute top-1/4 -left-2 w-6 h-6 bg-amber-500/40 rounded-full blur-sm'
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
