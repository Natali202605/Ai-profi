"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

const thresholds = [25, 50, 75, 100];

export function ScrollTracker() {
  useEffect(() => {
    const tracked = new Set<number>();

    const onScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );

      thresholds.forEach((t) => {
        if (scrollPercent >= t && !tracked.has(t)) {
          tracked.add(t);
          trackEvent("scroll_depth", { depth: t });
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}
