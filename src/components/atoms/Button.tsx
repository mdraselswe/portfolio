import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type ButtonBaseProps = {
  /** Additional classes to be merged with default styles */
  className?: string;
  /** Button variants */
  variant?: "primary" | "secondary" | "outline" | "ghost";
  /** Button sizes. Every size keeps a 44px minimum touch target. */
  size?: "sm" | "md" | "lg";
};

type ButtonAsButton = ButtonBaseProps & { as?: "button" } & Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    keyof ButtonBaseProps
  >;

type ButtonAsAnchor = ButtonBaseProps & { as: "a" } & Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    keyof ButtonBaseProps
  >;

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

const baseStyles =
  "group/btn relative isolate overflow-hidden inline-flex items-center justify-center gap-2 rounded-full font-medium transition-[transform,background-color,color,border-color] duration-200 ease-out active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50";

const variants = {
  primary:
    "bg-accent text-accent-ink hover:brightness-110 before:absolute before:inset-0 before:-z-10 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:transition-transform before:duration-700 hover:before:translate-x-full",
  secondary: "bg-ink/10 text-ink hover:bg-ink/15",
  outline: "border border-ink/25 text-ink hover:bg-ink/5",
  ghost: "text-ink hover:bg-ink/8",
};

const sizes = {
  sm: "min-h-11 px-5 text-sm",
  md: "min-h-12 px-6 text-base",
  lg: "min-h-14 px-8 text-base",
};

/** A server-renderable button, or a link styled as one. */
export function Button(props: ButtonProps) {
  const { className, variant = "primary", size = "md", as, ...rest } = props;
  const classes = twMerge(baseStyles, variants[variant], sizes[size], className);

  if (as === "a") {
    return <a className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)} />;
  }
  return <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)} />;
}
