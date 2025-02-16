"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "@/lib";
import { getStorageItem, setStorageItem, STORAGE_KEYS } from "@/lib/storage";
import { Theme, ThemeContextType, THEMES } from "@/types/context";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(THEMES.LIGHT);

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = getStorageItem<Theme>(STORAGE_KEYS.THEME);
    // Check for system preference
    const systemPreference = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? THEMES.DARK
      : THEMES.LIGHT;

    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      setTheme(systemPreference);
    }
  }, []);

  useEffect(() => {
    // Update localStorage and document class when theme changes
    setStorageItem(STORAGE_KEYS.THEME, theme);
    document.documentElement.classList.remove(THEMES.LIGHT, THEMES.DARK);
    document.documentElement.classList.add(theme);
  }, [theme]);

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  const toggleTheme = () => {
    setTheme(theme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleThemeChange, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
