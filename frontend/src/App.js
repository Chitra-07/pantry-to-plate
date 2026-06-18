import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import SavedRecipes from './pages/SavedRecipes';
import ShoppingLists from './pages/ShoppingLists';

function App() {
  const [token, setToken] = React.useState(localStorage.getItem('token'));
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    if (token) {
      try {
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        setUser(userData);
      } catch (e) {
        console.error('Error parsing user data');
      }
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home token={token} user={user} onLogout={handleLogout} />} />
          <Route path="/login" element={!token ? <Login setToken={setToken} setUser={setUser} /> : <Navigate to="/" />} />
          <Route path="/signup" element={!token ? <Signup setToken={setToken} setUser={setUser} /> : <Navigate to="/" />} />
          <Route path="/dashboard" element={token ? <Dashboard token={token} user={user} /> : <Navigate to="/login" />} />
          <Route path="/shopping-lists" element={token ? <ShoppingLists token={token} user={user} /> : <Navigate to="/login" />} />
          <Route path="/saved" element={token ? <SavedRecipes token={token} user={user} /> : <Navigate to="/login" />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;