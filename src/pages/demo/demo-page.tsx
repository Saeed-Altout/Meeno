import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import QRCode from 'qrcode';
import {
  QrCode,
  Smartphone,
  MousePointer,
  ShoppingCart,
  Download,
  Printer,
  RefreshCw,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { QRScannerDemo } from '@/components/common/qr-scanner-demo';

export default function DemoPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const [demoStep] = useState<'generate' | 'scan' | 'order'>('generate');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [tableNumber, setTableNumber] = useState<number>(1);

  // Generate JWT token for table authentication
  const generateJWTToken = (tableNum: number) => {
    // Simple JWT simulation - in production, this would be generated on the server
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(
      JSON.stringify({
        table: tableNum,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // 24 hours
      })
    );
    const signature = btoa(`signature_for_table_${tableNum}`); // Simplified signature
    return `${header}.${payload}.${signature}`;
  };

  // Get the current URL for the explore menu with JWT token and table number
  const getExploreMenuUrl = () => {
    const baseUrl = `${window.location.origin}/explore`;
    const token = generateJWTToken(tableNumber);
    return `${baseUrl}?token=${token}&table=${tableNumber}`;
  };

  useEffect(() => {
    generateQRCode();
  }, [tableNumber]);

  const generateQRCode = async () => {
    setIsGenerating(true);
    try {
      const menuUrl = getExploreMenuUrl();
      const dataUrl = await QRCode.toDataURL(menuUrl, {
        width: 256,
        margin: 2,
        color: {
          dark: '#1f2937', // Dark gray
          light: '#ffffff', // White
        },
        errorCorrectionLevel: 'M',
      });
      setQrCodeDataUrl(dataUrl);
    } catch (error) {
      console.error('Error generating QR code:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadQRCode = () => {
    if (qrCodeDataUrl) {
      const link = document.createElement('a');
      link.download = 'meeno-menu-qr-code.png';
      link.href = qrCodeDataUrl;
      link.click();
    }
  };

  const printQRCode = () => {
    if (qrCodeDataUrl) {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        const menuUrl = getExploreMenuUrl();
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>Meeno Menu QR Code</title>
              <style>
                body {
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                  min-height: 100vh;
                  margin: 0;
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                }
                .qr-container {
                  text-align: center;
                  padding: 2rem;
                  border: 2px solid #e5e7eb;
                  border-radius: 12px;
                  background: white;
                }
                h1 { color: #1f2937; margin-bottom: 1rem; }
                p { color: #6b7280; margin-bottom: 1.5rem; }
                img { margin: 1rem 0; }
                .url { color: #3b82f6; font-size: 0.875rem; word-break: break-all; }
              </style>
            </head>
            <body>
              <div class="qr-container">
                <h1>🍝 Meeno Menu - Table ${tableNumber}</h1>
                <p>Scan to explore our delicious menu!</p>
                <img src="${qrCodeDataUrl}" alt="QR Code" />
                <p class="url">${menuUrl}</p>
              </div>
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
      }
    }
  };

  const handleVisitDemo = () => {
    navigate('/explore');
  };

  const demoSteps = [
    {
      id: 'generate',
      title: t('demo.howItWorks.step1.title'),
      description: t('demo.howItWorks.step1.description'),
      icon: QrCode,
      color: 'bg-blue-500',
    },
    {
      id: 'scan',
      title: t('demo.howItWorks.step2.title'),
      description: t('demo.howItWorks.step2.description'),
      icon: Smartphone,
      color: 'bg-green-500',
    },
    {
      id: 'order',
      title: t('demo.howItWorks.step3.title'),
      description: t('demo.howItWorks.step3.description'),
      icon: ShoppingCart,
      color: 'bg-amber-500',
    },
  ];

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-16'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='text-center mb-8 sm:mb-12'
        >
          <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 px-2'>
            🍝 {t('demo.title')}
          </h1>
          <p className='text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-2'>
            {t('demo.subtitle')}
          </p>
        </motion.div>

        {/* Demo Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className='mb-8 sm:mb-12'
        >
          {/* Mobile: Vertical Layout */}
          <div className='flex md:hidden flex-col space-y-4 max-w-sm mx-auto'>
            {demoSteps.map((step, index) => {
              const Icon = step.icon;
              const isActive = demoStep === step.id;
              const isCompleted =
                demoSteps.findIndex(s => s.id === demoStep) > index;

              return (
                <div
                  key={step.id}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-white dark:bg-gray-800 shadow-lg'
                      : isCompleted
                      ? 'bg-green-50 dark:bg-green-900/20'
                      : 'bg-white/50 dark:bg-gray-800/50'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isCompleted ? 'bg-green-500' : step.color
                    }`}
                  >
                    <Icon className='w-4 h-4 text-white' />
                  </div>
                  <div className='flex-1'>
                    <p className='font-medium text-gray-900 dark:text-white text-sm'>
                      {step.title}
                    </p>
                    <p className='text-xs text-gray-500 dark:text-gray-400'>
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop: Horizontal Layout */}
          <div className='hidden md:flex justify-center'>
            <div className='flex items-center space-x-4'>
              {demoSteps.map((step, index) => {
                const Icon = step.icon;
                const isActive = demoStep === step.id;
                const isCompleted =
                  demoSteps.findIndex(s => s.id === demoStep) > index;

                return (
                  <React.Fragment key={step.id}>
                    <div
                      className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-all ${
                        isActive
                          ? 'bg-white dark:bg-gray-800 shadow-lg scale-105'
                          : isCompleted
                          ? 'bg-green-50 dark:bg-green-900/20'
                          : 'bg-white/50 dark:bg-gray-800/50'
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          isCompleted ? 'bg-green-500' : step.color
                        }`}
                      >
                        <Icon className='w-4 h-4 text-white' />
                      </div>
                      <div>
                        <p className='font-medium text-gray-900 dark:text-white text-sm'>
                          {step.title}
                        </p>
                        <p className='text-xs text-gray-500 dark:text-gray-400'>
                          {step.description}
                        </p>
                      </div>
                    </div>
                    {index < demoSteps.length - 1 && (
                      <div className='h-px w-8 bg-gray-300 dark:bg-gray-600' />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </motion.div>

        <div className='grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8'>
          {/* QR Code Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className='h-full'>
              <CardHeader>
                <div className='flex items-center justify-between'>
                  <CardTitle className='flex items-center gap-2'>
                    <QrCode className='w-5 h-5 text-blue-500' />
                    QR Code Generator - Table {tableNumber}
                  </CardTitle>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => setIsAdminMode(!isAdminMode)}
                    className='text-xs px-2 py-1 h-auto'
                  >
                    {isAdminMode ? '👤 User Mode' : '🔧 Admin Mode'}
                  </Button>
                </div>
                <p className='text-sm text-gray-600 dark:text-gray-400 mt-2'>
                  {isAdminMode
                    ? 'Generate QR code for table access with secure authentication'
                    : 'Generate QR code for customers to access the digital menu'}
                </p>
                {isAdminMode && (
                  <div className='flex items-center gap-3 pt-3 border-t border-gray-200 dark:border-gray-700 mt-3'>
                    <label className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                      Admin - Set Table Number:
                    </label>
                    <select
                      value={tableNumber}
                      onChange={e => setTableNumber(Number(e.target.value))}
                      className='px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                    >
                      {Array.from({ length: 20 }, (_, i) => i + 1).map(num => (
                        <option key={num} value={num}>
                          Table {num}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </CardHeader>
              <CardContent className='space-y-4 sm:space-y-6'>
                {/* QR Code Display */}
                <div className='flex justify-center'>
                  <div className='bg-white p-3 sm:p-4 rounded-lg shadow-inner border-2 border-dashed border-gray-200'>
                    {isGenerating ? (
                      <div className='w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 flex items-center justify-center'>
                        <RefreshCw className='w-6 h-6 sm:w-8 sm:h-8 animate-spin text-gray-400' />
                      </div>
                    ) : qrCodeDataUrl ? (
                      <img
                        src={qrCodeDataUrl}
                        alt='Menu QR Code'
                        className='w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64'
                      />
                    ) : (
                      <div className='w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 flex items-center justify-center text-gray-400 text-sm text-center'>
                        Failed to generate QR code
                      </div>
                    )}
                  </div>
                </div>

                {/* QR Code Info */}
                <div className='text-center space-y-2 px-2'>
                  {isAdminMode && (
                    <Badge
                      variant='outline'
                      className='text-xs break-all max-w-full'
                    >
                      {getExploreMenuUrl()}
                    </Badge>
                  )}
                  <div className='space-y-1'>
                    <p className='text-sm text-gray-600 dark:text-gray-400'>
                      Scan this QR code to access the menu or click "Visit Demo"
                      below
                    </p>
                    {isAdminMode && (
                      <p className='text-xs text-blue-600 dark:text-blue-400 font-medium'>
                        🔐 Secure access for Table {tableNumber}
                      </p>
                    )}
                  </div>
                </div>

                {/* QR Code Actions */}
                <div className='flex flex-col sm:flex-row gap-3 justify-center'>
                  <Button
                    onClick={generateQRCode}
                    variant='outline'
                    size='lg'
                    disabled={isGenerating}
                    className='flex-1 sm:flex-none min-h-[44px] px-6 py-3 text-base font-medium border-2 border-blue-200 text-blue-700 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-950/20 hover:scale-105 transition-all duration-200'
                  >
                    <RefreshCw
                      className={`w-5 h-5 mr-2 ${
                        isGenerating ? 'animate-spin' : ''
                      }`}
                    />
                    Regenerate QR Code
                  </Button>
                  <Button
                    onClick={downloadQRCode}
                    variant='outline'
                    size='lg'
                    disabled={!qrCodeDataUrl}
                    className='flex-1 sm:flex-none min-h-[44px] px-6 py-3 text-base font-medium border-2 hover:scale-105 transition-all duration-200'
                  >
                    <Download className='w-5 h-5 mr-2' />
                    Download
                  </Button>
                  <Button
                    onClick={printQRCode}
                    variant='outline'
                    size='lg'
                    disabled={!qrCodeDataUrl}
                    className='flex-1 sm:flex-none min-h-[44px] px-6 py-3 text-base font-medium border-2 hover:scale-105 transition-all duration-200'
                  >
                    <Printer className='w-5 h-5 mr-2' />
                    Print
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Demo Instructions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className='h-full'>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Smartphone className='w-5 h-5 text-green-500' />
                  How It Works
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4 sm:space-y-6'>
                <div className='space-y-3 sm:space-y-4'>
                  <div className='flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg'>
                    <div className='w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0'>
                      1
                    </div>
                    <div className='flex-1'>
                      <h4 className='font-medium text-gray-900 dark:text-white text-sm sm:text-base'>
                        Generate QR Code
                      </h4>
                      <p className='text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1'>
                        Create a unique QR code that links directly to your menu
                      </p>
                    </div>
                  </div>

                  <div className='flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg'>
                    <div className='w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0'>
                      2
                    </div>
                    <div className='flex-1'>
                      <h4 className='font-medium text-gray-900 dark:text-white text-sm sm:text-base'>
                        Customer Scans
                      </h4>
                      <p className='text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1'>
                        Customers scan the QR code with their mobile device
                        camera
                      </p>
                    </div>
                  </div>

                  <div className='flex items-start gap-3 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg'>
                    <div className='w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0'>
                      3
                    </div>
                    <div className='flex-1'>
                      <h4 className='font-medium text-gray-900 dark:text-white text-sm sm:text-base'>
                        Browse & Order
                      </h4>
                      <p className='text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1'>
                        Explore the menu, add items to cart, and complete the
                        order
                      </p>
                    </div>
                  </div>
                </div>

                {/* Demo Button */}
                <div className='pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-700 space-y-4'>
                  <Button
                    onClick={() => setShowScanner(true)}
                    variant='outline'
                    className='w-full min-h-[48px] border-2 border-amber-200 text-amber-700 hover:bg-amber-50 dark:border-amber-800 dark:text-amber-400 dark:hover:bg-amber-950/20 hover:scale-105 transition-all duration-200'
                    size='lg'
                  >
                    <Smartphone className='w-5 h-5 mr-3' />
                    <span className='text-base font-medium'>
                      Simulate QR Scan
                    </span>
                  </Button>
                  <Button
                    onClick={handleVisitDemo}
                    className='w-full min-h-[48px] bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200'
                    size='lg'
                  >
                    <MousePointer className='w-5 h-5 mr-3' />
                    <span className='text-base font-medium'>
                      Visit Demo - Explore Menu
                    </span>
                  </Button>
                  <p className='text-sm text-gray-500 dark:text-gray-400 text-center px-2 leading-relaxed'>
                    Experience the full ordering flow as a customer would
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className='mt-8 sm:mt-12'
        >
          <Card>
            <CardHeader>
              <CardTitle className='text-center text-lg sm:text-xl'>
                Demo Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
                <div className='text-center space-y-2 p-3 sm:p-4'>
                  <div className='w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mx-auto'>
                    <QrCode className='w-5 h-5 sm:w-6 sm:h-6 text-blue-500' />
                  </div>
                  <h4 className='font-semibold text-gray-900 dark:text-white text-sm sm:text-base'>
                    QR Code Generation
                  </h4>
                  <p className='text-xs sm:text-sm text-gray-600 dark:text-gray-400'>
                    Instantly generate QR codes that link to your menu
                  </p>
                </div>

                <div className='text-center space-y-2 p-3 sm:p-4'>
                  <div className='w-10 h-10 sm:w-12 sm:h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mx-auto'>
                    <Smartphone className='w-5 h-5 sm:w-6 sm:h-6 text-green-500' />
                  </div>
                  <h4 className='font-semibold text-gray-900 dark:text-white text-sm sm:text-base'>
                    Mobile Optimized
                  </h4>
                  <p className='text-xs sm:text-sm text-gray-600 dark:text-gray-400'>
                    Perfect experience on all mobile devices
                  </p>
                </div>

                <div className='text-center space-y-2 p-3 sm:p-4 sm:col-span-2 lg:col-span-1'>
                  <div className='w-10 h-10 sm:w-12 sm:h-12 bg-amber-100 dark:bg-amber-900/20 rounded-lg flex items-center justify-center mx-auto'>
                    <ShoppingCart className='w-5 h-5 sm:w-6 sm:h-6 text-amber-500' />
                  </div>
                  <h4 className='font-semibold text-gray-900 dark:text-white text-sm sm:text-base'>
                    Complete Ordering
                  </h4>
                  <p className='text-xs sm:text-sm text-gray-600 dark:text-gray-400'>
                    Full cart management and checkout process
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* QR Scanner Demo Modal */}
      <QRScannerDemo
        isOpen={showScanner}
        onClose={() => setShowScanner(false)}
      />
    </div>
  );
}
