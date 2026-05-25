"use client";

import { motion, useMotionValue } from "@/lib";
import { useLanguage } from "@/contexts/LanguageContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { skills } from "@/data/skills";
import { translations } from "@/translations";

// ── Bento col-span logic ──────────────────────────────────────────────────
// Pattern: [2,1] → [1,2] → [2,1] → last row fills naturally
// 6 items → rows: 3/3/3 | 7 items → rows: 3/3/3+1(full)
const SPAN_MAP: Record<number, string> = {
  0: "lg:col-span-2",
  1: "lg:col-span-1",
  2: "lg:col-span-1",
  3: "lg:col-span-2",
  4: "lg:col-span-2",
  5: "lg:col-span-1",
};

function getSpan(index: number, total: number): string {
  if (index === total - 1 && total === 7) return "lg:col-span-3"; // Backend → full-width banner
  return SPAN_MAP[index] ?? "lg:col-span-1";
}

// Accent per cell (cycles)
const ACCENTS = [
  "hover:border-blue-500/30 dark:hover:border-blue-400/25",
  "hover:border-violet-500/30 dark:hover:border-violet-400/25",
  "hover:border-cyan-500/30 dark:hover:border-cyan-400/25",
  "hover:border-indigo-500/30 dark:hover:border-indigo-400/25",
  "hover:border-pink-500/30 dark:hover:border-pink-400/25",
  "hover:border-emerald-500/30 dark:hover:border-emerald-400/25",
  "hover:border-amber-500/30 dark:hover:border-amber-400/25",
];

const GLOW_COLORS = [
  "rgba(59,130,246,0.06)",
  "rgba(124,58,237,0.06)",
  "rgba(6,182,212,0.06)",
  "rgba(99,102,241,0.06)",
  "rgba(236,72,153,0.06)",
  "rgba(16,185,129,0.06)",
  "rgba(245,158,11,0.06)",
];

// ── Single bento cell ─────────────────────────────────────────────────────
function BentoCell({
  category,
  colSpan,
  index,
  isFullWidth,
}: {
  category: { title: string; skills: string[] };
  colSpan: string;
  index: number;
  isFullWidth: boolean;
}) {
  const prefersReduced = useReducedMotion();

  // Track mouse for radial glow inside the cell
  const mx = useMotionValue(50);
  const my = useMotionValue(50);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (prefersReduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - rect.left) / rect.width) * 100);
    my.set(((e.clientY - rect.top) / rect.height) * 100);
  }

  const glowColor = GLOW_COLORS[index % GLOW_COLORS.length];

  return (
    <motion.div
      className={`${colSpan} bento-cell group relative rounded-2xl overflow-hidden
        border border-gray-100 dark:border-white/[0.06]
        bg-white dark:bg-white/[0.018]
        ${ACCENTS[index % ACCENTS.length]}
        transition-all duration-300
        ${isFullWidth ? "flex items-center gap-8 p-6" : "p-6"}
      `}
      onMouseMove={onMouseMove}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.55,
        delay: index * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={prefersReduced ? {} : { y: -3 }}
    >
      {/* Mouse-tracked inner glow */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none z-0 rounded-2xl"
        style={{
          background: `radial-gradient(circle at ${mx}% ${my}%, ${glowColor} 0%, transparent 65%)`,
        }}
        aria-hidden
      />

      {/* Top shimmer line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {isFullWidth ? (
        // Full-width layout (last cell / Backend)
        <>
          <div className="shrink-0 relative z-10">
            <span className="text-xs font-mono text-gray-400 dark:text-white/20 block mb-1">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-500 dark:text-white/50">
              {category.title}
            </h3>
          </div>
          <div className="flex flex-wrap gap-2 relative z-10">
            {category.skills.map((skill) => (
              <SkillPill key={skill} skill={skill} />
            ))}
          </div>
        </>
      ) : (
        // Standard bento layout
        <div className="relative z-10 h-full flex flex-col">
          <div className="mb-5">
            <span className="text-xs font-mono text-gray-300 dark:text-white/20 block mb-2">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-500 dark:text-white/50">
              {category.title}
            </h3>
          </div>

          <div className="flex flex-wrap gap-2 mt-auto">
            {category.skills.map((skill) => (
              <SkillPill key={skill} skill={skill} />
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}

// ── Skill pill ────────────────────────────────────────────────────────────
function SkillPill({ skill }: { skill: string }) {
  return (
    <span className="px-3 py-1.5 rounded-full text-xs font-medium border border-gray-100 dark:border-white/[0.07] bg-gray-50 dark:bg-white/[0.03] text-gray-700 dark:text-white/60 hover:border-blue-300 dark:hover:border-blue-400/40 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-500/8 transition-all duration-200">
      {skill}
    </span>
  );
}

// ── Skills section ────────────────────────────────────────────────────────
export default function Skills() {
  const { language } = useLanguage();
  const skillCategories = skills[language];
  const t = translations[language].skills;

  return (
    <section id="skills" className="relative py-24 overflow-hidden bg-gray-50/50 dark:bg-[#050508]">
      {/* Section background */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 hidden dark:block"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.02) 1px,transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white dark:from-[#050508] via-transparent to-white dark:to-[#050508] pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section header ── */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Eyebrow */}
          <span className="inline-block text-xs font-mono tracking-[0.2em] uppercase text-blue-600 dark:text-blue-400 mb-4">
            Expertise
          </span>

          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
            {t.title}
          </h2>

          <p className="text-gray-500 dark:text-white/45 max-w-xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>

          {/* Decorative line */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-blue-400/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-blue-400/50" />
          </div>
        </motion.div>

        {/* ── Bento grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
          {skillCategories.map((category, index) => {
            const colSpan = getSpan(index, skillCategories.length);
            const isFullWidth = colSpan === "lg:col-span-3";
            return (
              <BentoCell
                key={category.title ?? index}
                category={category}
                colSpan={colSpan}
                index={index}
                isFullWidth={isFullWidth}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
