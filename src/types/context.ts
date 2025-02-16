// Constants for Theme and Language
export const THEMES = {
  LIGHT: "light",
  DARK: "dark",
} as const;

export const LANGUAGES = {
  ENGLISH: "en",
  BENGALI: "bn",
} as const;

// Theme types
export type Theme = (typeof THEMES)[keyof typeof THEMES];

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

// Language types
export type Language = (typeof LANGUAGES)[keyof typeof LANGUAGES];

export interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
}

export type SupportedLanguages = Language;

export type SupportedThemes = Theme;
