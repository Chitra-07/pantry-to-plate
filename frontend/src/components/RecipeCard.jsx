import React from 'react';
import axios from 'axios';
import { Clock, Bookmark, ChevronDown, ChevronUp, CheckCircle, Flame, Heart, Sparkles, Zap, Timer, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

const API_URL = 'http://localhost:5000/api';

const recipeImages = {
  // Original recipes
  'Garlic Spaghetti': 'https://images.unsplash.com/photo-1588013273468-315fd88ea34c?w=500&h=300&fit=crop',
  'Simple Tomato Pasta': 'https://images.unsplash.com/photo-1676300184847-4ee4030409c0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dG9tYXRvJTIwcGFzdGF8ZW58MHx8MHx8fDA%3D',
  'Pasta Salad': 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=500&h=300&fit=crop',
  'Vegetable Fried Rice': 'https://plus.unsplash.com/premium_photo-1694141252774-c937d97641da?w=500&h=300&fit=crop',
  'Hearty Bean & Rice Bowl': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=300&fit=crop',
  'Chicken Rice Soup': 'https://plus.unsplash.com/premium_photo-1700673590238-a0e3a3795ae2?w=500&h=300&fit=crop',
  'Classic Omelette': 'https://images.unsplash.com/photo-1677137261161-0095c10418ef?w=500&h=300&fit=crop',
  'Fluffy Scrambled Eggs': 'https://images.unsplash.com/photo-1687630433653-e6c9faec95b3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2NyYW1ibGUlMjBlZ2dzfGVufDB8fDB8fHww',
  'Quick Egg Drop Soup': 'https://plus.unsplash.com/premium_photo-1664391952734-2759eb94ba60?w=500&h=300&fit=crop',
  'Perfect Grilled Cheese': 'https://images.unsplash.com/photo-1528736235302-52922df5c122?w=500&h=300&fit=crop',
  'Cheesy Quesadilla': 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=500&h=300&fit=crop',
  'Crispy Potato Hash': 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&h=300&fit=crop',
  'Mashed Potatoes': 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=500&h=300&fit=crop',
  'Fluffy Banana Pancakes': 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=500&h=300&fit=crop',
  'Creamy Tomato Basil Soup': 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500&h=300&fit=crop',
  
  // New recipes - Pasta Dishes
  'Creamy Mushroom Pasta': 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=500&h=300&fit=crop',
  'Pasta with Broccoli': 'https://images.unsplash.com/photo-1607118750694-1469a22ef45d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cGFzdGElMjBicm9jb2xsaXxlbnwwfHwwfHx8MA%3D%3D',
  
  // New recipes - Rice Dishes
  'Lemon Rice with Vegetables': 'https://plus.unsplash.com/premium_photo-1695030933926-27aeb8ced63b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8TGVtb24lMjBSaWNlJTIwd2l0aCUyMFZlZ2V0YWJsZXN8ZW58MHx8MHx8fDA%3D',
  'Coconut Rice': 'https://plus.unsplash.com/premium_photo-1675814316651-3ce3c6409922?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmljZXxlbnwwfHwwfHx8MA%3D%3D',
  
  // New recipes - Egg Dishes
  'Egg Salad Sandwich': 'https://images.unsplash.com/photo-1528736235302-52922df5c122?w=500&h=300&fit=crop',
  'Shakshuka': 'https://images.unsplash.com/photo-1582492710145-d723e0a219f8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8U2hha3NodWthfGVufDB8fDB8fHww',
  
  // New recipes - Sandwiches
  'Avocado Toast': 'https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXZhY2FkbyUyMHRvYXN0fGVufDB8fDB8fHww',
  'Tuna Melt': 'https://images.unsplash.com/photo-1678969405738-323f9acb3c18?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dHVuYSUyMG1lbHR8ZW58MHx8MHx8fDA%3D',
  
  // New recipes - Potato Dishes
  'Baked Potato': 'https://images.unsplash.com/photo-1633114128174-2f8aa497e01b?w=500&h=300&fit=crop',
  'Roasted Sweet Potatoes': 'https://images.unsplash.com/photo-1600585152915-d208bec867a1?w=500&h=300&fit=crop',
  
  // New recipes - Chicken Dishes
  'Lemon Herb Chicken': 'https://images.unsplash.com/photo-1604909052743-94e838986d24?w=500&h=300&fit=crop',
  'Chicken Stir Fry': 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=500&h=300&fit=crop',
  
  // New recipes - Soups
  'Vegetable Soup': 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500&h=300&fit=crop',
  'Lentil Soup': 'https://plus.unsplash.com/premium_photo-1712678665743-15e3833da37e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bGVudGlsJTIwc291cHxlbnwwfHwwfHx8MA%3D%3D',
  
  // New recipes - Seafood
  'Garlic Butter Shrimp': 'https://images.unsplash.com/photo-1565557623262-b51f2513a641?w=500&h=300&fit=crop',
  'Baked Salmon': 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&h=300&fit=crop',
  'Fish Tacos': 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=500&h=300&fit=crop',
  'Tuna Pasta': 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=500&h=300&fit=crop',
  
  // New recipes - Breakfast
  'Oatmeal with Berries': 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=500&h=300&fit=crop',
  'French Toast': 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=500&h=300&fit=crop',
  
  // New recipes - Beans & Legumes
  'Chickpea Curry': 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=500&h=300&fit=crop',
  'Bean Burrito': 'https://images.unsplash.com/photo-1561758033-7e924f619b47?w=500&h=300&fit=crop',
  
  // New recipes - Vegetables
  'Roasted Vegetables': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=300&fit=crop',
  'Sautéed Spinach with Garlic': 'https://plus.unsplash.com/premium_photo-1700840833789-a351233d3c48?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c2F1dGVkJTIwc3BpbmFjaCUyMHdpdGglMjBnYXJsaWN8ZW58MHx8MHx8fDA%3D',
  // New recipes - Pantry Staples
  'Peanut Butter Banana Toast': 'https://images.unsplash.com/photo-1546422904-90eab23c3d7e?w=500&h=300&fit=crop',
  'Rice Pudding': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=300&fit=crop',
  'Quesadilla with Corn and Beans': 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=500&h=300&fit=crop',
  
  // New recipes - Tofu
  'Tofu Scramble': 'https://images.unsplash.com/photo-1577805947697-89e18249d767?w=500&h=300&fit=crop',
  'Crispy Tofu Stir Fry': 'https://images.unsplash.com/photo-1577805947697-89e18249d767?w=500&h=300&fit=crop',
  
  // New recipes - Desserts
  'Fruit Smoothie Bowl': 'https://images.unsplash.com/photo-1546422904-90eab23c3d7e?w=500&h=300&fit=crop',
  'Berry Compote': 'https://images.unsplash.com/photo-1568901839119-631418a3910d?w=500&h=300&fit=crop',
  'Apple Cinnamon Oatmeal': 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=500&h=300&fit=crop',
  
  // New recipes - Quick Meals
  'Grilled Cheese with Tomato Soup': 'https://images.unsplash.com/photo-1528736235302-52922df5c122?w=500&h=300&fit=crop',
  'Loaded Baked Potato': 'https://images.unsplash.com/photo-1633114128174-2f8aa497e01b?w=500&h=300&fit=crop',
  'Breakfast Burrito': 'https://images.unsplash.com/photo-1561758033-7e924f619b47?w=500&h=300&fit=crop'
};

const defaultImage = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&h=300&fit=crop';

function RecipeCard({ recipe, onSave, isSaved, token, shoppingListItems }) {
  const [showFullInstructions, setShowFullInstructions] = React.useState(false);
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const missingItems = shoppingListItems || [...(recipe.missingRequiredItems || []), ...(recipe.missingPantryItems || [])];
  const usedSelectedCount = (recipe.usedSelectedIngredients && recipe.usedSelectedIngredients.length) || 0;

  const handleSave = async () => {
    if (!token) {
      alert('Please login to save recipes ✧');
      return;
    }
    
    try {
      await axios.post(`${API_URL}/saved-recipes`, {
        recipeId: recipe.id,
        recipeName: recipe.name,
        ingredients: [...recipe.requiredIngredients, ...recipe.optionalIngredients].map(ing => ({
          name: ing,
          isPantryItem: false
        })),
        instructions: recipe.instructions,
        prepTime: recipe.prepTime
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      onSave(recipe.id);
    } catch (error) {
      console.error('Error saving recipe:', error);
      alert('Error saving recipe. Please try again.');
    }
  };

  const handleAddMissingItems = async () => {
    if (!token) {
      alert('Please login to save shopping list items ✧');
      return;
    }

    if (!missingItems.length) {
      alert('This recipe does not need any extra items.');
      return;
    }

    try {
      await axios.post(`${API_URL}/shopping-lists/manual`, {
        title: `From ${recipe.name}`,
        items: missingItems.map((item) => ({
          name: item,
          reason: `needed for ${recipe.name}`,
          recipeName: recipe.name
        }))
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Missing items added to your shopping list ✧');
    } catch (error) {
      console.error('Error adding recipe items to shopping list:', error);
      alert('Error adding items to shopping list. Please try again.');
    }
  };

  const recipeImage = recipeImages[recipe.name] || defaultImage;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
      style={{
        background: '#FFFFFF',
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(255,20,147,0.1)',
        transition: 'all 0.3s ease',
        border: '1px solid rgba(255,20,147,0.1)'
      }}
    >
      {/* Image Section */}
      <div style={{ position: 'relative', overflow: 'hidden', height: '220px' }}>
        {!imageLoaded && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, #FFF0F5, #FFE4E8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              <Sparkles size={32} color="#FF1493" />
            </motion.div>
          </div>
        )}
        <img 
          src={recipeImage}
          alt={recipe.name}
          onLoad={() => setImageLoaded(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease',
            opacity: imageLoaded ? 1 : 0
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        />
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          background: 'rgba(255,255,255,0.95)',
          padding: '4px 12px',
          borderRadius: '20px',
          fontSize: '11px',
          fontWeight: 600,
          color: '#FF1493',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
        }}>
          <Flame size={12} /> {recipe.matchPercentage}% match
        </div>
      </div>
      
      {/* Content Section */}
      <div style={{ padding: '1.25rem' }}>
        <div style={{ marginBottom: '0.75rem' }}>
          <h3 style={{ 
            fontSize: '1.2rem', 
            color: '#2D2A24', 
            marginBottom: '0.25rem', 
            fontFamily: "'Playfair Display', serif", 
            fontStyle: 'italic',
            fontWeight: 600
          }}>
            {recipe.name}
          </h3>
          <p style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#FF1493', fontSize: '12px' }}>
            <Clock size={12} /> {recipe.prepTime}
          </p>
          {recipe.difficulty && (
            <p style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#B84868', fontSize: '11px', marginTop: '4px' }}>
              <Zap size={12} /> {recipe.difficulty} recipe
              {recipe.cookNowEligible ? ' · cook now ready' : ''}
            </p>
          )}
        </div>
        
        {/* Required Ingredients */}
        <div style={{ marginBottom: '1rem' }}>
          <h4 style={{ color: '#FF1493', marginBottom: '0.5rem', fontSize: '11px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', letterSpacing: '0.5px' }}>
            <CheckCircle size={12} /> essential ingredients
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {recipe.requiredIngredients.slice(0, 4).map(ing => (
              <span key={ing} style={{
                background: 'linear-gradient(135deg, #FFF0F5, #FFE4E8)',
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '11px',
                color: '#FF1493',
                fontWeight: 500
              }}>
                {ing}
              </span>
            ))}
            {recipe.requiredIngredients.length > 4 && (
              <span style={{
                background: '#FFF0F5',
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '11px',
                color: '#FF1493'
              }}>
                +{recipe.requiredIngredients.length - 4}
              </span>
            )}
          </div>
        </div>
        
        {/* Match Info */}
        {recipe.matchPercentage && (
          <div style={{
            background: 'linear-gradient(135deg, #FFF0F5, #FFE4E8)',
            padding: '0.5rem',
            borderRadius: '12px',
            marginBottom: '1rem',
            fontSize: '11px',
            color: '#FF1493',
            textAlign: 'center'
          }}>
            <strong>{recipe.matchPercentage}% match</strong> — you have {usedSelectedCount} of {recipe.totalRequired} key ingredients
          </div>
        )}
        
        {/* Instructions Toggle */}
        <div style={{ marginBottom: '1rem' }}>
          <button
            onClick={() => setShowFullInstructions(!showFullInstructions)}
            style={{
              background: 'none',
              border: 'none',
              color: '#FF1493',
              fontWeight: 500,
              cursor: 'pointer',
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: 0
            }}
          >
            {showFullInstructions ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            {showFullInstructions ? 'hide instructions' : 'view instructions'}
          </button>
          {showFullInstructions && (
            <motion.ol 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              style={{ paddingLeft: '1rem', marginTop: '0.5rem', color: '#999', fontSize: '11px', lineHeight: 1.5 }}
            >
              {recipe.instructions.map((step, idx) => (
                <li key={idx} style={{ marginBottom: '0.3rem' }}>{step}</li>
              ))}
            </motion.ol>
          )}
        </div>
        
        {/* Save Button */}
        <div style={{ borderTop: '1px solid #FFE4E8', paddingTop: '0.75rem', display: 'grid', gap: '0.75rem' }}>
          {missingItems.length > 0 && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddMissingItems}
              style={{
                width: '100%',
                background: 'white',
                color: '#B84868',
                border: '1px solid #FFB7C5',
                padding: '10px 16px',
                borderRadius: '40px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                fontWeight: 600,
                fontSize: '12px'
              }}
            >
              <ShoppingCart size={14} />
              add missing items
            </motion.button>
          )}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            disabled={isSaved}
            style={{
              width: '100%',
              background: isSaved ? '#FFE4E8' : 'linear-gradient(135deg, #FF1493, #FF69B4)',
              color: isSaved ? '#FF1493' : 'white',
              border: 'none',
              padding: '10px 16px',
              borderRadius: '40px',
              cursor: isSaved ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              fontWeight: 600,
              fontSize: '12px'
            }}
          >
            <Heart size={14} />
            {isSaved ? 'saved to collection' : 'save this recipe'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default RecipeCard;