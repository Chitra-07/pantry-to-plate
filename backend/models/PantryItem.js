const mongoose = require('mongoose');

const pantryItemSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  quantity: {
    type: Number,
    default: 1,
    min: 0
  },
  unit: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    default: 'pantry'
  },
  expiryDate: {
    type: Date,
    default: null
  },
  notes: {
    type: String,
    default: ''
  },
  lowStockThreshold: {
    type: Number,
    default: 1,
    min: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

pantryItemSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('PantryItem', pantryItemSchema);