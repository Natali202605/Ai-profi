"use client";

import { trackEvent } from "@/lib/analytics";
import { useAdelinChat } from "@/components/chatbot/AdelinChatContext";

export function AdelinHeroInvite() {
  const { openChat } = useAdelinChat();

  return (
    <div className="glass-panel rounded-2xl p-4 md:p-5">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold/20 font-heading text-xl text-gold">
          А
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-heading text-lg text-white-text">Аделин</p>
          <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">
            Виртуальный ассистент Натали. Помогу выбрать услугу, посмотреть работы или оставить
            заявку.
          </p>
          <button
            type="button"
            onClick={() => {
              openChat();
              trackEvent("chatbot_open", { bot: "adelin", source: "hero" });
            }}
            className="btn-primary mt-4 w-full sm:w-auto"
          >
            Начать диалог
          </button>
        </div>
      </div>
    </div>
  );
}
