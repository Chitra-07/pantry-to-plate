// Complete ingredient database with pantry basics
const ingredientsList = [
  // Fresh Produce
  'Tomatoes', 'Onions', 'Garlic', 'Bell Peppers', 'Mushrooms', 
  'Spinach', 'Lettuce', 'Cucumber', 'Carrots', 'Broccoli',
  'Potatoes', 'Sweet Potatoes', 'Avocado', 'Lemons', 'Limes',
  'Ginger', 'Fresh Herbs', 'Zucchini', 'Eggplant', 'Celery',
  'Kale', 'Cauliflower', 'Asparagus', 'Green Beans', 'Corn',
  
  // Proteins
  'Chicken', 'Chicken Breast', 'Ground Beef', 'Eggs', 'Tofu',
  'Black Beans', 'Kidney Beans', 'Lentils', 'Chickpeas', 'Fish',
  'Salmon', 'Shrimp', 'Turkey', 'Pork', 'Bacon', 'Sausage',
  'Tuna', 'Beef',
  
  // Dairy
  'Milk', 'Cheddar Cheese', 'Mozzarella Cheese', 'Parmesan Cheese',
  'Feta Cheese', 'Yogurt', 'Butter', 'Heavy Cream', 'Cream Cheese',
  'Sour Cream',
  
  // Grains & Pantry
  'Rice', 'White Rice', 'Brown Rice', 'Pasta', 'Spaghetti',
  'Bread', 'White Bread', 'Wheat Bread', 'Flour', 'Sugar',
  'Brown Sugar', 'Salt', 'Black Pepper', 'Olive Oil', 'Vegetable Oil',
  'Soy Sauce', 'Hot Sauce', 'Mustard', 'Ketchup', 'Mayonnaise',
  'Honey', 'Maple Syrup', 'Oats', 'Quinoa', 'Canned Tomatoes',
  'Tomato Sauce', 'Tomato Paste', 'Coconut Milk', 'Chicken Broth',
  'Vegetable Broth', 'Canned Corn', 'Canned Peas', 'Canned Tuna',
  'Peanut Butter', 'Jam', 'Vinegar', 'Balsamic Vinegar',
  
  // Frozen Items
  'Frozen Vegetables', 'Frozen Peas', 'Frozen Corn', 'Frozen Fruit',
  'Ice Cream', 'Frozen Berries',
  
  // Fruits
  'Bananas', 'Apples', 'Oranges', 'Strawberries', 'Blueberries',
  'Grapes', 'Pears', 'Peaches', 'Mango', 'Pineapple',
  
  // Herbs & Spices
  'Basil', 'Oregano', 'Thyme', 'Rosemary', 'Parsley',
  'Cilantro', 'Cumin', 'Paprika', 'Red Pepper Flakes'
];

const pantryBasics = [
  'Salt', 'Black Pepper', 'Olive Oil', 'Vegetable Oil', 
  'Flour', 'Sugar', 'Garlic', 'Onions', 'Butter', 'Eggs'
];

