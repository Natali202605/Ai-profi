"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useReducedEffects } from "@/lib/useReducedEffects";

type HeroCursorCardProps = {
  children: ReactNode;
  className?: string;
};

export function HeroCursorCard({ children, className = "" }: HeroCursorCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const reducedEffects = useReducedEffects();
  const disableTilt = reducedMotion || reducedEffects;
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [1.2, -1.2]), {
    stiffness: 260,
    damping: 28,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-1.2, 1.2]), {
    stiffness: 260,
    damping: 28,
  });

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (disableTilt) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = (event.clientX - rect.left) / rect.width;
    const relY = (event.clientY - rect.top) / rect.height;
    x.set(relX - 0.5);
    y.set(relY - 0.5);
    el.style.setProperty("--mouse-x", `${relX * 100}%`);
    el.style.setProperty("--mouse-y", `${relY * 100}%`);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
    if (ref.current) {
      ref.current.style.setProperty("--mouse-x", "50%");
      ref.current.style.setProperty("--mouse-y", "50%");
    }
  };

  return (
    <motion.div
      ref={ref}
      className={`hero-cursor-card group relative ${className}`}
      style={
        disableTilt
          ? undefined
          : { rotateX, rotateY, transformPerspective: 1200 }
      }
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <div className="hero-cursor-card-glow pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      {children}
    </motion.div>
  );
}
