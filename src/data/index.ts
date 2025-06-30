// Menu Item Types
export interface MenuItem {
  id: string;
  nameKey: string; // Key for translation
  descriptionKey: string; // Key for translation
  price: number;
  image: string;
  category: 'starters' | 'mains' | 'drinks' | 'desserts';
  featured?: boolean;
  rating?: number;
  preparationTime?: number; // in minutes
}

export interface MenuCategory {
  id: string;
  nameKey: string;
  items: MenuItem[];
}

// Re-export from extended-menu-data.ts
export {
  extendedMenuData,
  getItemsPage,
  simulateLoadingDelay,
} from './extended-menu-data';

// Original menu data (legacy support)
export const menuData: Record<string, MenuItem[]> = {
  starters: [
    {
      id: 'bruschetta',
      nameKey: 'menuItems.bruschetta.name',
      descriptionKey: 'menuItems.bruschetta.description',
      price: 8.99,
      image:
        'https://images.unsplash.com/photo-1572441712603-2932b0c2e8a3?w=400&h=300&fit=crop',
      category: 'starters',
      featured: true,
      rating: 4.5,
    },
    {
      id: 'mozzarella-sticks',
      nameKey: 'menuItems.mozzarellaSticks.name',
      descriptionKey: 'menuItems.mozzarellaSticks.description',
      price: 7.99,
      image:
        'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=400&h=300&fit=crop',
      category: 'starters',
      rating: 4.3,
    },
  ],
  mains: [
    {
      id: 'spaghetti-carbonara',
      nameKey: 'menuItems.spaghettiCarbonara.name',
      descriptionKey: 'menuItems.spaghettiCarbonara.description',
      price: 16.99,
      image:
        'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop',
      category: 'mains',
      featured: true,
      rating: 4.8,
    },
    {
      id: 'lasagna',
      nameKey: 'menuItems.lasagna.name',
      descriptionKey: 'menuItems.lasagna.description',
      price: 18.99,
      image:
        'https://images.unsplash.com/photo-1619899686584-67728f5e55a4?w=400&h=300&fit=crop',
      category: 'mains',
      rating: 4.6,
    },
  ],
  drinks: [
    {
      id: 'coca-cola',
      nameKey: 'menuItems.cocaCola.name',
      descriptionKey: 'menuItems.cocaCola.description',
      price: 2.99,
      image:
        'https://images.unsplash.com/photo-1581098365948-6a5a912b3a2f?w=400&h=300&fit=crop',
      category: 'drinks',
      rating: 4.2,
    },
    {
      id: 'italian-coffee',
      nameKey: 'menuItems.italianCoffee.name',
      descriptionKey: 'menuItems.italianCoffee.description',
      price: 3.99,
      image:
        'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop',
      category: 'drinks',
      featured: true,
      rating: 4.7,
    },
  ],
  desserts: [
    {
      id: 'tiramisu',
      nameKey: 'menuItems.tiramisu.name',
      descriptionKey: 'menuItems.tiramisu.description',
      price: 6.99,
      image:
        'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=300&fit=crop',
      category: 'desserts',
      featured: true,
      rating: 4.9,
    },
    {
      id: 'gelato',
      nameKey: 'menuItems.gelato.name',
      descriptionKey: 'menuItems.gelato.description',
      price: 4.99,
      image:
        'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop',
      category: 'desserts',
      rating: 4.4,
    },
  ],
};

// Restaurant Information
export const restaurantInfo = {
  name: 'La Tavola',
  phone: '+1 (212) 555-0123',
  whatsapp: '+1 (212) 555-0123',
  email: 'info@latavolarestaurant.com',
  address: {
    street: '123 Italian Way',
    city: 'Little Italy, NY 10013',
    country: 'United States',
  },
  social: {
    instagram: 'https://instagram.com/latavola',
    facebook: 'https://facebook.com/latavola',
  },
  images: {
    hero: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&h=900&fit=crop',
    about:
      'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&h=400&fit=crop',
    interior:
      'https://images.unsplash.com/photo-1551632436-cbf8dd35adad?w=600&h=400&fit=crop',
  },
};

// Utility functions
export const getItemsByCategory = (category: string): MenuItem[] => {
  return menuData[category] || [];
};

export const getAllItems = (): MenuItem[] => {
  return Object.values(menuData).flat();
};

export const getFeaturedItems = (): MenuItem[] => {
  return getAllItems().filter(item => item.featured);
};

export const getItemById = (id: string): MenuItem | undefined => {
  return getAllItems().find(item => item.id === id);
};
