"use client";

import { useEffect, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/** Cycles through job titles. The full list is always in the DOM for screen readers and crawlers. */
export default function RoleRotator({ roles }: { roles: readonly string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % roles.length), 2600);
    return () => clearInterval(id);
  }, [roles.length]);

  const role = roles[index % roles.length];

  return (
    <p className="relative mt-6 h-10 overflow-hidden font-display text-2xl font-semibold text-accent sm:text-3xl">
      <span className="sr-only">{roles.join(", ")}</span>
      <span key={role} aria-hidden className="role-in block">
        {role}
      </span>
    </p>
  );
}
