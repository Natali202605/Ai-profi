"use client";

import { useEffect } from "react";
import { VK_COMMUNITY_URL, VK_PROFILE_URL } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

type VKButtonProps = {
  variant?: "profile" | "community";
  className?: string;
  children?: React.ReactNode;
};

export function VKButton({ variant = "profile", className, children }: VKButtonProps) {
  const href = variant === "profile" ? VK_PROFILE_URL : VK_COMMUNITY_URL;
  const event = variant === "profile" ? "vk_profile_click" : "vk_community_click";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex min-h-11 items-center gap-2 text-gold transition-colors hover:text-peach",
        className
      )}
      onClick={() => trackEvent(event)}
    >
      {children || "Написать ВКонтакте"}
      <ExternalLink className="h-4 w-4" />
    </a>
  );
}
