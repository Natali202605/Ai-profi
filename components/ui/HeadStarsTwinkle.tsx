"use client";

import { motion, useReducedMotion } from "framer-motion";

type HeadStar = {
  top: string;
  left: string;
  size: number;
  delay: number;
  duration: number;
  variant: "sparkle" | "dot";
};

const headStars: HeadStar[] = [
  { top: "13%", left: "11%", size: 7, delay: 0, duration: 2.6, variant: "sparkle" },
  { top: "23%", left: "10%", size: 9, delay: 0.5, duration: 3.0, variant: "sparkle" },
  { top: "17%", left: "14%", size: 4, delay: 1.1, duration: 2.4, variant: "dot" },
  { top: "19%", left: "7%", size: 3, delay: 0.3, duration: 2.8, variant: "dot" },
  { top: "21%", left: "17%", size: 4, delay: 1.6, duration: 2.5, variant: "dot" },
  { top: "27%", left: "13%", size: 4, delay: 0.8, duration: 3.2, variant: "dot" },
  { top: "29%", left: "18%", size: 3, delay: 2.0, duration: 2.7, variant: "dot" },
  { top: "31%", left: "11%", size: 3, delay: 1.4, duration: 2.9, variant: "dot" },
  { top: "15%", left: "9%", size: 3, delay: 2.3, duration: 2.6, variant: "dot" },
  { top: "25%", left: "15%", size: 3, delay: 0.2, duration: 3.1, variant: "dot" },
  { top: "20%", left: "12%", size: 3, delay: 1.8, duration: 2.3, variant: "dot" },
  { top: "33%", left: "16%", size: 3, delay: 2.6, duration: 2.8, variant: "dot" },
];

const twinkleKeyframes = {
  opacity: [0.25, 0.55, 1, 0.6, 0.25],
  scale: [0.85, 1.1, 1.6, 1.15, 0.85],
  boxShadow: [
    "0 0 6px rgba(255,255,255,0.45), 0 0 12px rgba(200,220,255,0.35)",
    "0 0 10px rgba(255,255,255,0.75), 0 0 18px rgba(200,220,255,0.55)",
    "0 0 16px rgba(255,255,255,1), 0 0 28px rgba(200,220,255,0.85), 0 0 40px rgba(184,164,255,0.45)",
    "0 0 12px rgba(255,255,255,0.8), 0 0 22px rgba(200,220,255,0.6)",
    "0 0 6px rgba(255,255,255,0.45), 0 0 12px rgba(200,220,255,0.35)",
  ],
};

export function HeadStarsTwinkle() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) return null;

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {headStars.map((star, i) =>
        star.variant === "sparkle" ? (
          <motion.div
            key={i}
            className="absolute"
            style={{ top: star.top, left: star.left, width: star.size, height: star.size }}
            animate={{
              ...twinkleKeyframes,
              rotate: [0, 45, 90, 45, 0],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: star.delay,
            }}
          >
            <span className="absolute left-1/2 top-1/2 h-[180%] w-px -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/90" />
            <span className="absolute left-1/2 top-1/2 h-px w-[180%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/90" />
            <span className="absolute left-1/2 top-1/2 h-[130%] w-px -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-full bg-white/70" />
            <span className="absolute left-1/2 top-1/2 h-px w-[130%] -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-full bg-white/70" />
            <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
          </motion.div>
        ) : (
          <motion.span
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
            }}
            animate={twinkleKeyframes}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: star.delay,
            }}
          />
        ),
      )}
    </div>
  );
}
