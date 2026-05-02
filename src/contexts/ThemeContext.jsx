import React, { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '../services/storage';
import { authService } from '../services/authService';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Available themes: 'default', 'dark', 'pink'
  const [theme, setTheme] = useState('default');

  // Load theme on mount or when user changes
  useEffect(() => {
    const email = authService.getCurrentEmail();
    const savedTheme = storage.get(`chiaSecaTheme_${email}`, 'default');
    setTheme(savedTheme);
  }, []);

  // Apply theme to body
  useEffect(() => {
    // Remove previous theme classes
    document.body.classList.remove('theme-dark', 'theme-pink');
    
    // Add current theme class if not default
    if (theme !== 'default') {
      document.body.classList.add(`theme-${theme}`);
    }
    
    // Also save to storage
    const email = authService.getCurrentEmail();
    storage.set(`chiaSecaTheme_${email}`, theme);
  }, [theme]);

  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
