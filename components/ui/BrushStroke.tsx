"use client";

import { motion, useReducedMotion } from "framer-motion";

export function BrushStroke({ className = "" }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <svg
      viewBox="0 0 200 20"
      className={`h-4 w-32 text-gold ${className}`}
      aria-hidden="true"
      fill="none"
    >
      <motion.path
        d="M2 12 Q50 2, 100 10 T198 8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        initial={prefersReducedMotion ? { pathLength: 1 } : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
    </svg>
  );
}
