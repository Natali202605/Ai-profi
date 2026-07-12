"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { AccentText } from "@/components/ui/AccentText";

const SESSION_KEY = "hero-brush-reveal-played";

type HeroAnimatedTitleProps = {
  text: string;
  accent: string;
  className?: string;
};

export function HeroAnimatedTitle({ text, accent, className = "" }: HeroAnimatedTitleProps) {
  const reducedMotion = useReducedMotion();
  const [playFull, setPlayFull] = useState(false);
  const [mounted, setMounted] = useState(false);

  const lines = (() => {
    const breakAt = text.toLowerCase().indexOf(" для ");
    if (breakAt === -1) return [text];
    return [text.slice(0, breakAt).trim(), text.slice(breakAt).trim()];
  })();

  useEffect(() => {
    setMounted(true);
    if (reducedMotion) return;
    const played = sessionStorage.getItem(SESSION_KEY);
    setPlayFull(!played);
    if (!played) sessionStorage.setItem(SESSION_KEY, "1");
  }, [reducedMotion]);

  const titleContent = (
    <>
      {lines.map((line) => (
        <span key={line} className="block text-white-text">
          <AccentText text={line} accent={accent} accentClassName="text-accent-primary" />
        </span>
      ))}
    </>
  );

  if (!mounted || reducedMotion || !playFull) {
    return (
      <motion.h1
        className={`heading-display text-balance ${className}`}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        {titleContent}
      </motion.h1>
    );
  }

  return (
    <h1 className={`heading-display relative text-balance ${className}`}>
      <motion.span
        className="hero-brush-line pointer-events-none absolute -left-2 top-[10%] h-px w-[calc(100%+1rem)] origin-left"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: [0, 0.85, 0.35, 0] }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden="true"
      />
      {lines.map((line, lineIndex) => (
        <motion.span
          key={line}
          className="hero-brush-line-mask block overflow-hidden"
          initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.75,
            delay: 0.42 + lineIndex * 0.12,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <AccentText
            text={line}
            accent={accent}
            accentClassName={
              lineIndex === 0 ? "hero-keyword-shimmer text-accent-primary" : "text-accent-primary"
            }
          />
        </motion.span>
      ))}
    </h1>
  );
}
