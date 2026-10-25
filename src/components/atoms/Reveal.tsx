import type { CSSProperties, ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}

/** Fades and lifts content in as it scrolls into view. Markup only; `Effects` flips `data-shown`. */
export default function Reveal({ children, delay = 0, y = 28, className = "" }: RevealProps) {
  return (
    <div
      data-reveal
      style={{ "--d": `${delay}s`, "--y": `${y}px` } as CSSProperties}
      className={`reveal ${className}`}
    >
      {children}
    </div>
  );
}
