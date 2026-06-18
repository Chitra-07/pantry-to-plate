const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const PantryItem = require('../models/PantryItem');

router.get('/', auth, async (req, res) => {
  try {
    const items = await PantryItem.find({ userId: req.userId }).sort({ expiryDate: 1, createdAt: -1 });
    res.json(items);
  } catch (err) {
    console.error('Error fetching pantry items:', err);
    res.status(500).json({ message: 'Error fetching pantry items' });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const pantryItem = new PantryItem({
      userId: req.userId,
      name: req.body.name,
      quantity: req.body.quantity ?? 1,
      unit: req.body.unit || '',
      category: req.body.category || 'pantry',
      expiryDate: req.body.expiryDate || null,
      notes: req.body.notes || '',
      lowStockThreshold: req.body.lowStockThreshold ?? 1
    });

    await pantryItem.save();
    res.status(201).json(pantryItem);
  } catch (err) {
    console.error('Error creating pantry item:', err);
    res.status(500).json({ message: 'Error creating pantry item' });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const pantryItem = await PantryItem.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { ...req.body, updatedAt: new Date() },
      { new: true }
    );

    if (!pantryItem) {
      return res.status(404).json({ message: 'Pantry item not found' });
    }

    res.json(pantryItem);
  } catch (err) {
    console.error('Error updating pantry item:', err);
    res.status(500).json({ message: 'Error updating pantry item' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const pantryItem = await PantryItem.findOneAndDelete({ _id: req.params.id, userId: req.userId });

    if (!pantryItem) {
      return res.status(404).json({ message: 'Pantry item not found' });
    }

    res.json({ message: 'Pantry item deleted successfully' });
  } catch (err) {
    console.error('Error deleting pantry item:', err);
    res.status(500).json({ message: 'Error deleting pantry item' });
  }
});

router.get('/alerts/expiring', auth, async (req, res) => {
  try {
    const days = parseInt(req.query.days || '3', 10);
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() + days);

    const items = await PantryItem.find({
      userId: req.userId,
      expiryDate: { $ne: null, $lte: cutoff }
    }).sort({ expiryDate: 1 });

    res.json(items);
  } catch (err) {
    console.error('Error fetching pantry alerts:', err);
    res.status(500).json({ message: 'Error fetching pantry alerts' });
  }
});

module.exports = router;