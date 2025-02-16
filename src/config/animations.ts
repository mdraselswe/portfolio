// Animation variants for container elements
export const containerVariants = {
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

// Animation variants for hero section elements
export const heroVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5 },
};

// Animation variants for hero content
export const heroContentVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay: 0.2 },
};

// Animation variants for hero illustration
export const heroIllustrationVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, delay: 0.4 },
};

// Common animation timing configurations
export const timings = {
  fast: 0.3,
  normal: 0.6,
  slow: 0.9,
};

// Common easing functions
export const easings = {
  smooth: "easeOut",
  bounce: "easeInOut",
  spring: [0.6, 0.01, -0.05, 0.95],
};

// Viewport configurations for animations
export const viewportConfig = {
  once: true,
  margin: "-100px",
};
