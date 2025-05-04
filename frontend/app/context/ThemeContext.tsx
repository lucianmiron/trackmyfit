'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    // Load dark mode preference from localStorage
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    } else {
      // Check system preference
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      setDarkMode(prefersDark);
    }
  }, []);

  useEffect(() => {
    // Update data-theme attribute when darkMode changes
    document.documentElement.setAttribute(
      'data-theme',
      darkMode ? 'dark' : 'light'
    );
  }, [darkMode]);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
