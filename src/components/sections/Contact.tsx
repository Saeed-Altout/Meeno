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
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50 dark:bg-blue-950/20',
    },
    {
      icon: Phone,
      title: t('contact.phone'),
      content: [restaurantInfo.phone],
      action: () => window.open(`tel:${restaurantInfo.phone}`),
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50 dark:bg-green-950/20',
    },
    {
      icon: MessageSquare,
      title: t('contact.whatsapp'),
      content: [restaurantInfo.whatsapp],
      action: () =>
        window.open(
          `https://wa.me/${restaurantInfo.whatsapp.replace(/\D/g, '')}`
        ),
      color: 'from-green-500 to-teal-500',
      bgColor: 'bg-green-50 dark:bg-green-950/20',
    },
    {
      icon: Mail,
      title: t('contact.email'),
      content: [restaurantInfo.email],
      action: () => window.open(`mailto:${restaurantInfo.email}`),
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50 dark:bg-purple-950/20',
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
      color: 'from-pink-500 to-rose-500',
      bgColor: 'bg-pink-50 dark:bg-pink-950/20',
    },
    {
      icon: Facebook,
      url: restaurantInfo.social.facebook,
      label: t('common.facebook'),
      color: 'from-blue-600 to-blue-700',
      bgColor: 'bg-blue-50 dark:bg-blue-950/20',
    },
  ];

  return (
    <section id='contact' className='relative py-20 overflow-hidden'>
      {/* Background with Gradient and Pattern */}
      <div className='absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-amber-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-amber-950/20' />
      <div className='absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23f59e0b" fill-opacity="0.03"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")] dark:opacity-20' />

      <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='text-center mb-16'
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl mb-6 shadow-lg'
          >
            <MessageSquare className='h-8 w-8 text-white' />
          </motion.div>

          <h2 className='text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4'>
            {t('contact.title')}
          </h2>
          <p className='text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed'>
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16'>
          {/* Contact Information Cards */}
          <motion.div
            variants={containerVariants}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true }}
            className='lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6'
          >
            {contactItems.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className='group cursor-pointer'
                onClick={item.action}
              >
                <Card
                  className={`p-6 h-full border-0 shadow-lg hover:shadow-xl transition-all duration-500 ${item.bgColor} backdrop-blur-sm`}
                >
                  <div className='flex items-start space-x-4'>
                    <div
                      className={`w-14 h-14 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <item.icon className='h-7 w-7 text-white' />
                    </div>
                    <div className='flex-1 min-w-0'>
                      <h3 className='font-bold text-lg text-gray-900 dark:text-white mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors'>
                        {item.title}
                      </h3>
                      {item.content.map((line, lineIndex) => (
                        <p
                          key={lineIndex}
                          className='text-gray-600 dark:text-gray-400 text-sm leading-relaxed break-words'
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Working Hours */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className='p-6 h-full border-0 shadow-lg bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 backdrop-blur-sm'>
              <div className='flex items-center space-x-3 mb-6'>
                <div className='w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center'>
                  <Clock className='h-6 w-6 text-white' />
                </div>
                <h3 className='font-bold text-lg text-gray-900 dark:text-white'>
                  {t('footer.workingHours')}
                </h3>
              </div>

              <div className='space-y-4'>
                {workingHours.map((schedule, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index }}
                    className='flex justify-between items-center p-3 bg-white/70 dark:bg-gray-800/70 rounded-lg backdrop-blur-sm'
                  >
                    <span className='text-gray-700 dark:text-gray-300 font-medium text-sm'>
                      {schedule.day.split(':')[0]}
                    </span>
                    <span className='text-amber-600 dark:text-amber-400 font-semibold text-sm'>
                      {schedule.time}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Social Media */}
              <div className='mt-6 pt-6 border-t border-gray-200 dark:border-gray-700'>
                <h4 className='font-semibold text-gray-900 dark:text-white mb-4'>
                  {t('contact.followUs')}
                </h4>
                <div className='flex space-x-3'>
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.url}
                      target='_blank'
                      rel='noopener noreferrer'
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-12 h-12 bg-gradient-to-r ${social.color} rounded-xl flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300`}
                      aria-label={social.label}
                    >
                      <social.icon className='h-6 w-6' />
                    </motion.a>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className='p-8 border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm'>
              <div className='flex items-center space-x-3 mb-6'>
                <div className='w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center'>
                  <Send className='h-5 w-5 text-white' />
                </div>
                <h3 className='text-2xl font-bold text-gray-900 dark:text-white'>
                  Send us a Message
                </h3>
              </div>

              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className='flex items-center space-x-2 p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg mb-6'
                >
                  <CheckCircle className='h-5 w-5 text-green-600' />
                  <span className='text-green-700 dark:text-green-300 font-medium'>
                    Message sent successfully! We'll get back to you soon.
                  </span>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className='space-y-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                      Your Name
                    </label>
                    <Input
                      name='name'
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={t('forms.enterYourName')}
                      required
                      className='border-gray-200 dark:border-gray-700 focus:border-amber-500 dark:focus:border-amber-400'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                      Email Address
                    </label>
                    <Input
                      name='email'
                      type='email'
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder={t('forms.enterYourEmail')}
                      required
                      className='border-gray-200 dark:border-gray-700 focus:border-amber-500 dark:focus:border-amber-400'
                    />
                  </div>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                    Message
                  </label>
                  <Textarea
                    name='message'
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder='Tell us how we can help you...'
                    rows={4}
                    required
                    className='border-gray-200 dark:border-gray-700 focus:border-amber-500 dark:focus:border-amber-400 resize-none'
                  />
                </div>

                <Button
                  type='submit'
                  disabled={isSubmitting}
                  className='w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50'
                >
                  {isSubmitting ? (
                    <div className='flex items-center justify-center space-x-2'>
                      <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
                      <span>Sending...</span>
                    </div>
                  ) : (
                    <div className='flex items-center justify-center space-x-2'>
                      <Send className='h-4 w-4' />
                      <span>Send Message</span>
                    </div>
                  )}
                </Button>
              </form>
            </Card>
          </motion.div>

          {/* Enhanced Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='relative'
          >
            <Card className='overflow-hidden border-0 shadow-xl bg-white dark:bg-gray-800'>
              <div className='relative h-[500px]'>
                <iframe
                  src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.123456789!2d-73.9987384!3d40.7507493!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ1JzAyLjciTiA3M8KwNTknNTUuNSJX!5e0!3m2!1sen!2sus!4v1234567890123'
                  width='100%'
                  height='100%'
                  style={{ border: 0 }}
                  allowFullScreen
                  loading='lazy'
                  referrerPolicy='no-referrer-when-downgrade'
                  title='La Tavola Restaurant Location'
                  className='grayscale hover:grayscale-0 transition-all duration-700'
                />

                {/* Enhanced Floating Info Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className='absolute bottom-6 left-6 right-6 bg-white/95 dark:bg-gray-800/95 p-6 rounded-2xl shadow-2xl backdrop-blur-sm border border-white/20'
                >
                  <div className='flex items-start space-x-4'>
                    <div className='w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg'>
                      <MapPin className='h-6 w-6 text-white' />
                    </div>
                    <div className='flex-1'>
                      <h4 className='font-bold text-gray-900 dark:text-white mb-1'>
                        La Tavola Restaurant
                      </h4>
                      <p className='text-gray-600 dark:text-gray-400 text-sm mb-2'>
                        {t('contact.location.street')}
                      </p>
                      <div className='flex items-center space-x-1'>
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className='h-4 w-4 text-yellow-400 fill-yellow-400'
                          />
                        ))}
                        <span className='text-gray-600 dark:text-gray-400 text-sm ml-2'>
                          4.9 (1,234 reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
