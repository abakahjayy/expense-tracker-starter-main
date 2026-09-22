import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './Navbar'
import Footer from './Footer'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Signup from './pages/Signup'
import AuthCallback from './pages/AuthCallback'
import { clearStoredAuth, getStoredAuth } from './auth'

function getInitialTheme() {
  const stored = localStorage.getItem('theme');
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function App() {
  const [theme, setTheme] = useState(getInitialTheme);
  const [user, setUser] = useState(() => getStoredAuth()?.user ?? null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(t => (t === 'dark' ? 'light' : 'dark'));
  };

  const handleLoggedIn = (loggedInUser) => {
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    clearStoredAuth();
    setUser(null);
  };

  return (
    <div className="app">
      <Navbar theme={theme} onToggleTheme={toggleTheme} user={user} onLogout={handleLogout} />

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login onLoggedIn={handleLoggedIn} />} />
          <Route path="/signup" element={<Signup onLoggedIn={handleLoggedIn} />} />
          <Route path="/auth/callback" element={<AuthCallback onLoggedIn={handleLoggedIn} />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App
