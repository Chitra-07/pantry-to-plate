const express = require('express');
const router = express.Router();
const { recipes, pantryBasics } = require('../data/ingredients');

const parsePrepTime = (prepTime) => {
  if (!prepTime) return 0;
  const numeric = parseInt(String(prepTime), 10);
  return Number.isNaN(numeric) ? 0 : numeric;
};

const getDifficulty = (prepMinutes) => {
  if (prepMinutes <= 15) return 'easy';
  if (prepMinutes <= 30) return 'medium';
  return 'hard';
};

// Get all available ingredients
router.get('/ingredients', (req, res) => {
  const { ingredientsList } = require('../data/ingredients');
  res.json({ ingredients: ingredientsList, pantryBasics });
});

// Helper function to normalize ingredients (remove plurals, common variations)
const normalizeIngredient = (ingredient) => {
  let normalized = ingredient.toLowerCase().trim();
  
  // Remove common suffixes
  normalized = normalized.replace(/s$/, ''); // Remove plural 's'
  normalized = normalized.replace(/es$/, ''); // Remove plural 'es'
  normalized = normalized.replace(/ies$/, 'y'); // Convert berries -> berry
  
  // Common variations
 const variations = {
    'tomato': ['tomatoes', 'tomatos'],
    'potato': ['potatoes'],
    'bell pepper': ['bell peppers', 'pepper', 'peppers'],
    'chicken': ['chicken breast', 'chicken thigh'],
    'garlic': ['garlic clove', 'garlic cloves'],
    'onion': ['onions'],
    'egg': ['eggs'],
    'cheese': ['cheeses'],
    'pasta': ['noodles', 'spaghetti', 'macaroni'],
    'rice': ['white rice', 'brown rice'],
    'bread': ['bread slice', 'bread slices'],
    'butter': ['unsalted butter'],
    'milk': ['whole milk', 'skim milk'],
    'soy sauce': ['soya sauce'],
  };
  
  return normalized;
};

// Check if two ingredients match (with normalization)
const ingredientsMatch = (ingredient1, ingredient2) => {
  const norm1 = normalizeIngredient(ingredient1);
  const norm2 = normalizeIngredient(ingredient2);
  
  if (norm1 === norm2) return true;
  
  // Check for partial matches (e.g., "bell peppers" vs "peppers")
  if (norm1.includes(norm2) || norm2.includes(norm1)) return true;
  
  return false;
};

