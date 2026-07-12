"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const ACCENT_KEYWORDS = [
  "визуальные проекты",
  "брендам",
  "заметными",
  "запоминающимися",
];

const SESSION_KEY = "hero-brush-reveal-played";

type DigitalBrushRevealProps = {
  lines: string[];
  className?: string;
};

function highlightKeywords(text: string, shimmer: boolean) {
  const pattern = new RegExp(`(${ACCENT_KEYWORDS.join("|")})`, "gi");
  const parts = text.split(pattern);

  return parts.map((part, index) => {
    const isKeyword = ACCENT_KEYWORDS.some(
      (keyword) => keyword.toLowerCase() === part.toLowerCase(),
    );
    if (!isKeyword) return part;
    return (
      <span
        key={`${part}-${index}`}
        className={shimmer ? "hero-keyword-shimmer" : "text-gold/95"}
      >
        {part}
      </span>
    );
  });
}

export function DigitalBrushReveal({ lines, className = "" }: DigitalBrushRevealProps) {
  const reducedMotion = useReducedMotion();
  const [playFull, setPlayFull] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (reducedMotion) return;
    const played = sessionStorage.getItem(SESSION_KEY);
    setPlayFull(!played);
    if (!played) sessionStorage.setItem(SESSION_KEY, "1");
  }, [reducedMotion]);

  const safeLines = useMemo(() => lines.filter(Boolean), [lines]);

  if (!mounted) {
    return (
      <h1 className={`heading-display text-balance ${className}`}>
        {safeLines.map((line) => (
          <span key={line} className="block text-white-text">
            {line}
          </span>
        ))}
      </h1>
    );
  }

  if (reducedMotion || !playFull) {
    return (
      <motion.h1
        className={`heading-display text-balance ${className}`}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        {safeLines.map((line, lineIndex) => (
          <span key={line} className="block text-white-text">
            {highlightKeywords(line, lineIndex === safeLines.length - 1)}
          </span>
        ))}
      </motion.h1>
    );
  }

  return (
    <h1 className={`heading-display relative text-balance ${className}`}>
      <motion.span
        className="hero-brush-line pointer-events-none absolute -left-2 top-[12%] h-px w-[calc(100%+1rem)] origin-left"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: [0, 0.85, 0.45, 0] }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden="true"
      />

      {safeLines.map((line, lineIndex) => (
        <motion.span
          key={line}
          className="hero-brush-line-mask block overflow-hidden text-white-text"
          initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.82,
            delay: 0.28 + lineIndex * 0.11,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {highlightKeywords(line, true)}
        </motion.span>
      ))}

      <motion.span
        className="pointer-events-none absolute right-[8%] top-[78%] flex gap-1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.7, 0] }}
        transition={{ delay: 1.35, duration: 0.55 }}
        aria-hidden="true"
      >
        {[0, 1, 2].map((dot) => (
          <motion.span
            key={dot}
            className="h-1 w-1 rounded-full bg-gold/70"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1, 0] }}
            transition={{ delay: 1.35 + dot * 0.08, duration: 0.45 }}
          />
        ))}
      </motion.span>
    </h1>
  );
}
