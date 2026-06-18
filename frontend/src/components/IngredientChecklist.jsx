import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Trash2, RefreshCw, Sparkles, X, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const API_URL = 'http://localhost:5000/api';

// Popular ingredients to show initially
const popularIngredients = [
  'Eggs', 'Cheese', 'Rice', 'Pasta', 'Chicken', 
  'Tomatoes', 'Potatoes', 'Garlic', 'Onions', 'Milk',
  'Butter', 'Bread', 'Spinach', 'Carrots', 'Broccoli'
];

function IngredientChecklist({ onGetSuggestions, token }) {
  const [allIngredients, setAllIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [filters, setFilters] = useState({
    maxPrepTimeMinutes: '',
    difficulty: 'any',
    cookNowOnly: false
  });

  useEffect(() => {
    fetchIngredients();
  }, []);

  useEffect(() => {
    // Filter ingredients based on search term
    if (searchTerm.length > 0) {
      setIsSearching(true);
      const filtered = allIngredients.filter(ing =>
        ing.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filtered.slice(0, 15)); // Show max 15 results
    } else {
      setIsSearching(false);
      setSearchResults([]);
    }
  }, [searchTerm, allIngredients]);

  const fetchIngredients = async () => {
    try {
      const response = await axios.get(`${API_URL}/recipes/ingredients`);
      setAllIngredients(response.data.ingredients);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching ingredients:', error);
      setLoading(false);
    }
  };

  const toggleIngredient = (ingredient) => {
    setSelectedIngredients(prev =>
      prev.includes(ingredient)
        ? prev.filter(i => i !== ingredient)
        : [...prev, ingredient]
    );
    // Clear search after adding
    if (searchTerm) {
      setSearchTerm('');
    }
  };

  const handleDeleteAll = () => {
    setSelectedIngredients([]);
  };

  const handleRefresh = () => {
    setSelectedIngredients([]);
    setSearchTerm('');
    setShowAll(false);
    setFilters({
      maxPrepTimeMinutes: '',
      difficulty: 'any',
      cookNowOnly: false
    });
    fetchIngredients();
  };

  const handleGetRecipes = () => {
    if (selectedIngredients.length === 0) {
      alert('Please select at least one ingredient ✧');
      return;
    }
    onGetSuggestions(selectedIngredients, filters);
  };

  const quickAddPopular = (ingredient) => {
    if (!selectedIngredients.includes(ingredient)) {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <motion.div animate={{ rotate: 360, scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>
          <Sparkles size={28} color="#E8759A" />
        </motion.div>
        <p style={{ color: '#D45A7A', marginTop: '0.5rem', fontSize: '13px' }}>loading ingredients...</p>
      </div>
    );
  }

  // Display ingredients based on state
  const displayIngredients = isSearching 
    ? searchResults 
    : (showAll ? allIngredients : popularIngredients);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        background: '#FFFFFF',
        borderRadius: '24px',
        padding: '1.5rem',
        boxShadow: '0 4px 20px rgba(232,117,154,0.1)',
        border: '1px solid rgba(232,117,154,0.15)'
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h3 style={{ 
            fontSize: '1.1rem', 
            color: '#2D2A24', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '6px',
            fontFamily: "'Playfair Display', serif",
            fontStyle: 'italic'
          }}>
            <Sparkles size={18} color="#E8759A" />
            what's in your fridge?
          </h3>
          <p style={{ color: '#D45A7A', fontSize: '11px', marginTop: '2px' }}>
            {selectedIngredients.length} ingredient{selectedIngredients.length !== 1 ? 's' : ''} selected
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {selectedIngredients.length > 0 && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleDeleteAll}
              style={{
                padding: '5px 12px',
                background: '#FFF0F5',
                color: '#D45A7A',
                border: 'none',
                borderRadius: '30px',
                cursor: 'pointer',
                fontSize: '11px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <Trash2 size={12} /> clear all
            </motion.button>
          )}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleRefresh}
            style={{
              padding: '5px 12px',
              background: '#FFF0F5',
              color: '#D45A7A',
              border: 'none',
              borderRadius: '30px',
              cursor: 'pointer',
              fontSize: '11px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <RefreshCw size={12} /> refresh
          </motion.button>
        </div>
      </div>

      {/* Search Bar */}
      <div style={{ position: 'relative', marginBottom: '1rem' }}>
        <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#E8759A' }} />
        <input
          type="text"
          placeholder="search ingredients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '10px 16px 10px 40px',
            border: '2px solid #FFF0F5',
            borderRadius: '40px',
            fontSize: '13px',
            outline: 'none',
            transition: 'all 0.3s ease',
            fontFamily: 'inherit',
            background: '#FFFFFF'
          }}
          onFocus={(e) => e.target.style.borderColor = '#E8759A'}
          onBlur={(e) => e.target.style.borderColor = '#FFF0F5'}
        />
        {searchTerm && (
          <X 
            size={14} 
            style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: '#E8759A' }}
            onClick={() => setSearchTerm('')}
          />
        )}
      </div>

      {/* Quick Filters */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        gap: '0.75rem',
        marginBottom: '1rem'
      }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '11px', color: '#E8759A' }}>
          prep time
          <select
            value={filters.maxPrepTimeMinutes}
            onChange={(e) => setFilters(prev => ({ ...prev, maxPrepTimeMinutes: e.target.value }))}
            style={{
              border: '2px solid #FFF0F5',
              borderRadius: '30px',
              padding: '8px 12px',
              fontFamily: 'inherit',
              background: 'white',
              color: '#2D2A24'
            }}
          >
            <option value="">any time</option>
            <option value="15">15 minutes or less</option>
            <option value="30">30 minutes or less</option>
            <option value="45">45 minutes or less</option>
          </select>
        </label>

        <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '11px', color: '#E8759A' }}>
          difficulty
          <select
            value={filters.difficulty}
            onChange={(e) => setFilters(prev => ({ ...prev, difficulty: e.target.value }))}
            style={{
              border: '2px solid #FFF0F5',
              borderRadius: '30px',
              padding: '8px 12px',
              fontFamily: 'inherit',
              background: 'white',
              color: '#2D2A24'
            }}
          >
            <option value="any">any difficulty</option>
            <option value="easy">easy</option>
            <option value="medium">medium</option>
            <option value="hard">hard</option>
          </select>
        </label>

        <label style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '12px',
          color: '#D45A7A',
          background: '#FFF8FB',
          border: '1px solid #FFE4E8',
          borderRadius: '30px',
          padding: '10px 14px',
          alignSelf: 'end'
        }}>
          <input
            type="checkbox"
            checked={filters.cookNowOnly}
            onChange={(e) => setFilters(prev => ({ ...prev, cookNowOnly: e.target.checked }))}
          />
          cook now only
        </label>
      </div>

      {/* Search Results or Ingredient List */}
      <AnimatePresence mode="wait">
        {isSearching ? (
          <motion.div
            key="search"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ marginBottom: '1rem' }}
          >
            <p style={{ fontSize: '11px', color: '#E8759A', marginBottom: '0.5rem' }}>
              {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', maxHeight: '200px', overflowY: 'auto' }}>
              {searchResults.map(ingredient => (
                <motion.button
                  key={ingredient}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleIngredient(ingredient)}
                  style={{
                    padding: '6px 14px',
                    background: selectedIngredients.includes(ingredient) 
                      ? 'linear-gradient(135deg, #E8759A, #D45A7A)'
                      : '#FFF0F5',
                    color: selectedIngredients.includes(ingredient) ? 'white' : '#2D2A24',
                    border: 'none',
                    borderRadius: '30px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: 500,
                    fontFamily: 'inherit',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  {selectedIngredients.includes(ingredient) && <Check size={12} />}
                  {ingredient}
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="popular"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Popular / Quick Add Section */}
            <div style={{ marginBottom: '1rem' }}>
              <p style={{ fontSize: '11px', color: '#E8759A', marginBottom: '0.5rem', letterSpacing: '0.5px' }}>
                ✧ popular ingredients ✧
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {popularIngredients.map(ing => (
                  <motion.button
                    key={ing}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => quickAddPopular(ing)}
                    disabled={selectedIngredients.includes(ing)}
                    style={{
                      padding: '5px 12px',
                      background: selectedIngredients.includes(ing) ? '#FFE4E8' : '#FFF0F5',
                      color: selectedIngredients.includes(ing) ? '#999' : '#D45A7A',
                      border: 'none',
                      borderRadius: '30px',
                      fontSize: '11px',
                      cursor: selectedIngredients.includes(ing) ? 'not-allowed' : 'pointer',
                      transition: 'all 0.2s ease',
                      fontFamily: 'inherit'
                    }}
                  >
                    + {ing}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* More Ingredients Toggle */}
            {!showAll ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={() => setShowAll(true)}
                style={{
                  width: '100%',
                  padding: '8px',
                  background: '#FFF0F5',
                  color: '#D45A7A',
                  border: 'none',
                  borderRadius: '30px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  marginBottom: '0.5rem'
                }}
              >
                <ChevronDown size={14} /> show all ingredients ({allIngredients.length})
              </motion.button>
            ) : (
              <>
                <div style={{ marginBottom: '0.5rem' }}>
                  <p style={{ fontSize: '11px', color: '#E8759A', marginBottom: '0.5rem' }}>
                    all ingredients
                  </p>
                  <div style={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: '0.4rem', 
                    maxHeight: '200px', 
                    overflowY: 'auto',
                    padding: '0.25rem'
                  }}>
                    {displayIngredients.map(ingredient => (
                      <motion.button
                        key={ingredient}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => toggleIngredient(ingredient)}
                        style={{
                          padding: '5px 12px',
                          background: selectedIngredients.includes(ingredient) 
                            ? 'linear-gradient(135deg, #E8759A, #D45A7A)'
                            : '#FFF0F5',
                          color: selectedIngredients.includes(ingredient) ? 'white' : '#2D2A24',
                          border: 'none',
                          borderRadius: '30px',
                          cursor: 'pointer',
                          fontSize: '11px',
                          fontWeight: 500,
                          fontFamily: 'inherit',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        {selectedIngredients.includes(ingredient) && <Check size={10} />}
                        {ingredient}
                      </motion.button>
                    ))}
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setShowAll(false)}
                  style={{
                    width: '100%',
                    padding: '6px',
                    background: '#FFF0F5',
                    color: '#D45A7A',
                    border: 'none',
                    borderRadius: '30px',
                    cursor: 'pointer',
                    fontSize: '11px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <ChevronUp size={12} /> show less
                </motion.button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Selected Ingredients Summary */}
      {selectedIngredients.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            marginTop: '1rem',
            marginBottom: '1rem',
            padding: '0.75rem',
            background: '#FFF0F5',
            borderRadius: '16px'
          }}
        >
          <p style={{ fontSize: '11px', color: '#D45A7A', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Check size={12} /> your selected ingredients:
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {selectedIngredients.map(ing => (
              <span key={ing} style={{
                background: 'linear-gradient(135deg, #E8759A, #D45A7A)',
                color: 'white',
                padding: '4px 10px',
                borderRadius: '20px',
                fontSize: '11px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                {ing}
                <X 
                  size={12} 
                  style={{ cursor: 'pointer' }}
                  onClick={() => toggleIngredient(ing)}
                />
              </span>
            ))}
          </div>
        </motion.div>
      )}

      {/* Find Recipes Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleGetRecipes}
        disabled={selectedIngredients.length === 0}
        style={{
          width: '100%',
          padding: '12px',
          fontSize: '14px',
          fontWeight: 600,
          borderRadius: '40px',
          border: 'none',
          background: selectedIngredients.length > 0 
            ? 'linear-gradient(135deg, #E8759A, #D45A7A)' 
            : '#FFE4E8',
          color: selectedIngredients.length > 0 ? 'white' : '#D45A7A',
          cursor: selectedIngredients.length > 0 ? 'pointer' : 'not-allowed',
          transition: 'all 0.3s ease',
          marginTop: '0.5rem'
        }}
      >
        find recipes ✧ {selectedIngredients.length > 0 && `(${selectedIngredients.length})`}
      </motion.button>
    </motion.div>
  );
}

export default IngredientChecklist;