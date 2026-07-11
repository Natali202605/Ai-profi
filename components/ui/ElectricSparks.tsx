"use client";

import { motion, useReducedMotion } from "framer-motion";

type Branch = {
  top: string;
  left: string;
  width: number;
  height: number;
  paths: string[];
  delay: number;
  duration: number;
  repeatDelay: number;
};

const branches: Branch[] = [
  {
    top: "18%",
    left: "8%",
    width: 180,
    height: 140,
    paths: [
      "M 8,90 L 35,78 L 52,92 L 68,65 L 88,72 L 105,58",
      "M 68,65 L 72,48 L 80,42",
      "M 52,92 L 44,108 L 38,118",
    ],
    delay: 0,
    duration: 2.4,
    repeatDelay: 5,
  },
  {
    top: "42%",
    left: "62%",
    width: 200,
    height: 130,
    paths: [
      "M 12,70 L 40,82 L 58,68 L 75,88 L 95,75 L 118,62",
      "M 75,88 L 82,102",
      "M 58,68 L 50,52",
    ],
    delay: 2.5,
    duration: 2.8,
    repeatDelay: 6,
  },
  {
    top: "58%",
    left: "22%",
    width: 170,
    height: 120,
    paths: [
      "M 10,55 L 38,68 L 55,52 L 72,70 L 90,58",
      "M 72,70 L 78,85 L 85,92",
      "M 55,52 L 48,38",
    ],
    delay: 4,
    duration: 2.2,
    repeatDelay: 7,
  },
  {
    top: "28%",
    left: "78%",
    width: 150,
    height: 110,
    paths: [
      "M 15,60 L 42,72 L 58,55 L 75,68 L 92,50",
      "M 58,55 L 52,40",
    ],
    delay: 1.2,
    duration: 2.6,
    repeatDelay: 5.5,
  },
  {
    top: "72%",
    left: "48%",
    width: 190,
    height: 100,
    paths: [
      "M 5,45 L 32,58 L 50,42 L 68,55 L 88,40 L 110,48",
      "M 68,55 L 74,68",
      "M 50,42 L 42,28",
    ],
    delay: 3.8,
    duration: 2.5,
    repeatDelay: 6.5,
  },
];

export function ElectricSparks() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <svg className="absolute h-0 w-0" aria-hidden="true">
        <defs>
          <linearGradient id="spark-stroke" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(184,164,255,0)" />
            <stop offset="45%" stopColor="rgba(230,225,255,0.85)" />
            <stop offset="100%" stopColor="rgba(214,188,120,0.45)" />
          </linearGradient>
          <filter id="spark-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {branches.map((branch, bi) => (
        <svg
          key={bi}
          className="absolute opacity-50"
          style={{ top: branch.top, left: branch.left, width: branch.width, height: branch.height }}
          viewBox="0 0 120 120"
          fill="none"
          aria-hidden="true"
        >
          {branch.paths.map((d, pi) => (
            <motion.path
              key={pi}
              d={d}
              stroke="url(#spark-stroke)"
              strokeWidth={1}
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#spark-glow)"
              strokeDasharray="6 94"
              initial={{ strokeDashoffset: 100, opacity: 0 }}
              animate={{
                strokeDashoffset: [100, 0, 0],
                opacity: [0, 0.75, 0.15, 0],
              }}
              transition={{
                duration: branch.duration,
                repeat: Infinity,
                repeatDelay: branch.repeatDelay + pi * 0.4,
                delay: branch.delay + pi * 0.3,
                ease: "easeInOut",
                times: [0, 0.55, 0.85, 1],
              }}
            />
          ))}
        </svg>
      ))}
    </div>
  );
}
