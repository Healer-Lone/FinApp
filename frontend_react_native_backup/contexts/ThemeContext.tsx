import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useColorScheme } from 'react-native';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
  colors: {
    background: string;
    card: string;
    text: string;
    textSecondary: string;
    primary: string;
    accent: string;
    border: string;
    cardBg: string;
    tabBar: string;
    tabBarBorder: string;
    iconInactive: string;
    error: string;
    success: string;
  };
}

const lightColors = {
  background: '#ffffff',
  card: '#ffffff',
  text: '#212121',
  textSecondary: '#757575',
  primary: '#1a237e',
  accent: '#00bfa5',
  border: '#e0e0e0',
  cardBg: '#f5f5f5',
  tabBar: '#ffffff',
  tabBarBorder: '#e0e0e0',
  iconInactive: '#757575',
  error: '#f44336',
  success: '#4caf50',
};

const darkColors = {
  background: '#121212',
  card: '#1e1e1e',
  text: '#ffffff',
  textSecondary: '#b0b0b0',
  primary: '#5c6bc0',
  accent: '#00bfa5',
  border: '#2d2d2d',
  cardBg: '#2d2d2d',
  tabBar: '#1e1e1e',
  tabBarBorder: '#2d2d2d',
  iconInactive: '#757575',
  error: '#f44336',
  success: '#4caf50',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const colors = isDarkMode ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
