// Menu Item Types
export interface MenuItem {
  id: string;
  nameKey: string; // Key for translation
  descriptionKey: string; // Key for translation
  price: number;
  image: string;
  category: 'starters' | 'mains' | 'drinks' | 'desserts';
  featured?: boolean;
}

export interface MenuCategory {
  id: string;
  nameKey: string;
  items: MenuItem[];
}

// Static Menu Data
export const menuData: MenuCategory[] = [
  {
    id: 'starters',
    nameKey: 'menu.categories.starters',
    items: [
      {
        id: 'bruschetta',
        nameKey: 'menuItems.bruschetta.name',
        descriptionKey: 'menuItems.bruschetta.description',
        price: 12,
        image:
          'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400&h=300&fit=crop',
        category: 'starters',
      },
      {
        id: 'antipasto',
        nameKey: 'menuItems.antipasto.name',
        descriptionKey: 'menuItems.antipasto.description',
        price: 18,
        image:
          'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop',
        category: 'starters',
      },
      {
        id: 'arancini',
        nameKey: 'menuItems.arancini.name',
        descriptionKey: 'menuItems.arancini.description',
        price: 14,
        image:
          'https://images.unsplash.com/photo-1587740908075-9e245070dfaa?w=400&h=300&fit=crop',
        category: 'starters',
      },
    ],
  },
  {
    id: 'mains',
    nameKey: 'menu.categories.mains',
    items: [
      {
        id: 'ossoBuco',
        nameKey: 'menuItems.ossoBuco.name',
        descriptionKey: 'menuItems.ossoBuco.description',
        price: 35,
        image:
          'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
        category: 'mains',
        featured: true,
      },
      {
        id: 'linguine',
        nameKey: 'menuItems.linguine.name',
        descriptionKey: 'menuItems.linguine.description',
        price: 28,
        image:
          'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop',
        category: 'mains',
      },
      {
        id: 'branzino',
        nameKey: 'menuItems.branzino.name',
        descriptionKey: 'menuItems.branzino.description',
        price: 32,
        image:
          'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&h=300&fit=crop',
        category: 'mains',
      },
    ],
  },
  {
    id: 'drinks',
    nameKey: 'menu.categories.drinks',
    items: [
      {
        id: 'chianti',
        nameKey: 'menuItems.chianti.name',
        descriptionKey: 'menuItems.chianti.description',
        price: 45,
        image:
          'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=400&h=300&fit=crop',
        category: 'drinks',
      },
      {
        id: 'limoncello',
        nameKey: 'menuItems.limoncello.name',
        descriptionKey: 'menuItems.limoncello.description',
        price: 8,
        image:
          'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop',
        category: 'drinks',
      },
      {
        id: 'espresso',
        nameKey: 'menuItems.espresso.name',
        descriptionKey: 'menuItems.espresso.description',
        price: 4,
        image:
          'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop',
        category: 'drinks',
      },
      {
        id: 'cappuccino',
        nameKey: 'menuItems.cappuccino.name',
        descriptionKey: 'menuItems.cappuccino.description',
        price: 5,
        image:
          'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=300&fit=crop',
        category: 'drinks',
      },
    ],
  },
  {
    id: 'desserts',
    nameKey: 'menu.categories.desserts',
    items: [
      {
        id: 'tiramisu',
        nameKey: 'menuItems.tiramisu.name',
        descriptionKey: 'menuItems.tiramisu.description',
        price: 9,
        image:
          'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop',
        category: 'desserts',
      },
      {
        id: 'pannaCotta',
        nameKey: 'menuItems.pannaCotta.name',
        descriptionKey: 'menuItems.pannaCotta.description',
        price: 8,
        image:
          'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop',
        category: 'desserts',
      },
    ],
  },
];

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

// Helper function to get items by category
export const getItemsByCategory = (category: string): MenuItem[] => {
  const categoryData = menuData.find(cat => cat.id === category);
  return categoryData ? categoryData.items : [];
};

// Helper function to get all items
export const getAllItems = (): MenuItem[] => {
  return menuData.flatMap(category => category.items);
};

// Helper function to get featured items
export const getFeaturedItems = (): MenuItem[] => {
  return getAllItems().filter(item => item.featured);
};

// Helper function to get item by ID
export const getItemById = (id: string): MenuItem | undefined => {
  return getAllItems().find(item => item.id === id);
};
