import {
  AnimationEasings,
  AnimationTimings,
  AnimationVariants,
  ViewportConfig,
} from "@/types/animation";

// Animation variants for container elements
export const containerVariants: AnimationVariants["containerVariants"] = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

// Animation variants for individual items
export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

// Common animation timing configurations
export const timings: AnimationTimings = {
  fast: 0.3,
  normal: 0.6,
  slow: 0.9,
};

// Common easing functions
export const easings: AnimationEasings = {
  smooth: "easeOut",
  bounce: "easeInOut",
  spring: [0.6, 0.01, -0.05, 0.95],
};

// Viewport configurations for animations
export const viewportConfig: ViewportConfig = {
  once: true,
  margin: "-100px",
};

// Faster stagger for dense grids
export const fastStaggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.1, staggerChildren: 0.08 },
  },
};

export const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export const fadeInScale = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};
