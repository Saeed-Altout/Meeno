import type { MenuItem } from './index';

// Default images for categories
const defaultImages = {
  pizza:
    'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop',
  fruits:
    'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=400&h=300&fit=crop',
  snacks:
    'https://images.unsplash.com/photo-1506280754576-f6fa8a873550?w=400&h=300&fit=crop',
  veggies:
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',

  burger:
    'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
  drink:
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop',
  desserts:
    'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop',
  seafood:
    'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop',
  bakery:
    'https://images.unsplash.com/photo-1530610476181-d83430b64dcd?w=400&h=300&fit=crop',
  wine: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=400&h=300&fit=crop',
  specials:
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
};

// Generate comprehensive menu data for infinite scroll demo
// Each category will have 20+ items to demonstrate pagination
export const extendedMenuData: Record<string, MenuItem[]> = {
  pizza: [
    {
      id: 'margherita-pizza',
      nameKey: 'Margherita Pizza',
      descriptionKey:
        'Classic Italian pizza with fresh mozzarella, tomato sauce, and basil',
      price: 14.99,
      image: defaultImages.pizza,
      category: 'mains',
      featured: true,
      rating: 4.8,
      preparationTime: 15,
    },
    {
      id: 'pepperoni-pizza',
      nameKey: 'Pepperoni Pizza',
      descriptionKey:
        'Spicy pepperoni slices with melted cheese and tomato sauce',
      price: 16.99,
      image: defaultImages.pizza,
      category: 'mains',
      rating: 4.7,
      preparationTime: 15,
    },
    {
      id: 'quattro-stagioni',
      nameKey: 'Quattro Stagioni',
      descriptionKey:
        'Four seasons pizza with artichokes, mushrooms, ham, and olives',
      price: 18.99,
      image: defaultImages.pizza,
      category: 'mains',
      rating: 4.6,
      preparationTime: 18,
    },
    {
      id: 'vegetable-pizza',
      nameKey: 'Vegetable Pizza',
      descriptionKey:
        'Fresh seasonal vegetables with mozzarella and tomato sauce',
      price: 15.99,
      image: defaultImages.pizza,
      category: 'mains',
      rating: 4.5,
      preparationTime: 15,
    },
    {
      id: 'mushroom-pizza',
      nameKey: 'Mushroom Pizza',
      descriptionKey: 'Sautéed mushrooms with garlic, herbs, and melted cheese',
      price: 17.49,
      image: defaultImages.pizza,
      category: 'mains',
      rating: 4.4,
      preparationTime: 16,
    },
    {
      id: 'prosciutto-pizza',
      nameKey: 'Prosciutto Pizza',
      descriptionKey:
        'Traditional pizza with prosciutto, mozzarella, and fresh basil',
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
      nameKey: 'Hawaiian Pizza',
      descriptionKey:
        'Classic pizza with ham, pineapple, and mozzarella cheese',
      price: 16.49,
      image:
        'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=300&fit=crop',
      category: 'mains',
      rating: 4.3,
      preparationTime: 15,
    },
    {
      id: 'bbq-pizza',
      nameKey: 'BBQ Chicken Pizza',
      descriptionKey:
        'BBQ sauce base with grilled chicken, red onions, and cilantro',
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
      nameKey: 'Capricciosa Pizza',
      descriptionKey:
        'Italian pizza with ham, mushrooms, artichokes, and olives',
      price: 17.99,
      image:
        'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=400&h=300&fit=crop',
      category: 'mains',
      rating: 4.5,
    },
    {
      id: 'diavola-pizza',
      nameKey: 'Diavola Pizza',
      descriptionKey: 'Spicy pizza with salami, chili peppers, and mozzarella',
      price: 16.99,
      image:
        'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop',
      category: 'mains',
      rating: 4.7,
    },
    {
      id: 'seafood-pizza',
      nameKey: 'Seafood Pizza',
      descriptionKey:
        'Fresh seafood pizza with shrimp, calamari, and garlic sauce',
      price: 21.99,
      image:
        'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=300&fit=crop',
      category: 'mains',
      rating: 4.4,
    },
    {
      id: 'truffle-pizza',
      nameKey: 'Truffle Pizza',
      descriptionKey:
        'Luxury pizza with black truffle, wild mushrooms, and aged cheese',
      price: 24.99,
      image:
        'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400&h=300&fit=crop',
      category: 'mains',
      featured: true,
      rating: 4.8,
    },
    {
      id: 'white-pizza',
      nameKey: 'White Pizza',
      descriptionKey:
        'Creamy white pizza with ricotta, mozzarella, and fresh herbs',
      price: 15.49,
      image:
        'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop',
      category: 'mains',
      rating: 4.3,
    },
    {
      id: 'meat-lovers-pizza',
      nameKey: 'Meat Lovers Pizza',
      descriptionKey: 'Loaded pizza with pepperoni, sausage, bacon, and ham',
      price: 20.99,
      image:
        'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop',
      category: 'mains',
      rating: 4.6,
    },
    {
      id: 'spinach-ricotta-pizza',
      nameKey: 'Spinach Ricotta Pizza',
      descriptionKey: 'Fresh spinach and creamy ricotta cheese on crispy crust',
      price: 16.49,
      image:
        'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop',
      category: 'mains',
      rating: 4.4,
    },
    {
      id: 'calzone',
      nameKey: 'Calzone',
      descriptionKey: 'Folded pizza with ham, mushrooms, and mozzarella',
      price: 14.99,
      image:
        'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400&h=300&fit=crop',
      category: 'mains',
      rating: 4.5,
    },
    {
      id: 'gluten-free-pizza',
      nameKey: 'Gluten-Free Pizza',
      descriptionKey:
        'Celiac-friendly pizza with gluten-free crust and fresh toppings',
      price: 17.99,
      image:
        'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop',
      category: 'mains',
      rating: 4.2,
    },
    {
      id: 'vegan-pizza',
      nameKey: 'Vegan Pizza',
      descriptionKey:
        'Plant-based pizza with dairy-free cheese and fresh vegetables',
      price: 16.99,
      image:
        'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400&h=300&fit=crop',
      category: 'mains',
      rating: 4.3,
    },
    {
      id: 'artichoke-pizza',
      nameKey: 'Artichoke Pizza',
      descriptionKey: 'Marinated artichoke hearts with garlic and parmesan',
      price: 17.49,
      image:
        'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop',
      category: 'mains',
      rating: 4.4,
    },
    {
      id: 'goat-cheese-pizza',
      nameKey: 'Goat Cheese Pizza',
      descriptionKey: 'Creamy goat cheese with caramelized onions and herbs',
      price: 18.99,
      image:
        'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop',
      category: 'mains',
      rating: 4.6,
    },
  ],

  fruits: [
    {
      id: 'fresh-apples',
      nameKey: 'Fresh Apples',
      descriptionKey: 'Crisp red and green apples, perfect for a healthy snack',
      price: 4.99,
      image: defaultImages.fruits,
      category: 'starters',
      rating: 4.5,
    },
    {
      id: 'banana-bunch',
      nameKey: 'Banana Bunch',
      descriptionKey: 'Sweet yellow bananas, rich in potassium and energy',
      price: 3.99,
      image: defaultImages.fruits,
      category: 'starters',
      rating: 4.3,
    },
    {
      id: 'oranges',
      nameKey: 'Fresh Oranges',
      descriptionKey:
        'Juicy oranges packed with vitamin C and natural sweetness',
      price: 5.49,
      image: defaultImages.fruits,
      category: 'starters',
      rating: 4.4,
    },
    {
      id: 'strawberries',
      nameKey: 'Strawberries',
      descriptionKey:
        'Sweet red strawberries, perfect for desserts or snacking',
      price: 6.99,
      image: defaultImages.fruits,
      category: 'starters',
      rating: 4.6,
      featured: true,
    },
    {
      id: 'grapes',
      nameKey: 'Seedless Grapes',
      descriptionKey: 'Sweet seedless grapes, great for wine or snacking',
      price: 4.49,
      image: defaultImages.fruits,
      category: 'starters',
      rating: 4.2,
    },
    {
      id: 'pineapple',
      nameKey: 'Fresh Pineapple',
      descriptionKey: 'Tropical pineapple, sweet and tangy flavor',
      price: 7.99,
      image: defaultImages.fruits,
      category: 'starters',
      rating: 4.4,
    },
    {
      id: 'mango',
      nameKey: 'Ripe Mango',
      descriptionKey: 'Sweet and juicy mango, perfect tropical treat',
      price: 5.99,
      image: defaultImages.fruits,
      category: 'starters',
      rating: 4.5,
    },
    {
      id: 'kiwi',
      nameKey: 'Fresh Kiwi',
      descriptionKey: 'Tangy kiwi fruit with bright green flesh',
      price: 4.99,
      image: defaultImages.fruits,
      category: 'starters',
      rating: 4.3,
    },
  ],

  snacks: [
    {
      id: 'potato-chips',
      nameKey: 'Crispy Potato Chips',
      descriptionKey: 'Golden crispy potato chips with sea salt',
      price: 3.99,
      image: defaultImages.snacks,
      category: 'starters',
      rating: 4.2,
    },
    {
      id: 'popcorn',
      nameKey: 'Buttered Popcorn',
      descriptionKey: 'Fresh popped corn with melted butter and salt',
      price: 4.49,
      image: defaultImages.snacks,
      category: 'starters',
      rating: 4.3,
    },
    {
      id: 'nachos',
      nameKey: 'Loaded Nachos',
      descriptionKey: 'Tortilla chips topped with cheese, jalapeños, and salsa',
      price: 8.99,
      image: defaultImages.snacks,
      category: 'starters',
      rating: 4.5,
      featured: true,
    },
    {
      id: 'mozzarella-sticks',
      nameKey: 'Mozzarella Sticks',
      descriptionKey: 'Breaded mozzarella sticks served with marinara sauce',
      price: 6.99,
      image: defaultImages.snacks,
      category: 'starters',
      rating: 4.4,
    },
    {
      id: 'onion-rings',
      nameKey: 'Crispy Onion Rings',
      descriptionKey: 'Beer-battered onion rings with dipping sauce',
      price: 5.99,
      image: defaultImages.snacks,
      category: 'starters',
      rating: 4.1,
    },
    {
      id: 'chicken-wings',
      nameKey: 'Buffalo Wings',
      descriptionKey: 'Spicy buffalo chicken wings with blue cheese dip',
      price: 12.99,
      image: defaultImages.snacks,
      category: 'starters',
      rating: 4.6,
    },
    {
      id: 'garlic-bread',
      nameKey: 'Garlic Bread',
      descriptionKey: 'Toasted bread with garlic butter and herbs',
      price: 4.99,
      image: defaultImages.snacks,
      category: 'starters',
      rating: 4.3,
    },
    {
      id: 'cheese-platter',
      nameKey: 'Cheese Platter',
      descriptionKey: 'Assorted Italian cheeses with crackers and honey',
      price: 15.99,
      image: defaultImages.snacks,
      category: 'starters',
      rating: 4.7,
    },
  ],

  veggies: [
    {
      id: 'caesar-salad',
      nameKey: 'Caesar Salad',
      descriptionKey: 'Fresh romaine lettuce with Caesar dressing and parmesan',
      price: 9.99,
      image: defaultImages.veggies,
      category: 'starters',
      rating: 4.4,
    },
    {
      id: 'garden-salad',
      nameKey: 'Garden Salad',
      descriptionKey: 'Mixed greens with tomatoes, cucumbers, and vinaigrette',
      price: 8.99,
      image: defaultImages.veggies,
      category: 'starters',
      rating: 4.2,
    },
    {
      id: 'caprese-salad',
      nameKey: 'Caprese Salad',
      descriptionKey: 'Fresh mozzarella, tomatoes, and basil with balsamic',
      price: 11.99,
      image: defaultImages.veggies,
      category: 'starters',
      rating: 4.6,
      featured: true,
    },
    {
      id: 'roasted-vegetables',
      nameKey: 'Roasted Vegetables',
      descriptionKey: 'Seasonal vegetables roasted with herbs and olive oil',
      price: 10.99,
      image: defaultImages.veggies,
      category: 'starters',
      rating: 4.3,
    },
    {
      id: 'spinach-salad',
      nameKey: 'Spinach Salad',
      descriptionKey:
        'Fresh spinach with strawberries, nuts, and poppy seed dressing',
      price: 9.49,
      image: defaultImages.veggies,
      category: 'starters',
      rating: 4.5,
    },
    {
      id: 'bruschetta',
      nameKey: 'Bruschetta',
      descriptionKey: 'Toasted bread topped with tomatoes, garlic, and basil',
      price: 7.99,
      image: defaultImages.veggies,
      category: 'starters',
      rating: 4.4,
    },
    {
      id: 'antipasto-platter',
      nameKey: 'Antipasto Platter',
      descriptionKey: 'Assorted Italian vegetables, olives, and cured meats',
      price: 14.99,
      image: defaultImages.veggies,
      category: 'starters',
      rating: 4.7,
    },
    {
      id: 'minestrone-soup',
      nameKey: 'Minestrone Soup',
      descriptionKey: 'Hearty vegetable soup with pasta and beans',
      price: 8.99,
      image: defaultImages.veggies,
      category: 'starters',
      rating: 4.3,
    },
  ],

  burger: [
    {
      id: 'classic-burger',
      nameKey: 'Classic Cheeseburger',
      descriptionKey:
        'Juicy beef patty with cheese, lettuce, tomato, and special sauce',
      price: 12.99,
      image: defaultImages.burger,
      category: 'mains',
      rating: 4.5,
    },
    {
      id: 'bacon-burger',
      nameKey: 'Bacon Cheeseburger',
      descriptionKey:
        'Beef burger with crispy bacon, cheese, and all the fixings',
      price: 14.99,
      image: defaultImages.burger,
      category: 'mains',
      rating: 4.6,
      featured: true,
    },
    {
      id: 'mushroom-burger',
      nameKey: 'Mushroom Swiss Burger',
      descriptionKey: 'Beef burger with sautéed mushrooms and Swiss cheese',
      price: 13.99,
      image: defaultImages.burger,
      category: 'mains',
      rating: 4.4,
    },
    {
      id: 'veggie-burger',
      nameKey: 'Veggie Burger',
      descriptionKey:
        'Plant-based patty with fresh vegetables and vegan cheese',
      price: 11.99,
      image: defaultImages.burger,
      category: 'mains',
      rating: 4.3,
    },
    {
      id: 'double-burger',
      nameKey: 'Double Cheeseburger',
      descriptionKey: 'Two beef patties with double cheese and special sauce',
      price: 16.99,
      image: defaultImages.burger,
      category: 'mains',
      rating: 4.7,
    },
    {
      id: 'bbq-burger',
      nameKey: 'BBQ Burger',
      descriptionKey: 'Beef burger with BBQ sauce, onion rings, and cheddar',
      price: 15.99,
      image: defaultImages.burger,
      category: 'mains',
      rating: 4.5,
    },
  ],

  drink: [
    {
      id: 'espresso',
      nameKey: 'Espresso',
      descriptionKey: 'Strong Italian coffee served in a small cup',
      price: 3.99,
      image: defaultImages.drink,
      category: 'drinks',
      rating: 4.4,
    },
    {
      id: 'cappuccino',
      nameKey: 'Cappuccino',
      descriptionKey: 'Espresso with steamed milk and milk foam',
      price: 4.99,
      image: defaultImages.drink,
      category: 'drinks',
      rating: 4.5,
    },
    {
      id: 'latte',
      nameKey: 'Café Latte',
      descriptionKey: 'Espresso with steamed milk and a small amount of foam',
      price: 4.49,
      image: defaultImages.drink,
      category: 'drinks',
      rating: 4.3,
    },
    {
      id: 'americano',
      nameKey: 'Americano',
      descriptionKey: 'Espresso with hot water for a milder taste',
      price: 3.49,
      image: defaultImages.drink,
      category: 'drinks',
      rating: 4.2,
    },
    {
      id: 'mocha',
      nameKey: 'Mocha',
      descriptionKey: 'Espresso with chocolate and steamed milk',
      price: 5.49,
      image: defaultImages.drink,
      category: 'drinks',
      rating: 4.6,
      featured: true,
    },
    {
      id: 'iced-coffee',
      nameKey: 'Iced Coffee',
      descriptionKey: 'Chilled coffee served over ice with cream',
      price: 4.99,
      image: defaultImages.drink,
      category: 'drinks',
      rating: 4.3,
    },
    {
      id: 'hot-tea',
      nameKey: 'Hot Tea',
      descriptionKey: 'Selection of premium teas served hot',
      price: 2.99,
      image: defaultImages.drink,
      category: 'drinks',
      rating: 4.1,
    },
    {
      id: 'lemonade',
      nameKey: 'Fresh Lemonade',
      descriptionKey: 'Homemade lemonade with fresh lemons and mint',
      price: 3.99,
      image: defaultImages.drink,
      category: 'drinks',
      rating: 4.4,
    },
  ],

  desserts: [
    {
      id: 'tiramisu',
      nameKey: 'Tiramisu',
      descriptionKey:
        'Classic Italian dessert with coffee-soaked ladyfingers and mascarpone',
      price: 8.99,
      image: defaultImages.desserts,
      category: 'desserts',
      rating: 4.7,
      featured: true,
    },
    {
      id: 'chocolate-cake',
      nameKey: 'Chocolate Cake',
      descriptionKey: 'Rich chocolate cake with chocolate ganache frosting',
      price: 7.99,
      image: defaultImages.desserts,
      category: 'desserts',
      rating: 4.5,
    },
    {
      id: 'cheesecake',
      nameKey: 'New York Cheesecake',
      descriptionKey: 'Creamy cheesecake with graham cracker crust',
      price: 8.49,
      image: defaultImages.desserts,
      category: 'desserts',
      rating: 4.6,
    },
    {
      id: 'ice-cream',
      nameKey: 'Gelato',
      descriptionKey: 'Italian ice cream in various flavors',
      price: 5.99,
      image: defaultImages.desserts,
      category: 'desserts',
      rating: 4.4,
    },
    {
      id: 'cannoli',
      nameKey: 'Cannoli',
      descriptionKey: 'Crispy pastry shells filled with sweet ricotta cream',
      price: 6.99,
      image: defaultImages.desserts,
      category: 'desserts',
      rating: 4.5,
    },
    {
      id: 'panna-cotta',
      nameKey: 'Panna Cotta',
      descriptionKey: 'Silky Italian custard with berry sauce',
      price: 7.49,
      image: defaultImages.desserts,
      category: 'desserts',
      rating: 4.3,
    },
  ],

  seafood: [
    {
      id: 'grilled-salmon',
      nameKey: 'Grilled Salmon',
      descriptionKey: 'Fresh Atlantic salmon grilled with herbs and lemon',
      price: 24.99,
      image: defaultImages.seafood,
      category: 'mains',
      rating: 4.6,
      featured: true,
    },
    {
      id: 'shrimp-scampi',
      nameKey: 'Shrimp Scampi',
      descriptionKey: 'Jumbo shrimp sautéed in garlic, butter, and white wine',
      price: 22.99,
      image: defaultImages.seafood,
      category: 'mains',
      rating: 4.5,
    },
    {
      id: 'lobster-thermidor',
      nameKey: 'Lobster Thermidor',
      descriptionKey: 'Classic French lobster dish with cream sauce',
      price: 34.99,
      image: defaultImages.seafood,
      category: 'mains',
      rating: 4.8,
    },
    {
      id: 'seafood-pasta',
      nameKey: 'Seafood Pasta',
      descriptionKey: 'Linguine with mixed seafood in tomato sauce',
      price: 26.99,
      image: defaultImages.seafood,
      category: 'mains',
      rating: 4.4,
    },
    {
      id: 'fish-and-chips',
      nameKey: 'Fish and Chips',
      descriptionKey: 'Beer-battered cod with crispy fries and tartar sauce',
      price: 18.99,
      image: defaultImages.seafood,
      category: 'mains',
      rating: 4.3,
    },
  ],

  bakery: [
    {
      id: 'croissant',
      nameKey: 'Butter Croissant',
      descriptionKey: 'Flaky French croissant with butter',
      price: 3.99,
      image: defaultImages.bakery,
      category: 'starters',
      rating: 4.5,
    },
    {
      id: 'chocolate-croissant',
      nameKey: 'Chocolate Croissant',
      descriptionKey: 'Croissant filled with dark chocolate',
      price: 4.49,
      image: defaultImages.bakery,
      category: 'starters',
      rating: 4.6,
      featured: true,
    },
    {
      id: 'focaccia',
      nameKey: 'Focaccia Bread',
      descriptionKey: 'Italian flatbread with olive oil and herbs',
      price: 4.99,
      image: defaultImages.bakery,
      category: 'starters',
      rating: 4.4,
    },
    {
      id: 'ciabatta',
      nameKey: 'Ciabatta Bread',
      descriptionKey: 'Italian bread with crispy crust and soft interior',
      price: 3.49,
      image: defaultImages.bakery,
      category: 'starters',
      rating: 4.3,
    },
    {
      id: 'garlic-bread',
      nameKey: 'Garlic Bread',
      descriptionKey: 'Toasted bread with garlic butter and herbs',
      price: 4.99,
      image: defaultImages.bakery,
      category: 'starters',
      rating: 4.4,
    },
  ],

  wine: [
    {
      id: 'chianti',
      nameKey: 'Chianti Classico',
      descriptionKey: 'Italian red wine from Tuscany',
      price: 18.99,
      image: defaultImages.wine,
      category: 'drinks',
      rating: 4.5,
    },
    {
      id: 'pinot-grigio',
      nameKey: 'Pinot Grigio',
      descriptionKey: 'Crisp Italian white wine',
      price: 16.99,
      image: defaultImages.wine,
      category: 'drinks',
      rating: 4.4,
    },
    {
      id: 'prosecco',
      nameKey: 'Prosecco',
      descriptionKey: 'Italian sparkling wine',
      price: 14.99,
      image: defaultImages.wine,
      category: 'drinks',
      rating: 4.6,
      featured: true,
    },
    {
      id: 'barolo',
      nameKey: 'Barolo',
      descriptionKey: 'Premium Italian red wine from Piedmont',
      price: 28.99,
      image: defaultImages.wine,
      category: 'drinks',
      rating: 4.7,
    },
    {
      id: 'moscato',
      nameKey: "Moscato d'Asti",
      descriptionKey: 'Sweet Italian dessert wine',
      price: 12.99,
      image: defaultImages.wine,
      category: 'drinks',
      rating: 4.3,
    },
  ],

  specials: [
    {
      id: 'chef-special-pasta',
      nameKey: "Chef's Special Pasta",
      descriptionKey: "Chef's daily pasta creation with premium ingredients",
      price: 24.99,
      image:
        'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=300&fit=crop',
      category: 'mains',
      rating: 4.8,
      featured: true,
    },
    {
      id: 'truffle-risotto',
      nameKey: 'Truffle Risotto',
      descriptionKey: 'Creamy risotto with black truffle and parmesan',
      price: 26.99,
      image:
        'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=300&fit=crop',
      category: 'mains',
      rating: 4.7,
    },
    {
      id: 'wagyu-steak',
      nameKey: 'Wagyu Beef Steak',
      descriptionKey:
        'Premium Japanese Wagyu beef with truffle mashed potatoes',
      price: 45.99,
      image:
        'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop',
      category: 'mains',
      rating: 4.9,
      featured: true,
    },
    {
      id: 'lobster-ravioli',
      nameKey: 'Lobster Ravioli',
      descriptionKey: 'Homemade ravioli filled with lobster and ricotta',
      price: 28.99,
      image:
        'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=300&fit=crop',
      category: 'mains',
      rating: 4.6,
    },
    {
      id: 'tasting-menu',
      nameKey: "Chef's Tasting Menu",
      descriptionKey:
        'Multi-course tasting menu featuring seasonal ingredients',
      price: 65.99,
      image:
        'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=300&fit=crop',
      category: 'mains',
      rating: 4.9,
      featured: true,
    },
    {
      id: 'duck-confit',
      nameKey: 'Duck Confit',
      descriptionKey:
        'Slow-cooked duck leg with crispy skin and red wine reduction',
      price: 32.99,
      image:
        'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop',
      category: 'mains',
      rating: 4.7,
    },
    {
      id: 'lamb-chops',
      nameKey: 'Herb-Crusted Lamb Chops',
      descriptionKey: 'Rack of lamb with rosemary, garlic, and mint sauce',
      price: 38.99,
      image:
        'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop',
      category: 'mains',
      rating: 4.8,
    },
    {
      id: 'seafood-paella',
      nameKey: 'Seafood Paella',
      descriptionKey:
        'Spanish paella with saffron, shrimp, mussels, and chorizo',
      price: 34.99,
      image:
        'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop',
      category: 'mains',
      rating: 4.6,
    },
    {
      id: 'veal-scaloppini',
      nameKey: 'Veal Scaloppini',
      descriptionKey:
        'Tender veal cutlets with lemon, capers, and white wine sauce',
      price: 29.99,
      image:
        'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop',
      category: 'mains',
      rating: 4.5,
    },
    {
      id: 'wild-mushroom-risotto',
      nameKey: 'Wild Mushroom Risotto',
      descriptionKey:
        'Creamy risotto with assorted wild mushrooms and truffle oil',
      price: 25.99,
      image:
        'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop',
      category: 'mains',
      rating: 4.7,
    },
  ],
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
