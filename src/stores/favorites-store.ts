import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { MenuItem } from '../data';

interface FavoritesState {
  favorites: MenuItem[];
  addToFavorites: (item: MenuItem) => void;
  removeFromFavorites: (itemId: string) => void;
  isFavorite: (itemId: string) => boolean;
  clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      addToFavorites: (item: MenuItem) => {
        const { favorites } = get();
        if (!favorites.find(fav => fav.id === item.id)) {
          set({ favorites: [...favorites, item] });
        }
      },

      removeFromFavorites: (itemId: string) => {
        const { favorites } = get();
        set({ favorites: favorites.filter(fav => fav.id !== itemId) });
      },

      isFavorite: (itemId: string) => {
        const { favorites } = get();
        return favorites.some(fav => fav.id === itemId);
      },

      clearFavorites: () => {
        set({ favorites: [] });
      },
    }),
    {
      name: 'favorites-storage',
    }
  )
);
