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
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600",
    secondary:
      "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700",
    outline:
      "border border-gray-300 bg-transparent hover:bg-gray-100 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-800",
    ghost: "bg-transparent hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800",
  };

  const sizes = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 text-base",
    lg: "h-12 px-6 text-lg",
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
