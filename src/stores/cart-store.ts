import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { MenuItem } from '../data';

export interface CartItem extends MenuItem {
  quantity: number;
  notes?: string;
}

interface CartState {
  items: CartItem[];
  addToCart: (item: MenuItem, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getItemQuantity: (itemId: string) => number;
  addNote: (itemId: string, notes: string) => void;
}

// Helper function to calculate totals
const calculateTotals = (items: CartItem[]) => {
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  return { total, itemCount };
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (item: MenuItem, quantity = 1) => {
        const { items } = get();
        const existingItem = items.find(cartItem => cartItem.id === item.id);

        let updatedItems: CartItem[];
        if (existingItem) {
          updatedItems = items.map(cartItem =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + quantity }
              : cartItem
          );
        } else {
          updatedItems = [...items, { ...item, quantity }];
        }

        set({ items: updatedItems });
      },

      removeFromCart: (itemId: string) => {
        const { items } = get();
        const updatedItems = items.filter(item => item.id !== itemId);
        set({ items: updatedItems });
      },

      updateQuantity: (itemId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeFromCart(itemId);
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
        const item = items.find(cartItem => cartItem.id === itemId);
        return item ? item.quantity : 0;
      },

      addNote: (itemId: string, notes: string) => {
        const { items } = get();
        const updatedItems = items.map(item =>
          item.id === itemId ? { ...item, notes } : item
        );
        set({ items: updatedItems });
      },

      clearCart: () => {
        set({ items: [] });
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);

// Custom hook to get calculated totals
export const useCartTotals = () => {
  const items = useCartStore(state => state.items);
  return calculateTotals(items);
};
