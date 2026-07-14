"use client";

import { useEffect, useState } from "react";
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
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onVisibility = () => setVisible(document.visibilityState === "visible");
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  if (prefersReducedMotion || reducedEffects) {
    return <StaticBackground />;
  }

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-20 overflow-hidden"
      aria-hidden="true"
      style={{ contain: "strict" }}
    >
      <motion.div
        className="absolute -inset-[8%] will-change-transform"
        animate={
          visible
            ? {
                scale: [1, 1.03, 1.015, 1],
                x: ["0%", "-0.8%", "0.4%", "0%"],
                y: ["0%", "-0.6%", "0.3%", "0%"],
              }
            : false
        }
        transition={{ duration: 56, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url(/images/bg-watercolor.png)" }}
        />
      </motion.div>

      <motion.div
        className="absolute -left-1/4 top-0 h-[70vh] w-[70vh] rounded-full opacity-40 blur-[56px]"
        style={{
          background: "radial-gradient(circle, rgba(168,140,255,0.45) 0%, transparent 70%)",
          willChange: "transform",
        }}
        animate={visible ? { x: [0, 40, 0], y: [0, 24, 0] } : false}
        transition={{ duration: 36, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute -right-1/4 top-1/4 h-[60vh] w-[60vh] rounded-full opacity-35 blur-[48px]"
        style={{
          background: "radial-gradient(circle, rgba(100,140,230,0.5) 0%, transparent 70%)",
          willChange: "transform",
        }}
        animate={visible ? { x: [0, -36, 0], y: [0, -20, 0] } : false}
        transition={{ duration: 42, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <div className="absolute inset-0 bg-[#1e2860]/16 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1848]/28 via-transparent to-[#0f1a40]/38" />

      {visible ? (
        <div className="absolute inset-0 z-[1]">
          <HeadStarsTwinkle />
          <ElectricSparks />
          <TwinklingDots />
        </div>
      ) : null}
    </div>
  );
}
