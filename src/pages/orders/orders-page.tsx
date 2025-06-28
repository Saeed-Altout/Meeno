import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
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
  RotateCcw,
  Filter,
  Search,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useOrdersStore, type Order } from '@/stores/orders-store';

export default function OrdersPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { orders } = useOrdersStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<Order['status'] | 'all'>(
    'all'
  );

  // Filter orders based on search and status
  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some(item =>
        item.nameKey.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesStatus =
      statusFilter === 'all' || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

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
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800';
      case 'preparing':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 border-blue-200 dark:border-blue-800';
      case 'ready':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-800';
      case 'delivered':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-300 border-gray-200 dark:border-gray-700';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 border-red-200 dark:border-red-800';
    }
  };

  const getStatusText = (status: Order['status']) => {
    return t(`orders.status.${status}`);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
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
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 24 * 60) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours}h ago`;
    } else {
      const days = Math.floor(diffInMinutes / (24 * 60));
      return `${days}d ago`;
    }
  };

  const handleReorder = (order: Order) => {
    // In a real app, this would add items to cart
    console.log('Reordering:', order);
  };

  const statusOptions = [
    { value: 'all', label: t('orders.filters.all') },
    { value: 'pending', label: t('orders.filters.pending') },
    { value: 'preparing', label: t('orders.filters.preparing') },
    { value: 'ready', label: t('orders.filters.ready') },
    { value: 'delivered', label: t('orders.filters.delivered') },
    { value: 'cancelled', label: t('orders.filters.cancelled') },
  ];

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-amber-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-amber-950/20'>
      {/* Background Pattern */}
      <div className='absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23f59e0b" fill-opacity="0.03"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")] dark:opacity-20' />

      {/* Back Button Header */}
      <div className='relative bg-white/80 dark:bg-gray-800/80 shadow-sm pt-16 backdrop-blur-sm'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
          <Button
            variant='ghost'
            onClick={() => navigate('/')}
            className='flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors'
          >
            <ArrowLeft className='h-4 w-4' />
            {t('common.back')}
          </Button>
        </div>
      </div>

      <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='text-center mb-8'
        >
          <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl mb-4 shadow-lg'>
            <FileText className='h-8 w-8 text-white' />
          </div>
          <h1 className='text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-2'>
            {t('orders.title')}
          </h1>
          <p className='text-gray-600 dark:text-gray-400 text-lg'>
            {t('orders.subtitle')}
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className='mb-8'
        >
          <Card className='p-6 border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm'>
            <div className='flex flex-col md:flex-row gap-4'>
              <div className='flex-1 relative'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
                <Input
                  placeholder={t('orders.searchPlaceholder')}
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className='pl-10 border-gray-200 dark:border-gray-700 focus:border-amber-500 dark:focus:border-amber-400'
                />
              </div>

              <div className='flex items-center gap-2'>
                <Filter className='h-4 w-4 text-gray-500' />
                <select
                  value={statusFilter}
                  onChange={e =>
                    setStatusFilter(e.target.value as Order['status'] | 'all')
                  }
                  className='px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-amber-500 dark:focus:border-amber-400 focus:outline-none'
                >
                  {statusOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Orders List */}
        <div className='space-y-6'>
          {filteredOrders.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className='text-center py-12'
            >
              <div className='w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4'>
                <FileText className='h-12 w-12 text-gray-400' />
              </div>
              <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
                {t('orders.empty.title')}
              </h3>
              <p className='text-gray-600 dark:text-gray-400 mb-6'>
                {searchTerm || statusFilter !== 'all'
                  ? t('orders.empty.filtered')
                  : t('orders.empty.description')}
              </p>
              <Button
                onClick={() => navigate('/menu')}
                className='bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white'
              >
                {t('orders.empty.action')}
              </Button>
            </motion.div>
          ) : (
            filteredOrders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className='border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm'>
                  {/* Order Header */}
                  <div className='p-6 border-b border-gray-100 dark:border-gray-700'>
                    <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
                      <div className='flex items-center gap-4'>
                        <div className='w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center'>
                          <span className='text-white font-bold text-sm'>
                            #{order.orderNumber.split('-')[1]}
                          </span>
                        </div>
                        <div>
                          <h3 className='font-bold text-lg text-gray-900 dark:text-white'>
                            Order {order.orderNumber}
                          </h3>
                          <div className='flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mt-1'>
                            <div className='flex items-center gap-1'>
                              <Calendar className='h-4 w-4' />
                              {formatDate(order.orderDate)}
                            </div>
                            <span>{getTimeAgo(order.orderDate)}</span>
                          </div>
                        </div>
                      </div>

                      <div className='flex items-center gap-3'>
                        <Badge
                          className={`px-3 py-1 border ${getStatusColor(
                            order.status
                          )}`}
                        >
                          <div className='flex items-center gap-1.5'>
                            {getStatusIcon(order.status)}
                            {getStatusText(order.status)}
                          </div>
                        </Badge>

                        {order.estimatedTime &&
                          (order.status === 'preparing' ||
                            order.status === 'ready') && (
                            <div className='flex items-center gap-1 text-sm text-amber-600 dark:text-amber-400 font-medium'>
                              <Clock className='h-4 w-4' />
                              {order.estimatedTime}m
                            </div>
                          )}
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className='p-6'>
                    <div className='space-y-4'>
                      {order.items.map((item, itemIndex) => (
                        <div
                          key={itemIndex}
                          className='flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg'
                        >
                          <img
                            src={item.image}
                            alt={item.nameKey}
                            className='w-16 h-16 object-cover rounded-lg'
                          />
                          <div className='flex-1'>
                            <h4 className='font-semibold text-gray-900 dark:text-white'>
                              {item.nameKey}
                            </h4>
                            <p className='text-sm text-gray-600 dark:text-gray-400 line-clamp-1'>
                              {item.descriptionKey}
                            </p>
                            {item.notes && (
                              <p className='text-sm text-amber-600 dark:text-amber-400 mt-1'>
                                Note: {item.notes}
                              </p>
                            )}
                          </div>
                          <div className='text-right'>
                            <div className='font-semibold text-gray-900 dark:text-white'>
                              ${item.price.toFixed(2)}
                            </div>
                            <div className='text-sm text-gray-600 dark:text-gray-400'>
                              Qty: {item.quantity}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Customer Info */}
                    {order.customerInfo && (
                      <div className='mt-6 p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800'>
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 text-sm'>
                          {order.customerInfo.name && (
                            <div className='flex items-center gap-2'>
                              <User className='h-4 w-4 text-amber-600' />
                              <span className='text-gray-700 dark:text-gray-300'>
                                {order.customerInfo.name}
                              </span>
                            </div>
                          )}
                          {order.customerInfo.table && (
                            <div className='flex items-center gap-2'>
                              <MapPin className='h-4 w-4 text-amber-600' />
                              <span className='text-gray-700 dark:text-gray-300'>
                                {order.customerInfo.table}
                              </span>
                            </div>
                          )}
                          {order.customerInfo.phone && (
                            <div className='flex items-center gap-2'>
                              <Phone className='h-4 w-4 text-amber-600' />
                              <span className='text-gray-700 dark:text-gray-300'>
                                {order.customerInfo.phone}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Order Footer */}
                  <div className='px-6 py-4 bg-gray-50 dark:bg-gray-700/30 border-t border-gray-100 dark:border-gray-700'>
                    <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
                      <div className='flex items-center gap-6'>
                        <div className='text-xl font-bold text-gray-900 dark:text-white'>
                          {t('orders.orderInfo.total')}: $
                          {order.total.toFixed(2)}
                        </div>
                        {order.status === 'delivered' && (
                          <div className='flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400'>
                            <Star className='h-4 w-4 text-yellow-400 fill-yellow-400' />
                            <span>{t('orders.actions.rate')}</span>
                          </div>
                        )}
                      </div>

                      <div className='flex gap-2'>
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={() => handleReorder(order)}
                          className='flex items-center gap-2'
                        >
                          <RotateCcw className='h-4 w-4' />
                          {t('orders.actions.reorder')}
                        </Button>

                        <Button
                          variant='ghost'
                          size='sm'
                          onClick={() => navigate(`/orders/${order.id}`)}
                          className='text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300'
                        >
                          {t('orders.actions.viewDetails')}
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
