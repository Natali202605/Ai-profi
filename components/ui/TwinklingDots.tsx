"use client";

import { motion, useReducedMotion } from "framer-motion";

const twinkleDots = [
  { top: "8%", left: "12%", size: 3, delay: 0, duration: 3.2 },
  { top: "14%", left: "34%", size: 2, delay: 0.8, duration: 2.8 },
  { top: "11%", left: "58%", size: 3, delay: 1.4, duration: 3.6 },
  { top: "18%", left: "78%", size: 2, delay: 0.3, duration: 2.5 },
  { top: "22%", left: "91%", size: 3, delay: 2.1, duration: 3.1 },
  { top: "26%", left: "6%", size: 2, delay: 1.1, duration: 2.9 },
  { top: "31%", left: "48%", size: 3, delay: 0.5, duration: 3.4 },
  { top: "35%", left: "67%", size: 2, delay: 1.9, duration: 2.6 },
  { top: "39%", left: "24%", size: 3, delay: 2.6, duration: 3.8 },
  { top: "44%", left: "85%", size: 2, delay: 0.9, duration: 2.7 },
  { top: "48%", left: "14%", size: 3, delay: 1.6, duration: 3.3 },
  { top: "52%", left: "52%", size: 2, delay: 2.4, duration: 2.4 },
  { top: "56%", left: "72%", size: 3, delay: 0.2, duration: 3.5 },
  { top: "61%", left: "38%", size: 2, delay: 1.3, duration: 2.8 },
  { top: "65%", left: "8%", size: 3, delay: 2.8, duration: 3.0 },
  { top: "68%", left: "94%", size: 2, delay: 0.7, duration: 2.5 },
  { top: "72%", left: "56%", size: 3, delay: 1.8, duration: 3.7 },
  { top: "76%", left: "28%", size: 2, delay: 2.2, duration: 2.9 },
  { top: "80%", left: "64%", size: 3, delay: 0.4, duration: 3.2 },
  { top: "84%", left: "18%", size: 2, delay: 1.5, duration: 2.6 },
  { top: "88%", left: "44%", size: 3, delay: 2.0, duration: 3.4 },
  { top: "92%", left: "82%", size: 2, delay: 1.0, duration: 2.8 },
  { top: "20%", left: "42%", size: 2, delay: 3.0, duration: 3.1 },
  { top: "58%", left: "88%", size: 3, delay: 2.5, duration: 3.6 },
];

export function TwinklingDots() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) return null;

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {twinkleDots.map((dot, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            top: dot.top,
            left: dot.left,
            width: dot.size,
            height: dot.size,
          }}
          animate={{
            opacity: [0.15, 0.35, 1, 0.45, 0.15],
            scale: [1, 1.2, 1.8, 1.3, 1],
            boxShadow: [
              "0 0 4px rgba(255,255,255,0.3)",
              "0 0 8px rgba(255,255,255,0.6)",
              "0 0 14px rgba(255,255,255,1), 0 0 24px rgba(200,220,255,0.7)",
              "0 0 10px rgba(255,255,255,0.7)",
              "0 0 4px rgba(255,255,255,0.3)",
            ],
          }}
          transition={{
            duration: dot.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: dot.delay,
          }}
        />
      ))}
    </div>
  );
}
