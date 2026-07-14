"use client";

import { useEffect, useState } from "react";

const MEDIA_QUERY =
  "(max-width: 768px), (pointer: coarse), (prefers-reduced-motion: reduce)";

function isLowPowerDevice() {
  if (typeof navigator === "undefined") return false;
  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean };
  };
  if (nav.connection?.saveData) return true;
  if (typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4) return true;
  if (typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency <= 4) {
    return true;
  }
  return false;
}

/** Упрощает декоративные эффекты на мобильных, touch и слабых устройствах. */
export function useReducedEffects() {
  const [reduced, setReduced] = useState(true);

  useEffect(() => {
    const media = window.matchMedia(MEDIA_QUERY);
    const update = () => setReduced(media.matches || isLowPowerDevice());
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduced;
}
