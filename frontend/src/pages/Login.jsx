import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, Sparkles, Heart, Eye, EyeOff, Coffee, Cake, Pizza, Salad, Egg, ChefHat } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Food sticker components
const FoodSticker = ({ icon: Icon, delay, x, y, size, rotate, duration }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: [0, 0.7, 0.5, 0.7, 0],
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
    <Icon size={size} color="#E8759A" strokeWidth={1.8} />
  </motion.div>
);

const StaticSticker = ({ icon: Icon, x, y, size, rotate, opacity = 0.35 }) => (
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
    <Icon size={size} color="#E8759A" strokeWidth={1.5} style={{ opacity: opacity }} />
  </motion.div>
);

function Login({ setToken, setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password
      });
      
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setToken(response.data.token);
      setUser(response.data.user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ 
        background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF5F5 100%)', 
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Static Food Stickers - Darker and more visible */}
      <StaticSticker icon={Coffee} x={3} y={15} size={80} rotate={-15} opacity={0.4} />
      <StaticSticker icon={Cake} x={85} y={18} size={75} rotate={10} opacity={0.35} />
      <StaticSticker icon={Pizza} x={7} y={72} size={70} rotate={20} opacity={0.4} />
      <StaticSticker icon={Salad} x={86} y={78} size={75} rotate={-10} opacity={0.35} />
      <StaticSticker icon={Egg} x={88} y={48} size={65} rotate={25} opacity={0.38} />
      <StaticSticker icon={ChefHat} x={2} y={45} size={80} rotate={-20} opacity={0.4} />
      <StaticSticker icon={Heart} x={90} y={5} size={60} rotate={15} opacity={0.45} />
      <StaticSticker icon={Sparkles} x={12} y={88} size={55} rotate={-5} opacity={0.35} />
      <StaticSticker icon={Pizza} x={42} y={3} size={55} rotate={30} opacity={0.35} />
      <StaticSticker icon={Cake} x={18} y={52} size={50} rotate={-25} opacity={0.35} />
      <StaticSticker icon={Coffee} x={92} y={88} size={60} rotate={12} opacity={0.38} />
      <StaticSticker icon={ChefHat} x={48} y={92} size={55} rotate={-15} opacity={0.35} />
      <StaticSticker icon={Heart} x={5} y={88} size={45} rotate={-8} opacity={0.4} />
      <StaticSticker icon={Sparkles} x={95} y={45} size={50} rotate={18} opacity={0.35} />
      
      {/* Animated Floating Food Stickers */}
      <FoodSticker icon={Coffee} delay={0} x={15} y={80} size={45} rotate={-10} duration={12} />
      <FoodSticker icon={Cake} delay={2} x={70} y={5} size={48} rotate={15} duration={14} />
      <FoodSticker icon={Pizza} delay={4} x={28} y={68} size={40} rotate={8} duration={10} />
      <FoodSticker icon={Salad} delay={1} x={65} y={85} size={42} rotate={-12} duration={13} />
      <FoodSticker icon={Egg} delay={3} x={78} y={35} size={38} rotate={20} duration={11} />
      <FoodSticker icon={ChefHat} delay={5} x={18} y={25} size={46} rotate={-8} duration={15} />
      <FoodSticker icon={Heart} delay={2.5} x={52} y={10} size={35} rotate={5} duration={9} />
      <FoodSticker icon={Sparkles} delay={4.5} x={58} y={88} size={40} rotate={-15} duration={12} />
      <FoodSticker icon={Sparkles} delay={1.5} x={38} y={8} size={32} rotate={10} duration={8} />
      <FoodSticker icon={Heart} delay={3.5} x={72} y={62} size={30} rotate={-5} duration={10} />
      <FoodSticker icon={Coffee} delay={6} x={48} y={75} size={35} rotate={12} duration={16} />
      <FoodSticker icon={Cake} delay={7} x={82} y={55} size={38} rotate={-18} duration={13} />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        style={{
          maxWidth: '480px',
          width: '100%',
          background: 'rgba(255, 255, 255, 0.96)',
          backdropFilter: 'blur(10px)',
          borderRadius: '40px',
          padding: '2.8rem',
          boxShadow: '0 25px 70px rgba(232,117,154,0.15), 0 0 0 1px rgba(232,117,154,0.25)',
          border: '1px solid rgba(232,117,154,0.3)',
          position: 'relative',
          zIndex: 10
        }}
      >
        {/* Decorative corner accents - Darker */}
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '140px',
          height: '140px',
          background: 'radial-gradient(circle at top right, rgba(232,117,154,0.12) 0%, transparent 70%)',
          borderTopRightRadius: '40px',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '140px',
          height: '140px',
          background: 'radial-gradient(circle at bottom left, rgba(232,117,154,0.1) 0%, transparent 70%)',
          borderBottomLeftRadius: '40px',
          pointerEvents: 'none'
        }} />
        
        {/* Small decorative dots - Darker */}
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '30px',
          display: 'flex',
          gap: '8px',
          zIndex: 11
        }}>
          <div style={{ width: '8px', height: '8px', background: '#E8759A', borderRadius: '50%', opacity: 0.5 }} />
          <div style={{ width: '8px', height: '8px', background: '#E8759A', borderRadius: '50%', opacity: 0.3 }} />
          <div style={{ width: '8px', height: '8px', background: '#E8759A', borderRadius: '50%', opacity: 0.2 }} />
        </div>
        
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <motion.div
            whileHover={{ rotate: 180, scale: 1.1 }}
            transition={{ duration: 0.5 }}
            style={{
              background: 'linear-gradient(135deg, #E8759A, #D45A7A)',
              padding: '18px',
              borderRadius: '50%',
              display: 'inline-block',
              marginBottom: '1.5rem',
              boxShadow: '0 10px 30px rgba(232,117,154,0.4)'
            }}
          >
            <Sparkles size={34} color="white" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{
              fontSize: '2.2rem',
              background: 'linear-gradient(135deg, #E8759A, #D45A7A)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontFamily: "'Playfair Display', serif",
              fontStyle: 'italic',
              marginBottom: '0.5rem'
            }}
          >
            welcome back
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{ color: '#D45A7A', fontSize: '15px', fontStyle: 'italic', fontWeight: 500 }}
          >
            sign in to continue your journey ✧
          </motion.p>
        </div>
        
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3 }}
            style={{
              background: '#FFF0F5',
              color: '#D45A7A',
              padding: '0.85rem',
              borderRadius: '20px',
              marginBottom: '1.5rem',
              textAlign: 'center',
              fontSize: '14px',
              fontWeight: 500,
              border: '1px solid rgba(232,117,154,0.2)'
            }}
          >
            {error}
          </motion.div>
        )}
        
        <form onSubmit={handleSubmit}>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            style={{ marginBottom: '1.25rem', position: 'relative' }}
          >
            <div style={{
              position: 'absolute',
              left: '18px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: '#FFF0F5',
              padding: '6px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Mail size={16} color="#D45A7A" />
            </div>
            <input
              type="email"
              placeholder="email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '14px 18px 14px 52px',
                border: '2px solid #FFF0F5',
                borderRadius: '60px',
                fontSize: '14px',
                fontWeight: 500,
                outline: 'none',
                transition: 'all 0.3s ease',
                fontFamily: 'inherit',
                background: '#FFFFFF',
                color: '#2D2A24'
              }}
              onFocus={(e) => e.target.style.borderColor = '#E8759A'}
              onBlur={(e) => e.target.style.borderColor = '#FFF0F5'}
            />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            style={{ marginBottom: '1.5rem', position: 'relative' }}
          >
            <div style={{
              position: 'absolute',
              left: '18px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: '#FFF0F5',
              padding: '6px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Lock size={16} color="#D45A7A" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '14px 18px 14px 52px',
                border: '2px solid #FFF0F5',
                borderRadius: '60px',
                fontSize: '14px',
                fontWeight: 500,
                outline: 'none',
                transition: 'all 0.3s ease',
                fontFamily: 'inherit',
                background: '#FFFFFF',
                color: '#2D2A24'
              }}
              onFocus={(e) => e.target.style.borderColor = '#E8759A'}
              onBlur={(e) => e.target.style.borderColor = '#FFF0F5'}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '18px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#E8759A'
              }}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </motion.div>
          
          {/* Forgot Password Link */}
          <div style={{ textAlign: 'right', marginBottom: '1.5rem' }}>
            <Link to="/forgot-password" style={{ 
              color: '#E8759A', 
              fontSize: '13px', 
              textDecoration: 'none',
              fontStyle: 'italic',
              fontWeight: 500
            }}>
              forgot password?
            </Link>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '16px',
              fontSize: '16px',
              fontWeight: 700,
              marginBottom: '1.5rem',
              background: loading 
                ? '#FFE4E8' 
                : 'linear-gradient(135deg, #E8759A, #D45A7A)',
              color: loading ? '#D45A7A' : 'white',
              border: 'none',
              borderRadius: '60px',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              boxShadow: loading ? 'none' : '0 6px 20px rgba(232,117,154,0.4)'
            }}
          >
            {loading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Sparkles size={18} />
                </motion.div>
                signing in...
              </>
            ) : (
              <>
                <LogIn size={18} /> sign in ✧
              </>
            )}
          </motion.button>
        </form>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{ textAlign: 'center' }}
        >
          <p style={{ color: '#999', fontSize: '14px' }}>
            don't have an account?{' '}
            <Link to="/signup" style={{ 
              color: '#D45A7A', 
              textDecoration: 'none', 
              fontWeight: 700, 
              fontStyle: 'italic',
              transition: 'color 0.3s'
            }}>
              create one ✧
            </Link>
          </p>
        </motion.div>
        
        {/* Decorative bottom text */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{ 
            textAlign: 'center', 
            marginTop: '1.5rem',
            paddingTop: '1rem',
            borderTop: '1px solid rgba(232,117,154,0.2)'
          }}
        >
          <p style={{ fontSize: '11px', color: '#E8759A', fontStyle: 'italic', fontWeight: 500 }}>
            ✧ save what you love, cook what you crave ✧
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default Login;