"use client";

import { AnimatedBackground } from "@/components/ui/AnimatedBackground";

export function AdminPageChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <AnimatedBackground />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
