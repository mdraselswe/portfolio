"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { FiExternalLink, FiGithub } from "@/lib/icons";
import { ProjectCardProps } from "@/types/project";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function ProjectCard({ project, index = 0 }: ProjectCardProps & { index?: number }) {
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 120, damping: 18 });
  const y = useSpring(rawY, { stiffness: 120, damping: 18 });

  const rotateX = useTransform(y, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-8, 8]);
  const glareX = useTransform(x, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(y, [-0.5, 0.5], ["0%", "100%"]);

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
      whileHover={prefersReduced ? {} : { scale: 1.02, y: -4 }}
      transition={{ duration: 0.2 }}
      className="group relative flex flex-col h-full rounded-2xl border border-gray-100 dark:border-white/[0.06] bg-white dark:bg-white/[0.025] hover:border-blue-200 dark:hover:border-blue-500/25 hover:shadow-xl hover:shadow-blue-500/5 dark:hover:shadow-blue-500/8 transition-all duration-300 overflow-hidden"
    >
      {/* Glare highlight — follows mouse */}
      {!prefersReduced && (
        <motion.div
          className="absolute inset-0 pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.12) 0%, transparent 60%)`,
          }}
          aria-hidden
        />
      )}

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div
        className="relative flex flex-col h-full p-6 z-10"
        style={prefersReduced ? {} : { transform: "translateZ(20px)" }}
      >
        {/* Index + title */}
        <div className="mb-4">
          <span className="text-xs font-mono text-gray-300 dark:text-white/20 block mb-2">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors duration-200 leading-snug">
            {project.title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-500 dark:text-white/45 leading-relaxed mb-5 line-clamp-3 flex-grow">
          {project.description}
        </p>

        {/* Tech pills */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded-full text-xs font-medium border border-gray-100 dark:border-white/[0.07] bg-gray-50 dark:bg-white/[0.03] text-gray-600 dark:text-white/55"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100 dark:bg-white/[0.06] mb-4" />

        {/* Links */}
        <div className="flex flex-wrap gap-4">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-white/40 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            >
              <FiGithub className="w-3.5 h-3.5" />
              Source Code
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-white/40 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
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
              className="flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-white/40 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
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
              className="flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-white/40 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
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
