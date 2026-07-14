"use client";

import { useReducedMotion } from "framer-motion";

/** CSS-анимации вместо Framer — дешевле для десятков точек. */
const twinkleDots = [
  { top: "8%", left: "12%", size: 3, delay: "0s", duration: "3.2s" },
  { top: "14%", left: "34%", size: 2, delay: "0.8s", duration: "2.8s" },
  { top: "11%", left: "58%", size: 3, delay: "1.4s", duration: "3.6s" },
  { top: "18%", left: "78%", size: 2, delay: "0.3s", duration: "2.5s" },
  { top: "22%", left: "91%", size: 3, delay: "2.1s", duration: "3.1s" },
  { top: "31%", left: "48%", size: 3, delay: "0.5s", duration: "3.4s" },
  { top: "39%", left: "24%", size: 3, delay: "2.6s", duration: "3.8s" },
  { top: "48%", left: "14%", size: 3, delay: "1.6s", duration: "3.3s" },
  { top: "56%", left: "72%", size: 3, delay: "0.2s", duration: "3.5s" },
  { top: "65%", left: "8%", size: 3, delay: "2.8s", duration: "3.0s" },
  { top: "72%", left: "56%", size: 3, delay: "1.8s", duration: "3.7s" },
  { top: "80%", left: "64%", size: 3, delay: "0.4s", duration: "3.2s" },
];

export function TwinklingDots() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) return null;

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {twinkleDots.map((dot, i) => (
        <span
          key={i}
          className="bg-fx-twinkle absolute rounded-full bg-white"
          style={{
            top: dot.top,
            left: dot.left,
            width: dot.size,
            height: dot.size,
            animationDelay: dot.delay,
            animationDuration: dot.duration,
          }}
        />
      ))}
    </div>
  );
}
