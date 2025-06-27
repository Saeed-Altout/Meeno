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
  orderDate: Date;
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
  const mockOrders: Order[] = [
    {
      id: '1',
      orderNumber: 'ORD-001',
      items: [
        {
          id: 'mushroom-pizza',
          nameKey: 'Mushroom Pizza',
          descriptionKey: 'Delicious mushroom pizza with cheese',
          price: 7.49,
          image:
            'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&h=600&fit=crop&auto=format',
          category: 'mains',
          quantity: 2,
          notes: 'Extra cheese please',
        },
        {
          id: 'cappuccino',
          nameKey: 'Cappuccino',
          descriptionKey: 'Creamy cappuccino with perfect foam art',
          price: 5.0,
          image:
            'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=300&fit=crop',
          category: 'drinks',
          quantity: 1,
        },
      ],
      total: 19.98,
      status: 'delivered',
      orderDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      customerInfo: {
        name: 'John Doe',
        table: 'Table 5',
      },
    },
    {
      id: '2',
      orderNumber: 'ORD-002',
      items: [
        {
          id: 'spaghetti',
          nameKey: 'Spaghetti',
          descriptionKey: 'Classic Italian pasta with rich tomato sauce',
          price: 7.29,
          image:
            'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&h=600&fit=crop&auto=format',
          category: 'mains',
          quantity: 1,
        },
        {
          id: 'tiramisu',
          nameKey: 'Tiramisu',
          descriptionKey: 'Classic tiramisu with mascarpone and espresso',
          price: 9.0,
          image:
            'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop',
          category: 'desserts',
          quantity: 1,
        },
      ],
      total: 16.29,
      status: 'ready',
      orderDate: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      estimatedTime: 5,
      customerInfo: {
        name: 'Jane Smith',
        table: 'Table 3',
      },
    },
    {
      id: '3',
      orderNumber: 'ORD-003',
      items: [
        {
          id: 'bruschetta',
          nameKey: 'Bruschetta Classica',
          descriptionKey:
            'Toasted bread with fresh tomatoes, basil, and garlic',
          price: 12.0,
          image:
            'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400&h=300&fit=crop',
          category: 'starters',
          quantity: 2,
        },
        {
          id: 'veggie-pizza',
          nameKey: 'Vegetable Pizza',
          descriptionKey: 'Fresh vegetables on crispy pizza base',
          price: 5.49,
          image:
            'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&h=600&fit=crop&auto=format',
          category: 'mains',
          quantity: 1,
          notes: 'No olives',
        },
      ],
      total: 29.49,
      status: 'preparing',
      orderDate: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
      estimatedTime: 10,
      customerInfo: {
        name: 'Mike Johnson',
        table: 'Table 7',
      },
    },
    {
      id: '4',
      orderNumber: 'ORD-004',
      items: [
        {
          id: 'espresso',
          nameKey: 'Italian Espresso',
          descriptionKey: 'Rich and bold espresso from premium Italian beans',
          price: 4.0,
          image:
            'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop',
          category: 'drinks',
          quantity: 3,
        },
      ],
      total: 12.0,
      status: 'pending',
      orderDate: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
      estimatedTime: 15,
      customerInfo: {
        name: 'Sarah Wilson',
        table: 'Table 2',
      },
    },
  ];

  return mockOrders;
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
          .sort(
            (a, b) =>
              new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
          )
          .slice(0, limit);
      },
    }),
    {
      name: 'orders-storage',
    }
  )
);
