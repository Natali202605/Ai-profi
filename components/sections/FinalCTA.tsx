"use client";

import Link from "next/link";
import { RevealAnimation } from "@/components/ui/RevealAnimation";
import { VKButton } from "@/components/ui/VKButton";
import { useAdelinChat } from "@/components/chatbot/AdelinChatContext";
import { trackEvent } from "@/lib/analytics";

export function FinalCTA() {
  const { openChat } = useAdelinChat();

  return (
    <section className="border-t border-border-subtle py-16 md:py-28">
      <div className="container-site text-center">
        <RevealAnimation>
          <div className="glass-panel-soft mx-auto max-w-3xl rounded-3xl p-6 sm:p-10 md:p-14">
            <h2 className="heading-display section-title-accent mb-4 text-balance text-3xl sm:text-4xl md:text-5xl">
              Расскажите о задаче — я помогу превратить её в цельный визуальный проект
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-text-secondary">
              Даже если у вас пока нет готового технического задания, опишите идею, цель и желаемый
              результат. Я помогу определить подходящий формат и следующие этапы.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/#contact"
                className="btn-primary"
                onClick={() => trackEvent("final_cta_click", { action: "discuss" })}
              >
                Обсудить проект
              </Link>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => {
                  trackEvent("final_cta_click", { action: "adelin" });
                  openChat();
                }}
              >
                Подобрать услугу с Аделин
              </button>
              <VKButton className="btn-secondary" />
            </div>
          </div>
        </RevealAnimation>
      </div>
    </section>
  );
}
