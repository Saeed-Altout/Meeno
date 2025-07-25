import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Camera, CheckCircle, Smartphone, QrCode } from 'lucide-react';
import { Dialog, DialogContent } from '../ui/dialog';

interface QRScannerDemoProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QRScannerDemo: React.FC<QRScannerDemoProps> = ({
  isOpen,
  onClose,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [scanningStep, setScanningStep] = useState<
    'scanning' | 'detected' | 'success'
  >('scanning');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setScanningStep('scanning');
      setIsProcessing(false);

      // Simulate QR code detection after 2 seconds
      const detectTimer = setTimeout(() => {
        setScanningStep('detected');
        setIsProcessing(true);

        // Simulate processing time
        const processTimer = setTimeout(() => {
          setScanningStep('success');
          setIsProcessing(false);

          // Navigate to menu after success animation with demo token
          const navigateTimer = setTimeout(() => {
            onClose();
            // Generate a demo token for testing
            const demoToken = btoa(
              JSON.stringify({
                table: 1,
                iat: Math.floor(Date.now() / 1000),
                exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // 24 hours
              })
            );
            navigate(
              `/menu?token=${btoa(
                JSON.stringify({ alg: 'HS256', typ: 'JWT' })
              )}.${demoToken}.${btoa('demo_signature')}&table=1`
            );
          }, 1500);

          return () => clearTimeout(navigateTimer);
        }, 1000);

        return () => clearTimeout(processTimer);
      }, 2000);

      return () => clearTimeout(detectTimer);
    }
  }, [isOpen, navigate, onClose]);

  const handleClose = () => {
    setScanningStep('scanning');
    setIsProcessing(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className='sm:max-w-md w-full max-w-xs p-0 bg-black/90 border-0 text-white'>
        <div className='relative aspect-square w-full bg-black min-h-[300px] sm:min-h-[400px]'>
          {/* Scanner Header */}
          <div className='absolute top-4 left-4 z-40 text-white'>
            <div className='flex items-center gap-2'>
              <Camera className='h-5 w-5' />
              <span className='text-sm font-medium'>
                {t('qrScanner.title')}
              </span>
            </div>
          </div>

          {/* Camera Feed Simulation */}
          <div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'>
            {/* Animated camera feed effect */}
            <motion.div
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className='absolute inset-0 bg-gradient-to-tr from-blue-900/20 via-transparent to-green-900/20'
            />
          </div>

          {/* Scanning Frame */}
          <div className='absolute inset-0 flex items-center justify-center'>
            <div className='relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64'>
              {/* Corner frames */}
              <div className='absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-white/80' />
              <div className='absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-white/80' />
              <div className='absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-white/80' />
              <div className='absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-white/80' />

              {/* Scanning Line Animation */}
              <AnimatePresence>
                {scanningStep === 'scanning' && (
                  <motion.div
                    initial={{ y: -200 }}
                    animate={{ y: 200 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    className='absolute left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-lg'
                  />
                )}
              </AnimatePresence>

              {/* QR Code Simulation */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0.6 }}
                animate={{
                  scale: scanningStep === 'detected' ? 1.1 : 1,
                  opacity: scanningStep === 'scanning' ? 0.6 : 1,
                }}
                transition={{ duration: 0.3 }}
                className='absolute inset-6 sm:inset-8 bg-white/10 rounded-lg border-2 border-white/30 flex items-center justify-center'
              >
                <QrCode className='h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 text-white/70' />
              </motion.div>

              {/* Detection Success Animation */}
              <AnimatePresence>
                {scanningStep === 'detected' && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className='absolute inset-0 flex items-center justify-center'
                  >
                    <div className='w-16 h-16 sm:w-20 sm:h-20 bg-green-500 rounded-full flex items-center justify-center'>
                      <CheckCircle className='h-8 w-8 sm:h-10 sm:w-10 text-white' />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Status Text */}
          <div className='absolute bottom-8 left-0 right-0 text-center'>
            <motion.div
              key={scanningStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className='space-y-2'
            >
              {scanningStep === 'scanning' && (
                <>
                  <p className='text-white font-medium'>
                    {t('qrScanner.scanning.title')}
                  </p>
                  <p className='text-white/70 text-sm'>
                    {t('qrScanner.scanning.subtitle')}
                  </p>
                </>
              )}
              {scanningStep === 'detected' && (
                <>
                  <p className='text-green-400 font-medium'>
                    {t('qrScanner.detected.title')}
                  </p>
                  <p className='text-white/70 text-sm'>
                    {t('qrScanner.detected.subtitle')}
                  </p>
                </>
              )}
              {scanningStep === 'success' && (
                <>
                  <p className='text-green-400 font-medium'>
                    {t('qrScanner.success.title')}
                  </p>
                  <p className='text-white/70 text-sm'>
                    {t('qrScanner.success.subtitle')}
                  </p>
                </>
              )}
            </motion.div>
          </div>

          {/* Processing Indicator */}
          <AnimatePresence>
            {isProcessing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className='absolute bottom-4 left-1/2 transform -translate-x-1/2'
              >
                <div className='flex space-x-1'>
                  {[0, 1, 2].map(i => (
                    <motion.div
                      key={i}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                      className='w-2 h-2 bg-amber-400 rounded-full'
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Instructions for desktop */}
        <div className='p-4 bg-gray-900/50 text-center'>
          <div className='flex items-center justify-center gap-2 mb-2'>
            <Smartphone className='h-4 w-4 text-amber-400' />
            <span className='text-sm font-medium'>
              {t('qrScanner.mobile.title')}
            </span>
          </div>
          <p className='text-xs text-gray-300'>
            {t('qrScanner.mobile.description')}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
