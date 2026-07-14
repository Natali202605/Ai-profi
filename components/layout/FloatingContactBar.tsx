"use client";

import Link from "next/link";
import { MessageCircle, FileText } from "lucide-react";
import { VK_PROFILE_URL } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";
import { useAdelinChat } from "@/components/chatbot/AdelinChatContext";

export function FloatingContactBar() {
  const { open } = useAdelinChat();

  if (open) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border-subtle bg-plum/90 safe-bottom md:hidden">
      <div className="flex">
        <a
          href={VK_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-11 flex-1 items-center justify-center gap-2 py-3.5 text-sm font-medium text-white-text"
          onClick={() => trackEvent("vk_profile_click", { source: "mobile_bar" })}
        >
          <MessageCircle className="h-5 w-5 text-gold" />
          Написать
        </a>
        <Link
          href="/#contact"
          className="flex min-h-11 flex-1 items-center justify-center gap-2 border-l border-border-subtle py-3.5 text-sm font-medium text-gold"
        >
          <FileText className="h-5 w-5" />
          Заявка
        </Link>
      </div>
    </div>
  );
}
