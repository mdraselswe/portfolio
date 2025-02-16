import { Variants } from "framer-motion";

export interface AnimationVariants {
  containerVariants: Variants;
  itemVariants: Variants;
}

export interface AnimationTimings {
  fast: number;
  normal: number;
  slow: number;
}

export interface AnimationEasings {
  smooth: string;
  bounce: string;
  spring: number[];
}

export interface ViewportConfig {
  once: boolean;
  margin: string;
}
