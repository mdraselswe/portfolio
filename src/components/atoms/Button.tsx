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
    children,
    ...props
  }: ButtonProps,
  ref
) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-sm hover:shadow-md active:scale-[0.98]";

  const variants = {
    primary:
      "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 dark:from-blue-500 dark:to-indigo-500 dark:hover:from-blue-600 dark:hover:to-indigo-600 focus-visible:ring-blue-500",
    secondary:
      "bg-gradient-to-r from-gray-50 to-gray-100 text-gray-900 hover:from-gray-100 hover:to-gray-200 dark:from-gray-800 dark:to-gray-700 dark:text-gray-100 dark:hover:from-gray-700 dark:hover:to-gray-600 focus-visible:ring-gray-500",
    outline:
      "border-2 border-gray-300 bg-transparent hover:border-blue-500 hover:text-blue-600 dark:border-gray-600 dark:text-gray-100 dark:hover:border-blue-400 dark:hover:text-blue-400 focus-visible:ring-blue-500",
    ghost:
      "bg-transparent text-gray-700 hover:bg-gray-100 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-blue-400 focus-visible:ring-gray-500",
  };

  const sizes = {
    sm: "h-8 px-5 text-sm",
    md: "h-10 px-7 text-base",
    lg: "h-12 px-9 text-lg",
  };

  return (
    <Component
      ref={ref}
      disabled={Component === "button" ? isLoading : undefined}
      className={twMerge(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {isLoading ? (
        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : null}
      {children}
    </Component>
  );
});

Button.displayName = "Button";
