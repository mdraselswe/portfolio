"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface AnimatedCounterProps {
  from?: number;
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export default function AnimatedCounter({
  from = 0,
  to,
  suffix = "",
  prefix = "",
  duration = 2.2,
  className = "",
}: AnimatedCounterProps) {
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [count, setCount] = useState(prefersReduced ? to : from);

  useEffect(() => {
    if (!isInView) return;
    if (prefersReduced) {
      setCount(to);
      return;
    }

    const controls = animate(from, to, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setCount(Math.round(v)),
    });

    return () => controls.stop();
  }, [isInView, from, to, duration, prefersReduced]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}
