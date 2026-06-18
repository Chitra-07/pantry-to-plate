import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Flower2, Heart, BookOpen, Clock, TrendingUp, Sparkles, 
  Award, Calendar, Star, Coffee, ChefHat, Utensils,
  BarChart3, PieChart, Smile, Zap, Gift, Crown,
  Cake, Pizza, Salad, Egg, X, Search
} from 'lucide-react';
import Navbar from '../components/Navbar';
import IngredientChecklist from '../components/IngredientChecklist';
import RecipeCard from '../components/RecipeCard';

const API_URL = 'http://localhost:5000/api';

// Food sticker components - DARKER VERSION
const FoodSticker = ({ icon: Icon, delay, x, y, size, rotate, duration }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: [0, 0.65, 0.45, 0.65, 0],
      scale: [0, 1, 1, 1, 0],
      y: [y, y - 80, y - 160, y - 240, y - 320]
    }}
    transition={{
      duration: duration || 10,
      repeat: Infinity,
      delay: delay,
      ease: "easeOut"
    }}
    style={{
      position: 'absolute',
      left: `${x}%`,
      top: `${y}%`,
      pointerEvents: 'none',
      zIndex: 1
    }}
  >
    <Icon size={size} color="#C85A7A" strokeWidth={1.8} style={{ opacity: 0.7 }} />
  </motion.div>
);

const StaticSticker = ({ icon: Icon, x, y, size, rotate, opacity = 0.42 }) => (
  <motion.div
    initial={{ scale: 0, rotate: 0 }}
    animate={{ scale: 1, rotate: rotate }}
    transition={{ duration: 0.5, delay: Math.random() * 0.5 }}
    style={{
      position: 'absolute',
      left: `${x}%`,
      top: `${y}%`,
      pointerEvents: 'none',
      zIndex: 1
    }}
  >
    <Icon size={size} color="#C85A7A" strokeWidth={1.5} style={{ opacity: opacity }} />
  </motion.div>
);

