import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Flower2, Clock, Trash2, BookOpen, Heart, Sparkles, 
  Calendar, Star, Award, ChevronLeft, ChevronRight, ChevronUp, ChevronDown,
  Bookmark, Share2, ChefHat, Utensils, Eye, Coffee, Cake, Pizza, Salad, Egg, Crown, CheckCircle
} from 'lucide-react';
import Navbar from '../components/Navbar';

const API_URL = 'http://localhost:5000/api';

// Food sticker components - DARKER VERSION
const FoodSticker = ({ icon: Icon, delay, x, y, size, rotate, duration }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: [0, 0.6, 0.45, 0.6, 0],
      scale: [0, 1, 1, 1, 0],
      y: [y, y - 80, y - 160, y - 240, y - 320]
    }}
    transition={{
      duration: duration || 12,
      repeat: Infinity,
      delay: delay,
      ease: "easeOut"
    }}
    style={{
      position: 'fixed',
      left: `${x}%`,
      top: `${y}%`,
      pointerEvents: 'none',
      zIndex: 5
    }}
  >
    <Icon size={size} color="#C85A7A" strokeWidth={1.8} style={{ opacity: 0.65 }} />
  </motion.div>
);

const StaticSticker = ({ icon: Icon, x, y, size, rotate, opacity = 0.35 }) => (
  <motion.div
    initial={{ scale: 0, rotate: 0 }}
    animate={{ scale: 1, rotate: rotate }}
    transition={{ duration: 0.5, delay: Math.random() * 0.5 }}
    style={{
      position: 'fixed',
      left: `${x}%`,
      top: `${y}%`,
      pointerEvents: 'none',
      zIndex: 5
    }}
  >
    <Icon size={size} color="#C85A7A" strokeWidth={1.5} style={{ opacity: opacity }} />
  </motion.div>
);

// Recipe images mapping for the collection
const recipeImages = {
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
  'Pasta with Broccoli': 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=500&h=300&fit=crophttps://images.unsplash.com/photo-1607118750694-1469a22ef45d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cGFzdGElMjBicm9jb2xsaXxlbnwwfHwwfHx8MA%3D%3D',
  
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
};

const defaultImage = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop';

