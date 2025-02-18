"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "@/lib";
import { getStorageItem, setStorageItem, STORAGE_KEYS } from "@/lib/storage";
import { Language, LanguageContextType, LANGUAGES } from "@/types/context";

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(LANGUAGES.ENGLISH);

  useEffect(() => {
    const savedLanguage = getStorageItem<Language>(STORAGE_KEYS.LANGUAGE);
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    // Ensure localStorage is updated after state change
    Promise.resolve().then(() => {
      setStorageItem(STORAGE_KEYS.LANGUAGE, lang);
    });
  };

  const toggleLanguage = () => {
    const newLanguage = language === LANGUAGES.ENGLISH ? LANGUAGES.BENGALI : LANGUAGES.ENGLISH;
    handleLanguageChange(newLanguage);
  };

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage: handleLanguageChange, toggleLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
