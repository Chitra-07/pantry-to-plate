const mongoose = require('mongoose');

const shoppingListSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  title: {
    type: String,
    default: 'Quick shopping list'
  },
  sourceIngredients: [{
    type: String,
    trim: true
  }],
  sourceRecipes: [{
    recipeId: String,
    recipeName: String
  }],
  items: [{
    name: String,
    count: Number,
    reason: String,
    recipeNames: [String]
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ShoppingList', shoppingListSchema);