// Get recipe suggestions based on selected ingredients - SUPER IMPROVED VERSION
router.post('/suggest', (req, res) => {
  const { selectedIngredients, filters = {} } = req.body;
  
  if (!selectedIngredients || selectedIngredients.length === 0) {
    return res.status(400).json({ message: 'No ingredients selected' });
  }
  
  console.log('🔍 Selected ingredients:', selectedIngredients);
  
  // Normalize selected ingredients
  const selectedNormalized = selectedIngredients.map(ing => normalizeIngredient(ing));
  const pantryBasicsNormalized = pantryBasics.map(p => normalizeIngredient(p));
  const requestedDifficulty = filters.difficulty && filters.difficulty !== 'any' ? filters.difficulty : null;
  const maxPrepTimeMinutes = filters.maxPrepTimeMinutes ? parseInt(filters.maxPrepTimeMinutes, 10) : null;
  const cookNowOnly = Boolean(filters.cookNowOnly);
  
  const suggestions = recipes.map(recipe => {
    // Normalize recipe ingredients
    const requiredNormalized = recipe.requiredIngredients.map(i => normalizeIngredient(i));
    const optionalNormalized = recipe.optionalIngredients.map(i => normalizeIngredient(i));
    
    // Check which required ingredients match selected items
    const matchedRequired = [];
    const missingRequired = [];
    const matchedPantryOnly = [];
    
    for (let i = 0; i < requiredNormalized.length; i++) {
      const required = requiredNormalized[i];
      const originalRequired = recipe.requiredIngredients[i];
      
      // Check if matches any selected ingredient
      let matched = false;
      for (let selected of selectedNormalized) {
        if (ingredientsMatch(required, selected)) {
          matched = true;
          matchedRequired.push(originalRequired);
          break;
        }
      }
      
      // If not matched, check if it's a pantry basic
      if (!matched) {
        let isPantry = false;
        for (let pantry of pantryBasicsNormalized) {
          if (ingredientsMatch(required, pantry)) {
            isPantry = true;
            matchedPantryOnly.push(originalRequired);
            break;
          }
        }
        if (!isPantry) {
          missingRequired.push(originalRequired);
        }
      }
    }
    
    // Calculate match score (weighted: matched ingredients are better than pantry)
    const prepMinutes = parsePrepTime(recipe.prepTime);
    const difficulty = getDifficulty(prepMinutes);
    const matchScore = matchedRequired.length;
    const totalRequired = requiredNormalized.length;
    const availableCount = matchedRequired.length + matchedPantryOnly.length;
    const matchPercentage = (availableCount / totalRequired) * 100;
    
    // Special bonus for exact matches
    const exactMatchBonus = matchedRequired.length > 0 ? 10 : 0;
    const finalScore = matchScore * 20 + exactMatchBonus;
    
    // Suggest if: 
    // 1. At least 40% of required ingredients are available (including pantry)
    // 2. AND at least 1 ingredient is actually selected (not just pantry)
    // 3. OR matchScore is high (> 2)
    const shouldSuggest = (matchPercentage >= 40 && matchedRequired.length > 0) || matchScore >= 2;
    const passesFilters = (!requestedDifficulty || difficulty === requestedDifficulty)
      && (!maxPrepTimeMinutes || prepMinutes <= maxPrepTimeMinutes)
      && (!cookNowOnly || (prepMinutes <= 20 && missingRequired.length <= 1));
    
    if (shouldSuggest && passesFilters) {
      // Find which selected ingredients are actually used
      const usedSelectedIngredients = [];
      for (let selected of selectedIngredients) {
        const selectedNorm = normalizeIngredient(selected);
        for (let required of requiredNormalized) {
          if (ingredientsMatch(required, selectedNorm)) {
            usedSelectedIngredients.push(selected);
            break;
          }
        }
      }
      
      return {
        id: recipe.id,
        name: recipe.name,
        requiredIngredients: recipe.requiredIngredients,
        optionalIngredients: recipe.optionalIngredients,
        instructions: recipe.instructions,
        prepTime: recipe.prepTime,
        matchScore: matchScore,
        matchPercentage: Math.round(matchPercentage),
        missingPantryItems: matchedPantryOnly,
        missingRequiredItems: missingRequired,
        usedSelectedIngredients: [...new Set(usedSelectedIngredients)], // Remove duplicates
        totalRequired: totalRequired,
        availableCount: availableCount,
        finalScore: finalScore,
        prepMinutes,
        difficulty,
        cookNowEligible: prepMinutes <= 20 && missingRequired.length <= 1,
        shoppingListItems: [...new Set([...missingRequired, ...matchedPantryOnly])]
      };
    }
    
    return null;
  }).filter(recipe => recipe !== null);
  
  // Sort by final score (higher is better)
  suggestions.sort((a, b) => {
    // First by match score
    if (b.matchScore !== a.matchScore) {
      return b.matchScore - a.matchScore;
    }
    // Then by match percentage
    if (b.matchPercentage !== a.matchPercentage) {
      return b.matchPercentage - a.matchPercentage;
    }
    return a.prepMinutes - b.prepMinutes;
  });
  
  console.log(`✅ Found ${suggestions.length} matching recipes`);
  if (suggestions.length > 0) {
    console.log('Top suggestion:', suggestions[0].name, '(Score:', suggestions[0].finalScore, ')');
  }
  
  // Return top 3 suggestions
  res.json({ suggestions: suggestions.slice(0, 3) });
});

// Get shareable link data
router.post('/share', (req, res) => {
  const { ingredients } = req.body;
  const shareId = Buffer.from(JSON.stringify(ingredients)).toString('base64');
  const shareUrl = `${req.protocol}://${req.get('host')}/share/${shareId}`;
  res.json({ shareUrl });
});

module.exports = router;