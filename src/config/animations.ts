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
