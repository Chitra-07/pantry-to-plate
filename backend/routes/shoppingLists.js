const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const ShoppingList = require('../models/ShoppingList');

const normalize = (value) => String(value || '').trim().toLowerCase();

const mergeItems = (currentItems = [], incomingItems = []) => {
  const items = new Map();

  const addItem = (entry = {}) => {
    const name = entry.name || entry;
    const reason = entry.reason || 'manual item';
    const recipeName = entry.recipeName || null;
    const count = Number(entry.count) || 1;
    const key = normalize(name);
    if (!key) return;

    if (!items.has(key)) {
      items.set(key, {
        name,
        count,
        reason,
        recipeNames: recipeName ? [recipeName] : []
      });
      return;
    }

    const current = items.get(key);
    current.count += count;
    if (recipeName && !current.recipeNames.includes(recipeName)) {
      current.recipeNames.push(recipeName);
    }
    if (!current.reason.includes(reason)) {
      current.reason = `${current.reason}, ${reason}`;
    }
  };

  currentItems.forEach(addItem);
  incomingItems.forEach(addItem);

  return Array.from(items.values()).sort((a, b) => a.name.localeCompare(b.name));
};

const buildItems = (suggestions = [], pantryItems = [], manualItems = []) => {
  const rawItems = [];

  const addItem = (name, reason, recipeName) => {
    rawItems.push({
      name,
      count: 1,
      reason,
      recipeName
    });
  };

  suggestions.forEach((recipe) => {
    (recipe.missingRequiredItems || []).forEach((item) => addItem(item, 'missing from fridge', recipe.name));
    (recipe.missingPantryItems || []).forEach((item) => addItem(item, 'use pantry item first', recipe.name));
  });

  pantryItems.forEach((item) => {
    if (item && item.lowStock) {
      addItem(item.name, 'low stock', 'pantry refill');
    }
  });

  manualItems.forEach((item) => {
    if (!item) return;
    if (typeof item === 'string') {
      addItem(item, 'manual item', null);
      return;
    }
    addItem(item.name, item.reason || 'manual item', item.recipeName || null);
  });

  return mergeItems([], rawItems);
};

router.get('/', auth, async (req, res) => {
  try {
    const lists = await ShoppingList.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(lists);
  } catch (err) {
    console.error('Error fetching shopping lists:', err);
    res.status(500).json({ message: 'Error fetching shopping lists' });
  }
});

router.post('/generate', auth, async (req, res) => {
  try {
    const { suggestions = [], pantryItems = [], selectedIngredients = [], manualItems = [], title } = req.body;
    const items = buildItems(suggestions, pantryItems, manualItems);

    if (items.length === 0) {
      return res.status(400).json({ message: 'No shopping items to generate' });
    }

    const shoppingList = new ShoppingList({
      userId: req.userId,
      title: title || 'Quick shopping list',
      sourceIngredients: selectedIngredients,
      sourceRecipes: suggestions.map((recipe) => ({
        recipeId: recipe.id,
        recipeName: recipe.name
      })),
      items,
      updatedAt: new Date()
    });

    await shoppingList.save();
    res.status(201).json({ shoppingList, items });
  } catch (err) {
    console.error('Error generating shopping list:', err);
    res.status(500).json({ message: 'Error generating shopping list' });
  }
});

router.post('/manual', auth, async (req, res) => {
  try {
    const { items = [], title = 'Manual shopping list' } = req.body;

    if (!items.length) {
      return res.status(400).json({ message: 'No items provided' });
    }

    const normalizedItems = items
      .map((item) => {
        if (!item) return null;
        if (typeof item === 'string') {
          return { name: item, reason: 'manual item', count: 1 };
        }

        return {
          name: item.name,
          reason: item.reason || 'manual item',
          recipeName: item.recipeName || null,
          count: Number(item.count) || 1
        };
      })
      .filter(Boolean);

    if (!normalizedItems.length) {
      return res.status(400).json({ message: 'No valid items provided' });
    }

    const latestList = await ShoppingList.findOne({ userId: req.userId }).sort({ createdAt: -1 });

    if (latestList) {
      latestList.items = mergeItems(latestList.items, normalizedItems);
      latestList.updatedAt = new Date();
      await latestList.save();
      return res.status(200).json({ shoppingList: latestList, items: latestList.items });
    }

    const shoppingList = new ShoppingList({
      userId: req.userId,
      title,
      items: mergeItems([], normalizedItems),
      updatedAt: new Date()
    });

    await shoppingList.save();
    res.status(201).json({ shoppingList, items: shoppingList.items });
  } catch (err) {
    console.error('Error adding shopping list items:', err);
    res.status(500).json({ message: 'Error adding shopping list items' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const shoppingList = await ShoppingList.findOneAndDelete({ _id: req.params.id, userId: req.userId });

    if (!shoppingList) {
      return res.status(404).json({ message: 'Shopping list not found' });
    }

    res.json({ message: 'Shopping list deleted successfully' });
  } catch (err) {
    console.error('Error deleting shopping list:', err);
    res.status(500).json({ message: 'Error deleting shopping list' });
  }
});

module.exports = router;