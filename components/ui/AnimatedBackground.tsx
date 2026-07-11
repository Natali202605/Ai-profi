"use client";

import { motion, useReducedMotion } from "framer-motion";

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
        className="absolute -inset-[8%] bg-cover bg-center will-change-transform"
        style={{ backgroundImage: "url(/images/bg-watercolor.png)" }}
        animate={{
          scale: [1, 1.06, 1.02, 1.06, 1],
          x: ["0%", "-1.5%", "0.5%", "-1%", "0%"],
          y: ["0%", "-0.8%", "0.4%", "-0.5%", "0%"],
        }}
        transition={{ duration: 48, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute -left-1/4 top-0 h-[70vh] w-[70vh] rounded-full opacity-50 blur-[100px]"
        style={{ background: "radial-gradient(circle, rgba(168,140,255,0.45) 0%, transparent 70%)" }}
        animate={{ x: [0, 60, 20, 60, 0], y: [0, 40, 80, 40, 0], scale: [1, 1.15, 1.05, 1.15, 1] }}
        transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute -right-1/4 top-1/3 h-[60vh] w-[60vh] rounded-full opacity-45 blur-[90px]"
        style={{ background: "radial-gradient(circle, rgba(100,140,230,0.5) 0%, transparent 70%)" }}
        animate={{ x: [0, -50, -20, -50, 0], y: [0, -30, 30, -30, 0], scale: [1, 1.1, 1.2, 1.1, 1] }}
        transition={{ duration: 38, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />

      <motion.div
        className="absolute bottom-0 left-1/3 h-[50vh] w-[50vh] rounded-full opacity-40 blur-[80px]"
        style={{ background: "radial-gradient(circle, rgba(130,100,210,0.4) 0%, transparent 70%)" }}
        animate={{ x: [0, 40, -20, 40, 0], scale: [1, 1.2, 1.05, 1.2, 1] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut", delay: 8 }}
      />

      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(120,90,200,0.12) 0%, transparent 40%, rgba(60,100,200,0.14) 100%)",
        }}
        animate={{ opacity: [0.6, 0.9, 0.7, 0.9, 0.6] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="absolute inset-0 bg-[#1e2860]/18 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1848]/30 via-transparent to-[#0f1a40]/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#1a1848]/15 via-transparent to-[#1a2860]/20" />
    </div>
  );
}
