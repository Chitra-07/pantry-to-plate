import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, User, LogOut, Home, BookMarked, Flower2, Sparkles, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import CryingFridgeIcon from './CryingFridgeIcon';

function Navbar({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      style={{
        background: 'rgba(255, 255, 255, 0.98)',
        backdropFilter: 'blur(10px)',
        padding: '0.75rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 20px rgba(255, 183, 197, 0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        borderBottom: '2px solid rgba(255, 183, 197, 0.2)'
      }}
    >
      <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <motion.div
          whileHover={{ rotate: 180, scale: 1.1 }}
          transition={{ duration: 0.5 }}
          style={{
            background: 'linear-gradient(135deg, #FFB7C5, #f7489f)',
            padding: '8px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 10px rgba(255,183,197,0.3)'
          }}>
          <CryingFridgeIcon size={18} />
        </motion.div>
        <div>
          <h1 style={{
            fontSize: '1.3rem',
            background: 'linear-gradient(135deg, #FFB7C5, #FF69B4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontFamily: "'Playfair Display', serif",
            fontStyle: 'italic',
            fontWeight: 700,
            margin: 0
          }}>
            WhatsNotHere
          </h1>
          <p style={{ fontSize: '9px', color: '#FFB7C5', margin: 0, letterSpacing: '1px' }}>cry less, cook more ✧</p>
          <p style={{ fontSize: '9px', color: '#FFB7C5', margin: 0, letterSpacing: '1px' }}>save what you love ✧</p>
        </div>
      </Link>
      
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#666', fontSize: '13px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '5px', transition: 'color 0.3s' }}>
          <Home size={16} /> home
        </Link>
        {user && (
          <>
            <Link to="/dashboard" style={{ textDecoration: 'none', color: '#666', fontSize: '13px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Heart size={16} /> dashboard
            </Link>
            <Link to="/saved" style={{ textDecoration: 'none', color: '#666', fontSize: '13px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '5px' }}>
              <BookMarked size={16} /> collection
            </Link>
          </>
        )}
        {user ? (
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <span style={{ color: '#FF69B4', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '5px' }}>
              <User size={14} /> {user.name.split(' ')[0]}
            </span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="btn-pinterest"
              style={{ 
                padding: '6px 16px', 
                fontSize: '12px',
                background: 'linear-gradient(135deg, #FFB7C5, #FF69B4)',
                color: 'white',
                border: 'none',
                borderRadius: '40px',
                cursor: 'pointer'
              }}
            >
              <LogOut size={12} /> logout
            </motion.button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <Link to="/login">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                className="btn-pinterest" 
                style={{ 
                  padding: '6px 16px', 
                  fontSize: '12px', 
                  background: 'transparent', 
                  color: '#FF69B4', 
                  border: '2px solid #FFB7C5',
                  borderRadius: '40px',
                  cursor: 'pointer'
                }}
              >
                login
              </motion.button>
            </Link>
            <Link to="/signup">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                className="btn-pinterest" 
                style={{ 
                  padding: '6px 16px', 
                  fontSize: '12px',
                  background: 'linear-gradient(135deg, #ee8499, #FF69B4)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '40px',
                  cursor: 'pointer'
                }}
              >
                sign up
              </motion.button>
            </Link>
          </div>
        )}
      </div>
    </motion.nav>
  );
}

export default Navbar;