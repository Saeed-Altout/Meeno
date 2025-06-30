import type { MenuItem } from './index';

// Generate comprehensive menu data for infinite scroll demo
// Each category will have 20+ items to demonstrate pagination
export const extendedMenuData: Record<string, MenuItem[]> = {
  pizza: [
    {
      id: 'margherita-pizza',
      nameKey: 'menuItems.margheritaPizza.name',
      descriptionKey: 'menuItems.margheritaPizza.description',
      price: 14.99,
      image:
        'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop',
      category: 'mains',
      featured: true,
      rating: 4.8,
      preparationTime: 15,
    },
    {
      id: 'pepperoni-pizza',
      nameKey: 'menuItems.pepperoniPizza.name',
      descriptionKey: 'menuItems.pepperoniPizza.description',
      price: 16.99,
      image:
        'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop',
      category: 'mains',
      rating: 4.7,
      preparationTime: 15,
    },
    {
      id: 'quattro-stagioni',
      nameKey: 'menuItems.quattroStagioni.name',
      descriptionKey: 'menuItems.quattroStagioni.description',
      price: 18.99,
      image:
        'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
      category: 'mains',
      rating: 4.6,
      preparationTime: 18,
    },
    {
      id: 'vegetable-pizza',
      nameKey: 'menuItems.vegetablePizza.name',
      descriptionKey: 'menuItems.vegetablePizza.description',
      price: 15.99,
      image:
        'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400&h=300&fit=crop',
      category: 'mains',
      rating: 4.5,
      preparationTime: 15,
    },
    {
      id: 'mushroom-pizza',
      nameKey: 'menuItems.mushroomPizza.name',
      descriptionKey: 'menuItems.mushroomPizza.description',
      price: 17.49,
      image:
        'https://images.unsplash.com/photo-1595708684082-a173bb3a06c5?w=400&h=300&fit=crop',
      category: 'mains',
      rating: 4.4,
      preparationTime: 16,
    },
    {
      id: 'prosciutto-pizza',
      nameKey: 'menuItems.prosciuttoPizza.name',
      descriptionKey: 'menuItems.prosciuttoPizza.description',
      price: 19.99,
      image:
        'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=400&h=300&fit=crop',
      category: 'mains',
      featured: true,
      rating: 4.9,
      preparationTime: 17,
    },
    {
      id: 'hawaiian-pizza',
      nameKey: 'menuItems.hawaiianPizza.name',
      descriptionKey: 'menuItems.hawaiianPizza.description',
      price: 16.49,
      image:
        'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=300&fit=crop',
      category: 'mains',
      rating: 4.3,
      preparationTime: 15,
    },
    {
      id: 'bbq-pizza',
      nameKey: 'menuItems.bbqPizza.name',
      descriptionKey: 'menuItems.bbqPizza.description',
      price: 18.49,
      image:
        'https://images.unsplash.com/photo-1506280754576-f6fa8a873550?w=400&h=300&fit=crop',
      category: 'mains',
      rating: 4.6,
      preparationTime: 16,
    },
    // Adding 12 more pizza items to reach 20 total
    {
      id: 'capricciosa-pizza',
      nameKey: 'menuItems.capricciosaPizza.name',
      descriptionKey: 'menuItems.capricciosaPizza.description',
      price: 17.99,
      image:
        'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=400&h=300&fit=crop',
      category: 'mains',
      rating: 4.5,
    },
    {
      id: 'diavola-pizza',
      nameKey: 'menuItems.diavolaPizza.name',
      descriptionKey: 'menuItems.diavolaPizza.description',
      price: 16.99,
      image:
        'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop',
      category: 'mains',
      rating: 4.7,
    },
    {
      id: 'seafood-pizza',
      nameKey: 'menuItems.seafoodPizza.name',
      descriptionKey: 'menuItems.seafoodPizza.description',
      price: 21.99,
      image:
        'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=300&fit=crop',
      category: 'mains',
      rating: 4.4,
    },
    {
      id: 'truffle-pizza',
      nameKey: 'menuItems.trufflePizza.name',
      descriptionKey: 'menuItems.trufflePizza.description',
      price: 24.99,
      image:
        'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400&h=300&fit=crop',
      category: 'mains',
      featured: true,
      rating: 4.8,
    },
    {
      id: 'white-pizza',
      nameKey: 'menuItems.whitePizza.name',
      descriptionKey: 'menuItems.whitePizza.description',
      price: 15.49,
      image:
        'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop',
      category: 'mains',
      rating: 4.3,
    },
    {
      id: 'meat-lovers-pizza',
      nameKey: 'menuItems.meatLoversPizza.name',
      descriptionKey: 'menuItems.meatLoversPizza.description',
      price: 20.99,
      image:
        'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop',
      category: 'mains',
      rating: 4.6,
    },
    {
      id: 'spinach-ricotta-pizza',
      nameKey: 'menuItems.spinachRicottaPizza.name',
      descriptionKey: 'menuItems.spinachRicottaPizza.description',
      price: 16.49,
      image:
        'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
      category: 'mains',
      rating: 4.4,
    },
    {
      id: 'calzone',
      nameKey: 'menuItems.calzone.name',
      descriptionKey: 'menuItems.calzone.description',
      price: 14.99,
      image:
        'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400&h=300&fit=crop',
      category: 'mains',
      rating: 4.5,
    },
    {
      id: 'gluten-free-pizza',
      nameKey: 'menuItems.glutenFreePizza.name',
      descriptionKey: 'menuItems.glutenFreePizza.description',
      price: 17.99,
      image:
        'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop',
      category: 'mains',
      rating: 4.2,
    },
    {
      id: 'vegan-pizza',
      nameKey: 'menuItems.veganPizza.name',
      descriptionKey: 'menuItems.veganPizza.description',
      price: 16.99,
      image:
        'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400&h=300&fit=crop',
      category: 'mains',
      rating: 4.3,
    },
    {
      id: 'artichoke-pizza',
      nameKey: 'menuItems.artichokePizza.name',
      descriptionKey: 'menuItems.artichokePizza.description',
      price: 17.49,
      image:
        'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
      category: 'mains',
      rating: 4.4,
    },
    {
      id: 'goat-cheese-pizza',
      nameKey: 'menuItems.goatCheesePizza.name',
      descriptionKey: 'menuItems.goatCheesePizza.description',
      price: 18.99,
      image:
        'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop',
      category: 'mains',
      rating: 4.6,
    },
  ],

  fruits: Array.from({ length: 20 }, (_, i) => ({
    id: `fruit-item-${i + 1}`,
    nameKey: `menuItems.fruit${i + 1}.name`,
    descriptionKey: `menuItems.fruit${i + 1}.description`,
    price: 6.99 + i * 0.5,
    image: `https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=400&h=300&fit=crop&seed=${i}`,
    category: 'starters' as const,
    rating: 4.2 + Math.random() * 0.6,
  })),

  snacks: Array.from({ length: 20 }, (_, i) => ({
    id: `snack-item-${i + 1}`,
    nameKey: `menuItems.snack${i + 1}.name`,
    descriptionKey: `menuItems.snack${i + 1}.description`,
    price: 5.99 + i * 0.3,
    image: `https://images.unsplash.com/photo-1506280754576-f6fa8a873550?w=400&h=300&fit=crop&seed=${i}`,
    category: 'starters' as const,
    rating: 4.1 + Math.random() * 0.7,
  })),

  veggies: Array.from({ length: 20 }, (_, i) => ({
    id: `veggie-item-${i + 1}`,
    nameKey: `menuItems.veggie${i + 1}.name`,
    descriptionKey: `menuItems.veggie${i + 1}.description`,
    price: 8.99 + i * 0.4,
    image: `https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop&seed=${i}`,
    category: 'starters' as const,
    rating: 4.3 + Math.random() * 0.5,
  })),

  hotdog: Array.from({ length: 20 }, (_, i) => ({
    id: `hotdog-item-${i + 1}`,
    nameKey: `menuItems.hotdog${i + 1}.name`,
    descriptionKey: `menuItems.hotdog${i + 1}.description`,
    price: 9.99 + i * 0.5,
    image: `https://images.unsplash.com/photo-1551058045-6942c0e0ce2f?w=400&h=300&fit=crop&seed=${i}`,
    category: 'mains' as const,
    rating: 4.2 + Math.random() * 0.6,
  })),

  burger: Array.from({ length: 20 }, (_, i) => ({
    id: `burger-item-${i + 1}`,
    nameKey: `menuItems.burger${i + 1}.name`,
    descriptionKey: `menuItems.burger${i + 1}.description`,
    price: 12.99 + i * 0.7,
    image: `https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop&seed=${i}`,
    category: 'mains' as const,
    rating: 4.4 + Math.random() * 0.5,
  })),

  drink: Array.from({ length: 20 }, (_, i) => ({
    id: `drink-item-${i + 1}`,
    nameKey: `menuItems.drink${i + 1}.name`,
    descriptionKey: `menuItems.drink${i + 1}.description`,
    price: 2.99 + i * 0.25,
    image: `https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop&seed=${i}`,
    category: 'drinks' as const,
    rating: 4.1 + Math.random() * 0.7,
  })),

  desserts: Array.from({ length: 20 }, (_, i) => ({
    id: `dessert-item-${i + 1}`,
    nameKey: `menuItems.dessert${i + 1}.name`,
    descriptionKey: `menuItems.dessert${i + 1}.description`,
    price: 7.99 + i * 0.6,
    image: `https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop&seed=${i}`,
    category: 'desserts' as const,
    rating: 4.3 + Math.random() * 0.5,
  })),

  seafood: Array.from({ length: 20 }, (_, i) => ({
    id: `seafood-item-${i + 1}`,
    nameKey: `menuItems.seafood${i + 1}.name`,
    descriptionKey: `menuItems.seafood${i + 1}.description`,
    price: 18.99 + i * 1.2,
    image: `https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop&seed=${i}`,
    category: 'mains' as const,
    rating: 4.4 + Math.random() * 0.4,
    featured: i % 5 === 0, // Every 5th item is featured
  })),

  bakery: Array.from({ length: 20 }, (_, i) => ({
    id: `bakery-item-${i + 1}`,
    nameKey: `menuItems.bakery${i + 1}.name`,
    descriptionKey: `menuItems.bakery${i + 1}.description`,
    price: 4.99 + i * 0.4,
    image: `https://images.unsplash.com/photo-1530610476181-d83430b64dcd?w=400&h=300&fit=crop&seed=${i}`,
    category: 'starters' as const,
    rating: 4.2 + Math.random() * 0.6,
  })),

  wine: Array.from({ length: 20 }, (_, i) => ({
    id: `wine-item-${i + 1}`,
    nameKey: `menuItems.wine${i + 1}.name`,
    descriptionKey: `menuItems.wine${i + 1}.description`,
    price: 15.99 + i * 2.1,
    image: `https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=400&h=300&fit=crop&seed=${i}`,
    category: 'drinks' as const,
    rating: 4.3 + Math.random() * 0.5,
  })),

  specials: Array.from({ length: 20 }, (_, i) => ({
    id: `special-item-${i + 1}`,
    nameKey: `menuItems.special${i + 1}.name`,
    descriptionKey: `menuItems.special${i + 1}.description`,
    price: 22.99 + i * 1.5,
    image: `https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&seed=${i}`,
    category: 'mains' as const,
    rating: 4.5 + Math.random() * 0.4,
    featured: i % 3 === 0, // Every 3rd item is featured
  })),
};

// Pagination helper for infinite scroll
export const getItemsPage = (
  category: string,
  page: number,
  itemsPerPage: number = 8
): { items: MenuItem[]; hasMore: boolean } => {
  const allItems = extendedMenuData[category] || [];
  const startIndex = page * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const items = allItems.slice(startIndex, endIndex);
  const hasMore = endIndex < allItems.length;

  return { items, hasMore };
};

// Simulate API loading delay
export const simulateLoadingDelay = (ms: number = 1500): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
