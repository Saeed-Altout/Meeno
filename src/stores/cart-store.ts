import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { MenuItem } from '../data';

export interface CartItem extends MenuItem {
  quantity: number;
  notes?: string;
}

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
  addToCart: (item: MenuItem, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getItemQuantity: (itemId: string) => number;
  addNote: (itemId: string, notes: string) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      itemCount: 0,

      addToCart: (item: MenuItem, quantity = 1) => {
        const { items } = get();
        const existingItem = items.find(cartItem => cartItem.id === item.id);

        if (existingItem) {
          set(state => ({
            items: state.items.map(cartItem =>
              cartItem.id === item.id
                ? { ...cartItem, quantity: cartItem.quantity + quantity }
                : cartItem
            ),
          }));
        } else {
          set(state => ({
            items: [...state.items, { ...item, quantity }],
          }));
        }

        // Recalculate totals
        const { items: updatedItems } = get();
        const total = updatedItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        const itemCount = updatedItems.reduce(
          (sum, item) => sum + item.quantity,
          0
        );

        set({ total, itemCount });
      },

      removeFromCart: (itemId: string) => {
        set(state => ({
          items: state.items.filter(item => item.id !== itemId),
        }));

        // Recalculate totals
        const { items } = get();
        const total = items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

        set({ total, itemCount });
      },

      updateQuantity: (itemId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeFromCart(itemId);
          return;
        }

        set(state => ({
          items: state.items.map(item =>
            item.id === itemId ? { ...item, quantity } : item
          ),
        }));

        // Recalculate totals
        const { items } = get();
        const total = items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

        set({ total, itemCount });
      },

      getItemQuantity: (itemId: string) => {
        const { items } = get();
        const item = items.find(cartItem => cartItem.id === itemId);
        return item ? item.quantity : 0;
      },

      addNote: (itemId: string, notes: string) => {
        set(state => ({
          items: state.items.map(item =>
            item.id === itemId ? { ...item, notes } : item
          ),
        }));
      },

      clearCart: () => {
        set({ items: [], total: 0, itemCount: 0 });
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
