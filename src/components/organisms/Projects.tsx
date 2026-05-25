"use client";

import ProjectCard from "@/components/atoms/ProjectCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { fastStaggerContainer, fadeInUp, viewportConfig } from "@/config/animations";
import { projects } from "@/data/projects";
import { translations } from "@/translations";
import { motion } from "@/lib";
import { useRef, useEffect, useState } from "react";

export default function Projects() {
  const { language } = useLanguage();
  const prefersReduced = useReducedMotion();
  const t = translations[language].projects;

  // Mobile drag carousel constraints
  const containerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 });

  useEffect(() => {
    const update = () => {
      if (!containerRef.current || !dragRef.current) return;
      const containerW = containerRef.current.offsetWidth;
      const dragW = dragRef.current.scrollWidth + 16;
      setDragConstraints({ left: -(dragW - containerW), right: 0 });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [language]);

  return (
    <section id="projects" className="relative py-24 overflow-hidden bg-white dark:bg-[#050508]">
      {/* Background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div
          className="absolute inset-0 hidden dark:block"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.02) 1px,transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        {/* Glow blobs */}
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/5 dark:bg-blue-500/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/5 w-[400px] h-[400px] bg-violet-500/4 dark:bg-violet-500/6 rounded-full blur-[100px]" />
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
          <span className="inline-block text-xs font-mono tracking-[0.2em] uppercase text-blue-600 dark:text-blue-400 mb-4">
            Work
          </span>

          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
            {t.title}
          </h2>

          <p className="text-gray-500 dark:text-white/45 max-w-xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>

          <div className="mt-8 flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-blue-400/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-blue-400/50" />
          </div>
        </motion.div>

        {/* ── Desktop: stagger grid ── */}
        <motion.div
          className="hidden md:grid gap-5 md:grid-cols-2 lg:grid-cols-3"
          variants={fastStaggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {projects[language].map((project, index) => (
            <motion.div key={index} variants={fadeInUp} className="flex">
              <ProjectCard project={project} index={index} />
            </motion.div>
          ))}
        </motion.div>

        {/* ── Mobile: drag carousel ── */}
        <div ref={containerRef} className="md:hidden overflow-hidden -mx-4 px-4">
          <motion.div
            ref={dragRef}
            drag={prefersReduced ? false : "x"}
            dragConstraints={dragConstraints}
            dragElastic={0.05}
            dragTransition={{ bounceStiffness: 280, bounceDamping: 36 }}
            className="flex gap-4 cursor-grab active:cursor-grabbing pb-4"
            style={{ width: "max-content" }}
          >
            {projects[language].map((project, index) => (
              <div key={index} className="w-[82vw] max-w-sm shrink-0 flex">
                <ProjectCard project={project} index={index} />
              </div>
            ))}
          </motion.div>

          <p className="text-center text-xs font-mono text-gray-400 dark:text-white/20 mt-3 select-none tracking-widest">
            ← drag →
          </p>
        </div>
      </div>
    </section>
  );
}
