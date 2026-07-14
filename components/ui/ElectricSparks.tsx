"use client";

import { useReducedMotion } from "framer-motion";

type BranchPath = {
  d: string;
  delay: string;
};

/** Меньше ветвей, без SVG-фильтров — меньше нагрузка на GPU. */
const branchPaths: BranchPath[] = [
  { d: "M 4,52 L 14,48 L 22,54 L 30,44 L 42,47 L 54,40 L 64,43", delay: "0s" },
  { d: "M 30,44 L 32,36 L 36,30", delay: "0.4s" },
  { d: "M 58,38 L 68,44 L 76,36 L 86,42 L 94,34", delay: "1.8s" },
  { d: "M 10,68 L 22,72 L 32,64 L 44,70 L 56,62", delay: "3.2s" },
  { d: "M 72,22 L 82,28 L 90,20 L 96,24", delay: "0.9s" },
  { d: "M 38,82 L 50,86 L 62,78 L 74,84 L 88,76", delay: "4.5s" },
  { d: "M 6,28 L 16,32 L 26,24 L 36,30", delay: "2.6s" },
  { d: "M 44,70 L 48,78 L 52,82", delay: "3.5s" },
];

export function ElectricSparks() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) return null;

  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="electric-spark-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(255,255,255,0)" />
          <stop offset="40%" stopColor="rgba(255,255,255,0.95)" />
          <stop offset="70%" stopColor="rgba(200,220,255,0.9)" />
          <stop offset="100%" stopColor="rgba(184,164,255,0.3)" />
        </linearGradient>
      </defs>

      {branchPaths.map((branch, i) => (
        <g key={i}>
          <path
            d={branch.d}
            stroke="rgba(200,190,255,0.12)"
            strokeWidth={0.35}
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
          <path
            className="bg-fx-spark"
            d={branch.d}
            stroke="url(#electric-spark-gradient)"
            strokeWidth={0.55}
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            strokeDasharray="3 18"
            style={{ animationDelay: branch.delay }}
          />
        </g>
      ))}
    </svg>
  );
}
