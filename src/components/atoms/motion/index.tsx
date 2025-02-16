"use client";

import { containerVariants, itemVariants } from "@/config/animations";
import { HTMLMotionProps, motion, ReactNode } from "@/lib";

interface MotionProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
  isContainer?: boolean;
}

export const MotionDiv = ({
  children,
  className = "",
  isContainer = false,
  ...props
}: MotionProps) => (
  <motion.div
    className={className}
    variants={isContainer ? containerVariants : itemVariants}
    {...props}
  >
    {children}
  </motion.div>
);

export const MotionSection = ({
  children,
  className = "",
  isContainer = true,
  ...props
}: MotionProps) => (
  <motion.section
    className={className}
    variants={isContainer ? containerVariants : itemVariants}
    {...props}
  >
    {children}
  </motion.section>
);

export const MotionParagraph = ({
  children,
  className = "",
  isContainer = false,
  ...props
}: MotionProps) => (
  <motion.p
    className={className}
    variants={isContainer ? containerVariants : itemVariants}
    {...props}
  >
    {children}
  </motion.p>
);
