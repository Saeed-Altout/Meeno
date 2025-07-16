import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Send, Clock, CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Card } from '../ui/card';

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

  const workingHours = [
    { day: t('footer.hours.monday'), time: '5:00 PM - 10:00 PM' },
    { day: t('footer.hours.friday'), time: '5:00 PM - 11:00 PM' },
    { day: t('footer.hours.sunday'), time: '4:00 PM - 9:00 PM' },
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
            <Card className='p-10 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-3xl'>
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

          {/* Working Hours Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className='p-8 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-3xl'>
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
                    className='flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-2xl border border-gray-200 dark:border-gray-600 transition-colors duration-300'
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
          </motion.div>
        </div>
      </div>
    </section>
  );
};