function Dashboard({ token, user }) {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [savedRecipeIds, setSavedRecipeIds] = useState([]);
  const [stats, setStats] = useState({
    totalSaved: 0,
    favoriteCategory: '',
    totalPrepTime: 0,
    mostCooked: '',
    streak: 0,
    favoriteIngredient: ''
  });
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    fetchSavedRecipes();
  }, []);

  const fetchSavedRecipes = async () => {
    try {
      const response = await axios.get(`${API_URL}/saved-recipes`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const recipes = response.data;
      setSavedRecipes(recipes);
      setSavedRecipeIds(recipes.map(r => r.recipeId));
      
      // Calculate detailed stats
      const totalSaved = recipes.length;
      const totalPrepTime = recipes.reduce((sum, recipe) => {
        const minutes = parseInt(recipe.prepTime) || 15;
        return sum + minutes;
      }, 0);
      
      // Find most common cuisine type
      const cuisineCount = {};
      recipes.forEach(recipe => {
        let category = 'other';
        if (recipe.recipeName.toLowerCase().includes('pasta')) category = 'pasta';
        else if (recipe.recipeName.toLowerCase().includes('rice')) category = 'rice dishes';
        else if (recipe.recipeName.toLowerCase().includes('egg')) category = 'egg dishes';
        else if (recipe.recipeName.toLowerCase().includes('soup')) category = 'soups';
        else if (recipe.recipeName.toLowerCase().includes('chicken')) category = 'chicken';
        else category = 'variety';
        
        cuisineCount[category] = (cuisineCount[category] || 0) + 1;
      });
      
      const favoriteCategory = Object.keys(cuisineCount).length > 0 
        ? Object.keys(cuisineCount).reduce((a, b) => cuisineCount[a] > cuisineCount[b] ? a : b)
        : 'none';
      
      // Find most cooked recipe
      const recipeCount = {};
      recipes.forEach(recipe => {
        recipeCount[recipe.recipeName] = (recipeCount[recipe.recipeName] || 0) + 1;
      });
      const mostCooked = Object.keys(recipeCount).length > 0
        ? Object.keys(recipeCount).reduce((a, b) => recipeCount[a] > recipeCount[b] ? a : b)
        : 'none';
      
      // Get all ingredients and find most common
      const allIngredients = recipes.flatMap(r => r.ingredients.map(i => i.name));
      const ingredientCount = {};
      allIngredients.forEach(ing => {
        ingredientCount[ing] = (ingredientCount[ing] || 0) + 1;
      });
      const favoriteIngredient = Object.keys(ingredientCount).length > 0
        ? Object.keys(ingredientCount).reduce((a, b) => ingredientCount[a] > ingredientCount[b] ? a : b)
        : 'none';
      
      // Calculate streak (days since first saved recipe)
      let streak = 0;
      if (recipes.length > 0) {
        const firstDate = new Date(recipes[recipes.length - 1].savedAt);
        const today = new Date();
        const diffTime = Math.abs(today - firstDate);
        streak = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      }
      
      // Recent activity (last 3 saved recipes)
      const recent = recipes.slice(0, 3).map(r => ({
        name: r.recipeName,
        date: new Date(r.savedAt).toLocaleDateString(),
        prepTime: r.prepTime
      }));
      
      setStats({
        totalSaved,
        totalPrepTime,
        favoriteCategory: favoriteCategory === 'none' ? 'start exploring!' : favoriteCategory,
        mostCooked: mostCooked === 'none' ? 'keep cooking!' : mostCooked,
        streak,
        favoriteIngredient: favoriteIngredient === 'none' ? 'discover new flavors' : favoriteIngredient
      });
      setRecentActivity(recent);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching saved recipes:', error);
      setLoading(false);
    }
  };

  const handleGetSuggestions = async (selectedIngredients) => {
    setLoadingSuggestions(true);
    setShowSuggestions(true);
    try {
      const response = await axios.post(`${API_URL}/recipes/suggest`, {
        selectedIngredients
      });
      setSuggestions(response.data.suggestions);
    } catch (error) {
      console.error('Error getting suggestions:', error);
      alert('Error getting recipe suggestions. Please try again.');
    } finally {
      setLoadingSuggestions(false);
    }
  };

  const handleSaveRecipe = (recipeId) => {
    setSavedRecipeIds([...savedRecipeIds, recipeId]);
    fetchSavedRecipes(); // Refresh to update stats
  };

  // Achievement levels based on saved recipes
  const getAchievementLevel = () => {
    if (stats.totalSaved >= 20) return { level: 'Master Chef', icon: Crown, color: '#FFD700' };
    if (stats.totalSaved >= 10) return { level: 'Home Chef', icon: Award, color: '#C0C0C0' };
    if (stats.totalSaved >= 5) return { level: 'Rising Star', icon: Star, color: '#CD7F32' };
    return { level: 'Beginner', icon: Smile, color: '#C85A7A' };
  };

  const achievement = getAchievementLevel();
  const AchievementIcon = achievement.icon;

  if (loading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ 
          background: 'linear-gradient(135deg, #f7f0f0 0%, #fdf9f9 100%)', 
          minHeight: '100vh' 
        }}
      >
        <Navbar user={user} onLogout={() => {}} />
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <motion.div 
            animate={{ 
              rotate: 360, 
              scale: [1, 1.2, 1],
            }} 
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles size={48} color="#C85A7A" />
          </motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{ color: '#B84868', marginTop: '1rem', fontStyle: 'italic', fontWeight: 500 }}
          >
            preparing your dashboard...
          </motion.p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ 
        background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF5F5 100%)', 
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Static Food Stickers - DARKER */}
      <StaticSticker icon={Coffee} x={3} y={15} size={80} rotate={-15} opacity={0.45} />
      <StaticSticker icon={Cake} x={85} y={18} size={75} rotate={10} opacity={0.4} />
      <StaticSticker icon={Pizza} x={7} y={72} size={70} rotate={20} opacity={0.45} />
      <StaticSticker icon={Salad} x={86} y={78} size={75} rotate={-10} opacity={0.4} />
      <StaticSticker icon={Egg} x={88} y={48} size={65} rotate={25} opacity={0.42} />
      <StaticSticker icon={ChefHat} x={2} y={45} size={80} rotate={-20} opacity={0.48} />
      <StaticSticker icon={Heart} x={90} y={5} size={60} rotate={15} opacity={0.5} />
      <StaticSticker icon={Flower2} x={12} y={88} size={55} rotate={-5} opacity={0.4} />
      <StaticSticker icon={Pizza} x={42} y={3} size={55} rotate={30} opacity={0.42} />
      <StaticSticker icon={Cake} x={18} y={52} size={50} rotate={-25} opacity={0.4} />
      <StaticSticker icon={Coffee} x={92} y={88} size={60} rotate={12} opacity={0.45} />
      <StaticSticker icon={ChefHat} x={48} y={92} size={55} rotate={-15} opacity={0.4} />
      <StaticSticker icon={Heart} x={5} y={88} size={45} rotate={-8} opacity={0.48} />
      <StaticSticker icon={Sparkles} x={95} y={45} size={50} rotate={18} opacity={0.42} />
      
      {/* Animated Floating Food Stickers - DARKER */}
      <FoodSticker icon={Coffee} delay={0} x={15} y={80} size={40} rotate={-10} duration={12} />
      <FoodSticker icon={Cake} delay={2} x={70} y={5} size={42} rotate={15} duration={14} />
      <FoodSticker icon={Pizza} delay={4} x={28} y={68} size={35} rotate={8} duration={10} />
      <FoodSticker icon={Salad} delay={1} x={65} y={85} size={38} rotate={-12} duration={13} />
      <FoodSticker icon={Egg} delay={3} x={78} y={35} size={33} rotate={20} duration={11} />
      <FoodSticker icon={ChefHat} delay={5} x={18} y={25} size={40} rotate={-8} duration={15} />
      <FoodSticker icon={Heart} delay={2.5} x={52} y={10} size={30} rotate={5} duration={9} />
      <FoodSticker icon={Flower2} delay={4.5} x={58} y={88} size={35} rotate={-15} duration={12} />
      <FoodSticker icon={Sparkles} delay={1.5} x={38} y={8} size={28} rotate={10} duration={8} />
      <FoodSticker icon={Heart} delay={3.5} x={72} y={62} size={28} rotate={-5} duration={10} />
      <FoodSticker icon={Coffee} delay={6} x={48} y={75} size={30} rotate={12} duration={16} />
      <FoodSticker icon={Cake} delay={7} x={82} y={55} size={33} rotate={-18} duration={13} />
      
      {/* Decorative Background Radial Gradients */}
      <div style={{
        position: 'absolute',
        top: '5%',
        right: '-5%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(200,90,122,0.08) 0%, rgba(200,90,122,0) 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        left: '-5%',
        width: '350px',
        height: '350px',
        background: 'radial-gradient(circle, rgba(200,90,122,0.06) 0%, rgba(200,90,122,0) 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        top: '40%',
        left: '20%',
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle, rgba(200,90,122,0.05) 0%, rgba(200,90,122,0) 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />
      
      <Navbar user={user} onLogout={() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/';
      }} />
      
      <div className="container" style={{ padding: '2rem', position: 'relative', zIndex: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Insights Section - MOVED TO TOP */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem',
              marginBottom: '2rem'
            }}
          >
            {/* Cooking Insights */}
            <div className="pinterest-card" style={{
              padding: '1.25rem',
              background: 'white',
              borderRadius: '16px',
              border: '1px solid rgba(200,90,122,0.25)'
            }}>
              <h3 style={{
                fontSize: '1rem',
                color: '#B84868',
                marginBottom: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontFamily: "'Playfair Display', serif",
                fontStyle: 'italic'
              }}>
                <BarChart3 size={16} /> cooking insights
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div>
                  <p style={{ fontSize: '10px', color: '#999', marginBottom: '2px' }}>favorite cuisine</p>
                  <p style={{ fontSize: '13px', color: '#2D2A24', fontWeight: 600, textTransform: 'capitalize' }}>
                    {stats.favoriteCategory}
                  </p>
                </div>
                <div>
                  <p style={{ fontSize: '10px', color: '#999', marginBottom: '2px' }}>most cooked dish</p>
                  <p style={{ fontSize: '13px', color: '#2D2A24', fontWeight: 600 }}>
                    {stats.mostCooked.length > 30 ? stats.mostCooked.substring(0, 30) + '...' : stats.mostCooked}
                  </p>
                </div>
                <div>
                  <p style={{ fontSize: '10px', color: '#999', marginBottom: '2px' }}>favorite ingredient</p>
                  <p style={{ fontSize: '13px', color: '#2D2A24', fontWeight: 600 }}>
                    {stats.favoriteIngredient}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Recent Activity */}
            <div className="pinterest-card" style={{
              padding: '1.25rem',
              background: 'white',
              borderRadius: '16px',
              border: '1px solid rgba(200,90,122,0.25)'
            }}>
              <h3 style={{
                fontSize: '1rem',
                color: '#B84868',
                marginBottom: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontFamily: "'Playfair Display', serif",
                fontStyle: 'italic'
              }}>
                <Calendar size={16} /> recent activity
              </h3>
              {recentActivity.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {recentActivity.map((activity, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      style={{
                        padding: '0.5rem',
                        background: '#FFF0F5',
                        borderRadius: '10px'
                      }}
                    >
                      <p style={{ fontSize: '12px', fontWeight: 600, color: '#2D2A24', marginBottom: '2px' }}>
                        {activity.name}
                      </p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <p style={{ fontSize: '9px', color: '#B84868' }}>
                          <Clock size={8} /> {activity.prepTime}
                        </p>
                        <p style={{ fontSize: '9px', color: '#999' }}>{activity.date}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '0.75rem' }}>
                  <Sparkles size={24} color="#FFE4E8" />
                  <p style={{ fontSize: '11px', color: '#999', marginTop: '0.25rem' }}>
                    no activity yet. start saving recipes!
                  </p>
                </div>
              )}
            </div>
            
            {/* Achievements */}
            <div className="pinterest-card" style={{
              padding: '1.25rem',
              background: 'white',
              borderRadius: '16px',
              border: '1px solid rgba(200,90,122,0.25)'
            }}>
              <h3 style={{
                fontSize: '1rem',
                color: '#B84868',
                marginBottom: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontFamily: "'Playfair Display', serif",
                fontStyle: 'italic'
              }}>
                <Gift size={16} /> achievements
              </h3>
              <div style={{ marginBottom: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <span style={{ fontSize: '10px', color: '#666' }}>Recipe Collector</span>
                  <span style={{ fontSize: '10px', color: '#B84868', fontWeight: 600 }}>
                    {stats.totalSaved}/20
                  </span>
                </div>
                <div style={{ height: '4px', background: '#FFF0F5', borderRadius: '2px', overflow: 'hidden' }}>
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((stats.totalSaved / 20) * 100, 100)}%` }}
                    transition={{ duration: 1 }}
                    style={{
                      height: '100%',
                      background: 'linear-gradient(90deg, #C85A7A, #B84868)',
                      borderRadius: '2px'
                    }}
                  />
                </div>
              </div>
              
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <span style={{ fontSize: '10px', color: '#666' }}>Cooking Streak</span>
                  <span style={{ fontSize: '10px', color: '#B84868', fontWeight: 600 }}>
                    {stats.streak}/30
                  </span>
                </div>
                <div style={{ height: '4px', background: '#FFF0F5', borderRadius: '2px', overflow: 'hidden' }}>
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((stats.streak / 30) * 100, 100)}%` }}
                    transition={{ duration: 1 }}
                    style={{
                      height: '100%',
                      background: 'linear-gradient(90deg, #C85A7A, #B84868)',
                      borderRadius: '2px'
                    }}
                  />
                </div>
              </div>
              
              {stats.totalSaved >= 20 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  style={{
                    marginTop: '0.75rem',
                    padding: '0.4rem',
                    background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                    borderRadius: '10px',
                    textAlign: 'center'
                  }}
                >
                  <p style={{ fontSize: '9px', color: 'white', fontWeight: 600 }}>
                    🏆 Legendary Chef!
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
          
          {/* Recipe Finder Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 style={{
              fontSize: '1.2rem',
              color: '#2D2A24',
              fontFamily: "'Playfair Display', serif",
              fontStyle: 'italic',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Search size={18} color="#C85A7A" />
              find new recipes
            </h2>
            
            <IngredientChecklist 
              onGetSuggestions={handleGetSuggestions}
              token={token}
            />
          </motion.div>
          
          {/* Recipe Suggestions Results */}
          {showSuggestions && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ marginTop: '2rem' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h2 style={{
                  fontSize: '1.2rem',
                  color: '#2D2A24',
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: 'italic',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <Sparkles size={18} color="#C85A7A" />
                  recipe suggestions
                </h2>
                <button
                  onClick={() => setShowSuggestions(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#C85A7A',
                    cursor: 'pointer',
                    fontSize: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <X size={16} /> clear
                </button>
              </div>
              
              {loadingSuggestions ? (
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity }}>
                    <Sparkles size={32} color="#C85A7A" />
                  </motion.div>
                  <p style={{ color: '#B84868', marginTop: '1rem' }}>finding recipes...</p>
                </div>
              ) : suggestions.length > 0 ? (
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
                  gap: '1.5rem'
                }}>
                  {suggestions.map((recipe) => (
                    <RecipeCard
                      key={recipe.id}
                      recipe={recipe}
                      onSave={handleSaveRecipe}
                      isSaved={savedRecipeIds.includes(recipe.id)}
                      token={token}
                    />
                  ))}
                </div>
              ) : (
                <div className="pinterest-card" style={{
                  textAlign: 'center',
                  padding: '2rem',
                  background: 'white',
                  border: '1px solid rgba(200,90,122,0.25)'
                }}>
                  <p style={{ color: '#999', fontStyle: 'italic' }}>
                    No recipes found. Try selecting different ingredients!
                  </p>
                </div>
              )}
            </motion.div>
          )}
          
          {/* Motivation Quote */}
          {stats.totalSaved > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              style={{
                marginTop: '2rem',
                textAlign: 'center',
                padding: '0.75rem',
                background: 'linear-gradient(135deg, #FFF0F5, #FFE4E8)',
                borderRadius: '16px'
              }}
            >
              <p style={{ fontSize: '11px', color: '#B84868', fontStyle: 'italic' }}>
                "The only limit to your cooking is your imagination. Keep creating, keep saving!"
              </p>
              <p style={{ fontSize: '10px', color: '#C85A7A', marginTop: '0.25rem' }}>
                ✧ {stats.totalSaved} recipes and counting ✧
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Dashboard;