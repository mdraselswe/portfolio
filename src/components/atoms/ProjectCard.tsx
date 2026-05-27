"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { FiExternalLink, FiGithub } from "@/lib/icons";
import { ProjectCardProps } from "@/types/project";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const CARD_GRADIENTS = [
  "from-blue-600 to-violet-600",
  "from-cyan-500 to-blue-600",
  "from-violet-600 to-pink-600",
  "from-emerald-500 to-cyan-600",
  "from-orange-500 to-rose-600",
  "from-indigo-600 to-violet-600",
  "from-teal-500 to-emerald-600",
  "from-rose-500 to-orange-500",
  "from-sky-500 to-indigo-600",
  "from-fuchsia-500 to-violet-600",
  "from-amber-500 to-orange-600",
  "from-lime-500 to-teal-600",
];

export default function ProjectCard({ project, index = 0 }: ProjectCardProps & { index?: number }) {
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 120, damping: 18 });
  const y = useSpring(rawY, { stiffness: 120, damping: 18 });

  const rotateX = useTransform(y, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-6, 6]);
  const glareX = useTransform(x, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(y, [-0.5, 0.5], ["0%", "100%"]);

  const gradient = CARD_GRADIENTS[index % CARD_GRADIENTS.length];

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (prefersReduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function onMouseLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={
        prefersReduced
          ? {}
          : { rotateX, rotateY, transformStyle: "preserve-3d", perspective: "800px" }
      }
      whileHover={prefersReduced ? {} : { scale: 1.02, y: -5 }}
      transition={{ duration: 0.2 }}
      className="group relative flex flex-col h-full rounded-2xl border border-gray-100 dark:border-white/[0.07] bg-white dark:bg-white/[0.025] hover:border-transparent dark:hover:border-transparent hover:shadow-2xl hover:shadow-blue-500/8 dark:hover:shadow-blue-500/12 transition-all duration-300 overflow-hidden"
    >
      {/* Glare highlight */}
      {!prefersReduced && (
        <motion.div
          className="absolute inset-0 pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.10) 0%, transparent 60%)`,
          }}
          aria-hidden
        />
      )}

      {/* Gradient header banner */}
      <div
        className={`relative h-24 bg-gradient-to-br ${gradient} overflow-hidden shrink-0`}
        style={prefersReduced ? {} : { transform: "translateZ(4px)" }}
      >
        {/* Dot grid on banner */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
        />
        {/* Radial fade from center */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,transparent_40%,rgba(0,0,0,0.25)_100%)]" />

        {/* Card number */}
        <span className="absolute top-3 left-4 text-white/50 font-mono text-xs">
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Arrow icon */}
        <div className="absolute bottom-3 right-3 w-7 h-7 rounded-full bg-white/15 border border-white/25 flex items-center justify-center text-white/70 text-xs group-hover:bg-white/25 group-hover:border-white/40 transition-all duration-300">
          ↗
        </div>
      </div>

      {/* Card body */}
      <div
        className="relative flex flex-col flex-1 p-5 z-10"
        style={prefersReduced ? {} : { transform: "translateZ(20px)" }}
      >
        {/* Title */}
        <h3 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors duration-200 leading-snug mb-2">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-500 dark:text-white/40 leading-relaxed mb-4 line-clamp-3 flex-grow">
          {project.description}
        </p>

        {/* Tech pills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded-full text-xs font-medium border border-gray-100 dark:border-white/[0.07] bg-gray-50 dark:bg-white/[0.03] text-gray-600 dark:text-white/50"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100 dark:bg-white/[0.06] mb-3" />

        {/* Links */}
        <div className="flex flex-wrap gap-4">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-white/35 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            >
              <FiGithub className="w-3.5 h-3.5" />
              Source
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-white/35 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            >
              <FiExternalLink className="w-3.5 h-3.5" />
              Live Demo
            </a>
          )}
          {project.demos?.nextdhabian && (
            <a
              href={project.demos.nextdhabian}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-white/35 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            >
              <FiExternalLink className="w-3.5 h-3.5" />
              NextDhabian
            </a>
          )}
          {project.demos?.nextbuetian && (
            <a
              href={project.demos.nextbuetian}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-white/35 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            >
              <FiExternalLink className="w-3.5 h-3.5" />
              NextBuetian
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
