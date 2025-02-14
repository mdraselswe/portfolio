"use client";

import { ButtonHTMLAttributes, AnchorHTMLAttributes, ElementType, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

type ButtonBaseProps<T extends ElementType = "button"> = {
  /** Additional classes to be merged with default styles */
  className?: string;
  /** Button variants */
  variant?: "primary" | "secondary" | "outline" | "ghost";
  /** Button sizes */
  size?: "sm" | "md" | "lg";
  /** Loading state */
  isLoading?: boolean;
  /** Render element type */
  as?: T;
  /** Button roundness */
  rounded?: boolean;
};

type ButtonAsButton = ButtonBaseProps<"button"> &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps<"button">>;

type ButtonAsAnchor = ButtonBaseProps<"a"> &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps<"a">>;

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

export const Button = forwardRef(function Button(
  {
    className,
    variant = "primary",
    size = "md",
    isLoading = false,
    as: Component = "button",
    rounded = false,
    children,
    ...props
  }: ButtonProps,
  ref
) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:shadow-[0_2px_4px_rgba(0,0,0,0.05)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]";

  const variants = {
    primary:
      "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 dark:from-blue-500 dark:to-indigo-500 dark:hover:from-blue-600 dark:hover:to-indigo-600 focus-visible:ring-blue-500",
    secondary:
      "bg-gradient-to-r from-slate-100 to-gray-100 text-gray-800 hover:from-slate-200 hover:to-gray-200 dark:from-slate-700 dark:to-gray-600 dark:text-gray-100 dark:hover:from-slate-600 dark:hover:to-gray-500 focus-visible:ring-gray-500 border border-gray-200 dark:border-gray-600",
    outline:
      "border-2 border-blue-500 bg-transparent text-blue-600 hover:bg-blue-50 hover:text-blue-700 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20 dark:hover:text-blue-300 focus-visible:ring-blue-500",
    ghost:
      "bg-transparent text-gray-700 hover:bg-gray-100 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-blue-400 focus-visible:ring-gray-500",
  };

  const sizes = {
    sm: "h-8 px-5 text-sm",
    md: "h-10 px-7 text-base",
    lg: "h-12 px-9 text-lg",
  };

  const roundedStyles = rounded ? "rounded-full" : "rounded-lg";

  return (
    <Component
      ref={ref as any}
      disabled={Component === "button" ? isLoading : undefined}
      className={twMerge(baseStyles, variants[variant], sizes[size], roundedStyles, className)}
      {...(props as any)}
    >
      {isLoading ? (
        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : null}
      {children}
    </Component>
  );
});

Button.displayName = "Button";
