"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ElectricSparks } from "@/components/ui/ElectricSparks";
import { HeadStarsTwinkle } from "@/components/ui/HeadStarsTwinkle";
import { TwinklingDots } from "@/components/ui/TwinklingDots";
import { useReducedEffects } from "@/lib/useReducedEffects";

function StaticBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden" aria-hidden="true">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/images/bg-watercolor.png)" }}
      />
      <div className="absolute inset-0 bg-[#1e2860]/25" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1848]/35 via-transparent to-[#0f1a40]/45" />
    </div>
  );
}

export function AnimatedBackground() {
  const prefersReducedMotion = useReducedMotion();
  const reducedEffects = useReducedEffects();

  if (prefersReducedMotion || reducedEffects) {
    return <StaticBackground />;
  }

  return (
    <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden" aria-hidden="true">
      <motion.div
        className="absolute -inset-[8%] will-change-transform"
        animate={{
          scale: [1, 1.04, 1.02, 1],
          x: ["0%", "-1%", "0.5%", "0%"],
          y: ["0%", "-0.8%", "0.4%", "0%"],
        }}
        transition={{ duration: 48, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url(/images/bg-watercolor.png)" }}
        />
      </motion.div>

      <motion.div
        className="absolute -left-1/4 top-0 h-[70vh] w-[70vh] rounded-full opacity-45 blur-[80px]"
        style={{ background: "radial-gradient(circle, rgba(168,140,255,0.45) 0%, transparent 70%)" }}
        animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
        transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute -right-1/4 top-1/4 h-[60vh] w-[60vh] rounded-full opacity-40 blur-[70px]"
        style={{ background: "radial-gradient(circle, rgba(100,140,230,0.5) 0%, transparent 70%)" }}
        animate={{ x: [0, -45, 0], y: [0, -25, 0] }}
        transition={{ duration: 38, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <div className="absolute inset-0 bg-[#1e2860]/16 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1848]/28 via-transparent to-[#0f1a40]/38" />

      <div className="absolute inset-0 z-[1]">
        <HeadStarsTwinkle />
        <ElectricSparks />
        <TwinklingDots />
      </div>
    </div>
  );
}
