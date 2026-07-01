import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import PantryIcon from '../components/PantryIcon';

function Landing({ token, user, onLogout }) {
  return (
    <div>
      <Navbar user={user} onLogout={onLogout} />
      
      {/* Hero Section */}
      <div style={{
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url("https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.15,
          transform: 'scale(1.05)',
          filter: 'blur(3px)'
        }}></div>
        
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '4rem 2rem',
          position: 'relative',
          zIndex: 1
        }}>
          <div className="fade-in-up" style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                <div style={{
                background: 'white',
                padding: '12px',
                borderRadius: '50%',
                boxShadow: '0 12px 30px rgba(232,117,154,0.12)',
                border: '1px solid rgba(212,90,122,0.12)'
              }}>
                <PantryIcon size={42} />
              </div>
            </div>
            <h1 style={{
              fontSize: '4rem',
              background: 'linear-gradient(135deg, #E5B7C5, #e8a0a0)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '1rem',
              fontFamily: "'Playfair Display', serif"
            }}>
              Pantry to Plate
            </h1>
            <p style={{
              fontSize: '1.3rem',
              color: '#666',
              maxWidth: '700px',
              margin: '0 auto 2rem',
              lineHeight: '1.8'
            }}>
              Pick what you already have, get recipe ideas, and turn missing ingredients into a shopping list. 
              A simple helper for cooking with less waste.
            </p>
            {!token && (
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <Link to="/signup">
                  <button className="btn-primary">
                    <span>✨</span> Start Cooking
                  </button>
                </Link>
                <Link to="/login">
                  <button className="btn-secondary">
                    <span>👤</span> Sign In
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem' }}>
        <h2 style={{
          textAlign: 'center',
          fontSize: '2.5rem',
          color: '#d47373',
          marginBottom: '3rem',
          fontFamily: "'Playfair Display', serif"
        }}>
          Why Pantry to Plate?
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          {[
            {
              icon: '🥗',
              title: 'Reduce Food Waste',
              description: 'Transform your leftover ingredients into delicious meals and help reduce food waste.'
            },
            {
              icon: '🍳',
              title: 'Smart Suggestions',
              description: 'Our AI-powered algorithm suggests recipes based on ingredients you already have.'
            },
            {
              icon: '🔗',
              title: 'Share & Inspire',
              description: 'Share your ingredient combinations and favorite recipes with friends and family.'
            },
            {
              icon: '💾',
              title: 'Save Favorites',
              description: 'Create an account to save your go-to recipes and access them anytime.'
            }
          ].map((feature, idx) => (
            <div key={idx} className="chef-card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{feature.icon}</div>
              <h3 style={{ color: '#d47373', marginBottom: '1rem', fontSize: '1.5rem' }}>{feature.title}</h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div style={{
        background: 'linear-gradient(135deg, #fff5f5, #ffffff)',
        padding: '4rem 2rem'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            textAlign: 'center',
            fontSize: '2.5rem',
            color: '#d47373',
            marginBottom: '3rem',
            fontFamily: "'Playfair Display', serif"
          }}>
            How It Works
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem'
          }}>
            {[
              { step: '01', title: 'Select Ingredients', desc: 'Check off ingredients you have in your fridge' },
              { step: '02', title: 'Get Recipes', desc: 'Receive personalized recipe suggestions instantly' },
              { step: '03', title: 'Cook & Enjoy', desc: 'Follow simple instructions to create delicious meals' },
              { step: '04', title: 'Share & Save', desc: 'Share your combos and save favorite recipes' }
            ].map((step, idx) => (
              <div key={idx} style={{ textAlign: 'center' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, #e8a0a0, #d47373)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  color: 'white',
                  fontSize: '1.8rem',
                  fontWeight: 'bold'
                }}>
                  {step.step}
                </div>
                <h3 style={{ color: '#d47373', marginBottom: '0.5rem' }}>{step.title}</h3>
                <p style={{ color: '#666' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem', textAlign: 'center' }}>
        <div className="chef-card" style={{
          background: 'linear-gradient(135deg, rgba(232, 160, 160, 0.1), rgba(212, 115, 115, 0.05))',
          padding: '3rem'
        }}>
          <h2 style={{ fontSize: '2rem', color: '#d47373', marginBottom: '1rem' }}>
            Ready to Start Your Culinary Journey?
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '2rem' }}>
            Join thousands of home chefs who are reducing waste and creating amazing meals
          </p>
          {!token ? (
            <Link to="/signup">
              <button className="btn-primary" style={{ fontSize: '1.1rem' }}>
                <span>🎯</span> Get Started Now
              </button>
            </Link>
          ) : (
            <Link to="/finder">
              <button className="btn-primary" style={{ fontSize: '1.1rem' }}>
                <span>🍳</span> Find Recipes
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Landing;