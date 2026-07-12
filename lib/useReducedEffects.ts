"use client";

import { useEffect, useState } from "react";

const REDUCED_EFFECTS_QUERY = "(max-width: 768px), (pointer: coarse), (prefers-reduced-motion: reduce)";

export function useReducedEffects() {
  const [reduced, setReduced] = useState(true);

  useEffect(() => {
    const media = window.matchMedia(REDUCED_EFFECTS_QUERY);
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduced;
}