function SavedRecipes({ token, user }) {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [flippedCard, setFlippedCard] = useState(null);
  const [expandedInstructions, setExpandedInstructions] = useState({});
  const recipesPerPage = 6;

  useEffect(() => {
    fetchSavedRecipes();
  }, []);

  const fetchSavedRecipes = async () => {
    try {
      const response = await axios.get(`${API_URL}/saved-recipes`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSavedRecipes(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching saved recipes:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (recipeId, e) => {
    e.stopPropagation();
    if (window.confirm('Remove this recipe from your collection?')) {
      try {
        await axios.delete(`${API_URL}/saved-recipes/${recipeId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchSavedRecipes();
      } catch (error) {
        console.error('Error deleting recipe:', error);
        alert('Error deleting recipe. Please try again.');
      }
    }
  };

  const handleToggleFavorite = async (recipeId, e) => {
    e.stopPropagation();
    try {
      await axios.put(`${API_URL}/saved-recipes/${recipeId}/favorite`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchSavedRecipes();
    } catch (error) {
      console.error('Error toggling favorite recipe:', error);
      alert('Error updating favorite recipe. Please try again.');
    }
  };

  const handleFlip = (recipeId) => {
    setFlippedCard(flippedCard === recipeId ? null : recipeId);
  };

  const toggleInstructions = (recipeId, e) => {
    e.stopPropagation();
    setExpandedInstructions(prev => ({
      ...prev,
      [recipeId]: !prev[recipeId]
    }));
  };

  const totalPages = Math.ceil(savedRecipes.length / recipesPerPage);
  const displayedRecipes = savedRecipes.slice(
    currentPage * recipesPerPage,
    (currentPage + 1) * recipesPerPage
  );

  if (loading) {
    return (
      <div style={{ background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF5F5 100%)', minHeight: '100vh' }}>
        <Navbar user={user} onLogout={() => {}} />
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <motion.div animate={{ rotate: 360, scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>
            <BookOpen size={48} color="#C85A7A" />
          </motion.div>
          <p style={{ color: '#B84868', marginTop: '1rem', fontStyle: 'italic', fontWeight: 500 }}>Opening your recipe book...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ 
        background: 'linear-gradient(135deg, #FFF8F0 0%, #FFF0F5 100%)', 
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Static Background Stickers - DARKER */}
      <StaticSticker icon={Coffee} x={2} y={15} size={75} rotate={-15} opacity={0.42} />
      <StaticSticker icon={Cake} x={87} y={18} size={70} rotate={10} opacity={0.38} />
      <StaticSticker icon={Pizza} x={5} y={72} size={65} rotate={20} opacity={0.4} />
      <StaticSticker icon={Salad} x={86} y={78} size={70} rotate={-10} opacity={0.38} />
      <StaticSticker icon={Egg} x={85} y={48} size={60} rotate={25} opacity={0.4} />
      <StaticSticker icon={ChefHat} x={2} y={45} size={75} rotate={-20} opacity={0.42} />
      <StaticSticker icon={Heart} x={90} y={5} size={55} rotate={15} opacity={0.45} />
      <StaticSticker icon={Flower2} x={12} y={88} size={55} rotate={-5} opacity={0.38} />
      <StaticSticker icon={Sparkles} x={42} y={3} size={50} rotate={30} opacity={0.4} />
      <StaticSticker icon={Crown} x={18} y={52} size={52} rotate={-25} opacity={0.38} />
      <StaticSticker icon={Coffee} x={92} y={88} size={60} rotate={12} opacity={0.4} />
      <StaticSticker icon={ChefHat} x={48} y={92} size={55} rotate={-15} opacity={0.38} />
      <StaticSticker icon={Star} x={8} y={88} size={50} rotate={-8} opacity={0.42} />
      <StaticSticker icon={BookOpen} x={95} y={50} size={52} rotate={18} opacity={0.4} />
      <StaticSticker icon={Cake} x={32} y={85} size={45} rotate={22} opacity={0.36} />
      <StaticSticker icon={Pizza} x={75} y={12} size={50} rotate={-12} opacity={0.4} />
      <StaticSticker icon={Egg} x={55} y={8} size={40} rotate={35} opacity={0.38} />
      <StaticSticker icon={Salad} x={15} y={35} size={42} rotate={-18} opacity={0.36} />
      
      {/* Animated Floating Stickers - DARKER */}
      <FoodSticker icon={Coffee} delay={0} x={15} y={85} size={42} rotate={-10} duration={12} />
      <FoodSticker icon={Cake} delay={2} x={72} y={8} size={45} rotate={15} duration={14} />
      <FoodSticker icon={Pizza} delay={4} x={28} y={70} size={38} rotate={8} duration={10} />
      <FoodSticker icon={Salad} delay={1} x={68} y={88} size={40} rotate={-12} duration={13} />
      <FoodSticker icon={Egg} delay={3} x={78} y={38} size={36} rotate={20} duration={11} />
      <FoodSticker icon={ChefHat} delay={5} x={18} y={28} size={44} rotate={-8} duration={15} />
      <FoodSticker icon={Heart} delay={2.5} x={52} y={12} size={36} rotate={5} duration={9} />
      <FoodSticker icon={Flower2} delay={4.5} x={58} y={88} size={38} rotate={-15} duration={12} />
      <FoodSticker icon={Sparkles} delay={1.5} x={38} y={10} size={32} rotate={10} duration={8} />
      <FoodSticker icon={Sparkles} delay={3.5} x={72} y={65} size={32} rotate={-5} duration={10} />
      <FoodSticker icon={Coffee} delay={6} x={48} y={78} size={36} rotate={12} duration={16} />
      <FoodSticker icon={Cake} delay={7} x={82} y={58} size={40} rotate={-18} duration={13} />
      <FoodSticker icon={Star} delay={3.2} x={62} y={42} size={30} rotate={15} duration={9.5} />
      <FoodSticker icon={BookOpen} delay={4.8} x={45} y={55} size={32} rotate={-12} duration={11.5} />
      <FoodSticker icon={Pizza} delay={2.8} x={35} y={88} size={33} rotate={22} duration={11} />
      <FoodSticker icon={Salad} delay={5.5} x={25} y={18} size={35} rotate={-22} duration={14} />
      
      {/* Decorative Background Elements - Darker */}
      <div style={{
        position: 'fixed',
        top: '0%',
        right: '-5%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(200,90,122,0.08) 0%, rgba(200,90,122,0) 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 0
      }} />
      <div style={{
        position: 'fixed',
        bottom: '0%',
        left: '-5%',
        width: '450px',
        height: '450px',
        background: 'radial-gradient(circle, rgba(200,90,122,0.06) 0%, rgba(200,90,122,0) 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 0
      }} />
      <div style={{
        position: 'fixed',
        top: '40%',
        left: '20%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(200,90,122,0.05) 0%, rgba(200,90,122,0) 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 0
      }} />
      <div style={{
        position: 'fixed',
        bottom: '20%',
        right: '15%',
        width: '250px',
        height: '250px',
        background: 'radial-gradient(circle, rgba(200,90,122,0.05) 0%, rgba(200,90,122,0) 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 0
      }} />
      
      <Navbar user={user} onLogout={() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/';
      }} />
      
      <div className="container" style={{ padding: '2rem', position: 'relative', zIndex: 10 }}>
        {/* Book Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ 
            textAlign: 'center', 
            marginBottom: '3rem',
            position: 'relative'
          }}
        >
          <motion.div
            animate={{ rotate: 360, scale: [1, 1.1, 1] }}
            transition={{ duration: 20, repeat: Infinity }}
            style={{
              background: 'linear-gradient(135deg, #C85A7A, #B84868)',
              padding: '18px',
              borderRadius: '50%',
              display: 'inline-block',
              marginBottom: '1rem',
              boxShadow: '0 12px 30px rgba(200,90,122,0.4)'
            }}
          >
            <BookOpen size={34} color="white" />
          </motion.div>
          
          <h1 className="gradient-text" style={{
            fontSize: '3rem',
            marginBottom: '0.5rem',
            fontFamily: "'Playfair Display', serif",
            fontStyle: 'italic',
            background: 'linear-gradient(135deg, #C85A7A, #B84868)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Recipe book
          </h1>
          
          <div style={{
            width: '80px',
            height: '3px',
            background: 'linear-gradient(90deg, transparent, #C85A7A, #B84868, transparent)',
            margin: '1rem auto'
          }} />
          
          <div style={{
            display: 'inline-block',
            background: '#FFF0F5',
            padding: '0.3rem 1rem',
            borderRadius: '30px'
          }}>
            <p style={{ color: '#B84868', fontSize: '0.9rem', fontStyle: 'italic', fontWeight: 500, margin: 0 }}>
              ✧ {savedRecipes.length} treasured recipe{savedRecipes.length !== 1 ? 's' : ''} ✧
            </p>
          </div>
        </motion.div>
        
        {savedRecipes.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="pinterest-card"
            style={{
              textAlign: 'center',
              padding: '4rem',
              background: 'white',
              borderRadius: '30px',
              boxShadow: '0 20px 40px rgba(200,90,122,0.15)',
              border: '2px dashed rgba(200,90,122,0.3)',
              maxWidth: '500px',
              margin: '0 auto'
            }}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <BookOpen size={64} color="#C85A7A" />
            </motion.div>
            <p style={{ fontSize: '1.2rem', color: '#B84868', marginTop: '1rem', fontStyle: 'italic', fontWeight: 500 }}>
              Your recipe book is waiting to be filled
            </p>
            <p style={{ fontSize: '0.9rem', color: '#999', marginTop: '0.5rem' }}>
              Save recipes while searching to build your collection
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => window.location.href = '/'}
              className="btn-primary"
              style={{ 
                marginTop: '2rem',
                background: 'linear-gradient(135deg, #C85A7A, #B84868)'
              }}
            >
              discover recipes ✧
            </motion.button>
          </motion.div>
        ) : (
          <>
            {/* Recipe Book Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
              gap: '2rem',
              perspective: '1000px'
            }}>
              <AnimatePresence>
                {displayedRecipes.map((recipe, idx) => {
                  const recipeImage = recipeImages[recipe.recipeName] || defaultImage;
                  const isFlipped = flippedCard === recipe._id;
                  
                  return (
                    <motion.div
                      key={recipe._id}
                      initial={{ opacity: 0, rotateY: -90 }}
                      animate={{ opacity: 1, rotateY: 0 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ delay: idx * 0.1, duration: 0.5 }}
                      style={{
                        position: 'relative',
                        cursor: 'pointer',
                        transformStyle: 'preserve-3d',
                        transition: 'transform 0.6s',
                        transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                      }}
                      onClick={() => handleFlip(recipe._id)}
                    >
                      {/* Book Page Front */}
                      <div style={{
                        position: 'relative',
                        background: '#FFFFFF',
                        borderRadius: '20px',
                        overflow: 'hidden',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                        border: '1px solid rgba(200,90,122,0.25)',
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(0deg)'
                      }}>
                        {/* Book spine effect */}
                        <div style={{
                          position: 'absolute',
                          left: 0,
                          top: 0,
                          bottom: 0,
                          width: '12px',
                          background: 'linear-gradient(90deg, #C85A7A, #B84868)',
                          borderRadius: '20px 0 0 20px'
                        }} />
                        
                        {/* Ribbon bookmark */}
                        <div style={{
                          position: 'absolute',
                          top: 0,
                          right: 20,
                          width: '40px',
                          height: '60px',
                          background: '#C85A7A',
                          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)',
                          zIndex: 2,
                          opacity: 0.85
                        }} />
                        
                        {/* Image Section */}
                        <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                          <img 
                            src={recipeImage}
                            alt={recipe.recipeName}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              transition: 'transform 0.5s ease'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                          />
                          <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.3) 100%)'
                          }} />
                          
                          {/* Page number */}
                          <div style={{
                            position: 'absolute',
                            bottom: '10px',
                            right: '15px',
                            background: 'rgba(255,255,255,0.95)',
                            padding: '4px 10px',
                            borderRadius: '20px',
                            fontSize: '11px',
                            color: '#B84868',
                            fontFamily: "'Playfair Display', serif",
                            fontStyle: 'italic',
                            fontWeight: 600
                          }}>
                            p.{idx + 1 + currentPage * recipesPerPage}
                          </div>
                        </div>
                        
                        {/* Content */}
                        <div style={{ padding: '1.25rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.75rem' }}>
                            <div style={{ flex: 1 }}>
                              <h3 style={{ 
                                fontSize: '1.1rem', 
                                color: '#2D2A24', 
                                marginBottom: '0.25rem',
                                fontFamily: "'Playfair Display', serif",
                                fontStyle: 'italic',
                                fontWeight: 600
                              }}>
                                {recipe.recipeName}
                              </h3>
                              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <p style={{ fontSize: '11px', color: '#B84868', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                  <Clock size={12} /> {recipe.prepTime}
                                </p>
                                <p style={{ fontSize: '10px', color: '#999', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                  <Calendar size={10} /> {new Date(recipe.savedAt).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <div style={{ display: 'flex', gap: '0.35rem' }}>
                              <button
                                onClick={(e) => handleToggleFavorite(recipe._id, e)}
                                style={{
                                  background: recipe.isFavorite ? '#FFD166' : '#FFF0F5',
                                  border: 'none',
                                  padding: '6px',
                                  borderRadius: '50%',
                                  cursor: 'pointer',
                                  color: recipe.isFavorite ? '#B45309' : '#C85A7A',
                                  transition: 'all 0.2s ease'
                                }}
                              >
                                <Star size={14} fill={recipe.isFavorite ? 'currentColor' : 'none'} />
                              </button>
                              <button
                                onClick={(e) => handleDelete(recipe._id, e)}
                                style={{
                                  background: '#FFF0F5',
                                  border: 'none',
                                  padding: '6px',
                                  borderRadius: '50%',
                                  cursor: 'pointer',
                                  color: '#C85A7A',
                                  transition: 'all 0.2s ease'
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = '#C85A7A';
                                  e.currentTarget.style.color = 'white';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = '#FFF0F5';
                                  e.currentTarget.style.color = '#C85A7A';
                                }}
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>

                          {recipe.isFavorite && (
                            <div style={{ marginBottom: '0.75rem' }}>
                              <span style={{
                                background: '#FFF8DB',
                                color: '#B45309',
                                padding: '4px 10px',
                                borderRadius: '999px',
                                fontSize: '10px',
                                fontWeight: 600,
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px'
                              }}>
                                <Star size={10} fill="currentColor" /> favorite
                              </span>
                            </div>
                          )}
                          
                          {/* Ingredients preview */}
                          <div style={{ marginBottom: '0.75rem' }}>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                              {recipe.ingredients.slice(0, 4).map((ing, idx) => (
                                <span key={idx} style={{
                                  background: '#FFF0F5',
                                  padding: '3px 8px',
                                  borderRadius: '12px',
                                  fontSize: '9px',
                                  color: '#B84868',
                                  fontWeight: 500
                                }}>
                                  {ing.name}
                                </span>
                              ))}
                              {recipe.ingredients.length > 4 && (
                                <span style={{
                                  background: '#FFF0F5',
                                  padding: '3px 8px',
                                  borderRadius: '12px',
                                  fontSize: '9px',
                                  color: '#B84868'
                                }}>
                                  +{recipe.ingredients.length - 4}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Instructions Toggle Button */}
                          <div style={{ marginBottom: '0.75rem' }}>
                            <button
                              onClick={(e) => toggleInstructions(recipe._id, e)}
                              style={{
                                background: 'none',
                                border: 'none',
                                color: '#C85A7A',
                                fontWeight: 500,
                                cursor: 'pointer',
                                fontSize: '11px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                padding: 0,
                                fontFamily: "'Playfair Display', serif"
                              }}
                            >
                              {expandedInstructions[recipe._id] ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                              {expandedInstructions[recipe._id] ? 'hide instructions' : 'view instructions'}
                            </button>
                            {expandedInstructions[recipe._id] && (
                              <motion.ol 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                style={{ 
                                  paddingLeft: '1rem', 
                                  marginTop: '0.5rem', 
                                  color: '#666', 
                                  fontSize: '9px', 
                                  lineHeight: 1.4,
                                  marginBottom: '0.5rem'
                                }}
                              >
                                {recipe.instructions && recipe.instructions.length > 0 ? (
                                  recipe.instructions.map((step, idx) => (
                                    <li key={idx} style={{ marginBottom: '0.3rem' }}>{step}</li>
                                  ))
                                ) : (
                                  <li>No instructions available for this recipe.</li>
                                )}
                              </motion.ol>
                            )}
                          </div>
                          
                          {/* Click to flip hint */}
                          <div style={{
                            textAlign: 'center',
                            marginTop: '0.5rem',
                            fontSize: '10px',
                            color: '#C85A7A',
                            fontStyle: 'italic',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '4px'
                          }}>
                            <Eye size={10} /> tap to read recipe
                          </div>
                        </div>
                      </div>
                      
                      {/* Book Page Back (Instructions) */}
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: '#FFF8F0',
                        borderRadius: '20px',
                        padding: '1.5rem',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                        border: '1px solid rgba(200,90,122,0.25)',
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                        overflow: 'auto'
                      }}>
                        <div style={{ position: 'relative', height: '100%' }}>
                          <div style={{
                            position: 'absolute',
                            top: -10,
                            left: -10,
                            right: -10,
                            bottom: -10,
                            background: 'radial-gradient(circle at 20% 30%, rgba(200,90,122,0.05) 0%, transparent 70%)',
                            pointerEvents: 'none'
                          }} />
                          
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
                            <ChefHat size={20} color="#B84868" />
                            <h4 style={{ color: '#B84868', fontSize: '14px', fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontWeight: 600 }}>
                              how to make
                            </h4>
                          </div>
                          
                          <ol style={{ 
                            paddingLeft: '1.2rem', 
                            color: '#666', 
                            fontSize: '11px', 
                            lineHeight: 1.6,
                            marginBottom: '1rem'
                          }}>
                            {recipe.instructions && recipe.instructions.length > 0 ? (
                              recipe.instructions.map((step, idx) => (
                                <li key={idx} style={{ marginBottom: '0.5rem' }}>{step}</li>
                              ))
                            ) : (
                              <li>No instructions available for this recipe.</li>
                            )}
                          </ol>
                          
                          <div style={{
                            borderTop: '1px dashed #FFE4E8',
                            paddingTop: '0.75rem',
                            marginTop: '0.5rem',
                            textAlign: 'center'
                          }}>
                            <p style={{ fontSize: '10px', color: '#C85A7A', fontStyle: 'italic', fontWeight: 500 }}>
                              ✧ happy cooking ✧
                            </p>
                          </div>
                          
                          <div style={{
                            position: 'absolute',
                            bottom: '10px',
                            right: '10px',
                            fontSize: '10px',
                            color: '#C85A7A',
                            fontFamily: "'Playfair Display', serif",
                            fontStyle: 'italic'
                          }}>
                            ~ bon appétit ~
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
            
            {/* Book-style Pagination */}
            {totalPages > 1 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '1rem',
                  marginTop: '3rem',
                  padding: '1rem'
                }}
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                  disabled={currentPage === 0}
                  style={{
                    background: currentPage === 0 ? '#FFE4E8' : 'linear-gradient(135deg, #C85A7A, #B84868)',
                    border: 'none',
                    padding: '10px',
                    borderRadius: '50%',
                    cursor: currentPage === 0 ? 'not-allowed' : 'pointer',
                    color: currentPage === 0 ? '#999' : 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <ChevronLeft size={20} />
                </motion.button>
                
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'baseline' }}>
                  <span style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '14px',
                    color: '#B84868',
                    fontStyle: 'italic',
                    fontWeight: 600
                  }}>
                    page {currentPage + 1} of {totalPages}
                  </span>
                  <div style={{
                    width: '30px',
                    height: '2px',
                    background: '#C85A7A',
                    margin: '0 0.5rem',
                    borderRadius: '2px'
                  }} />
                  <span style={{
                    fontSize: '11px',
                    color: '#999'
                  }}>
                    {savedRecipes.length} recipes total
                  </span>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
                  disabled={currentPage === totalPages - 1}
                  style={{
                    background: currentPage === totalPages - 1 ? '#FFE4E8' : 'linear-gradient(135deg, #C85A7A, #B84868)',
                    border: 'none',
                    padding: '10px',
                    borderRadius: '50%',
                    cursor: currentPage === totalPages - 1 ? 'not-allowed' : 'pointer',
                    color: currentPage === totalPages - 1 ? '#999' : 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <ChevronRight size={20} />
                </motion.button>
              </motion.div>
            )}
            
            {/* Decorative book footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{
                textAlign: 'center',
                marginTop: '3rem',
                padding: '1rem',
                borderTop: '1px solid rgba(200,90,122,0.25)',
                position: 'relative'
              }}
            >
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '1rem',
                color: '#C85A7A',
                fontSize: '11px',
                fontStyle: 'italic',
                fontWeight: 500
              }}>
                <span>✧</span>
                <span>every recipe tells a story</span>
                <span>✧</span>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </motion.div>
  );
}

export default SavedRecipes;