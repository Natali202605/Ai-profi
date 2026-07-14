"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { trackEvent, getUtmParams } from "@/lib/analytics";
import { VK_PROFILE_URL } from "@/lib/utils";
import { useAdelinChat } from "@/components/chatbot/AdelinChatContext";

type Message = {
  role: "bot" | "user";
  text: string;
  buttons?: string[];
};

const initialButtons = [
  "Мне нужно видео",
  "Нужны изображения",
  "Хочу сайт",
  "Нужен чат-бот",
  "Оформить ВКонтакте",
  "Нужна упаковка под ключ",
  "Посмотреть портфолио",
  "Не знаю, что выбрать",
];

const BOT_NAME = "Аделин";

export function ChatWidget() {
  const { open, setOpen } = useAdelinChat();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "Здравствуйте! Я Аделин, виртуальный ассистент Натали Смирновой. Помогу подобрать услугу, сориентироваться по этапам работы и подготовить заявку.",
      buttons: [
        "Подобрать услугу",
        "Посмотреть портфолио",
        "Узнать, как проходит работа",
        "Обсудить стоимость",
        "Подготовить заявку",
        "Связаться с Натали",
      ],
    },
  ]);
  const [input, setInput] = useState("");
  const [step, setStep] = useState("start");
  const [leadData, setLeadData] = useState<Record<string, string>>({});
  const bottomRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, open]);

  useEffect(() => {
    if (!open) return;

    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    window.setTimeout(() => inputRef.current?.focus(), 50);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      window.scrollTo(0, scrollY);
    };
  }, [open, setOpen]);

  const addBotMessage = (text: string, buttons?: string[]) => {
    setMessages((prev) => [...prev, { role: "bot", text, buttons }]);
  };

  const addUserMessage = (text: string) => {
    setMessages((prev) => [...prev, { role: "user", text }]);
  };

  const handleButton = (button: string) => {
    addUserMessage(button);
    trackEvent("service_select", { service: button, source: "chatbot_adelin" });
    if (step === "start") {
      trackEvent("adelin_flow_start", { service: button });
    }

    if (button === "Подобрать услугу" || button === "Подготовить заявку") {
      addBotMessage("Что необходимо создать?", initialButtons.filter((b) => !b.includes("портфолио") && b !== "Не знаю, что выбрать").concat(["Не знаю, что выбрать"]));
      setStep("start");
      return;
    }

    if (button === "Узнать, как проходит работа") {
      addBotMessage(
        "Работа идёт по этапам: заявка → обсуждение → предложение → ТЗ → договор → оплата → концепция → согласование → передача. Точные сроки и стоимость фиксирую после обсуждения задачи — без исходных данных обещать цифры нельзя.",
        ["Подобрать услугу", "Подготовить заявку", "Связаться с Натали"],
      );
      return;
    }

    if (button === "Обсудить стоимость") {
      addBotMessage(
        "Стоимость зависит от формата, объёма, сложности и сроков. Я помогу собрать бриф и передать заявку Натали — точную цену без данных о задаче назвать нельзя.",
        ["Подготовить заявку", "Связаться с Натали"],
      );
      return;
    }

    if (button === "Связаться с Натали") {
      addBotMessage("Можно оставить контакт здесь или написать напрямую во ВКонтакте.", [
        "Оставить контакт",
        "Написать ВКонтакте",
      ]);
      return;
    }

    if (button === "Не знаю, что выбрать") {
      addBotMessage("Расскажите своими словами, что хотите получить — я помогу определить формат.");
      setStep("free_question");
      return;
    }

    if (button === "Посмотреть портфолио") {
      addBotMessage("Открываю портфолио — там можно посмотреть кейсы по направлениям.", ["Открыть портфолио"]);
      window.open("/portfolio", "_blank");
      return;
    }

    if (button === "Задать вопрос") {
      setStep("free_question");
      addBotMessage("Напишите ваш вопрос — я постараюсь помочь или передам его Натали.");
      return;
    }

    const serviceMap: Record<string, string> = {
      "Мне нужно видео": "AI-видео",
      "Нужны изображения": "AI-изображения",
      "Хочу сайт": "Сайт",
      "Нужен чат-бот": "Чат-бот",
      "Оформить ВКонтакте": "Оформление ВКонтакте",
      "Нужна упаковка под ключ": "Комплексная упаковка",
    };

    if (serviceMap[button]) {
      setLeadData((d) => ({ ...d, service: serviceMap[button] }));
      setStep("details");

      if (button === "Мне нужно видео") {
        addBotMessage("Подскажите, для какой задачи нужно видео?", [
          "реклама",
          "презентация",
          "социальные сети",
          "творческий проект",
          "пока не знаю",
        ]);
      } else if (button === "Хочу сайт") {
        addBotMessage("Какой сайт вам необходим?", [
          "лендинг",
          "сайт-портфолио",
          "сайт эксперта",
          "многостраничный сайт",
          "ещё не определился",
        ]);
      } else {
        addBotMessage("Расскажите кратко о вашей задаче.");
        setStep("contact");
      }
      return;
    }

    if (step === "details") {
      setLeadData((d) => ({ ...d, details: button }));
      addBotMessage("Как с вами связаться? Укажите телефон или мессенджер.");
      setStep("contact");
      return;
    }

    if (button === "Открыть портфолио") {
      window.open("/portfolio", "_blank");
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const text = input.trim();
    setInput("");
    addUserMessage(text);

    if (step === "free_question") {
      addBotMessage(
        "Этот вопрос лучше уточнить лично у Натали. Оставьте контакт или перейдите в сообщения ВКонтакте.",
        ["Оставить контакт", "Написать ВКонтакте"],
      );
      setStep("contact");
      return;
    }

    if (step === "contact") {
      setLeadData((d) => ({ ...d, contact: text }));
      addBotMessage("Как вас зовут?");
      setStep("name");
      return;
    }

    if (step === "name") {
      setLeadData((d) => ({ ...d, name: text }));
      addBotMessage(
        "Спасибо! Для отправки заявки необходимо согласие на обработку персональных данных. Нажмите «Согласен и отправить».",
        ["Согласен и отправить"],
      );
      setStep("consent");
      return;
    }
  };

  const submitLead = async () => {
    const summary = Object.entries(leadData)
      .map(([k, v]) => `${k}: ${v}`)
      .join("; ");

    try {
      await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: leadData.name || "Не указано",
          contact: leadData.contact || "Не указано",
          service: leadData.service || "Не указано",
          summary,
          consent: true,
          source: "chatbot_adelin",
          ...getUtmParams(),
        }),
      });

      trackEvent("chatbot_lead");
      trackEvent("adelin_flow_complete", { service: leadData.service || "unknown" });
      addBotMessage(
        "Заявка отправлена! Натали свяжется с вами. Также можно написать напрямую во ВКонтакте.",
        ["Написать ВКонтакте"],
      );
      setStep("done");
    } catch {
      addBotMessage("Не удалось отправить заявку. Попробуйте написать напрямую во ВКонтакте.");
    }
  };

  return (
    <>
      {!open ? (
      <button
        onClick={() => {
          setOpen(true);
          trackEvent("adelin_open", { source: "fab" });
          trackEvent("chatbot_open", { bot: "adelin", source: "fab" });
        }}
        className="mobile-fab-offset fixed right-4 z-[60] flex items-center gap-2 rounded-full bg-gold text-graphite shadow-[0_4px_24px_rgba(164,148,255,0.4)] transition-transform hover:scale-105 md:bottom-6"
        aria-label={`Открыть чат с ${BOT_NAME}`}
        title={BOT_NAME}
      >
        <span className="flex h-14 w-14 items-center justify-center">
          <Sparkles className="h-6 w-6" />
        </span>
        <span className="hidden pr-4 text-sm font-semibold md:inline">{BOT_NAME}</span>
      </button>
      ) : null}

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              className="adelin-overlay fixed inset-0 z-[9998] cursor-default border-0 bg-[rgba(12,10,28,0.88)] backdrop-blur-[16px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              aria-label="Закрыть чат"
              onClick={() => setOpen(false)}
            />
            <motion.div
              ref={dialogRef}
              className="adelin-dialog fixed z-[9999] flex flex-col overflow-hidden rounded-none border border-border-subtle bg-[rgba(244,240,255,0.99)] shadow-[0_32px_90px_rgba(26,18,70,0.45)] inset-0 md:inset-auto md:bottom-6 md:right-6 md:h-[min(86vh,720px)] md:w-[min(480px,calc(100vw-3rem))] md:rounded-2xl"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              role="dialog"
              aria-modal="true"
              aria-label="Чат с Аделин"
            >
            <div className="flex items-center justify-between border-b border-border-subtle bg-white/70 px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/25 font-heading text-lg text-gold">
                  А
                </div>
                <div>
                  <p className="text-sm font-semibold text-graphite">{BOT_NAME}</p>
                  <p className="text-xs text-graphite/70">AI-ассистент Натали · Помогу подобрать решение</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="flex min-h-11 min-w-11 items-center justify-center rounded-full text-graphite/70 transition-colors hover:bg-graphite/5"
                aria-label="Закрыть чат"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto bg-[rgba(244,240,255,0.98)] p-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                      msg.role === "user"
                        ? "bg-gold text-graphite"
                        : "border border-border-subtle bg-white text-graphite shadow-sm"
                    }`}
                  >
                    {msg.role === "bot" ? (
                      <span className="mb-1 block text-xs font-medium text-gold">{BOT_NAME}</span>
                    ) : null}
                    {msg.text}
                    {msg.buttons && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {msg.buttons.map((btn) => (
                          <button
                            key={btn}
                            onClick={() => {
                              if (btn === "Согласен и отправить") submitLead();
                              else if (btn === "Написать ВКонтакте") {
                                trackEvent("vk_click", { source: "chatbot" });
                                window.open(VK_PROFILE_URL, "_blank");
                              } else if (btn === "Оставить контакт") {
                                addBotMessage("Укажите телефон или мессенджер:");
                                setStep("contact");
                              } else handleButton(btn);
                            }}
                            className="min-h-9 rounded-full border border-gold/30 bg-gold/10 px-3 py-2 text-xs text-graphite transition-colors hover:bg-gold/20"
                          >
                            {btn}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {step !== "done" && (
              <div className="border-t border-border-subtle bg-white/80 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Сообщение для Аделин..."
                    className="flex-1 rounded-xl border border-border-subtle bg-white px-3 py-2 text-sm text-graphite outline-none focus:border-gold"
                  />
                  <button
                    onClick={handleSend}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold text-graphite"
                    aria-label="Отправить"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
