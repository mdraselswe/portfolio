// Animation Libraries
export { motion } from "framer-motion";
export type { HTMLMotionProps } from "framer-motion";

// React.js
export {
  forwardRef,
  useEffect,
  useState,
  Suspense,
  lazy,
  createContext,
  useContext,
  memo,
  useCallback,
  useMemo,
} from "react";
export type { AnchorHTMLAttributes, ButtonHTMLAttributes, ElementType, ReactNode } from "react";

// Next.js
import Image from "next/image";
export { Image };

// Tailwind CSS
export { twMerge } from "tailwind-merge";

// Testing Libraries
export { fireEvent, render, screen, act } from "@testing-library/react";
export { describe, expect, test, beforeEach, afterEach } from "@jest/globals";