// COMPREHENSIVE RECIPE DATABASE
const recipes = [
  // ==================== PASTA DISHES ====================
  {
    id: '1',
    name: 'Garlic Spaghetti',
    requiredIngredients: ['Pasta', 'Garlic'],
    optionalIngredients: ['Parmesan Cheese', 'Olive Oil', 'Salt', 'Black Pepper', 'Fresh Herbs', 'Red Pepper Flakes'],
    instructions: [
      'Boil pasta in salted water according to package instructions',
      'While pasta cooks, mince 4-5 cloves of garlic',
      'Heat olive oil in a large pan over medium heat',
      'Add minced garlic and cook until fragrant (about 1-2 minutes)',
      'Add red pepper flakes if you want some heat',
      'Drain pasta, reserving 1/2 cup of pasta water',
      'Toss pasta with garlic oil, adding pasta water as needed',
      'Season with salt and black pepper',
      'Top with grated parmesan cheese and fresh herbs'
    ],
    prepTime: '15 minutes'
  },
  {
    id: '2',
    name: 'Simple Tomato Pasta',
    requiredIngredients: ['Pasta', 'Canned Tomatoes'],
    optionalIngredients: ['Garlic', 'Onions', 'Olive Oil', 'Fresh Herbs', 'Parmesan Cheese', 'Sugar'],
    instructions: [
      'Cook pasta according to package instructions',
      'In a pan, heat olive oil and sauté minced garlic and diced onions',
      'Add canned tomatoes, crushing them with a spoon',
      'Simmer for 10-15 minutes, add a pinch of sugar if too acidic',
      'Season with salt, pepper, and fresh herbs',
      'Toss cooked pasta with the sauce',
      'Serve with parmesan cheese'
    ],
    prepTime: '20 minutes'
  },
  {
    id: '3',
    name: 'Pasta Salad',
    requiredIngredients: ['Pasta'],
    optionalIngredients: ['Olive Oil', 'Vinegar', 'Tomatoes', 'Cucumber', 'Cheese', 'Fresh Herbs', 'Bell Peppers'],
    instructions: [
      'Cook pasta and rinse with cold water',
      'Chop vegetables into small pieces',
      'Mix pasta with vegetables',
      'Make dressing: whisk olive oil, vinegar, salt, and pepper',
      'Pour dressing over pasta and toss well',
      'Add cheese and fresh herbs',
      'Chill for 30 minutes before serving'
    ],
    prepTime: '15 minutes'
  },
  {
    id: '16',
    name: 'Creamy Mushroom Pasta',
    requiredIngredients: ['Pasta', 'Mushrooms', 'Heavy Cream'],
    optionalIngredients: ['Garlic', 'Parmesan Cheese', 'Butter', 'Fresh Herbs', 'Black Pepper'],
    instructions: [
      'Cook pasta according to package instructions',
      'Slice mushrooms and sauté in butter until golden',
      'Add minced garlic and cook for 1 minute',
      'Pour in heavy cream and simmer until thickened',
      'Add grated parmesan cheese and stir until melted',
      'Toss with cooked pasta',
      'Season with black pepper and fresh herbs'
    ],
    prepTime: '20 minutes'
  },
  {
    id: '17',
    name: 'Pasta with Broccoli',
    requiredIngredients: ['Pasta', 'Broccoli', 'Garlic'],
    optionalIngredients: ['Parmesan Cheese', 'Olive Oil', 'Red Pepper Flakes', 'Lemon Juice'],
    instructions: [
      'Cook pasta according to instructions',
      'Cut broccoli into small florets and steam until tender',
      'Sauté garlic in olive oil until fragrant',
      'Add cooked broccoli and red pepper flakes',
      'Toss with pasta and lemon juice',
      'Top with parmesan cheese'
    ],
    prepTime: '20 minutes'
  },

  // ==================== RICE DISHES ====================
  {
    id: '4',
    name: 'Vegetable Fried Rice',
    requiredIngredients: ['Rice', 'Eggs', 'Soy Sauce'],
    optionalIngredients: ['Garlic', 'Frozen Vegetables', 'Carrots', 'Peas', 'Onions', 'Sesame Oil'],
    instructions: [
      'Cook rice and let it cool completely (preferably day-old rice)',
      'Scramble eggs in a wok or large pan, remove and set aside',
      'Sauté garlic and onions until fragrant',
      'Add frozen vegetables and cook for 2-3 minutes',
      'Add cold rice and soy sauce, stir-fry on high heat',
      'Add scrambled eggs back to the pan',
      'Drizzle with sesame oil if available',
      'Serve hot'
    ],
    prepTime: '20 minutes'
  },
  {
    id: '5',
    name: 'Hearty Bean & Rice Bowl',
    requiredIngredients: ['Rice', 'Black Beans'],
    optionalIngredients: ['Onions', 'Garlic', 'Cheddar Cheese', 'Hot Sauce', 'Avocado', 'Cilantro', 'Lime'],
    instructions: [
      'Cook rice according to package instructions',
      'Heat black beans in a pot with some of their liquid',
      'Sauté onions and garlic until soft',
      'Combine rice and beans in a bowl',
      'Top with cheese, hot sauce, and fresh cilantro',
      'Squeeze fresh lime juice over everything',
      'Add sliced avocado if available'
    ],
    prepTime: '15 minutes'
  },
  {
    id: '6',
    name: 'Chicken Rice Soup',
    requiredIngredients: ['Chicken', 'Rice', 'Chicken Broth'],
    optionalIngredients: ['Carrots', 'Celery', 'Onions', 'Garlic', 'Fresh Herbs', 'Bay Leaf'],
    instructions: [
      'Cook chicken in a pot, then shred it',
      'In the same pot, sauté carrots, celery, and onions',
      'Add garlic and cook for 1 minute',
      'Pour in chicken broth and bring to a boil',
      'Add rice and simmer until rice is cooked (15-20 minutes)',
      'Add shredded chicken back to the pot',
      'Season with fresh herbs, salt, and pepper',
      'Serve hot'
    ],
    prepTime: '35 minutes'
  },
  {
    id: '18',
    name: 'Lemon Rice with Vegetables',
    requiredIngredients: ['Rice', 'Lemons', 'Frozen Vegetables'],
    optionalIngredients: ['Turmeric', 'Mustard Seeds', 'Curry Leaves', 'Peanuts'],
    instructions: [
      'Cook rice and let it cool',
      'Heat oil and add mustard seeds until they pop',
      'Add frozen vegetables and sauté',
      'Add turmeric and curry leaves',
      'Mix in cooked rice and lemon juice',
      'Garnish with roasted peanuts'
    ],
    prepTime: '25 minutes'
  },
  {
    id: '19',
    name: 'Coconut Rice',
    requiredIngredients: ['Rice', 'Coconut Milk'],
    optionalIngredients: ['Ginger', 'Garlic', 'Cashews', 'Cilantro'],
    instructions: [
      'Rinse rice thoroughly',
      'Cook rice with coconut milk instead of water',
      'Sauté ginger and garlic in a pan',
      'Add cooked rice and stir gently',
      'Garnish with roasted cashews and cilantro'
    ],
    prepTime: '25 minutes'
  },

  // ==================== EGG DISHES ====================
  {
    id: '7',
    name: 'Classic Omelette',
    requiredIngredients: ['Eggs'],
    optionalIngredients: ['Cheese', 'Milk', 'Bell Peppers', 'Onions', 'Mushrooms', 'Spinach', 'Butter', 'Fresh Herbs'],
    instructions: [
      'Beat 2-3 eggs with a splash of milk',
      'Heat butter in a non-stick pan over medium heat',
      'Pour eggs into the pan, tilt to spread evenly',
      'When edges set, add fillings to one half',
      'Fold the other half over the fillings',
      'Cook for another minute, then slide onto plate',
      'Garnish with fresh herbs'
    ],
    prepTime: '10 minutes'
  },
  {
    id: '8',
    name: 'Fluffy Scrambled Eggs',
    requiredIngredients: ['Eggs'],
    optionalIngredients: ['Butter', 'Milk', 'Cheese', 'Fresh Herbs', 'Toast', 'Bacon'],
    instructions: [
      'Crack eggs into a bowl, add a splash of milk',
      'Whisk vigorously until frothy',
      'Melt butter in a pan over LOW heat',
      'Pour eggs into pan, let sit for 30 seconds',
      'Gently push eggs across the pan with a spatula',
      'Continue until eggs are soft and creamy (not dry)',
      'Remove from heat just before they look done',
      'Top with cheese and fresh herbs',
      'Serve immediately with toast'
    ],
    prepTime: '8 minutes'
  },
  {
    id: '9',
    name: 'Quick Egg Drop Soup',
    requiredIngredients: ['Eggs', 'Chicken Broth'],
    optionalIngredients: ['Green Onions', 'Soy Sauce', 'Ginger', 'Cornstarch'],
    instructions: [
      'Bring chicken broth to a gentle simmer',
      'Beat eggs in a small bowl',
      'If using cornstarch, mix with water to make slurry',
      'Slowly drizzle eggs into broth while stirring in one direction',
      'Add soy sauce and grated ginger to taste',
      'Garnish with chopped green onions',
      'Serve immediately'
    ],
    prepTime: '10 minutes'
  },
  {
    id: '20',
    name: 'Egg Salad Sandwich',
    requiredIngredients: ['Eggs', 'Bread', 'Mayonnaise'],
    optionalIngredients: ['Mustard', 'Celery', 'Paprika', 'Lettuce'],
    instructions: [
      'Hard boil eggs for 10 minutes',
      'Cool eggs, peel and chop them',
      'Mix with mayonnaise, mustard, and chopped celery',
      'Season with paprika, salt, and pepper',
      'Spread on bread and add lettuce'
    ],
    prepTime: '15 minutes'
  },
  {
    id: '21',
    name: 'Shakshuka',
    requiredIngredients: ['Eggs', 'Canned Tomatoes', 'Onions', 'Garlic'],
    optionalIngredients: ['Bell Peppers', 'Paprika', 'Cumin', 'Feta Cheese', 'Fresh Herbs'],
    instructions: [
      'Sauté onions and bell peppers until soft',
      'Add garlic, paprika, and cumin',
      'Pour in canned tomatoes and simmer for 10 minutes',
      'Create wells in the sauce and crack eggs into them',
      'Cover and cook until eggs are set',
      'Sprinkle with feta cheese and fresh herbs'
    ],
    prepTime: '25 minutes'
  },

  // ==================== SANDWICHES & TOASTS ====================
  {
    id: '10',
    name: 'Perfect Grilled Cheese',
    requiredIngredients: ['Bread', 'Cheese'],
    optionalIngredients: ['Butter', 'Tomatoes', 'Bacon', 'Avocado'],
    instructions: [
      'Butter the outside of each bread slice',
      'Place cheese between bread slices',
      'Heat a pan over medium-low heat',
      'Cook sandwich until golden brown (3-4 minutes)',
      'Flip and cook other side until golden',
      'Add tomato slices or bacon inside if desired',
      'Cut diagonally and serve hot'
    ],
    prepTime: '10 minutes'
  },
  {
    id: '11',
    name: 'Cheesy Quesadilla',
    requiredIngredients: ['Tortillas', 'Cheese'],
    optionalIngredients: ['Chicken', 'Bell Peppers', 'Onions', 'Sour Cream', 'Salsa', 'Avocado'],
    instructions: [
      'Place tortilla in a dry pan over medium heat',
      'Sprinkle cheese evenly over half the tortilla',
      'Add any fillings on top of cheese',
      'Fold tortilla in half',
      'Cook until bottom is golden and cheese melts (2-3 minutes)',
      'Flip and cook other side until golden',
      'Cut into wedges',
      'Serve with sour cream and salsa'
    ],
    prepTime: '10 minutes'
  },
  {
    id: '22',
    name: 'Avocado Toast',
    requiredIngredients: ['Bread', 'Avocado'],
    optionalIngredients: ['Lemon Juice', 'Red Pepper Flakes', 'Egg', 'Tomatoes'],
    instructions: [
      'Toast bread until golden and crispy',
      'Mash avocado with lemon juice, salt, and pepper',
      'Spread mashed avocado on toast',
      'Top with red pepper flakes',
      'Add a poached egg or sliced tomatoes if desired'
    ],
    prepTime: '10 minutes'
  },
  {
    id: '23',
    name: 'Tuna Melt',
    requiredIngredients: ['Bread', 'Canned Tuna', 'Cheese', 'Mayonnaise'],
    optionalIngredients: ['Celery', 'Onions', 'Pickles', 'Butter'],
    instructions: [
      'Mix tuna with mayonnaise, chopped celery, and onions',
      'Butter one side of each bread slice',
      'Place cheese on unbuttered side of bread',
      'Add tuna mixture on top of cheese',
      'Top with another slice of cheese and bread (buttered side out)',
      'Grill until golden brown and cheese melts'
    ],
    prepTime: '15 minutes'
  },

  // ==================== POTATO DISHES ====================
  {
    id: '12',
    name: 'Crispy Potato Hash',
    requiredIngredients: ['Potatoes'],
    optionalIngredients: ['Onions', 'Bell Peppers', 'Eggs', 'Bacon', 'Cheese', 'Butter', 'Paprika'],
    instructions: [
      'Dice potatoes into small cubes (1/2 inch)',
      'Parboil potatoes for 5 minutes, drain well',
      'Heat butter or oil in a cast iron pan',
      'Add potatoes in a single layer, don\'t stir for 3-4 minutes',
      'Flip potatoes, add diced onions and peppers',
      'Cook until potatoes are crispy and golden',
      'Season with salt, pepper, and paprika',
      'Top with a fried egg if desired',
      'Sprinkle with cheese and serve'
    ],
    prepTime: '25 minutes'
  },
  {
    id: '13',
    name: 'Mashed Potatoes',
    requiredIngredients: ['Potatoes', 'Butter', 'Milk'],
    optionalIngredients: ['Garlic', 'Cream Cheese', 'Fresh Herbs', 'Parmesan Cheese'],
    instructions: [
      'Peel and cube potatoes into even pieces',
      'Boil in salted water until fork-tender (15-20 minutes)',
      'Drain potatoes and return to pot',
      'Mash potatoes with butter and warm milk',
      'Add roasted garlic or cream cheese for extra creaminess',
      'Season generously with salt and pepper',
      'Garnish with fresh herbs',
      'Serve hot'
    ],
    prepTime: '30 minutes'
  },
  {
    id: '24',
    name: 'Baked Potato',
    requiredIngredients: ['Potatoes'],
    optionalIngredients: ['Butter', 'Sour Cream', 'Cheddar Cheese', 'Bacon', 'Green Onions'],
    instructions: [
      'Preheat oven to 400°F (200°C)',
      'Pierce potatoes with a fork several times',
      'Rub with olive oil and salt',
      'Bake for 45-60 minutes until tender',
      'Cut open and fluff the inside with a fork',
      'Top with butter, sour cream, cheese, bacon, and green onions'
    ],
    prepTime: '60 minutes'
  },
  {
    id: '25',
    name: 'Roasted Sweet Potatoes',
    requiredIngredients: ['Sweet Potatoes', 'Olive Oil'],
    optionalIngredients: ['Paprika', 'Cinnamon', 'Rosemary', 'Honey'],
    instructions: [
      'Preheat oven to 425°F (220°C)',
      'Cut sweet potatoes into 1-inch cubes',
      'Toss with olive oil, salt, pepper, and paprika or cinnamon',
      'Spread on baking sheet in single layer',
      'Roast for 20-25 minutes until tender and caramelized',
      'Drizzle with honey and fresh rosemary'
    ],
    prepTime: '30 minutes'
  },

  // ==================== CHICKEN DISHES ====================
  {
    id: '26',
    name: 'Lemon Herb Chicken',
    requiredIngredients: ['Chicken', 'Lemons', 'Garlic'],
    optionalIngredients: ['Fresh Herbs', 'Olive Oil', 'Honey', 'Chicken Broth'],
    instructions: [
      'Mix lemon juice, minced garlic, herbs, and olive oil',
      'Marinate chicken for 30 minutes',
      'Sear chicken in a hot pan until golden',
      'Add honey and chicken broth',
      'Simmer until chicken is cooked through',
      'Serve with lemon slices'
    ],
    prepTime: '45 minutes'
  },
  {
    id: '27',
    name: 'Chicken Stir Fry',
    requiredIngredients: ['Chicken', 'Soy Sauce', 'Frozen Vegetables'],
    optionalIngredients: ['Garlic', 'Ginger', 'Sesame Oil', 'Rice'],
    instructions: [
      'Cut chicken into bite-sized pieces',
      'Sear chicken in a wok until browned',
      'Remove chicken, add vegetables and stir-fry',
      'Add garlic and ginger',
      'Return chicken to pan, add soy sauce',
      'Serve over rice'
    ],
    prepTime: '25 minutes'
  },

  // ==================== SOUPS ====================
  {
    id: '15',
    name: 'Creamy Tomato Basil Soup',
    requiredIngredients: ['Canned Tomatoes', 'Chicken Broth'],
    optionalIngredients: ['Heavy Cream', 'Onions', 'Garlic', 'Butter', 'Fresh Basil', 'Sugar'],
    instructions: [
      'Sauté diced onions and garlic in butter until soft',
      'Add canned tomatoes and chicken broth',
      'Simmer for 15-20 minutes',
      'Blend soup until smooth using an immersion blender',
      'Stir in heavy cream for creaminess',
      'Add fresh basil leaves',
      'Season with salt, pepper, and a pinch of sugar',
      'Serve with grilled cheese sandwich'
    ],
    prepTime: '25 minutes'
  },
  {
    id: '28',
    name: 'Vegetable Soup',
    requiredIngredients: ['Vegetable Broth', 'Carrots', 'Celery', 'Onions', 'Canned Tomatoes'],
    optionalIngredients: ['Potatoes', 'Green Beans', 'Corn', 'Garlic', 'Fresh Herbs'],
    instructions: [
      'Sauté onions, carrots, and celery until soft',
      'Add garlic and cook for 1 minute',
      'Pour in broth and canned tomatoes',
      'Add diced potatoes and other vegetables',
      'Simmer for 20-25 minutes until vegetables are tender',
      'Season with fresh herbs, salt, and pepper'
    ],
    prepTime: '35 minutes'
  },
  {
    id: '29',
    name: 'Lentil Soup',
    requiredIngredients: ['Lentils', 'Vegetable Broth', 'Onions', 'Carrots', 'Celery'],
    optionalIngredients: ['Garlic', 'Canned Tomatoes', 'Cumin', 'Lemon Juice'],
    instructions: [
      'Sauté onions, carrots, and celery',
      'Add garlic and cumin',
      'Add lentils, broth, and canned tomatoes',
      'Simmer for 30-40 minutes until lentils are tender',
      'Add lemon juice before serving',
      'Season with salt and pepper'
    ],
    prepTime: '50 minutes'
  },

  // ==================== SEAFOOD DISHES ====================
  {
    id: '30',
    name: 'Garlic Butter Shrimp',
    requiredIngredients: ['Shrimp', 'Garlic', 'Butter'],
    optionalIngredients: ['Lemon Juice', 'Parsley', 'Red Pepper Flakes', 'Pasta'],
    instructions: [
      'Pat shrimp dry and season with salt and pepper',
      'Melt butter in a pan over medium-high heat',
      'Add minced garlic and cook for 30 seconds',
      'Add shrimp and cook for 2-3 minutes per side',
      'Add lemon juice and red pepper flakes',
      'Garnish with fresh parsley',
      'Serve over pasta or with bread'
    ],
    prepTime: '15 minutes'
  },
  {
    id: '31',
    name: 'Baked Salmon',
    requiredIngredients: ['Salmon', 'Lemon', 'Garlic'],
    optionalIngredients: ['Dill', 'Butter', 'Honey', 'Soy Sauce'],
    instructions: [
      'Preheat oven to 400°F (200°C)',
      'Place salmon on baking sheet lined with parchment',
      'Season with salt, pepper, and minced garlic',
      'Top with lemon slices and fresh dill',
      'Bake for 12-15 minutes',
      'Optional: glaze with honey and soy sauce mixture'
    ],
    prepTime: '20 minutes'
  },

  // ==================== BREAKFAST & PANCAKES ====================
  {
    id: '14',
    name: 'Fluffy Banana Pancakes',
    requiredIngredients: ['Bananas', 'Eggs', 'Flour'],
    optionalIngredients: ['Milk', 'Sugar', 'Butter', 'Maple Syrup', 'Baking Powder', 'Vanilla Extract'],
    instructions: [
      'Mash 2 ripe bananas in a bowl',
      'Add eggs, flour, milk, and sugar',
      'Mix until just combined (don\'t overmix)',
      'Heat a pan over medium heat, add butter',
      'Pour 1/4 cup batter for each pancake',
      'Cook until bubbles form on surface (2-3 minutes)',
      'Flip and cook until golden (1-2 minutes)',
      'Serve with butter and maple syrup'
    ],
    prepTime: '15 minutes'
  },
  {
    id: '32',
    name: 'Oatmeal with Berries',
    requiredIngredients: ['Oats', 'Milk', 'Berries'],
    optionalIngredients: ['Honey', 'Bananas', 'Cinnamon', 'Nuts'],
    instructions: [
      'Bring milk or water to a boil',
      'Add oats and reduce heat to low',
      'Cook for 5 minutes, stirring occasionally',
      'Top with fresh berries, sliced bananas',
      'Drizzle with honey and sprinkle with cinnamon',
      'Add nuts for extra crunch'
    ],
    prepTime: '10 minutes'
  },
  {
    id: '33',
    name: 'French Toast',
    requiredIngredients: ['Bread', 'Eggs', 'Milk'],
    optionalIngredients: ['Cinnamon', 'Vanilla Extract', 'Maple Syrup', 'Butter'],
    instructions: [
      'Whisk eggs, milk, cinnamon, and vanilla',
      'Dip bread slices in mixture until soaked',
      'Melt butter in a pan over medium heat',
      'Cook bread until golden brown on both sides',
      'Serve with maple syrup'
    ],
    prepTime: '15 minutes'
  },

  // ==================== BEAN & LEGUME DISHES ====================
  {
    id: '34',
    name: 'Chickpea Curry',
    requiredIngredients: ['Chickpeas', 'Canned Tomatoes', 'Onions', 'Garlic'],
    optionalIngredients: ['Coconut Milk', 'Ginger', 'Cumin', 'Coriander', 'Rice'],
    instructions: [
      'Sauté onions, garlic, and ginger until soft',
      'Add cumin and coriander',
      'Add canned tomatoes and chickpeas',
      'Simmer for 15 minutes',
      'Stir in coconut milk',
      'Serve over rice with fresh cilantro'
    ],
    prepTime: '30 minutes'
  },
  {
    id: '35',
    name: 'Bean Burrito',
    requiredIngredients: ['Tortillas', 'Black Beans', 'Rice', 'Cheese'],
    optionalIngredients: ['Sour Cream', 'Salsa', 'Avocado', 'Lettuce'],
    instructions: [
      'Warm tortillas in a dry pan',
      'Layer rice, black beans, and cheese',
      'Add sour cream, salsa, and avocado',
      'Fold tortilla tightly',
      'Grill seam-side down until crispy'
    ],
    prepTime: '15 minutes'
  },

  // ==================== VEGETABLE SIDES ====================
  {
    id: '36',
    name: 'Roasted Vegetables',
    requiredIngredients: ['Broccoli', 'Carrots', 'Olive Oil'],
    optionalIngredients: ['Garlic', 'Rosemary', 'Parmesan Cheese', 'Balsamic Vinegar'],
    instructions: [
      'Preheat oven to 425°F (220°C)',
      'Cut vegetables into similar-sized pieces',
      'Toss with olive oil, garlic, and rosemary',
      'Spread on baking sheet in single layer',
      'Roast for 20-25 minutes until tender and caramelized',
      'Sprinkle with parmesan cheese and balsamic glaze'
    ],
    prepTime: '30 minutes'
  },
  {
    id: '37',
    name: 'Sautéed Spinach with Garlic',
    requiredIngredients: ['Spinach', 'Garlic', 'Olive Oil'],
    optionalIngredients: ['Lemon Juice', 'Red Pepper Flakes', 'Pine Nuts'],
    instructions: [
      'Heat olive oil in a large pan',
      'Add minced garlic and cook until fragrant',
      'Add spinach in batches, stirring until wilted',
      'Season with salt, pepper, and red pepper flakes',
      'Add lemon juice and toasted pine nuts'
    ],
    prepTime: '10 minutes'
  },

  // ==================== PANTRY STAPLE DISHES ====================
  {
    id: '38',
    name: 'Peanut Butter Banana Toast',
    requiredIngredients: ['Bread', 'Peanut Butter', 'Bananas'],
    optionalIngredients: ['Honey', 'Cinnamon', 'Chia Seeds'],
    instructions: [
      'Toast bread until golden',
      'Spread peanut butter on toast',
      'Slice bananas and arrange on top',
      'Drizzle with honey',
      'Sprinkle with cinnamon and chia seeds'
    ],
    prepTime: '5 minutes'
  },
  {
    id: '39',
    name: 'Rice Pudding',
    requiredIngredients: ['Rice', 'Milk', 'Sugar'],
    optionalIngredients: ['Cinnamon', 'Vanilla Extract', 'Raisins'],
    instructions: [
      'Combine rice, milk, and sugar in a pot',
      'Simmer over low heat, stirring frequently',
      'Cook until rice is tender and mixture thickens (20-25 minutes)',
      'Stir in vanilla and cinnamon',
      'Top with raisins if desired',
      'Serve warm or chilled'
    ],
    prepTime: '30 minutes'
  },
  {
    id: '40',
    name: 'Quesadilla with Corn and Beans',
    requiredIngredients: ['Tortillas', 'Cheese', 'Canned Corn', 'Black Beans'],
    optionalIngredients: ['Sour Cream', 'Salsa', 'Cilantro'],
    instructions: [
      'Mix corn, black beans, and cheese',
      'Place mixture on half of each tortilla',
      'Fold tortillas in half',
      'Cook in a dry pan until golden and cheese melts',
      'Serve with sour cream, salsa, and cilantro'
    ],
    prepTime: '15 minutes'
  },

  // ==================== FISH DISHES ====================
  {
    id: '41',
    name: 'Fish Tacos',
    requiredIngredients: ['Fish', 'Tortillas', 'Cabbage'],
    optionalIngredients: ['Sour Cream', 'Lime', 'Cilantro', 'Avocado', 'Hot Sauce'],
    instructions: [
      'Season fish with salt, pepper, and cumin',
      'Pan-sear fish until cooked through',
      'Warm tortillas in a dry pan',
      'Flake fish into tortillas',
      'Top with shredded cabbage, sour cream, and avocado',
      'Squeeze fresh lime juice and add hot sauce'
    ],
    prepTime: '20 minutes'
  },
  {
    id: '42',
    name: 'Tuna Pasta',
    requiredIngredients: ['Pasta', 'Canned Tuna', 'Canned Tomatoes'],
    optionalIngredients: ['Garlic', 'Onions', 'Olive Oil', 'Parsley'],
    instructions: [
      'Cook pasta according to instructions',
      'Sauté onions and garlic in olive oil',
      'Add canned tomatoes and tuna',
      'Simmer for 5 minutes',
      'Toss with cooked pasta',
      'Garnish with fresh parsley'
    ],
    prepTime: '20 minutes'
  },

  // ==================== TOFU DISHES ====================
  {
    id: '43',
    name: 'Tofu Scramble',
    requiredIngredients: ['Tofu', 'Onions', 'Bell Peppers'],
    optionalIngredients: ['Spinach', 'Turmeric', 'Nutritional Yeast', 'Bread'],
    instructions: [
      'Press tofu to remove excess water, then crumble',
      'Sauté onions and bell peppers until soft',
      'Add crumbled tofu and turmeric',
      'Cook for 5-7 minutes until heated through',
      'Stir in spinach until wilted',
      'Season with nutritional yeast, salt, and pepper',
      'Serve with toast'
    ],
    prepTime: '15 minutes'
  },
  {
    id: '44',
    name: 'Crispy Tofu Stir Fry',
    requiredIngredients: ['Tofu', 'Soy Sauce', 'Frozen Vegetables'],
    optionalIngredients: ['Garlic', 'Ginger', 'Sesame Oil', 'Rice'],
    instructions: [
      'Press tofu, cut into cubes, and toss with cornstarch',
      'Pan-fry until crispy and golden',
      'Remove tofu, stir-fry vegetables',
      'Add garlic, ginger, and soy sauce',
      'Return tofu to pan and toss',
      'Serve over rice'
    ],
    prepTime: '25 minutes'
  },

  // ==================== DESSERTS ====================
  {
    id: '45',
    name: 'Fruit Smoothie Bowl',
    requiredIngredients: ['Frozen Fruit', 'Bananas', 'Yogurt'],
    optionalIngredients: ['Berries', 'Granola', 'Honey', 'Coconut'],
    instructions: [
      'Blend frozen fruit, banana, and yogurt until smooth',
      'Pour into a bowl',
      'Top with fresh berries, granola, and shredded coconut',
      'Drizzle with honey'
    ],
    prepTime: '10 minutes'
  },
  {
    id: '46',
    name: 'Berry Compote',
    requiredIngredients: ['Berries', 'Sugar'],
    optionalIngredients: ['Lemon Juice', 'Vanilla Extract'],
    instructions: [
      'Combine berries and sugar in a saucepan',
      'Cook over medium heat until berries break down',
      'Add lemon juice and vanilla',
      'Simmer for 10-15 minutes until thickened',
      'Serve over pancakes, yogurt, or ice cream'
    ],
    prepTime: '15 minutes'
  },
  {
    id: '47',
    name: 'Apple Cinnamon Oatmeal',
    requiredIngredients: ['Oats', 'Milk', 'Apples', 'Cinnamon'],
    optionalIngredients: ['Brown Sugar', 'Walnuts', 'Honey'],
    instructions: [
      'Dice apples and cook with cinnamon until soft',
      'Cook oats with milk according to package',
      'Combine oats with cooked apples',
      'Top with brown sugar, walnuts, and honey'
    ],
    prepTime: '15 minutes'
  },

  // ==================== QUICK MEALS ====================
  {
    id: '48',
    name: 'Grilled Cheese with Tomato Soup',
    requiredIngredients: ['Bread', 'Cheese', 'Canned Tomatoes', 'Chicken Broth'],
    optionalIngredients: ['Butter', 'Basil', 'Heavy Cream'],
    instructions: [
      'Make tomato soup: sauté garlic, add tomatoes and broth, simmer and blend',
      'Stir in cream and fresh basil',
      'Make grilled cheese: butter bread, add cheese, grill until golden',
      'Serve sandwich with warm soup for dipping'
    ],
    prepTime: '20 minutes'
  },
  {
    id: '49',
    name: 'Loaded Baked Potato',
    requiredIngredients: ['Potatoes', 'Cheese', 'Sour Cream', 'Bacon'],
    optionalIngredients: ['Green Onions', 'Butter', 'Chives'],
    instructions: [
      'Bake potatoes until tender',
      'Cut open and fluff the inside',
      'Top with butter, cheese, sour cream, and crumbled bacon',
      'Garnish with green onions and chives'
    ],
    prepTime: '50 minutes'
  },
  {
    id: '50',
    name: 'Breakfast Burrito',
    requiredIngredients: ['Tortillas', 'Eggs', 'Cheese', 'Potatoes'],
    optionalIngredients: ['Bacon', 'Salsa', 'Avocado', 'Sour Cream'],
    instructions: [
      'Cook diced potatoes until crispy',
      'Scramble eggs',
      'Cook bacon until crispy, then crumble',
      'Warm tortillas',
      'Layer eggs, potatoes, cheese, and bacon',
      'Add salsa and avocado',
      'Roll tightly and serve'
    ],
    prepTime: '20 minutes'
  }
];

module.exports = { ingredientsList, pantryBasics, recipes };