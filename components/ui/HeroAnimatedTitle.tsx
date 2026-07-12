"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { AccentText } from "@/components/ui/AccentText";
import { useReducedEffects } from "@/lib/useReducedEffects";

const SESSION_KEY = "hero-art-reveal-played";

type HeroAnimatedTitleProps = {
  text: string;
  accent: string;
  titleLines?: string[];
  className?: string;
};

function buildDefaultLines(text: string): string[] {
  const commaIdx = text.indexOf(",");
  if (commaIdx !== -1) {
    const first = text.slice(0, commaIdx + 1).trim();
    const rest = text.slice(commaIdx + 1).trim();
    const whichIdx = rest.toLowerCase().indexOf(" которые ");
    if (whichIdx !== -1) {
      return [
        first,
        rest.slice(0, whichIdx).trim(),
        rest.slice(whichIdx).trim(),
      ];
    }
    return [first, rest];
  }
  return [text];
}

export function HeroAnimatedTitle({
  text,
  accent,
  titleLines,
  className = "",
}: HeroAnimatedTitleProps) {
  const reducedMotion = useReducedMotion();
  const reducedEffects = useReducedEffects();
  const [playFull, setPlayFull] = useState(false);
  const [mounted, setMounted] = useState(false);

  const lines = useMemo(
    () => (titleLines?.length ? titleLines : buildDefaultLines(text)),
    [text, titleLines],
  );

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
        <span key={line} className="hero-title-line block text-white-text">
          <AccentText text={line} accent={accent} accentClassName="text-accent-primary" />
        </span>
      ))}
    </>
  );

  if (!mounted || reducedMotion || !playFull) {
    return (
      <h1 className={`hero-title heading-display text-balance ${className}`}>{titleContent}</h1>
    );
  }

  const useBlur = !reducedEffects;
  const lineDelayBase = 0.18;

  return (
    <h1 className={`hero-title heading-display relative text-balance ${className}`}>
      <motion.span
        className="hero-art-reveal-line pointer-events-none absolute -left-2 top-[8%] h-px w-[calc(100%+1rem)] origin-left bg-gradient-to-r from-transparent via-white/70 to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: [0, 0.9, 0.25, 0] }}
        transition={{ duration: 0.65, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden="true"
      />
      {lines.map((line, lineIndex) => (
        <motion.span
          key={line}
          className="hero-title-line-mask block overflow-hidden"
          initial={{
            opacity: 0,
            y: useBlur ? 28 : 14,
            filter: useBlur ? "blur(8px)" : "blur(0px)",
          }}
          animate={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          transition={{
            duration: useBlur ? 0.72 : 0.55,
            delay: lineDelayBase + lineIndex * 0.12,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <AccentText
            text={line}
            accent={accent}
            accentClassName={
              lineIndex === 0
                ? "hero-keyword-shimmer text-accent-primary"
                : "text-accent-primary"
            }
          />
        </motion.span>
      ))}
    </h1>
  );
}
