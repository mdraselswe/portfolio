"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { SkillCardProps } from "@/types/skill";

export default function SkillCard({ skill }: SkillCardProps) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      className="group relative overflow-hidden"
      whileHover={prefersReduced ? {} : { y: -5, scale: 1.04 }}
      transition={{ type: "spring", stiffness: 350, damping: 22 }}
    >
      <div className="relative bg-white dark:bg-gray-800 rounded-xl p-6 flex items-center justify-center border border-gray-100 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
        <motion.div
          className="absolute inset-0 rounded-xl"
          initial={{ opacity: 0 }}
          whileHover={prefersReduced ? {} : { opacity: 1 }}
          transition={{ duration: 0.25 }}
          style={{
            background:
              "linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(147,51,234,0.08) 100%)",
          }}
        />
        <span className="relative z-10 text-base font-semibold text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 leading-relaxed py-1">
          {skill}
        </span>
      </div>
    </motion.div>
  );
}
