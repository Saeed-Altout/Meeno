import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  Instagram,
  Facebook,
} from 'lucide-react';
import { restaurantInfo } from '../../data';

export const Contact: React.FC = () => {
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

  const contactItems = [
    {
      icon: MapPin,
      title: t('contact.address'),
      content: [
        t('contact.location.street'),
        t('contact.location.city'),
        t('contact.location.country'),
      ],
      action: () =>
        window.open(
          'https://maps.google.com/?q=123+Italian+Way,+New+York',
          '_blank'
        ),
    },
    {
      icon: Phone,
      title: t('contact.phone'),
      content: [restaurantInfo.phone],
      action: () => window.open(`tel:${restaurantInfo.phone}`),
    },
    {
      icon: MessageSquare,
      title: t('contact.whatsapp'),
      content: [restaurantInfo.whatsapp],
      action: () =>
        window.open(
          `https://wa.me/${restaurantInfo.whatsapp.replace(/\D/g, '')}`
        ),
    },
    {
      icon: Mail,
      title: t('contact.email'),
      content: [restaurantInfo.email],
      action: () => window.open(`mailto:${restaurantInfo.email}`),
    },
  ];

  const socialLinks = [
    {
      icon: Instagram,
      url: restaurantInfo.social.instagram,
      label: 'Instagram',
      color: 'hover:text-pink-500',
    },
    {
      icon: Facebook,
      url: restaurantInfo.social.facebook,
      label: 'Facebook',
      color: 'hover:text-blue-600',
    },
  ];

  return (
    <section id='contact' className='py-20 bg-gray-50 dark:bg-gray-900'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='text-center mb-12'
        >
          <h2 className='text-4xl font-bold text-gray-900 dark:text-white mb-4'>
            {t('contact.title')}
          </h2>
          <p className='text-lg text-gray-600 dark:text-gray-400'>
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
          {/* Contact Information */}
          <motion.div
            variants={containerVariants}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true }}
            className='space-y-8'
          >
            {contactItems.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className='flex items-start space-x-4 rtl:space-x-reverse p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group'
                onClick={item.action}
              >
                <div className='flex-shrink-0'>
                  <div className='w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-all duration-300'>
                    <item.icon className='h-6 w-6 text-amber-600 group-hover:text-white' />
                  </div>
                </div>
                <div className='flex-1'>
                  <h3 className='font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors'>
                    {item.title}
                  </h3>
                  {item.content.map((line, lineIndex) => (
                    <p
                      key={lineIndex}
                      className='text-gray-600 dark:text-gray-400'
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Social Media */}
            <motion.div
              variants={itemVariants}
              className='p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg'
            >
              <h3 className='font-semibold text-gray-900 dark:text-white mb-4'>
                {t('contact.followUs')}
              </h3>
              <div className='flex space-x-4 rtl:space-x-reverse'>
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-400 ${social.color} transition-all duration-300 hover:shadow-md`}
                    aria-label={social.label}
                  >
                    <social.icon className='h-6 w-6' />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className='relative'
          >
            <div className='relative h-96 lg:h-full min-h-[400px] rounded-xl overflow-hidden shadow-2xl'>
              <iframe
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.123456789!2d-73.9987384!3d40.7507493!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ1JzAyLjciTiA3M8KwNTknNTUuNSJX!5e0!3m2!1sen!2sus!4v1234567890123'
                width='100%'
                height='100%'
                style={{ border: 0 }}
                allowFullScreen
                loading='lazy'
                referrerPolicy='no-referrer-when-downgrade'
                title='La Tavola Restaurant Location'
                className='grayscale hover:grayscale-0 transition-all duration-500'
              />

              {/* Map Overlay */}
              <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none' />

              {/* Floating Info Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className='absolute bottom-4 left-4 right-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg'
              >
                <div className='flex items-center space-x-3 rtl:space-x-reverse'>
                  <div className='w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center'>
                    <MapPin className='h-5 w-5 text-white' />
                  </div>
                  <div>
                    <p className='font-semibold text-gray-900 dark:text-white text-sm'>
                      La Tavola Restaurant
                    </p>
                    <p className='text-gray-600 dark:text-gray-400 text-xs'>
                      {t('contact.location.street')}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
