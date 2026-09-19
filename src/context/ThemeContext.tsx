import React, { createContext, useContext, useEffect } from 'react';

type Theme = 'dark';

interface ThemeContextType {
  theme: 'dark';
  effectiveTheme: 'dark';
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  effectiveTheme: 'dark',
  setTheme: () => {},
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    // Ensure document and body are strictly locked to dark mode
    const root = document.documentElement;
    root.classList.add('dark');
    root.classList.remove('light');
    localStorage.setItem('portfolio-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme: 'dark',
        effectiveTheme: 'dark',
        setTheme: () => {},
        toggleTheme: () => {},
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};

