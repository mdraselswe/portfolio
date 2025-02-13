"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";
import { Button } from "@/components/atoms/Button";

export default function Hero() {
  const { language } = useLanguage();
  const t = translations[language].hero;

  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden bg-transparent">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 opacity-60 dark:opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent),radial-gradient(circle_at_70%_60%,rgba(147,51,234,0.1),transparent)]" />
      </div>
      <div className="relative text-center">
        <div className="animate-fade-in-up">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 animate-gradient-x leading-relaxed py-3">
            {t.greeting}
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed py-1">
            {t.role}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button as="a" href="#contact" variant="primary" size="lg" className="w-full sm:w-auto">
              {t.getInTouch}
            </Button>
            <Button
              as="a"
              href="#projects"
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
            >
              {t.viewProjects}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
