"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  mode?: "words" | "chars";
}

export default function SplitText({
  text,
  className = "",
  delay = 0,
  duration = 0.65,
  stagger = 0.07,
  mode = "words",
}: SplitTextProps) {
  const prefersReduced = useReducedMotion();

  const units = useMemo(() => {
    if (mode === "chars") return text.split("");
    return text.split(" ");
  }, [text, mode]);

  if (prefersReduced) {
    return <span className={className}>{text}</span>;
  }

  return (
    // aria-label lets screen readers read the full string
    // aria-hidden on each span prevents double-reading
    <span className={`inline ${className}`} aria-label={text}>
      {units.map((unit, i) => (
        <motion.span
          key={`${unit}-${i}`}
          className="inline-block"
          aria-hidden
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration,
            delay: delay + i * stagger,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {unit === " " ? " " : unit}
          {mode === "words" && i < units.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </span>
  );
}
