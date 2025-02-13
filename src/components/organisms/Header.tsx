"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { translations } from "@/translations";
import { Button } from "@/components/atoms/Button";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  const t = translations[language].header;

  const [isManualNavigation, setIsManualNavigation] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (!isManualNavigation) {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const sectionId = entry.target.id || "";
              const intersectionRatio = entry.intersectionRatio;

              if (intersectionRatio > 0.2) {
                setActiveSection(sectionId);
              }
            }
          });
        }
      },
      { threshold: [0, 0.2, 0.4, 0.6, 0.8], rootMargin: "-50px 0px -40% 0px" }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => {
      observer.observe(section);
    });

    const heroSection = document.querySelector("section:first-of-type");
    if (heroSection) {
      observer.observe(heroSection);
    }

    return () => observer.disconnect();
  }, [isManualNavigation]);

  const handleNavClick = (sectionId: string) => {
    setIsManualNavigation(true);
    setActiveSection(sectionId);
    setIsMobileMenuOpen(false);

    // Reset manual navigation flag after scrolling completes
    setTimeout(() => {
      setIsManualNavigation(false);
    }, 1000);
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "bn" : "en");
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/95 dark:bg-gray-900/80 border-b border-gray-100/50 dark:border-gray-700/20 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <a
            href="#"
            onClick={() => handleNavClick("")}
            className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hover:from-indigo-600 hover:to-blue-600 transition-all duration-300"
          >
            {translations[language].name}
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-10">
            <a
              href="#"
              onClick={() => handleNavClick("")}
              className={`relative text-gray-800 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 group py-2 ${activeSection === "" ? "text-blue-600 dark:text-blue-400" : ""}`}
            >
              <span>{t.home}</span>
              <span
                className={`absolute bottom-0 left-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all duration-300 ${activeSection === "" ? "w-full" : "w-0 group-hover:w-full"}`}
              ></span>
            </a>
            <a
              href="#skills"
              onClick={() => handleNavClick("skills")}
              className={`relative text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 group py-2 ${activeSection === "skills" ? "text-blue-600 dark:text-blue-400" : ""}`}
            >
              <span>{t.skills}</span>
              <span
                className={`absolute bottom-0 left-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all duration-300 ${activeSection === "skills" ? "w-full" : "w-0 group-hover:w-full"}`}
              ></span>
            </a>
            <a
              href="#projects"
              onClick={() => handleNavClick("projects")}
              className={`relative text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 group py-2 ${activeSection === "projects" ? "text-blue-600 dark:text-blue-400" : ""}`}
            >
              <span>{t.projects}</span>
              <span
                className={`absolute bottom-0 left-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all duration-300 ${activeSection === "projects" ? "w-full" : "w-0 group-hover:w-full"}`}
              ></span>
            </a>
            <a
              href="#contact"
              onClick={() => handleNavClick("contact")}
              className={`relative text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 group py-2 ${activeSection === "contact" ? "text-blue-600 dark:text-blue-400" : ""}`}
            >
              <span>{t.contact}</span>
              <span
                className={`absolute bottom-0 left-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all duration-300 ${activeSection === "contact" ? "w-full" : "w-0 group-hover:w-full"}`}
              ></span>
            </a>
          </nav>

          <div className="flex items-center gap-4">
            {/* Theme Switcher */}
            <Button
              onClick={toggleTheme}
              variant="ghost"
              size="sm"
              className="p-2 rounded-full"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"
                  />
                </svg>
              )}
            </Button>

            {/* Language Switcher */}
            <Button
              onClick={toggleLanguage}
              variant="ghost"
              size="sm"
              className="px-3 py-1"
              aria-label="Toggle language"
            >
              {language.toUpperCase()}
            </Button>

            {/* Mobile Navigation Button */}
            <Button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              variant="ghost"
              size="sm"
              className="md:hidden p-2 rounded-full"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden ${isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"} transition-all duration-300 ease-in-out absolute top-full left-0 right-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-b border-gray-200/20 dark:border-gray-700/20`}
        >
          <nav className="px-4 py-4 space-y-2 max-w-7xl mx-auto">
            <a
              href="#"
              className={`block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 ${activeSection === "" ? "text-blue-600 dark:text-blue-400 bg-gray-50 dark:bg-gray-800" : ""}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t.home}
            </a>
            <a
              href="#skills"
              className={`block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 ${activeSection === "skills" ? "text-blue-600 dark:text-blue-400 bg-gray-50 dark:bg-gray-800" : ""}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t.skills}
            </a>
            <a
              href="#projects"
              className={`block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 ${activeSection === "projects" ? "text-blue-600 dark:text-blue-400 bg-gray-50 dark:bg-gray-800" : ""}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t.projects}
            </a>
            <a
              href="#contact"
              className={`block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 ${activeSection === "contact" ? "text-blue-600 dark:text-blue-400 bg-gray-50 dark:bg-gray-800" : ""}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t.contact}
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
