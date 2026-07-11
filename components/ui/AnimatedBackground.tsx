"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ElectricSparks } from "@/components/ui/ElectricSparks";
import { TwinklingDots } from "@/components/ui/TwinklingDots";

export function AnimatedBackground() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden" aria-hidden="true">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/images/bg-watercolor.png)" }}
        />
        <div className="absolute inset-0 bg-[#1e2860]/25" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1848]/35 via-transparent to-[#0f1a40]/45" />
      </div>
    );
  }

  return (
    <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden" aria-hidden="true">
      <motion.div
        className="absolute -inset-[10%] bg-cover bg-center will-change-transform"
        style={{ backgroundImage: "url(/images/bg-watercolor.png)" }}
        animate={{
          scale: [1, 1.08, 1.03, 1.07, 1],
          x: ["0%", "-2%", "1%", "-1.5%", "0%"],
          y: ["0%", "-1.2%", "0.6%", "-0.8%", "0%"],
          rotate: [0, 0.4, -0.2, 0.3, 0],
        }}
        transition={{ duration: 42, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute -inset-[6%] bg-cover bg-center opacity-25 mix-blend-soft-light will-change-transform"
        style={{ backgroundImage: "url(/images/bg-watercolor.png)" }}
        animate={{
          scale: [1.05, 1.12, 1.06, 1.1, 1.05],
          x: ["0%", "1.5%", "-1%", "1%", "0%"],
          y: ["0%", "1%", "-0.5%", "0.8%", "0%"],
        }}
        transition={{ duration: 55, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute -left-1/4 top-0 h-[75vh] w-[75vh] rounded-full opacity-55 blur-[110px]"
        style={{ background: "radial-gradient(circle, rgba(168,140,255,0.5) 0%, transparent 70%)" }}
        animate={{ x: [0, 80, 30, 80, 0], y: [0, 50, 90, 50, 0], scale: [1, 1.2, 1.08, 1.2, 1] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute -right-1/4 top-1/4 h-[65vh] w-[65vh] rounded-full opacity-50 blur-[100px]"
        style={{ background: "radial-gradient(circle, rgba(100,140,230,0.55) 0%, transparent 70%)" }}
        animate={{ x: [0, -70, -25, -70, 0], y: [0, -40, 35, -40, 0], scale: [1, 1.15, 1.25, 1.15, 1] }}
        transition={{ duration: 34, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />

      <motion.div
        className="absolute bottom-0 left-1/4 h-[55vh] w-[55vh] rounded-full opacity-45 blur-[90px]"
        style={{ background: "radial-gradient(circle, rgba(200,170,120,0.35) 0%, transparent 70%)" }}
        animate={{ x: [0, 50, -30, 50, 0], y: [0, -20, 10, -20, 0], scale: [1, 1.25, 1.1, 1.25, 1] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut", delay: 6 }}
      />

      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(120,90,200,0.14) 0%, transparent 45%, rgba(60,100,200,0.16) 100%)",
        }}
        animate={{ opacity: [0.5, 0.85, 0.6, 0.85, 0.5] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute inset-0 skew-x-12"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(214,188,120,0.12) 50%, transparent 100%)",
          width: "60%",
        }}
        animate={{ x: ["-120%", "220%"] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", repeatDelay: 4 }}
      />

      <div className="absolute inset-0 bg-[#1e2860]/16 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1848]/28 via-transparent to-[#0f1a40]/38" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#1a1848]/12 via-transparent to-[#1a2860]/18" />

      <div className="absolute inset-0 z-[1]">
        <ElectricSparks />
        <TwinklingDots />
      </div>
    </div>
  );
}
