import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { QrCode, Search, ShoppingCart, Clock } from 'lucide-react';

export const StepsToOrder: React.FC = () => {
  const { t } = useTranslation();

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

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 200,
        damping: 15,
      },
    },
  };

  const steps = [
    {
      number: 1,
      icon: QrCode,
      titleKey: 'stepsToOrder.step1.title',
      descriptionKey: 'stepsToOrder.step1.description',
      color: 'bg-blue-500',
      shadowColor: 'shadow-blue-500/25',
    },
    {
      number: 2,
      icon: Search,
      titleKey: 'stepsToOrder.step2.title',
      descriptionKey: 'stepsToOrder.step2.description',
      color: 'bg-green-500',
      shadowColor: 'shadow-green-500/25',
    },
    {
      number: 3,
      icon: ShoppingCart,
      titleKey: 'stepsToOrder.step3.title',
      descriptionKey: 'stepsToOrder.step3.description',
      color: 'bg-amber-500',
      shadowColor: 'shadow-amber-500/25',
    },
    {
      number: 4,
      icon: Clock,
      titleKey: 'stepsToOrder.step4.title',
      descriptionKey: 'stepsToOrder.step4.description',
      color: 'bg-purple-500',
      shadowColor: 'shadow-purple-500/25',
    },
  ];

  return (
    <section id='steps' className='py-20 bg-gray-50 dark:bg-gray-900'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-100px' }}
          className='text-center mb-16'
        >
          <motion.h2
            variants={itemVariants}
            className='text-4xl font-bold text-gray-900 dark:text-white mb-4'
          >
            {t('stepsToOrder.title')}
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className='text-lg text-amber-600 dark:text-amber-400 font-medium mb-2'
          >
            {t('stepsToOrder.subtitle')}
          </motion.p>
          <motion.p
            variants={itemVariants}
            className='text-gray-600 dark:text-gray-300 max-w-2xl mx-auto'
          >
            {t('stepsToOrder.description')}
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-50px' }}
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'
        >
          {steps.map((step, index) => {
            const IconComponent = step.icon;

            return (
              <motion.div
                key={step.number}
                variants={itemVariants}
                className='relative'
              >
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                  className='bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 h-full'
                >
                  {/* Step Number */}
                  <motion.div
                    variants={iconVariants}
                    className={`w-16 h-16 ${step.color} ${step.shadowColor} rounded-full flex items-center justify-center text-white font-bold text-xl mb-6 mx-auto shadow-lg`}
                  >
                    {step.number}
                  </motion.div>

                  {/* Icon */}
                  <motion.div
                    variants={iconVariants}
                    transition={{ delay: 0.1 }}
                    className='flex justify-center mb-6'
                  >
                    <div className='w-12 h-12 text-gray-600 dark:text-gray-400'>
                      <IconComponent className='w-full h-full' />
                    </div>
                  </motion.div>

                  {/* Content */}
                  <div className='text-center'>
                    <motion.h3
                      variants={itemVariants}
                      className='text-xl font-semibold text-gray-900 dark:text-white mb-3'
                    >
                      {t(step.titleKey)}
                    </motion.h3>
                    <motion.p
                      variants={itemVariants}
                      className='text-gray-600 dark:text-gray-300 leading-relaxed'
                    >
                      {t(step.descriptionKey)}
                    </motion.p>
                  </div>

                  {/* Decorative Element */}
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.5,
                    }}
                    className={`absolute -top-2 -right-2 w-4 h-4 ${step.color} rounded-full opacity-30 blur-sm`}
                  />
                </motion.div>

                {/* Connecting Arrow (except for last item) */}
                {index < steps.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.2, duration: 0.6 }}
                    className='hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10'
                  >
                    <div className='w-8 h-0.5 bg-gradient-to-r from-amber-400 to-amber-600'></div>
                    <div className='absolute -right-1 -top-1 w-2 h-2 bg-amber-500 rounded-full'></div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 0.6 }}
          className='text-center mt-16'
        >
          <div className='bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 max-w-2xl mx-auto'>
            <motion.div
              animate={{
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className='text-4xl mb-4'
            >
              🍽️
            </motion.div>
            <h3 className='text-2xl font-bold text-gray-900 dark:text-white mb-3'>
              {t('stepsToOrder.cta.title')}
            </h3>
            <p className='text-gray-600 dark:text-gray-300'>
              {t('stepsToOrder.cta.description')}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
