"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "@/lib";
import { Language, LanguageContextType, LANGUAGES } from "@/types/context";

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(LANGUAGES.ENGLISH);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
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
