import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  Clock,
  CheckCircle,
  Package,
  Truck,
  AlertCircle,
  Timer,
  ChefHat,
  ArrowRight,
  X,
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useOrdersStore, type Order } from '@/stores/orders-store';

interface OrderProgressSheetProps {
  children: React.ReactNode;
}

export const OrderProgressSheet: React.FC<OrderProgressSheetProps> = ({
  children,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { orders } = useOrdersStore();
  const [isOpen, setIsOpen] = useState(false);

  // Get only the current order being prepared (most recent preparing order)
  const currentPreparingOrder = orders
    .filter(order => order.status === 'preparing')
    .sort((a, b) => {
      const dateA =
        typeof a.orderDate === 'string' ? new Date(a.orderDate) : a.orderDate;
      const dateB =
        typeof b.orderDate === 'string' ? new Date(b.orderDate) : b.orderDate;
      return dateB.getTime() - dateA.getTime();
    })[0];

  // Count of preparing orders for the badge
  const preparingOrdersCount = orders.filter(
    order => order.status === 'preparing'
  ).length;

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className='h-4 w-4' />;
      case 'preparing':
        return <Package className='h-4 w-4' />;
      case 'ready':
        return <CheckCircle className='h-4 w-4' />;
      case 'delivered':
        return <Truck className='h-4 w-4' />;
      case 'cancelled':
        return <AlertCircle className='h-4 w-4' />;
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'from-yellow-500 to-orange-500';
      case 'preparing':
        return 'from-blue-500 to-cyan-500';
      case 'ready':
        return 'from-green-500 to-emerald-500';
      case 'delivered':
        return 'from-gray-500 to-gray-600';
      case 'cancelled':
        return 'from-red-500 to-red-600';
    }
  };

  const getStatusText = (status: Order['status']) => {
    return t(`orders.status.${status}`);
  };

  const formatTime = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - dateObj.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    const hours = Math.floor(diffInMinutes / 60);
    return `${hours}h ago`;
  };

  const handleViewOrder = (orderId: string) => {
    navigate(`/orders/${orderId}`);
    setIsOpen(false);
  };

  const orderSteps = [
    { status: 'pending', label: 'Order Received' },
    { status: 'preparing', label: 'Preparing' },
    { status: 'ready', label: 'Ready for Pickup' },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className='w-full sm:max-w-md p-0 flex flex-col h-full'>
        {/* Header */}
        <div className='border-b border-gray-100 dark:border-gray-700 p-6 pb-4'>
          <SheetHeader className='space-y-0'>
            <div className='flex items-center justify-between'>
              <SheetTitle className='text-xl font-bold flex items-center gap-3 text-gray-900 dark:text-white'>
                <div className='w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center'>
                  <ChefHat className='h-5 w-5 text-white' />
                </div>
                <div>
                  <div className='text-lg font-semibold'>
                    {t('orders.progress.title')}
                  </div>
                  <div className='text-sm text-gray-600 dark:text-gray-400 font-normal'>
                    Current Order
                  </div>
                </div>
                {preparingOrdersCount > 0 && (
                  <Badge className='bg-green-500 text-white text-xs px-3 py-1 rounded-full'>
                    {preparingOrdersCount}
                  </Badge>
                )}
              </SheetTitle>
              <Button
                variant='ghost'
                size='sm'
                onClick={() => setIsOpen(false)}
                className='h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-800'
              >
                <X className='h-4 w-4' />
              </Button>
            </div>
          </SheetHeader>
        </div>

        {/* Content */}
        <div className='flex-1 overflow-hidden flex flex-col'>
          <div className='flex-1 overflow-y-auto px-6 pb-6 pt-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent dark:scrollbar-thumb-gray-600 dark:scrollbar-track-transparent'>
            {!currentPreparingOrder ? (
              <div className='text-center py-12'>
                <div className='w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <ChefHat className='h-8 w-8 text-gray-400' />
                </div>
                <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
                  {t('orders.progress.noActiveOrders')}
                </h3>
                <p className='text-gray-600 dark:text-gray-400'>
                  {t('orders.progress.noActiveOrdersDesc')}
                </p>
              </div>
            ) : (
              <div className='space-y-6'>
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: 0.1 }}
                  >
                    <motion.div
                      key={currentPreparingOrder.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: 0.1 }}
                    >
                      <div className='bg-white dark:bg-gray-800 rounded-2xl'>
                        {/* Order Header */}
                        <div className='flex items-center justify-between mb-6'>
                          <div className='flex items-center gap-4'>
                            <div className='w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center'>
                              <span className='text-white font-bold text-lg'>
                                {currentPreparingOrder.orderNumber.includes('-')
                                  ? currentPreparingOrder.orderNumber.split(
                                      '-'
                                    )[1]
                                  : currentPreparingOrder.orderNumber.replace(
                                      'ORD',
                                      ''
                                    )}
                              </span>
                            </div>
                            <div>
                              <h3 className='font-bold text-lg text-gray-900 dark:text-white'>
                                Order {currentPreparingOrder.orderNumber}
                              </h3>
                              <p className='text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1'>
                                <Clock className='h-3 w-3' />
                                {formatTime(currentPreparingOrder.orderDate)}
                              </p>
                            </div>
                          </div>
                          <Badge
                            className={`px-4 py-2 bg-gradient-to-r ${getStatusColor(
                              currentPreparingOrder.status
                            )} text-white border-0 rounded-xl`}
                          >
                            <div className='flex items-center gap-2'>
                              {getStatusIcon(currentPreparingOrder.status)}
                              <span className='text-sm font-semibold'>
                                {getStatusText(currentPreparingOrder.status)}
                              </span>
                            </div>
                          </Badge>
                        </div>

                        {/* Progress Steps */}
                        <div className='space-y-4 mb-6'>
                          <h4 className='text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide'>
                            Progress
                          </h4>
                          {orderSteps.map((step, stepIndex) => {
                            const isActive =
                              currentPreparingOrder.status === step.status;
                            const isPast =
                              orderSteps.findIndex(
                                s => s.status === currentPreparingOrder.status
                              ) > stepIndex;

                            return (
                              <div
                                key={step.status}
                                className='flex items-center gap-4'
                              >
                                <div
                                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                                    isPast || isActive
                                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                                      : 'bg-gray-100 dark:bg-gray-700 text-gray-400'
                                  }`}
                                >
                                  {isPast || isActive ? (
                                    <CheckCircle className='h-4 w-4' />
                                  ) : (
                                    <Clock className='h-4 w-4' />
                                  )}
                                </div>
                                <span
                                  className={`text-base ${
                                    isPast || isActive
                                      ? 'text-gray-900 dark:text-white font-medium'
                                      : 'text-gray-500 dark:text-gray-400'
                                  }`}
                                >
                                  {step.label}
                                </span>
                                {isActive && (
                                  <div className='w-3 h-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full animate-pulse' />
                                )}
                              </div>
                            );
                          })}
                        </div>

                        {/* Order Items Preview */}
                        <div className='mb-6'>
                          <h4 className='text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-3'>
                            Items ({currentPreparingOrder.items.length}{' '}
                            {currentPreparingOrder.items.length === 1
                              ? t('order.item')
                              : t('order.items')}
                            )
                          </h4>
                          <div className='space-y-3'>
                            {currentPreparingOrder.items
                              .slice(0, 2)
                              .map((item, itemIndex) => (
                                <div
                                  key={itemIndex}
                                  className='flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-xl'
                                >
                                  <img
                                    src={item.image}
                                    alt={item.nameKey}
                                    className='w-14 h-14 object-cover rounded-lg'
                                  />
                                  <div className='flex-1 min-w-0'>
                                    <p className='text-base font-medium text-gray-900 dark:text-white truncate'>
                                      {item.nameKey}
                                    </p>
                                    <p className='text-sm text-gray-500 dark:text-gray-400'>
                                      Qty: {item.quantity}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            {currentPreparingOrder.items.length > 2 && (
                              <div className='text-center py-3'>
                                <span className='text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full'>
                                  +{currentPreparingOrder.items.length - 2}{' '}
                                  {t('orders.progress.moreItems')}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Estimated Time */}
                        {currentPreparingOrder.estimatedTime && (
                          <div className='mb-6'>
                            <div className='flex items-center gap-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-xl'>
                              <div className='w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center'>
                                <Timer className='h-5 w-5 text-white' />
                              </div>
                              <div>
                                <div className='text-sm font-medium text-amber-800 dark:text-amber-200'>
                                  Estimated Time
                                </div>
                                <div className='text-lg font-bold text-amber-900 dark:text-amber-100'>
                                  {currentPreparingOrder.estimatedTime}{' '}
                                  {t('orders.progress.minRemaining')}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* View Details Button */}
                        <Button
                          onClick={() =>
                            handleViewOrder(currentPreparingOrder.id)
                          }
                          className='w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-3 rounded-xl transition-all duration-200 hover:scale-[1.02]'
                          size='lg'
                        >
                          <span className='text-base'>
                            {t('orders.progress.viewDetails')}
                          </span>
                          <ArrowRight className='h-5 w-5 ml-2' />
                        </Button>
                      </div>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        {currentPreparingOrder && (
          <div className='border-t border-gray-100 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-800/50'>
            <Button
              onClick={() => {
                navigate('/orders');
                setIsOpen(false);
              }}
              variant='outline'
              className='w-full border-gray-200 dark:border-gray-600 hover:border-amber-500 dark:hover:border-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/20 text-gray-700 dark:text-gray-300 font-medium py-3 rounded-xl transition-all duration-200'
            >
              {t('orders.progress.viewAllOrders')}
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
