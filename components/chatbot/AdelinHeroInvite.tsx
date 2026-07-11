"use client";

import { MessageCircle } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { useAdelinChat } from "@/components/chatbot/AdelinChatContext";

export function AdelinHeroInvite() {
  const { openChat } = useAdelinChat();

  return (
    <div className="glass-panel-soft mt-6 flex items-start gap-4 rounded-2xl p-4 md:p-5">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/20 font-heading text-lg text-gold">
        А
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-white-text">Аделин</p>
        <p className="mt-1 text-sm leading-relaxed text-text-secondary">
          Виртуальный ассистент NATALI NEERO. Помогу выбрать услугу и ответить на вопросы.
        </p>
        <button
          type="button"
          onClick={() => {
            openChat();
            trackEvent("chatbot_open", { bot: "adelin", source: "hero" });
          }}
          className="btn-secondary mt-3 !inline-flex !px-4 !py-2 !text-xs"
        >
          <MessageCircle className="h-4 w-4" />
          Начать диалог
        </button>
      </div>
    </div>
  );
}
