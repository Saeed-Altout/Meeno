import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Clock,
  CheckCircle,
  Package,
  Truck,
  AlertCircle,
  Calendar,
  MapPin,
  User,
  Phone,
  FileText,
  Star,
  MessageSquare,
  Receipt,
  Download,
  Share2,
  RotateCcw,
  ChefHat,
  Timer,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useOrdersStore, type Order } from '@/stores/orders-store';

export default function OrderDetailPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { getOrderById, updateOrderStatus } = useOrdersStore();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  const order = id ? getOrderById(id) : undefined;

  if (!order) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-amber-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-amber-950/20 flex items-center justify-center'>
        <div className='text-center'>
          <div className='w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4'>
            <FileText className='h-12 w-12 text-gray-400' />
          </div>
          <h1 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
            Order Not Found
          </h1>
          <p className='text-gray-600 dark:text-gray-400 mb-6'>
            The order you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate('/orders')}>
            <ArrowLeft className='h-4 w-4 mr-2' />
            Back to Orders
          </Button>
        </div>
      </div>
    );
  }

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className='h-5 w-5' />;
      case 'preparing':
        return <Package className='h-5 w-5' />;
      case 'ready':
        return <CheckCircle className='h-5 w-5' />;
      case 'delivered':
        return <Truck className='h-5 w-5' />;
      case 'cancelled':
        return <AlertCircle className='h-5 w-5' />;
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

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date));
  };

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - new Date(date).getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInMinutes < 24 * 60) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      const days = Math.floor(diffInMinutes / (24 * 60));
      return `${days} day${days > 1 ? 's' : ''} ago`;
    }
  };

  const handleRating = (newRating: number) => {
    setRating(newRating);
  };

  const handleSubmitReview = async () => {
    setIsSubmittingReview(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmittingReview(false);
    setRating(0);
    setReview('');
    alert('Thank you for your review!');
  };

  const handleReorder = () => {
    // In a real app, this would add items to cart
    console.log('Reordering:', order);
    navigate('/menu');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Order ${order.orderNumber}`,
        text: `Check out my order from La Tavola - ${
          order.items.length
        } items for $${order.total.toFixed(2)}`,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Order link copied to clipboard!');
    }
  };

  const orderSteps = [
    {
      status: 'pending',
      label: 'Order Received',
      time: formatDate(order.orderDate),
    },
    {
      status: 'preparing',
      label: 'Preparing Your Food',
      time: order.status !== 'pending' ? 'In progress...' : null,
    },
    {
      status: 'ready',
      label: 'Ready for Pickup',
      time:
        order.status === 'ready' || order.status === 'delivered'
          ? 'Ready now!'
          : null,
    },
    {
      status: 'delivered',
      label: 'Order Complete',
      time: order.status === 'delivered' ? 'Delivered' : null,
    },
  ];

  const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-amber-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-amber-950/20'>
      {/* Background Pattern */}
      <div className='absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23f59e0b" fill-opacity="0.03"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")] dark:opacity-20' />

      {/* Back Button Header */}
      <div className='relative bg-white/80 dark:bg-gray-800/80 shadow-sm pt-16 backdrop-blur-sm'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
          <Button
            variant='ghost'
            onClick={() => navigate('/orders')}
            className='flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors'
          >
            <ArrowLeft className='h-4 w-4' />
            Back to Orders
          </Button>
        </div>
      </div>

      <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='mb-8'
        >
          <div className='flex flex-col lg:flex-row lg:items-center justify-between gap-6'>
            <div>
              <h1 className='text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-2'>
                Order {order.orderNumber}
              </h1>
              <p className='text-gray-600 dark:text-gray-400 text-lg'>
                Placed {getTimeAgo(order.orderDate)}
              </p>
            </div>

            <div className='flex items-center gap-3'>
              <Badge
                className={`px-4 py-2 bg-gradient-to-r ${getStatusColor(
                  order.status
                )} text-white border-0 shadow-lg`}
              >
                <div className='flex items-center gap-2'>
                  {getStatusIcon(order.status)}
                  <span className='font-semibold'>
                    {getStatusText(order.status)}
                  </span>
                </div>
              </Badge>

              {order.estimatedTime &&
                (order.status === 'preparing' || order.status === 'ready') && (
                  <div className='flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 rounded-lg border border-amber-200 dark:border-amber-800'>
                    <Timer className='h-4 w-4' />
                    <span className='font-medium'>
                      {order.estimatedTime} min remaining
                    </span>
                  </div>
                )}
            </div>
          </div>
        </motion.div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Main Content */}
          <div className='lg:col-span-2 space-y-8'>
            {/* Order Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className='p-6 border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm'>
                <h2 className='text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2'>
                  <ChefHat className='h-5 w-5 text-amber-600' />
                  Order Progress
                </h2>

                <div className='space-y-4'>
                  {orderSteps.map((step, index) => {
                    const isActive = order.status === step.status;
                    const isPast =
                      orderSteps.findIndex(s => s.status === order.status) >
                      index;
                    const isCancelled =
                      order.status === 'cancelled' && index > 0;

                    return (
                      <div
                        key={step.status}
                        className='flex items-center gap-4'
                      >
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                            isCancelled
                              ? 'bg-gray-200 dark:bg-gray-700'
                              : isPast || isActive
                              ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
                              : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
                          }`}
                        >
                          {isCancelled ? (
                            <AlertCircle className='h-5 w-5' />
                          ) : isPast || isActive ? (
                            <CheckCircle className='h-5 w-5' />
                          ) : (
                            <Clock className='h-5 w-5' />
                          )}
                        </div>

                        <div className='flex-1'>
                          <h3
                            className={`font-semibold ${
                              isCancelled
                                ? 'text-gray-400 dark:text-gray-600'
                                : isPast || isActive
                                ? 'text-gray-900 dark:text-white'
                                : 'text-gray-500 dark:text-gray-400'
                            }`}
                          >
                            {step.label}
                          </h3>
                          {step.time && (
                            <p className='text-sm text-gray-600 dark:text-gray-400'>
                              {step.time}
                            </p>
                          )}
                        </div>

                        {isActive && (
                          <div className='w-3 h-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full animate-pulse' />
                        )}
                      </div>
                    );
                  })}
                </div>
              </Card>
            </motion.div>

            {/* Order Items */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className='p-6 border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm'>
                <h2 className='text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2'>
                  <Receipt className='h-5 w-5 text-amber-600' />
                  Order Details ({totalItems} item{totalItems !== 1 ? 's' : ''})
                </h2>

                <div className='space-y-6'>
                  {order.items.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className='flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl'
                    >
                      <img
                        src={item.image}
                        alt={item.nameKey}
                        className='w-20 h-20 object-cover rounded-lg shadow-md'
                      />
                      <div className='flex-1'>
                        <h3 className='font-bold text-lg text-gray-900 dark:text-white mb-1'>
                          {item.nameKey}
                        </h3>
                        <p className='text-gray-600 dark:text-gray-400 text-sm mb-2'>
                          {item.descriptionKey}
                        </p>
                        {item.notes && (
                          <div className='bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3 mb-2'>
                            <div className='flex items-start gap-2'>
                              <MessageSquare className='h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0' />
                              <div>
                                <p className='text-sm font-medium text-amber-800 dark:text-amber-200'>
                                  Special Instructions:
                                </p>
                                <p className='text-sm text-amber-700 dark:text-amber-300'>
                                  {item.notes}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                        <div className='flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400'>
                          <span>Quantity: {item.quantity}</span>
                          <span>Price: ${item.price.toFixed(2)} each</span>
                        </div>
                      </div>
                      <div className='text-right'>
                        <div className='text-xl font-bold text-gray-900 dark:text-white'>
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Order Total */}
                <div className='mt-6 pt-6 border-t border-gray-200 dark:border-gray-700'>
                  <div className='flex justify-between items-center'>
                    <span className='text-lg font-semibold text-gray-900 dark:text-white'>
                      Order Total:
                    </span>
                    <span className='text-2xl font-bold text-amber-600 dark:text-amber-400'>
                      ${order.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Review Section for Delivered Orders */}
            {order.status === 'delivered' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className='p-6 border-0 shadow-lg bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 backdrop-blur-sm'>
                  <h2 className='text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2'>
                    <Star className='h-5 w-5 text-amber-600' />
                    Rate Your Experience
                  </h2>

                  <div className='space-y-6'>
                    {/* Star Rating */}
                    <div>
                      <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3'>
                        How was your order?
                      </label>
                      <div className='flex gap-2'>
                        {[1, 2, 3, 4, 5].map(star => (
                          <button
                            key={star}
                            onClick={() => handleRating(star)}
                            className={`w-10 h-10 rounded-lg transition-all duration-200 ${
                              star <= rating
                                ? 'text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-400'
                                : 'text-gray-400 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-yellow-400 hover:text-yellow-400'
                            }`}
                          >
                            <Star
                              className={`h-6 w-6 mx-auto ${
                                star <= rating ? 'fill-current' : ''
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Review Text */}
                    <div>
                      <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                        Share your feedback (optional)
                      </label>
                      <Textarea
                        placeholder='Tell us about your experience...'
                        value={review}
                        onChange={e => setReview(e.target.value)}
                        rows={4}
                        className='resize-none border-gray-200 dark:border-gray-700 focus:border-amber-500 dark:focus:border-amber-400'
                      />
                    </div>

                    <Button
                      onClick={handleSubmitReview}
                      disabled={rating === 0 || isSubmittingReview}
                      className='w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-3 disabled:opacity-50'
                    >
                      {isSubmittingReview ? (
                        <div className='flex items-center justify-center gap-2'>
                          <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
                          Submitting...
                        </div>
                      ) : (
                        'Submit Review'
                      )}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className='space-y-6'>
            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className='p-6 border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm'>
                <h3 className='text-lg font-bold text-gray-900 dark:text-white mb-4'>
                  Order Summary
                </h3>

                <div className='space-y-3 text-sm'>
                  <div className='flex justify-between'>
                    <span className='text-gray-600 dark:text-gray-400'>
                      Order Date:
                    </span>
                    <span className='text-gray-900 dark:text-white'>
                      {formatDate(order.orderDate)}
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-gray-600 dark:text-gray-400'>
                      Order Number:
                    </span>
                    <span className='text-gray-900 dark:text-white font-mono'>
                      {order.orderNumber}
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-gray-600 dark:text-gray-400'>
                      Items:
                    </span>
                    <span className='text-gray-900 dark:text-white'>
                      {totalItems}
                    </span>
                  </div>
                  <div className='flex justify-between font-semibold text-base pt-2 border-t border-gray-200 dark:border-gray-700'>
                    <span className='text-gray-900 dark:text-white'>
                      Total:
                    </span>
                    <span className='text-amber-600 dark:text-amber-400'>
                      ${order.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Customer Information */}
            {order.customerInfo && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className='p-6 border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm'>
                  <h3 className='text-lg font-bold text-gray-900 dark:text-white mb-4'>
                    Customer Information
                  </h3>

                  <div className='space-y-3'>
                    {order.customerInfo.name && (
                      <div className='flex items-center gap-3'>
                        <User className='h-4 w-4 text-amber-600' />
                        <span className='text-gray-900 dark:text-white'>
                          {order.customerInfo.name}
                        </span>
                      </div>
                    )}
                    {order.customerInfo.table && (
                      <div className='flex items-center gap-3'>
                        <MapPin className='h-4 w-4 text-amber-600' />
                        <span className='text-gray-900 dark:text-white'>
                          {order.customerInfo.table}
                        </span>
                      </div>
                    )}
                    {order.customerInfo.phone && (
                      <div className='flex items-center gap-3'>
                        <Phone className='h-4 w-4 text-amber-600' />
                        <span className='text-gray-900 dark:text-white'>
                          {order.customerInfo.phone}
                        </span>
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className='p-6 border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm'>
                <h3 className='text-lg font-bold text-gray-900 dark:text-white mb-4'>
                  Actions
                </h3>

                <div className='space-y-3'>
                  <Button
                    onClick={handleReorder}
                    className='w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white'
                  >
                    <RotateCcw className='h-4 w-4 mr-2' />
                    {t('orders.actions.reorder')}
                  </Button>

                  <Button
                    variant='outline'
                    onClick={handleShare}
                    className='w-full border-gray-200 dark:border-gray-700 hover:border-amber-500 dark:hover:border-amber-400'
                  >
                    <Share2 className='h-4 w-4 mr-2' />
                    Share Order
                  </Button>

                  <Button
                    variant='outline'
                    onClick={() => window.print()}
                    className='w-full border-gray-200 dark:border-gray-700 hover:border-amber-500 dark:hover:border-amber-400'
                  >
                    <Download className='h-4 w-4 mr-2' />
                    Download Receipt
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
