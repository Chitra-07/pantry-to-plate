import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Clock, HeartHandshake, ArrowRight, TrendingUp, Salad, Soup, Coffee, Flower2, Cake, Pizza, Egg, ChefHat, Crown, UtensilsCrossed, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Navbar from '../components/Navbar';
import IngredientChecklist from '../components/IngredientChecklist';
import RecipeCard from '../components/RecipeCard';
import ShareModal from '../components/ShareModal';

const API_URL = 'http://localhost:5000/api';

const buildShoppingList = (suggestions = []) => {
  const items = new Map();

  suggestions.forEach((recipe) => {
    [...(recipe.missingRequiredItems || []), ...(recipe.missingPantryItems || [])].forEach((item) => {
      const key = item.toLowerCase().trim();
      if (!key) return;

      const existing = items.get(key);
      if (existing) {
        existing.count += 1;
        if (recipe.name && !existing.recipeNames.includes(recipe.name)) {
          existing.recipeNames.push(recipe.name);
        }
        return;
      }

      items.set(key, {
        name: item,
        count: 1,
        recipeNames: recipe.name ? [recipe.name] : []
      });
    });
  });

  return Array.from(items.values()).sort((a, b) => a.name.localeCompare(b.name));
};

// Food sticker components - SLIGHTLY DARKER
const FoodSticker = ({ icon: Icon, delay, x, y, size, rotate, duration }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: [0, 0.55, 0.4, 0.55, 0],
      scale: [0, 1, 1, 1, 0],
      y: [y, y - 100, y - 200, y - 300, y - 400]
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
    <Icon size={size} color="#D45A7A" strokeWidth={1.5} style={{ opacity: 0.6 }} />
  </motion.div>
);

const StaticSticker = ({ icon: Icon, x, y, size, rotate, opacity = 0.3 }) => (
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
    <Icon size={size} color="#D45A7A" strokeWidth={1.3} style={{ opacity: opacity }} />
  </motion.div>
);

