"use client";

import { useReducedMotion } from "framer-motion";

type HeadStar = {
  top: string;
  left: string;
  size: number;
  delay: string;
  duration: string;
  variant: "sparkle" | "dot";
};

const headStars: HeadStar[] = [
  { top: "13%", left: "11%", size: 7, delay: "0s", duration: "2.6s", variant: "sparkle" },
  { top: "23%", left: "10%", size: 9, delay: "0.5s", duration: "3.0s", variant: "sparkle" },
  { top: "17%", left: "14%", size: 4, delay: "1.1s", duration: "2.4s", variant: "dot" },
  { top: "19%", left: "7%", size: 3, delay: "0.3s", duration: "2.8s", variant: "dot" },
  { top: "21%", left: "17%", size: 4, delay: "1.6s", duration: "2.5s", variant: "dot" },
  { top: "27%", left: "13%", size: 4, delay: "0.8s", duration: "3.2s", variant: "dot" },
  { top: "29%", left: "18%", size: 3, delay: "2.0s", duration: "2.7s", variant: "dot" },
  { top: "25%", left: "15%", size: 3, delay: "0.2s", duration: "3.1s", variant: "dot" },
];

export function HeadStarsTwinkle() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) return null;

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {headStars.map((star, i) =>
        star.variant === "sparkle" ? (
          <div
            key={i}
            className="bg-fx-twinkle absolute"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              animationDelay: star.delay,
              animationDuration: star.duration,
            }}
          >
            <span className="absolute left-1/2 top-1/2 h-[180%] w-px -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/90" />
            <span className="absolute left-1/2 top-1/2 h-px w-[180%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/90" />
            <span className="absolute left-1/2 top-1/2 h-[130%] w-px -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-full bg-white/70" />
            <span className="absolute left-1/2 top-1/2 h-px w-[130%] -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-full bg-white/70" />
            <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
          </div>
        ) : (
          <span
            key={i}
            className="bg-fx-twinkle absolute rounded-full bg-white"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              animationDelay: star.delay,
              animationDuration: star.duration,
            }}
          />
        ),
      )}
    </div>
  );
}
