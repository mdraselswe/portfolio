"use client";

import { useEffect } from "react";

export function useLenis() {
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    let raf: number;

    const init = async () => {
      const Lenis = (await import("lenis")).default;
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      const animate = (time: number) => {
        lenis.raf(time);
        raf = requestAnimationFrame(animate);
      };
      raf = requestAnimationFrame(animate);

      return lenis;
    };

    const lenisPromise = init();

    return () => {
      cancelAnimationFrame(raf);
      lenisPromise.then((l) => l?.destroy());
    };
  }, []);
}
