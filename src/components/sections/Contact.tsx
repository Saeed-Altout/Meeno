import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  Instagram,
  Facebook,
  Clock,
  Send,
  Star,
  CheckCircle,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Card } from '../ui/card';
import { restaurantInfo } from '../../data';

export const Contact: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });

    // Reset success message after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
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
      gradient: 'from-blue-500 via-blue-600 to-indigo-600',
      lightBg: 'bg-blue-50/80',
      darkBg: 'dark:bg-blue-950/30',
    },
    {
      icon: Phone,
      title: t('contact.phone'),
      content: [restaurantInfo.phone],
      action: () => window.open(`tel:${restaurantInfo.phone}`),
      gradient: 'from-green-500 via-emerald-500 to-teal-600',
      lightBg: 'bg-green-50/80',
      darkBg: 'dark:bg-green-950/30',
    },
    {
      icon: MessageSquare,
      title: t('contact.whatsapp'),
      content: [restaurantInfo.whatsapp],
      action: () =>
        window.open(
          `https://wa.me/${restaurantInfo.whatsapp.replace(/\D/g, '')}`
        ),
      gradient: 'from-green-500 via-green-600 to-emerald-600',
      lightBg: 'bg-green-50/80',
      darkBg: 'dark:bg-green-950/30',
    },
    {
      icon: Mail,
      title: t('contact.email'),
      content: [restaurantInfo.email],
      action: () => window.open(`mailto:${restaurantInfo.email}`),
      gradient: 'from-purple-500 via-violet-500 to-purple-600',
      lightBg: 'bg-purple-50/80',
      darkBg: 'dark:bg-purple-950/30',
    },
  ];

  const workingHours = [
    { day: t('footer.hours.monday'), time: '5:00 PM - 10:00 PM' },
    { day: t('footer.hours.friday'), time: '5:00 PM - 11:00 PM' },
    { day: t('footer.hours.sunday'), time: '4:00 PM - 9:00 PM' },
  ];

  const socialLinks = [
    {
      icon: Instagram,
      url: restaurantInfo.social.instagram,
      label: t('common.instagram'),
      gradient: 'from-pink-500 via-rose-500 to-pink-600',
    },
    {
      icon: Facebook,
      url: restaurantInfo.social.facebook,
      label: t('common.facebook'),
      gradient: 'from-blue-600 via-blue-700 to-indigo-700',
    },
  ];

  return (
    <section id='contact' className='relative py-24 overflow-hidden'>
      {/* Modern Background */}
      <div className='absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-blue-950/20' />

      {/* Animated Background Elements */}
      <div className='absolute inset-0'>
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className='absolute top-20 right-20 w-64 h-64 bg-gradient-to-r from-amber-400/20 to-orange-400/20 rounded-full blur-3xl'
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
          className='absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-blue-400/15 to-purple-400/15 rounded-full blur-3xl'
        />
      </div>

      <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className='text-center mb-20'
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: 0.2,
              duration: 0.8,
              type: 'spring',
              stiffness: 100,
            }}
            className='inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-3xl mb-8 shadow-2xl'
          >
            <Sparkles className='h-10 w-10 text-white' />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className='text-6xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent mb-6'
          >
            {t('contact.title')}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className='text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed'
          >
            {t('contact.subtitle')}
          </motion.p>
        </motion.div>

        {/* Modern Contact Grid */}
        <div className='grid grid-cols-1 xl:grid-cols-4 gap-8 mb-20'>
          {contactItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6, type: 'spring' }}
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
              whileTap={{ scale: 0.98 }}
              className='group cursor-pointer'
              onClick={item.action}
            >
              <Card
                className={`relative p-8 h-full border-0 shadow-xl hover:shadow-2xl transition-all duration-500 ${item.lightBg} ${item.darkBg} backdrop-blur-sm overflow-hidden`}
              >
                {/* Background Glow */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />

                {/* Floating Icon */}
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className={`w-16 h-16 bg-gradient-to-r ${item.gradient} rounded-2xl flex items-center justify-center shadow-lg mb-6 group-hover:shadow-xl transition-shadow duration-300`}
                >
                  <item.icon className='h-8 w-8 text-white' />
                </motion.div>

                {/* Content */}
                <div className='relative z-10'>
                  <h3 className='font-bold text-xl text-gray-900 dark:text-white mb-4 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-300'>
                    {item.title}
                  </h3>

                  <div className='space-y-1'>
                    {item.content.map((line, lineIndex) => (
                      <p
                        key={lineIndex}
                        className='text-gray-600 dark:text-gray-400 leading-relaxed'
                      >
                        {line}
                      </p>
                    ))}
                  </div>

                  {/* Hover Arrow */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    className='absolute top-4 right-4'
                  >
                    <ArrowUpRight className='h-5 w-5 text-gray-400 group-hover:text-amber-500 transition-colors duration-300' />
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-12'>
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className='lg:col-span-2'
          >
            <Card className='p-10 border-0 shadow-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl'>
              <div className='flex items-center space-x-4 mb-8'>
                <div className='w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg'>
                  <Send className='h-6 w-6 text-white' />
                </div>
                <div>
                  <h3 className='text-3xl font-bold text-gray-900 dark:text-white'>
                    {t('contact.sendMessage', 'Send us a Message')}
                  </h3>
                  <p className='text-gray-600 dark:text-gray-400'>
                    {t('contact.subtitle', "We'd love to hear from you")}
                  </p>
                </div>
              </div>

              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className='flex items-center space-x-3 p-6 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-2xl mb-8'
                >
                  <CheckCircle className='h-6 w-6 text-green-600 flex-shrink-0' />
                  <span className='text-green-700 dark:text-green-300 font-medium'>
                    {t(
                      'contact.messageSent',
                      "Message sent successfully! We'll get back to you soon."
                    )}
                  </span>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className='space-y-8'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                  >
                    <label className='block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3'>
                      {t('contact.yourName', 'Your Name')}
                    </label>
                    <Input
                      name='name'
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={t('forms.enterYourName')}
                      required
                      className='h-14 border-2 border-gray-200 dark:border-gray-700 focus:border-amber-500 dark:focus:border-amber-400 rounded-xl bg-gray-50/50 dark:bg-gray-900/50 transition-all duration-300'
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    <label className='block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3'>
                      {t('contact.emailAddress', 'Email Address')}
                    </label>
                    <Input
                      name='email'
                      type='email'
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder={t('forms.enterYourEmail')}
                      required
                      className='h-14 border-2 border-gray-200 dark:border-gray-700 focus:border-amber-500 dark:focus:border-amber-400 rounded-xl bg-gray-50/50 dark:bg-gray-900/50 transition-all duration-300'
                    />
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <label className='block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3'>
                    {t('contact.message', 'Message')}
                  </label>
                  <Textarea
                    name='message'
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder={t('forms.writeYourMessage')}
                    rows={6}
                    required
                    className='border-2 border-gray-200 dark:border-gray-700 focus:border-amber-500 dark:focus:border-amber-400 rounded-xl bg-gray-50/50 dark:bg-gray-900/50 resize-none transition-all duration-300'
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <Button
                    type='submit'
                    disabled={isSubmitting}
                    className='w-full h-16 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-600 hover:via-orange-600 hover:to-red-600 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 transform hover:scale-[1.02] active:scale-[0.98]'
                  >
                    {isSubmitting ? (
                      <div className='flex items-center justify-center space-x-3'>
                        <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin' />
                        <span>{t('contact.sending', 'Sending...')}</span>
                      </div>
                    ) : (
                      <div className='flex items-center justify-center space-x-3'>
                        <Send className='h-5 w-5' />
                        <span>{t('forms.submitMessage')}</span>
                      </div>
                    )}
                  </Button>
                </motion.div>
              </form>
            </Card>
          </motion.div>

          {/* Sidebar with Hours & Social */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='space-y-8'
          >
            {/* Working Hours */}
            <Card className='p-8 border-0 shadow-2xl bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-amber-950/20 dark:via-orange-950/20 dark:to-yellow-950/20 backdrop-blur-sm rounded-3xl'>
              <div className='flex items-center space-x-4 mb-8'>
                <div className='w-14 h-14 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg'>
                  <Clock className='h-7 w-7 text-white' />
                </div>
                <div>
                  <h3 className='font-bold text-xl text-gray-900 dark:text-white'>
                    {t('footer.workingHours')}
                  </h3>
                  <p className='text-gray-600 dark:text-gray-400 text-sm'>
                    {t('contact.workingHoursSubtitle', "When we're open")}
                  </p>
                </div>
              </div>

              <div className='space-y-4'>
                {workingHours.map((schedule, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index }}
                    className='flex justify-between items-center p-4 bg-white/80 dark:bg-gray-800/80 rounded-2xl backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow duration-300'
                  >
                    <span className='text-gray-700 dark:text-gray-300 font-semibold'>
                      {schedule.day.split(':')[0]}
                    </span>
                    <span className='text-amber-600 dark:text-amber-400 font-bold'>
                      {schedule.time}
                    </span>
                  </motion.div>
                ))}
              </div>
            </Card>

            {/* Social Media */}
            <Card className='p-8 border-0 shadow-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl'>
              <h4 className='font-bold text-xl text-gray-900 dark:text-white mb-6'>
                {t('contact.followUs')}
              </h4>

              <div className='grid grid-cols-2 gap-4'>
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{
                      scale: 1.05,
                      rotate: [0, -5, 5, 0],
                      transition: { duration: 0.3 },
                    }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center justify-center space-x-3 h-16 bg-gradient-to-r ${social.gradient} rounded-2xl text-white shadow-lg hover:shadow-xl transition-all duration-300 group`}
                    aria-label={social.label}
                  >
                    <social.icon className='h-6 w-6 group-hover:scale-110 transition-transform duration-300' />
                    <span className='font-semibold'>{social.label}</span>
                  </motion.a>
                ))}
              </div>

              {/* Rating Display */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className='mt-8 p-6 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-950/20 dark:to-amber-950/20 rounded-2xl border border-yellow-200/50 dark:border-yellow-800/50'
              >
                <div className='flex items-center justify-center space-x-2 mb-2'>
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                    >
                      <Star className='h-5 w-5 text-yellow-400 fill-yellow-400' />
                    </motion.div>
                  ))}
                </div>
                <p className='text-center text-gray-600 dark:text-gray-400 text-sm font-medium'>
                  4.9 out of 5 (1,234 reviews)
                </p>
              </motion.div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
