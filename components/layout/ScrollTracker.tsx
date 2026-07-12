"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

const thresholds = [25, 50, 75, 100];

export function ScrollTracker() {
  useEffect(() => {
    const tracked = new Set<number>();
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      window.requestAnimationFrame(() => {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        if (maxScroll <= 0) {
          ticking = false;
          return;
        }

        const scrollPercent = Math.round((window.scrollY / maxScroll) * 100);

        thresholds.forEach((t) => {
          if (scrollPercent >= t && !tracked.has(t)) {
            tracked.add(t);
            trackEvent("scroll_depth", { depth: t });
          }
        });

        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}
