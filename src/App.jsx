import { useCallback, useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './Navbar'
import Footer from './Footer'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Signup from './pages/Signup'
import AuthCallback from './pages/AuthCallback'
import { clearStoredAuth, getStoredAuth } from './auth'
import { useToast } from './toastContext'

function getInitialTheme() {
  const stored = localStorage.getItem('theme');
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function App() {
  const [theme, setTheme] = useState(getInitialTheme);
  const [user, setUser] = useState(() => getStoredAuth()?.user ?? null);
  const toast = useToast();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(t => (t === 'dark' ? 'light' : 'dark'));
  };

  const handleLoggedIn = useCallback((loggedInUser) => {
    setUser(loggedInUser);
  }, []);

  const handleLogout = () => {
    clearStoredAuth();
    setUser(null);
    toast.info('Logged out');
  };

  // The stored token can go bad without the user ever clicking "log out"
  // (it's for an account that no longer exists, the DB was reseeded, etc.).
  // Any API call can discover this, so give them one shared way to drop
  // back to a clean, logged-out state instead of silently retrying forever.
  const handleSessionExpired = useCallback(() => {
    clearStoredAuth();
    setUser(null);
    toast.error('Your session has expired. Please log in again.');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="app">
      <Navbar theme={theme} onToggleTheme={toggleTheme} user={user} onLogout={handleLogout} />

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard onSessionExpired={handleSessionExpired} />} />
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
