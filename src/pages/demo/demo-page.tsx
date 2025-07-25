import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import QRCode from 'qrcode';
import { QrCode, Smartphone, Download, Printer, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { QRScannerDemo } from '@/components/common/qr-scanner-demo';

export default function DemoPage() {
  const { t } = useTranslation();
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
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

  // Get the current URL for the menu with JWT token and table number
  const getMenuUrl = () => {
    const baseUrl = `${window.location.origin}/menu`;
    const token = generateJWTToken(tableNumber);
    return `${baseUrl}?token=${token}&table=${tableNumber}`;
  };

  useEffect(() => {
    generateQRCode();
  }, [tableNumber]);

  // Regenerate QR code when theme changes
  useEffect(() => {
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'class'
        ) {
          generateQRCode();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  const generateQRCode = async () => {
    setIsGenerating(true);
    try {
      const menuUrl = getMenuUrl();
      const isDarkMode = document.documentElement.classList.contains('dark');
      const dataUrl = await QRCode.toDataURL(menuUrl, {
        width: 256,
        margin: 2,
        color: {
          dark: isDarkMode ? '#ffffff' : '#1f2937', // White in dark mode, dark gray in light mode
          light: isDarkMode ? '#1f2937' : '#ffffff', // Dark gray in dark mode, white in light mode
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
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>${t('demo.qrGenerator.printTitle')}</title>
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
              </style>
            </head>
            <body>
              <div class="qr-container">
                <h1>🍝 ${t('demo.qrGenerator.printTitle')} - ${t(
          'demo.qrGenerator.tableNumber'
        )} ${tableNumber}</h1>
                <p>${t('demo.qrGenerator.printSubtitle')}</p>
                <img src="${qrCodeDataUrl}" alt="QR Code" />
              </div>
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
      }
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-16'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8'>
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

        {/* QR Code Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className='max-w-2xl mx-auto'
        >
          <Card className='h-full shadow-lg dark:shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm'>
            <CardHeader className='pb-4'>
              <div className='flex items-center justify-between'>
                <CardTitle className='flex items-center gap-3 text-xl font-bold'>
                  <div className='w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center'>
                    <QrCode className='w-5 h-5 text-white' />
                  </div>
                  <div>
                    <div className='text-lg font-semibold'>
                      {t('demo.qrGenerator.titleWithTable')} {tableNumber}
                    </div>
                    <div className='text-sm text-gray-600 dark:text-gray-400 font-normal'>
                      {t('demo.qrGenerator.subtitle')}
                    </div>
                  </div>
                </CardTitle>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => setIsAdminMode(!isAdminMode)}
                  className='text-xs px-3 py-2 h-auto bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-all duration-200'
                >
                  <div className='flex items-center gap-2'>
                    <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                    {isAdminMode
                      ? t('demo.qrGenerator.userMode')
                      : t('demo.qrGenerator.adminMode')}
                  </div>
                </Button>
              </div>
              <p className='text-sm text-gray-600 dark:text-gray-400 mt-3 pl-13'>
                {isAdminMode
                  ? t('demo.qrGenerator.adminDescription')
                  : t('demo.qrGenerator.userDescription')}
              </p>
              {isAdminMode && (
                <div className='flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-700 mt-4'>
                  <label className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                    {t('demo.qrGenerator.adminSetTable')}
                  </label>
                  <select
                    value={tableNumber}
                    onChange={e => setTableNumber(Number(e.target.value))}
                    className='px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                  >
                    {Array.from({ length: 20 }, (_, i) => i + 1).map(num => (
                      <option key={num} value={num}>
                        {t('demo.qrGenerator.tableNumber')} {num}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </CardHeader>
            <CardContent className='space-y-6'>
              {/* QR Code Display */}
              <div className='flex justify-center'>
                <div className='bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 p-6 rounded-2xl shadow-inner border border-gray-200 dark:border-gray-600'>
                  {isGenerating ? (
                    <div className='w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 flex items-center justify-center'>
                      <div className='flex flex-col items-center gap-3'>
                        <RefreshCw className='w-8 h-8 animate-spin text-blue-500' />
                        <p className='text-sm text-gray-500 dark:text-gray-400'>
                          Generating...
                        </p>
                      </div>
                    </div>
                  ) : qrCodeDataUrl ? (
                    <div className='relative'>
                      <img
                        src={qrCodeDataUrl}
                        alt='Menu QR Code'
                        className='w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-lg shadow-lg'
                      />
                      <div className='absolute inset-0 bg-gradient-to-t from-transparent to-transparent hover:from-black/5 dark:hover:from-white/5 rounded-lg transition-all duration-300'></div>
                    </div>
                  ) : (
                    <div className='w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 flex items-center justify-center text-muted-foreground text-sm text-center'>
                      {t('demo.qrGenerator.failedGenerate')}
                    </div>
                  )}
                </div>
              </div>

              {/* QR Code Info */}
              <div className='text-center space-y-3'>
                {isAdminMode && (
                  <Badge
                    variant='outline'
                    className='text-xs break-all max-w-full bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300'
                  >
                    {getMenuUrl()}
                  </Badge>
                )}
                <div className='space-y-2'>
                  <p className='text-sm text-gray-600 dark:text-gray-400 font-medium'>
                    {t('demo.qrGenerator.scanText')}
                  </p>
                  {isAdminMode && (
                    <p className='text-xs text-blue-600 dark:text-blue-400 font-medium bg-blue-50 dark:bg-blue-950/20 px-3 py-1 rounded-full inline-block'>
                      🔒 {t('demo.qrGenerator.secureAccess')} {tableNumber}
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
                  className='flex-1 sm:flex-none min-h-[48px] px-6 py-3 text-base font-medium border-2 border-blue-200 text-blue-700 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-950/20 hover:scale-105 transition-all duration-200 shadow-sm'
                >
                  <RefreshCw
                    className={`w-5 h-5 mr-2 ${
                      isGenerating ? 'animate-spin' : ''
                    }`}
                  />
                  {t('demo.qrGenerator.regenerate')}
                </Button>
                <Button
                  onClick={downloadQRCode}
                  variant='outline'
                  size='lg'
                  disabled={!qrCodeDataUrl}
                  className='flex-1 sm:flex-none min-h-[48px] px-6 py-3 text-base font-medium border-2 border-gray-200 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 hover:scale-105 transition-all duration-200 shadow-sm'
                >
                  <Download className='w-5 h-5 mr-2' />
                  {t('demo.qrGenerator.download')}
                </Button>
                <Button
                  onClick={printQRCode}
                  variant='outline'
                  size='lg'
                  disabled={!qrCodeDataUrl}
                  className='flex-1 sm:flex-none min-h-[48px] px-6 py-3 text-base font-medium border-2 border-gray-200 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 hover:scale-105 transition-all duration-200 shadow-sm'
                >
                  <Printer className='w-5 h-5 mr-2' />
                  {t('demo.qrGenerator.print')}
                </Button>
              </div>

              {/* Simulate QR Scan Button */}
              <div className='pt-6 border-t border-gray-200 dark:border-gray-700'>
                <Button
                  onClick={() => setShowScanner(true)}
                  variant='outline'
                  className='w-full min-h-[52px] border-2 border-amber-200 text-amber-700 hover:bg-amber-50 dark:border-amber-800 dark:text-amber-400 dark:hover:bg-amber-950/20 hover:scale-105 transition-all duration-200 shadow-sm bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/10 dark:to-orange-950/10'
                  size='lg'
                >
                  <Smartphone className='w-5 h-5 mr-3' />
                  <span className='text-base font-medium'>
                    {t('demo.actions.simulateQrScan')}
                  </span>
                </Button>
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
