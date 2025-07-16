import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { MenuItem } from '../data';

export interface OrderItem extends MenuItem {
  quantity: number;
  notes?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  orderDate: Date | string;
  estimatedTime?: number; // in minutes
  notes?: string;
  customerInfo?: {
    name?: string;
    table?: string;
    phone?: string;
  };
}

interface OrdersState {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'orderNumber' | 'orderDate'>) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  getOrderById: (orderId: string) => Order | undefined;
  getRecentOrders: (limit?: number) => Order[];
}

// Generate mock orders for demonstration
const generateMockOrders = (): Order[] => {
  // Start with empty orders - only show orders when clients actually add them
  return [];
};

export const useOrdersStore = create<OrdersState>()(
  persist(
    (set, get) => ({
      orders: generateMockOrders(),

      addOrder: orderData => {
        const newOrder: Order = {
          ...orderData,
          id: Date.now().toString(),
          orderNumber: `ORD-${String(Date.now()).slice(-6)}`,
          orderDate: new Date(),
        };

        set(state => ({
          orders: [newOrder, ...state.orders],
        }));

        return newOrder;
      },

      updateOrderStatus: (orderId, status) => {
        set(state => ({
          orders: state.orders.map(order =>
            order.id === orderId ? { ...order, status } : order
          ),
        }));
      },

      getOrderById: orderId => {
        const { orders } = get();
        return orders.find(order => order.id === orderId);
      },

      getRecentOrders: (limit = 10) => {
        const { orders } = get();
        return orders
          .sort((a, b) => {
            const dateA =
              typeof a.orderDate === 'string'
                ? new Date(a.orderDate)
                : a.orderDate;
            const dateB =
              typeof b.orderDate === 'string'
                ? new Date(b.orderDate)
                : b.orderDate;
            return dateB.getTime() - dateA.getTime();
          })
          .slice(0, limit);
      },
    }),
    {
      name: 'orders-storage',
    }
  )
);
