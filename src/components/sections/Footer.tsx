import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ChefHat, Instagram, Facebook } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { restaurantInfo } from '../../data';
import { ThemeToggle } from '../common/theme-toggle';

interface FooterProps {
  onNavClick: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick }) => {
  const { t } = useTranslation();

  const quickLinks = [
    { key: 'home', label: t('nav.home') },
    { key: 'steps', label: t('nav.steps') },
    { key: 'menu', label: t('nav.menu') },
    { key: 'about', label: t('nav.about') },
    { key: 'contact', label: t('nav.contact') },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for newsletter signup
    alert(t('footer.subscribe') + ' - Feature coming soon!');
  };

  return (
    <footer className='bg-gray-900 text-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'
        >
          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className='text-lg font-semibold mb-6 text-amber-400'>
              {t('footer.quickLinks')}
            </h3>
            <div className='space-y-3'>
              {quickLinks.map(link => (
                <button
                  key={link.key}
                  onClick={() => onNavClick(link.key)}
                  className='block text-gray-300 hover:text-white hover:text-amber-400 transition-colors duration-200 text-left'
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h3 className='text-lg font-semibold mb-6 text-amber-400'>
              {t('footer.contactInfo')}
            </h3>
            <div className='space-y-3 text-gray-300'>
              <p>{t('contact.location.street')}</p>
              <p>{t('contact.location.city')}</p>
              <p>{restaurantInfo.phone}</p>
              <p>{restaurantInfo.email}</p>
            </div>
          </motion.div>

          {/* Working Hours */}
          <motion.div variants={itemVariants}>
            <h3 className='text-lg font-semibold mb-6 text-amber-400'>
              {t('footer.workingHours')}
            </h3>
            <div className='space-y-2 text-gray-300 text-sm'>
              <p>{t('footer.hours.monday')}</p>
              <p>{t('footer.hours.friday')}</p>
              <p>{t('footer.hours.sunday')}</p>
            </div>
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={itemVariants}>
            <h3 className='text-lg font-semibold mb-6 text-amber-400'>
              {t('footer.newsletter')}
            </h3>
            <p className='text-gray-300 text-sm mb-4'>
              {t('footer.newsletterText')}
            </p>
            <form onSubmit={handleNewsletterSubmit} className='space-y-3'>
              <Input
                type='email'
                placeholder={t('footer.emailPlaceholder')}
                className='bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-amber-500 focus:ring-amber-500'
                required
              />
              <Button
                type='submit'
                className='w-full bg-amber-600 hover:bg-amber-700 text-white transition-colors duration-200'
              >
                {t('footer.subscribe')}
              </Button>
            </form>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className='border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center'
        >
          {/* Logo and Brand */}
          <motion.div
            className='flex items-center space-x-2 rtl:space-x-reverse mb-4 md:mb-0'
            whileHover={{ scale: 1.05 }}
          >
            <ChefHat className='h-6 w-6 text-amber-600' />
            <span className='text-lg font-bold'>La Tavola</span>
          </motion.div>

          {/* Copyright */}
          <p className='text-gray-400 text-sm text-center md:text-left'>
            © {new Date().getFullYear()} {t('footer.copyright')}
          </p>

          {/* Social Media and Theme Toggle */}
          <div className='flex items-center space-x-4 rtl:space-x-reverse mt-4 md:mt-0'>
            <motion.a
              href={restaurantInfo.social.instagram}
              target='_blank'
              rel='noopener noreferrer'
              whileHover={{ scale: 1.2, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className='text-gray-400 hover:text-pink-500 transition-colors duration-200'
              aria-label='Instagram'
            >
              <Instagram className='h-5 w-5' />
            </motion.a>
            <motion.a
              href={restaurantInfo.social.facebook}
              target='_blank'
              rel='noopener noreferrer'
              whileHover={{ scale: 1.2, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className='text-gray-400 hover:text-blue-600 transition-colors duration-200'
              aria-label='Facebook'
            >
              <Facebook className='h-5 w-5' />
            </motion.a>

            {/* Theme Toggle */}
            <div className='border-l border-gray-600 pl-4'>
              <ThemeToggle />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Wave */}
      <div className='relative'>
        <svg
          className='absolute bottom-0 w-full h-6 text-gray-800'
          preserveAspectRatio='none'
          viewBox='0 0 1200 120'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z'
            opacity='.25'
            fill='currentColor'
          />
          <path
            d='M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z'
            opacity='.5'
            fill='currentColor'
          />
          <path
            d='M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z'
            fill='currentColor'
          />
        </svg>
      </div>
    </footer>
  );
};
