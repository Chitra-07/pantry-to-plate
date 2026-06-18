import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ShoppingCart, ListChecks, Clock3, Sparkles, ArrowRight, Plus, ListTodo, ChefHat } from 'lucide-react';
import Navbar from '../components/Navbar';

const API_URL = 'http://localhost:5000/api';

function ShoppingLists({ token, user }) {
  const [shoppingLists, setShoppingLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [manualItem, setManualItem] = useState('');
  const [manualReason, setManualReason] = useState('manual item');
  const [savingManualItem, setSavingManualItem] = useState(false);

  useEffect(() => {
    fetchShoppingLists();
  }, []);

  const fetchShoppingLists = async () => {
    try {
      const response = await axios.get(`${API_URL}/shopping-lists`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setShoppingLists(response.data);
    } catch (error) {
      console.error('Error fetching shopping lists:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddManualItem = async (event) => {
    event.preventDefault();

    if (!manualItem.trim()) {
      return;
    }

    setSavingManualItem(true);
    try {
      await axios.post(`${API_URL}/shopping-lists/manual`, {
        title: 'Manual shopping list',
        items: [{ name: manualItem.trim(), reason: manualReason.trim() || 'manual item' }]
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setManualItem('');
      setManualReason('manual item');
      await fetchShoppingLists();
    } catch (error) {
      console.error('Error adding manual shopping item:', error);
      alert('Could not add the item. Please try again.');
    } finally {
      setSavingManualItem(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #FFF8F0 0%, #FFF0F5 100%)' }}>
      <Navbar user={user} onLogout={() => { localStorage.removeItem('token'); localStorage.removeItem('user'); window.location.href = '/'; }} />

      <div className="container" style={{ padding: '2rem' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '10px', background: 'white', padding: '14px 22px', borderRadius: '999px', boxShadow: '0 12px 30px rgba(232,117,154,0.12)', maxWidth: '100%' }}>
            <ShoppingCart size={22} color="#C85A7A" />
            <h1 style={{ margin: 0, color: '#B84868', fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>Shopping list</h1>
          </div>
          <p style={{ color: '#9A6B7B', marginTop: '1rem', maxWidth: '760px', marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.7 }}>
            Think of this page as your tiny grocery helper. When you choose ingredients and generate recipe ideas, the app collects the ingredients you still need and puts them here.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          {[
            { icon: ListTodo, title: 'pick ingredients', text: 'Choose what you already have at home.' },
            { icon: ChefHat, title: 'find recipes', text: 'The app suggests meals you can cook now.' },
            { icon: Plus, title: 'build list', text: 'Missing items are collected here as a shopping list.' }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} style={{ background: 'white', borderRadius: '20px', padding: '1rem 1.1rem', boxShadow: '0 8px 24px rgba(200,90,122,0.08)', border: '1px solid rgba(200,90,122,0.12)', textAlign: 'left' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem' }}>
                  <div style={{ background: 'linear-gradient(135deg, #C85A7A, #B84868)', width: '36px', height: '36px', borderRadius: '50%', display: 'grid', placeItems: 'center', color: 'white' }}>
                    <Icon size={18} />
                  </div>
                  <h3 style={{ margin: 0, color: '#B84868', fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>{item.title}</h3>
                </div>
                <p style={{ margin: 0, color: '#7E5E6A', fontSize: '13px', lineHeight: 1.6 }}>{item.text}</p>
              </div>
            );
          })}
        </div>

        <form onSubmit={handleAddManualItem} style={{ background: 'white', borderRadius: '24px', padding: '1.25rem', boxShadow: '0 8px 24px rgba(200,90,122,0.08)', border: '1px solid rgba(200,90,122,0.12)', marginBottom: '1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr) auto', gap: '0.75rem', alignItems: 'end' }}>
            <label style={{ display: 'grid', gap: '0.4rem', color: '#B84868', fontSize: '13px', fontWeight: 600 }}>
              Add an item you need to buy
              <input
                value={manualItem}
                onChange={(e) => setManualItem(e.target.value)}
                placeholder="milk, onions, rice..."
                style={{ padding: '0.9rem 1rem', borderRadius: '14px', border: '1px solid #FFE4E8', fontSize: '14px', outline: 'none' }}
              />
            </label>
            <label style={{ display: 'grid', gap: '0.4rem', color: '#B84868', fontSize: '13px', fontWeight: 600 }}>
              Note
              <input
                value={manualReason}
                onChange={(e) => setManualReason(e.target.value)}
                placeholder="manual item"
                style={{ padding: '0.9rem 1rem', borderRadius: '14px', border: '1px solid #FFE4E8', fontSize: '14px', outline: 'none' }}
              />
            </label>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={savingManualItem}
              style={{ background: 'linear-gradient(135deg, #C85A7A, #B84868)', color: 'white', border: 'none', borderRadius: '999px', padding: '0.95rem 1.3rem', fontWeight: 700, cursor: 'pointer', opacity: savingManualItem ? 0.7 : 1 }}
            >
              {savingManualItem ? 'adding...' : 'add item'}
            </motion.button>
          </div>
        </form>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}>
              <Sparkles size={44} color="#C85A7A" />
            </motion.div>
          </div>
        ) : shoppingLists.length === 0 ? (
          <div style={{ background: 'white', borderRadius: '24px', padding: '2rem', textAlign: 'center', border: '1px dashed rgba(200,90,122,0.25)', maxWidth: '720px', margin: '0 auto' }}>
            <ListChecks size={54} color="#C85A7A" />
            <h2 style={{ color: '#B84868', fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>No shopping list yet</h2>
            <p style={{ color: '#888', marginBottom: '1.5rem' }}>Go to Home, select ingredients, and press find recipes. Then the list will appear here automatically.</p>
            <a href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, #C85A7A, #B84868)', color: 'white', padding: '12px 18px', borderRadius: '999px', textDecoration: 'none', fontWeight: 600 }}>
              go to home <ArrowRight size={16} />
            </a>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {shoppingLists.map((list) => (
              <motion.div
                key={list._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ background: 'white', borderRadius: '24px', padding: '1.5rem', boxShadow: '0 10px 30px rgba(200,90,122,0.08)', border: '1px solid rgba(200,90,122,0.12)' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <h3 style={{ margin: 0, color: '#B84868', fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>{list.title}</h3>
                    <p style={{ margin: '6px 0 0', color: '#9A6B7B', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Clock3 size={14} /> created {new Date(list.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div style={{ background: '#FFF0F5', color: '#B84868', borderRadius: '999px', padding: '8px 12px', fontSize: '12px', fontWeight: 600 }}>
                    {list.items?.length || 0} items
                  </div>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                  {list.items?.map((item) => (
                    <div key={item.name} style={{ border: '1px solid #FFE4E8', background: '#FFF8FB', borderRadius: '16px', padding: '0.9rem 1rem', minWidth: '220px' }}>
                      <div style={{ color: '#2D2A24', fontWeight: 700, marginBottom: '4px' }}>{item.name}{item.count > 1 ? ` x${item.count}` : ''}</div>
                      <div style={{ color: '#9A6B7B', fontSize: '12px' }}>{item.reason}</div>
                      {item.recipeNames?.length > 0 && (
                        <div style={{ marginTop: '8px', fontSize: '11px', color: '#C85A7A' }}>
                          recipes: {item.recipeNames.join(', ')}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ShoppingLists;