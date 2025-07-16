import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { MenuItem } from '../data';

export interface OrderItem extends MenuItem {
  quantity: number;
  notes?: string;
}

interface OrderState {
  items: OrderItem[];
  addToOrder: (item: MenuItem, quantity?: number) => void;
  removeFromOrder: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearOrder: () => void;
  getItemQuantity: (itemId: string) => number;
  addNote: (itemId: string, notes: string) => void;
}

// Helper function to calculate totals
const calculateTotals = (items: OrderItem[]) => {
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  return { total, itemCount };
};

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      items: [],

      addToOrder: (item: MenuItem, quantity = 1) => {
        const { items } = get();
        const existingItem = items.find(orderItem => orderItem.id === item.id);

        let updatedItems: OrderItem[];
        if (existingItem) {
          updatedItems = items.map(orderItem =>
            orderItem.id === item.id
              ? { ...orderItem, quantity: orderItem.quantity + quantity }
              : orderItem
          );
        } else {
          updatedItems = [...items, { ...item, quantity }];
        }

        set({ items: updatedItems });
      },

      removeFromOrder: (itemId: string) => {
        const { items } = get();
        const updatedItems = items.filter(item => item.id !== itemId);
        set({ items: updatedItems });
      },

      updateQuantity: (itemId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeFromOrder(itemId);
          return;
        }

        const { items } = get();
        const updatedItems = items.map(item =>
          item.id === itemId ? { ...item, quantity } : item
        );
        set({ items: updatedItems });
      },

      getItemQuantity: (itemId: string) => {
        const { items } = get();
        const item = items.find(orderItem => orderItem.id === itemId);
        return item ? item.quantity : 0;
      },

      addNote: (itemId: string, notes: string) => {
        const { items } = get();
        const updatedItems = items.map(item =>
          item.id === itemId ? { ...item, notes } : item
        );
        set({ items: updatedItems });
      },

      clearOrder: () => {
        set({ items: [] });
      },
    }),
    {
      name: 'order-storage',
    }
  )
);

// Custom hook to get calculated totals
export const useOrderTotals = () => {
  const items = useOrderStore(state => state.items);
  return calculateTotals(items);
};
