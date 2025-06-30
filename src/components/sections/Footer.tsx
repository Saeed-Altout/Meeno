import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Instagram, Facebook, Mail, MapPin, Phone, Clock } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ModeToggle } from '@/components/common/mode-toggle';

import { restaurantInfo } from '@/data';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

import { Logo } from '@/components/common/logo';

export function Footer() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { key: 'home', label: t('nav.home'), path: '/' },
    { key: 'menu', label: t('nav.menu'), path: '/menu' },
    { key: 'products', label: t('nav.products'), path: '/products' },
    { key: 'about', label: t('nav.about'), path: '/about' },
    { key: 'contact', label: t('nav.contact'), path: '/contact' },
  ];

  const socialLinks = [
    {
      name: 'Instagram',
      icon: Instagram,
      url: restaurantInfo.social.instagram,
      hoverClass: 'hover:text-pink-500',
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: restaurantInfo.social.facebook,
      hoverClass: 'hover:text-blue-600',
    },
  ];

  const handleNavClick = (path: string): void => {
    navigate(path);
  };

  const handleNewsletterSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    alert(t('footer.subscribe') + ' - Feature coming soon!');
  };

  return (
    <footer className='bg-gray-900 text-white relative'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10'
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className='space-y-6'
          >
            <div className='flex items-center space-x-2 rtl:space-x-reverse'>
              <Logo />
            </div>
            <p className='text-gray-400 text-sm'>{t('footer.description')}</p>
            <h3 className='text-lg font-semibold text-amber-600'>
              {t('footer.quickLinks')}
            </h3>
            <div className='space-y-3'>
              {quickLinks.map(link => (
                <button
                  key={link.key}
                  onClick={() => handleNavClick(link.path)}
                  className='block text-gray-300 hover:text-amber-600 transition-colors duration-200 text-left'
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className='space-y-6'
          >
            <h3 className='text-lg font-semibold text-amber-600'>
              {t('footer.contactInfo')}
            </h3>
            <div className='space-y-4 text-gray-300'>
              <div className='flex items-start space-x-3 rtl:space-x-reverse'>
                <MapPin className='h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0' />
                <div>
                  <p>{t('contact.location.street')}</p>
                  <p>{t('contact.location.city')}</p>
                </div>
              </div>
              <div className='flex items-center space-x-3 rtl:space-x-reverse'>
                <Phone className='h-5 w-5 text-amber-600 flex-shrink-0' />
                <p>{restaurantInfo.phone}</p>
              </div>
              <div className='flex items-center space-x-3 rtl:space-x-reverse'>
                <Mail className='h-5 w-5 text-amber-600 flex-shrink-0' />
                <p>{restaurantInfo.email}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className='space-y-6'
          >
            <h3 className='text-lg font-semibold text-amber-600'>
              {t('footer.workingHours')}
            </h3>
            <div className='space-y-4 text-gray-300'>
              <div className='flex items-start space-x-3 rtl:space-x-reverse'>
                <Clock className='h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0' />
                <div className='space-y-2'>
                  <p>{t('footer.hours.monday')}</p>
                  <p>{t('footer.hours.friday')}</p>
                  <p>{t('footer.hours.sunday')}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className='space-y-6'
          >
            <h3 className='text-lg font-semibold text-amber-600'>
              {t('footer.newsletter')}
            </h3>
            <p className='text-gray-300 text-sm'>
              {t('footer.newsletterText')}
            </p>
            <form onSubmit={handleNewsletterSubmit} className='space-y-3'>
              <Input
                type='email'
                placeholder={t('footer.emailPlaceholder')}
                className='bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-amber-600 focus:ring-amber-600'
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
          {/* Copyright */}
          <p className='text-gray-400 text-sm text-center md:text-left order-2 md:order-1 my-4 md:my-0'>
            © {currentYear} {t('footer.copyright')}
          </p>

          {/* Social Media and Theme Toggle */}
          <div className='flex items-center space-x-6 rtl:space-x-reverse order-1 md:order-2'>
            <div className='flex items-center space-x-4 rtl:space-x-reverse'>
              {socialLinks.map(social => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className={cn(
                    'text-gray-400 transition-colors duration-200',
                    social.hoverClass
                  )}
                  aria-label={social.name}
                >
                  <social.icon className='h-5 w-5' />
                </motion.a>
              ))}
            </div>

            <div className='border-l border-gray-600 pl-6'>
              <ModeToggle />
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
}

Footer.displayName = 'Footer';
