"use client";

import { motion, useReducedMotion } from "framer-motion";

type BranchPath = {
  d: string;
  delay: number;
};

const branchPaths: BranchPath[] = [
  { d: "M 4,52 L 14,48 L 22,54 L 30,44 L 42,47 L 54,40 L 64,43", delay: 0 },
  { d: "M 30,44 L 32,36 L 36,30", delay: 0.4 },
  { d: "M 22,54 L 18,62 L 14,68", delay: 0.7 },
  { d: "M 58,38 L 68,44 L 76,36 L 86,42 L 94,34", delay: 1.8 },
  { d: "M 76,36 L 80,28", delay: 2.1 },
  { d: "M 68,44 L 72,52", delay: 2.3 },
  { d: "M 10,68 L 22,72 L 32,64 L 44,70 L 56,62", delay: 3.2 },
  { d: "M 44,70 L 48,78 L 52,82", delay: 3.5 },
  { d: "M 32,64 L 28,56", delay: 3.8 },
  { d: "M 72,22 L 82,28 L 90,20 L 96,24", delay: 0.9 },
  { d: "M 82,28 L 84,16", delay: 1.2 },
  { d: "M 38,82 L 50,86 L 62,78 L 74,84 L 88,76", delay: 4.5 },
  { d: "M 62,78 L 66,88", delay: 4.8 },
  { d: "M 50,86 L 46,92", delay: 5.1 },
  { d: "M 6,28 L 16,32 L 26,24 L 36,30", delay: 2.6 },
  { d: "M 26,24 L 22,16", delay: 2.9 },
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
        <filter id="electric-spark-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="0.8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
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
          <motion.path
            d={branch.d}
            stroke="url(#electric-spark-gradient)"
            strokeWidth={0.55}
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#electric-spark-glow)"
            vectorEffect="non-scaling-stroke"
            strokeDasharray="3 18"
            initial={{ strokeDashoffset: 21, opacity: 0 }}
            animate={{
              strokeDashoffset: [21, 0, 0],
              opacity: [0, 1, 0.85, 0],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              repeatDelay: 3.5 + (i % 4) * 0.8,
              delay: branch.delay,
              ease: "linear",
              times: [0, 0.65, 0.85, 1],
            }}
          />
        </g>
      ))}
    </svg>
  );
}
