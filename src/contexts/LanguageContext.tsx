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

  useEffect(() => {
    const updateStorage = async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
      setStorageItem(STORAGE_KEYS.LANGUAGE, language);
    };
    updateStorage();
  }, [language]);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };

  const toggleLanguage = () => {
    setLanguage((currentLanguage) => {
      const newLanguage =
        currentLanguage === LANGUAGES.ENGLISH ? LANGUAGES.BENGALI : LANGUAGES.ENGLISH;
      return newLanguage;
    });
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
