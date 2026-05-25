"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type CursorVariant = "default" | "hover";

export default function CustomCursor() {
  const prefersReduced = useReducedMotion();
  const [variant, setVariant] = useState<CursorVariant>("default");
  const [visible, setVisible] = useState(false);

  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  // Dot: tight spring → feels glued to cursor
  const dotX = useSpring(mouseX, { stiffness: 1000, damping: 40, mass: 0.2 });
  const dotY = useSpring(mouseY, { stiffness: 1000, damping: 40, mass: 0.2 });

  // Ring: loose spring → lags behind creating depth
  const ringX = useSpring(mouseX, { stiffness: 200, damping: 28, mass: 0.5 });
  const ringY = useSpring(mouseY, { stiffness: 200, damping: 28, mass: 0.5 });

  useEffect(() => {
    if (prefersReduced) return;

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      const el = (e.target as Element).closest("a, button, [data-magnetic]");
      if (el) setVariant("hover");
    };

    const onOut = (e: MouseEvent) => {
      const to = e.relatedTarget as Element | null;
      if (!to?.closest("a, button, [data-magnetic]")) setVariant("default");
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, [prefersReduced, visible, mouseX, mouseY]);

  if (prefersReduced) return null;

  const isHover = variant === "hover";

  return (
    <>
      {/* Dot — snappy, mix-blend creates invert effect on any bg */}
      <motion.div
        className="fixed top-0 left-0 rounded-full bg-white mix-blend-difference pointer-events-none z-[9999]"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
        animate={{ width: isHover ? 14 : 8, height: isHover ? 14 : 8, opacity: visible ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 600, damping: 30 }}
      />

      {/* Ring — lags, expands on hover */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border pointer-events-none z-[9998]"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: isHover ? 52 : 28,
          height: isHover ? 52 : 28,
          borderColor: isHover ? "rgb(99 102 241)" : "rgb(59 130 246)",
          backgroundColor: isHover ? "rgba(99,102,241,0.08)" : "transparent",
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 22 }}
      />
    </>
  );
}
