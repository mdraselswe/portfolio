"use client";

import { motion } from "framer-motion";
import AnimatedCounter from "@/components/atoms/AnimatedCounter";
import { useLanguage } from "@/contexts/LanguageContext";
import { fastStaggerContainer, fadeInUp, viewportConfig } from "@/config/animations";

const STATS = [
  { to: 8, suffix: "+", en: "Years Experience", bn: "বছরের অভিজ্ঞতা" },
  { to: 50, suffix: "+", en: "Projects Delivered", bn: "প্রজেক্ট সম্পন্ন" },
  { to: 15, suffix: "+", en: "Technologies", bn: "প্রযুক্তি দক্ষতা" },
  { to: 100, suffix: "%", en: "Client Satisfaction", bn: "ক্লায়েন্ট সন্তুষ্টি" },
];

export default function Stats() {
  const { language } = useLanguage();

  return (
    <motion.section
      className="relative py-14 bg-white dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800 overflow-hidden"
      variants={fastStaggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
    >
      {/* Subtle radial backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.05),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="flex flex-col items-center text-center group"
            >
              {/* Divider line accent */}
              {i !== 0 && (
                <div className="hidden md:block absolute h-12 w-px bg-gray-200 dark:bg-gray-700 left-0 top-1/2 -translate-y-1/2" />
              )}

              <div className="relative text-4xl md:text-5xl font-extrabold tabular-nums bg-clip-text text-transparent bg-gradient-to-br from-blue-600 to-purple-600">
                <AnimatedCounter to={stat.to} suffix={stat.suffix} duration={2.5} />
              </div>

              <p className="mt-2 text-sm font-medium text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                {language === "en" ? stat.en : stat.bn}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