function Home({ token, user, onLogout }) {
  const [showGenerator, setShowGenerator] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [shoppingList, setShoppingList] = useState([]);
  const [shareUrl, setShareUrl] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const handleGetStarted = () => {
    if (!token) {
      navigate('/signup');
    } else {
      setShowGenerator(true);
    }
  };

  const handleGetSuggestions = async (selectedIngredients, filters = {}) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/recipes/suggest`, {
        selectedIngredients,
        filters
      });
      setSuggestions(response.data.suggestions);
      setShoppingList(buildShoppingList(response.data.suggestions));

      if (token && response.data.suggestions.length > 0) {
        axios.post(`${API_URL}/shopping-lists/generate`, {
          selectedIngredients,
          suggestions: response.data.suggestions,
          title: 'Quick shopping list'
        }, {
          headers: { Authorization: `Bearer ${token}` }
        }).catch((error) => {
          console.error('Error saving shopping list:', error);
        });
      }
      
      const shareResponse = await axios.post(`${API_URL}/recipes/share`, {
        ingredients: selectedIngredients
      });
      setShareUrl(shareResponse.data.shareUrl);
      
    } catch (error) {
      console.error('Error getting suggestions:', error);
      alert('Error getting recipe suggestions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveRecipe = (recipeId) => {
    setSavedRecipes([...savedRecipes, recipeId]);
  };

  const handleOpenShareModal = () => {
    if (shareUrl) {
      setShowShareModal(true);
    } else {
      alert('No shareable link available yet. Please search for recipes first.');
    }
  };

  return (
    <div style={{ 
      position: 'relative', 
      overflow: 'hidden', 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF5F5 100%)'
    }}>
      {/* Static Background Stickers - SLIGHTLY DARKER */}
      <StaticSticker icon={Coffee} x={2} y={15} size={70} rotate={-15} opacity={0.32} />
      <StaticSticker icon={Cake} x={88} y={18} size={65} rotate={10} opacity={0.3} />
      <StaticSticker icon={Pizza} x={5} y={72} size={60} rotate={20} opacity={0.32} />
      <StaticSticker icon={Salad} x={86} y={78} size={65} rotate={-10} opacity={0.3} />
      <StaticSticker icon={Egg} x={85} y={48} size={55} rotate={25} opacity={0.31} />
      <StaticSticker icon={ChefHat} x={2} y={45} size={70} rotate={-20} opacity={0.33} />
      <StaticSticker icon={HeartHandshake} x={90} y={5} size={50} rotate={15} opacity={0.35} />
      <StaticSticker icon={Flower2} x={12} y={88} size={50} rotate={-5} opacity={0.3} />
      <StaticSticker icon={Sparkles} x={42} y={3} size={45} rotate={30} opacity={0.3} />
      <StaticSticker icon={Crown} x={18} y={52} size={48} rotate={-25} opacity={0.3} />
      <StaticSticker icon={Coffee} x={92} y={88} size={55} rotate={12} opacity={0.32} />
      <StaticSticker icon={ChefHat} x={48} y={92} size={50} rotate={-15} opacity={0.3} />
      <StaticSticker icon={Star} x={8} y={88} size={45} rotate={-8} opacity={0.33} />
      <StaticSticker icon={UtensilsCrossed} x={95} y={50} size={48} rotate={18} opacity={0.31} />
      <StaticSticker icon={Cake} x={32} y={85} size={40} rotate={22} opacity={0.28} />
      <StaticSticker icon={Pizza} x={75} y={12} size={45} rotate={-12} opacity={0.31} />
      <StaticSticker icon={Egg} x={55} y={8} size={35} rotate={35} opacity={0.3} />
      <StaticSticker icon={Salad} x={15} y={35} size={38} rotate={-18} opacity={0.28} />
      
      {/* Animated Floating Stickers - SLIGHTLY DARKER */}
      <FoodSticker icon={Coffee} delay={0} x={15} y={85} size={38} rotate={-10} duration={12} />
      <FoodSticker icon={Cake} delay={2} x={72} y={8} size={42} rotate={15} duration={14} />
      <FoodSticker icon={Pizza} delay={4} x={28} y={70} size={35} rotate={8} duration={10} />
      <FoodSticker icon={Salad} delay={1} x={68} y={88} size={36} rotate={-12} duration={13} />
      <FoodSticker icon={Egg} delay={3} x={78} y={38} size={32} rotate={20} duration={11} />
      <FoodSticker icon={ChefHat} delay={5} x={18} y={28} size={40} rotate={-8} duration={15} />
      <FoodSticker icon={HeartHandshake} delay={2.5} x={52} y={12} size={32} rotate={5} duration={9} />
      <FoodSticker icon={Flower2} delay={4.5} x={58} y={88} size={35} rotate={-15} duration={12} />
      <FoodSticker icon={Sparkles} delay={1.5} x={38} y={10} size={28} rotate={10} duration={8} />
      <FoodSticker icon={Sparkles} delay={3.5} x={72} y={65} size={28} rotate={-5} duration={10} />
      <FoodSticker icon={Coffee} delay={6} x={48} y={78} size={32} rotate={12} duration={16} />
      <FoodSticker icon={Cake} delay={7} x={82} y={58} size={36} rotate={-18} duration={13} />
      <FoodSticker icon={Pizza} delay={2.8} x={35} y={88} size={30} rotate={22} duration={11} />
      <FoodSticker icon={Salad} delay={5.5} x={25} y={18} size={32} rotate={-22} duration={14} />
      <FoodSticker icon={Star} delay={3.2} x={62} y={42} size={25} rotate={15} duration={9.5} />
      <FoodSticker icon={UtensilsCrossed} delay={4.8} x={45} y={55} size={28} rotate={-12} duration={11.5} />
      
      {/* Decorative Background Elements */}
      <div style={{
        position: 'fixed',
        top: '0%',
        right: '-5%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(212,90,122,0.06) 0%, rgba(212,90,122,0) 70%)',
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
        background: 'radial-gradient(circle, rgba(212,90,122,0.05) 0%, rgba(212,90,122,0) 70%)',
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
        background: 'radial-gradient(circle, rgba(212,90,122,0.04) 0%, rgba(212,90,122,0) 70%)',
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
        background: 'radial-gradient(circle, rgba(212,90,122,0.04) 0%, rgba(212,90,122,0) 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 0
      }} />
      
      <Navbar user={user} onLogout={onLogout} />
      
      {!showGenerator ? (
        // Hero Section with Image on Right - Enhanced Design
        <div className="hero" style={{ position: 'relative', zIndex: 1, background: 'transparent', padding: '2rem 0' }}>
          <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '4rem', flexWrap: 'wrap' }}>
            {/* Left Content */}
            <motion.div 
              className="fade-in-left"
              style={{ flex: 1, minWidth: '300px' }}
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  style={{ display: 'inline-block', marginBottom: '1rem' }}
                >
                  <div style={{
                    background: 'linear-gradient(135deg, #E8759A, #D45A7A)',
                    padding: '20px',
                    borderRadius: '50%',
                    display: 'inline-block',
                    boxShadow: '0 15px 35px rgba(232,117,154,0.35)'
                  }}>
                    <ChefHat size={44} color="white" />
                  </div>
                </motion.div>
                
                <h1 style={{
                  fontSize: '4.8rem',
                  background: 'linear-gradient(135deg, #E8759A, #D45A7A)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '1rem',
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: 'italic',
                  fontWeight: 700,
                  lineHeight: 1.15
                }}>
                  Turn nothing<br />into something
                </h1>
                
                <div style={{
                  display: 'inline-block',
                  background: '#FFF0F5',
                  padding: '0.5rem 1.2rem',
                  borderRadius: '50px',
                  marginBottom: '1.5rem'
                }}>
                  <p style={{
                    fontSize: '1rem',
                    color: '#E8759A',
                    fontStyle: 'italic',
                    letterSpacing: '0.5px',
                    fontWeight: 500,
                    margin: 0
                  }}>
                    ✧ sustainable cooking, reimagined ✧
                  </p>
                </div>
                
                <p style={{
                  fontSize: '1rem',
                  color: '#888',
                  maxWidth: '500px',
                  marginBottom: '2rem',
                  lineHeight: 1.8
                }}>
                  <em>Transform your leftovers into dreamy meals with our intelligent recipe generator. 
                  Because nothing should go to waste when it can become something beautiful.</em>
                </p>
                
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <motion.button 
                    whileHover={{ scale: 1.05, boxShadow: '0 8px 25px rgba(232,117,154,0.5)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleGetStarted} 
                    className="btn-primary" 
                    style={{ 
                      fontSize: '16px',
                      background: 'linear-gradient(135deg, #E8759A, #D45A7A)',
                      boxShadow: '0 4px 15px rgba(232,117,154,0.4)',
                      padding: '14px 36px'
                    }}
                  >
                    Start creating <TrendingUp size={18} />
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.05, background: '#E8759A', color: 'white' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowGenerator(true)} 
                    className="btn-secondary"
                    style={{
                      borderColor: '#E8759A',
                      color: '#E8759A',
                      padding: '12px 32px'
                    }}
                  >
                    Explore recipes
                  </motion.button>
                </div>
                
                <div style={{ display: 'flex', gap: '2.5rem', marginTop: '3rem' }}>
                  <motion.div whileHover={{ y: -3 }} style={{ textAlign: 'center' }}>
                    <div style={{
                      background: '#FFF0F5',
                      padding: '10px 15px',
                      borderRadius: '20px',
                      display: 'inline-block'
                    }}>
                      <h3 style={{ fontSize: '1.8rem', color: '#D45A7A', marginBottom: '0', fontWeight: 700 }}>50+</h3>
                      <p style={{ fontSize: '12px', color: '#999', fontWeight: 500 }}>delicious recipes</p>
                    </div>
                  </motion.div>
                  <motion.div whileHover={{ y: -3 }} style={{ textAlign: 'center' }}>
                    <div style={{
                      background: '#FFF0F5',
                      padding: '10px 15px',
                      borderRadius: '20px',
                      display: 'inline-block'
                    }}>
                      <h3 style={{ fontSize: '1.8rem', color: '#D45A7A', marginBottom: '0', fontWeight: 700 }}>10min</h3>
                      <p style={{ fontSize: '12px', color: '#999', fontWeight: 500 }}>average prep time</p>
                    </div>
                  </motion.div>
                  <motion.div whileHover={{ y: -3 }} style={{ textAlign: 'center' }}>
                    <div style={{
                      background: '#FFF0F5',
                      padding: '10px 15px',
                      borderRadius: '20px',
                      display: 'inline-block'
                    }}>
                      <h3 style={{ fontSize: '1.8rem', color: '#D45A7A', marginBottom: '0', fontWeight: 700 }}>100%</h3>
                      <p style={{ fontSize: '12px', color: '#999', fontWeight: 500 }}>sustainable</p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Right Image - Enhanced */}
            <motion.div 
              className="fade-in-right"
              style={{ flex: 1, minWidth: '300px', position: 'relative' }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div style={{
                position: 'relative',
                borderRadius: '35px',
                overflow: 'hidden',
                boxShadow: '0 25px 50px rgba(232,117,154,0.25)',
                transform: 'rotate(2deg)',
                border: '2px solid rgba(232,117,154,0.2)'
              }}>
                <img 
                  src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=700&fit=crop"
                  alt="Beautiful kitchen setup"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '35px',
                    transition: 'transform 0.5s ease'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '20px',
                  right: '20px',
                  background: 'rgba(255,255,255,0.96)',
                  backdropFilter: 'blur(12px)',
                  padding: '1rem 1.2rem',
                  borderRadius: '25px',
                  textAlign: 'center',
                  border: '1px solid rgba(232,117,154,0.25)'
                }}>
                  <p style={{ color: '#D45A7A', fontStyle: 'italic', margin: 0, fontSize: '14px', fontWeight: 600 }}>
                    "waste not, want not" ✦
                  </p>
                </div>
              </div>
              
              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{
                  position: 'absolute',
                  top: '-25px',
                  right: '-25px',
                  background: 'linear-gradient(135deg, #E8759A, #D45A7A)',
                  padding: '16px',
                  borderRadius: '50%',
                  boxShadow: '0 12px 25px rgba(232,117,154,0.4)',
                  zIndex: 10
                }}
              >
                <Salad size={28} color="white" />
              </motion.div>
              
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                style={{
                  position: 'absolute',
                  bottom: '50px',
                  left: '-25px',
                  background: 'linear-gradient(135deg, #E8759A, #D45A7A)',
                  padding: '16px',
                  borderRadius: '50%',
                  boxShadow: '0 12px 25px rgba(232,117,154,0.4)',
                  zIndex: 10
                }}
              >
                <Coffee size={28} color="white" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      ) : (
        // Recipe Generator Section - Enhanced Design
        <div className="container" style={{ padding: '3rem 2rem', position: 'relative', zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <motion.div
                animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                transition={{ rotate: { duration: 20, repeat: Infinity }, scale: { duration: 2, repeat: Infinity } }}
                style={{ display: 'inline-block', marginBottom: '1rem' }}
              >
                <div style={{
                  background: 'linear-gradient(135deg, #E8759A, #D45A7A)',
                  padding: '18px',
                  borderRadius: '50%',
                  display: 'inline-block',
                  boxShadow: '0 12px 30px rgba(232,117,154,0.35)'
                }}>
                  <Flower2 size={34} color="white" />
                </div>
              </motion.div>
              <h2 style={{
                fontSize: '2.8rem',
                background: 'linear-gradient(135deg, #E8759A, #D45A7A)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '0.5rem',
                fontFamily: "'Playfair Display', serif",
                fontStyle: 'italic'
              }}>
                What's in your fridge?
              </h2>
              <div style={{
                display: 'inline-block',
                background: '#FFF0F5',
                padding: '0.4rem 1rem',
                borderRadius: '30px'
              }}>
                <p style={{ color: '#D45A7A', fontStyle: 'italic', fontWeight: 500, margin: 0 }}>
                  Select the ingredients you have, and we'll suggest dreamy recipes ✧
                </p>
              </div>
            </div>
            
            <IngredientChecklist 
              onGetSuggestions={handleGetSuggestions}
              token={token}
            />
            
            {loading && (
              <div style={{ textAlign: 'center', padding: '3rem' }}>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  style={{ display: 'inline-block' }}
                >
                  <ChefHat size={52} color="#E8759A" />
                </motion.div>
                <p style={{ marginTop: '1rem', color: '#D45A7A', fontStyle: 'italic', fontWeight: 500 }}>finding delicious recipes for you...</p>
              </div>
            )}
            
            {suggestions.length > 0 && !loading && (
              <div style={{ marginTop: '4rem' }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  marginBottom: '2rem', 
                  flexWrap: 'wrap', 
                  gap: '1rem',
                  padding: '0 1rem'
                }}>
                  <h2 style={{
                    fontSize: '2rem',
                    color: '#D45A7A',
                    fontFamily: "'Playfair Display', serif",
                    fontStyle: 'italic',
                    margin: 0,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <Sparkles size={24} color="#E8759A" />
                    Your recipe suggestions ✧
                  </h2>
                  
                  <motion.button
                    whileHover={{ scale: 1.05, background: '#E8759A', color: 'white', borderColor: '#E8759A' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleOpenShareModal}
                    className="btn-secondary"
                    style={{ 
                      padding: '10px 28px',
                      borderColor: '#E8759A',
                      color: '#E8759A',
                      borderRadius: '40px'
                    }}
                  >
                    share this combo ✦
                  </motion.button>
                </div>
                
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
                  gap: '2rem',
                  padding: '0 1rem'
                }}>
                  {suggestions.map((recipe, idx) => (
                    <motion.div
                      key={recipe.id}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <RecipeCard
                        recipe={recipe}
                        onSave={handleSaveRecipe}
                        isSaved={savedRecipes.includes(recipe.id)}
                        token={token}
                        shoppingListItems={recipe.shoppingListItems}
                      />
                    </motion.div>
                  ))}
                </div>

                {shoppingList.length > 0 && (
                  <div style={{ marginTop: '2rem', padding: '0 1rem' }}>
                    <div style={{
                      background: 'white',
                      borderRadius: '24px',
                      padding: '1.5rem',
                      border: '1px solid rgba(232,117,154,0.15)',
                      boxShadow: '0 4px 20px rgba(232,117,154,0.08)'
                    }}>
                      <h3 style={{ color: '#D45A7A', marginBottom: '1rem', fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>
                        shopping list
                      </h3>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {shoppingList.map((item) => (
                          <span key={item.name} style={{
                            background: '#FFF0F5',
                            color: '#B84868',
                            padding: '6px 12px',
                            borderRadius: '999px',
                            fontSize: '12px',
                            border: '1px solid #FFE4E8'
                          }}>
                            {item.name}
                            {item.count > 1 ? ` x${item.count}` : ''}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {suggestions.length === 0 && !loading && (
              <motion.div 
                className="pinterest-card"
                style={{
                  textAlign: 'center',
                  padding: '3rem',
                  marginTop: '2rem',
                  background: 'white',
                  border: '2px dashed rgba(232,117,154,0.3)',
                  borderRadius: '28px',
                  boxShadow: '0 10px 30px rgba(232,117,154,0.08)'
                }}
              >
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Flower2 size={56} color="#E8759A" />
                </motion.div>
                <p style={{ fontSize: '1.1rem', color: '#D45A7A', marginTop: '1rem', fontStyle: 'italic', fontWeight: 500 }}>
                  select some ingredients above to get recipe suggestions ✧
                </p>
                <p style={{ fontSize: '0.9rem', color: '#999', marginTop: '0.5rem' }}>
                  We'll find the perfect recipes for what you have!
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
      
      {/* Share Modal */}
      {showShareModal && shareUrl && (
        <ShareModal
          shareUrl={shareUrl}
          onClose={() => setShowShareModal(false)}
        />
      )}
    </div>
  );
}

export default Home;