"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * The page's single effects island. Everything else is server-rendered markup that this
 * controller brings to life through data attributes:
 *   [data-reveal]   fade/draw in once when scrolled into view
 *   [data-count]    count up once when scrolled into view
 *   [data-spotlight], [data-glow], [data-tilt], [data-magnetic]   mouse-only pointer effects
 * It also draws the scroll progress bar. No per-element React state, so pointer moves and
 * scrolling never re-render anything.
 */
export default function Effects() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = prefersReducedMotion();

    // ── Reveal + count-up ──────────────────────────────────────────────────
    const countUp = (el: HTMLElement) => {
      if (reduced) return;
      const to = Number(el.dataset.count);
      const suffix = el.dataset.suffix ?? "";
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / 1600, 1);
        el.textContent = `${Math.round(to * (1 - Math.pow(1 - p, 4)))}${suffix}`;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.setAttribute("data-shown", "");
          if (el.dataset.count !== undefined) countUp(el);
          io.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -80px 0px" }
    );
    document.querySelectorAll("[data-reveal], [data-count]").forEach((el) => io.observe(el));

    // ── Pointer effects (mouse only, one delegated listener) ───────────────
    let tilted: HTMLElement | null = null;
    let pulled: HTMLElement | null = null;

    const onMove = (e: PointerEvent) => {
      if (reduced || e.pointerType !== "mouse") return;
      const target = e.target as Element | null;
      if (!target) return;

      const spot = document.querySelector<HTMLElement>("[data-spotlight]");
      if (spot) {
        const r = spot.getBoundingClientRect();
        spot.style.setProperty("--sx", `${e.clientX - r.left}px`);
        spot.style.setProperty("--sy", `${e.clientY - r.top}px`);
      }

      const glow = target.closest<HTMLElement>("[data-glow]");
      if (glow) {
        const r = glow.getBoundingClientRect();
        glow.style.setProperty("--mx", `${e.clientX - r.left}px`);
        glow.style.setProperty("--my", `${e.clientY - r.top}px`);
      }

      const tilt = target.closest<HTMLElement>("[data-tilt]");
      if (tilted && tilted !== tilt) tilted.style.transform = "";
      tilted = tilt;
      if (tilt) {
        const r = tilt.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        tilt.style.transform = `perspective(1100px) rotateX(${(-py * 14).toFixed(2)}deg) rotateY(${(px * 14).toFixed(2)}deg)`;
      }

      const mag = target.closest<HTMLElement>("[data-magnetic]");
      if (pulled && pulled !== mag) pulled.style.transform = "";
      pulled = mag;
      if (mag) {
        const r = mag.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) * 0.28;
        const dy = (e.clientY - (r.top + r.height / 2)) * 0.28;
        mag.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
      }
    };
    document.addEventListener("pointermove", onMove, { passive: true });

    // ── Scroll progress ────────────────────────────────────────────────────
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${progress})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    // Read layout only once the page has settled: a synchronous read here forces the first
    // layout inside a script task, which is exactly what Lighthouse counts as blocking time.
    const settle = window.setTimeout(update, 1200);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      io.disconnect();
      document.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.clearTimeout(settle);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={bar}
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left scale-x-0 bg-accent"
    />
  );
}
