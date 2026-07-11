"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { trackEvent, getUtmParams } from "@/lib/analytics";
import { VK_PROFILE_URL } from "@/lib/utils";
import { useAdelinChat } from "@/components/chatbot/AdelinChatContext";

const BOT_NAME = "Аделин";

type Message = {
  role: "bot" | "user";
  text: string;
  buttons?: string[];
};

const initialButtons = [
  "Видео",
  "Изображения",
  "Сайт",
  "Оформление ВКонтакте",
  "Продвижение сообщества",
  "Хочу комплексное решение",
  "Посмотреть портфолио",
  "Задать вопрос",
];

export function ChatWidget() {
  const { open, setOpen } = useAdelinChat();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: `Здравствуйте! Я ${BOT_NAME} — виртуальный ассистент NATALI NEERO. Помогу сориентироваться в услугах и подскажу, с чего начать. Что вы планируете создать?`,
      buttons: initialButtons,
    },
  ]);
  const [input, setInput] = useState("");
  const [step, setStep] = useState("start");
  const [leadData, setLeadData] = useState<Record<string, string>>({});
  const [consent, setConsent] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addBotMessage = (text: string, buttons?: string[]) => {
    setMessages((prev) => [...prev, { role: "bot", text, buttons }]);
  };

  const addUserMessage = (text: string) => {
    setMessages((prev) => [...prev, { role: "user", text }]);
  };

  const handleButton = (button: string) => {
    addUserMessage(button);
    trackEvent("service_select", { service: button, source: "chatbot_adelin" });

    if (button === "Посмотреть портфолио") {
      addBotMessage("Вот ссылка на портфолио:", ["Открыть портфолио"]);
      window.open("/portfolio", "_blank");
      return;
    }

    if (button === "Задать вопрос") {
      setStep("free_question");
      addBotMessage("Напишите ваш вопрос — я постараюсь помочь или передам его Натали.");
      return;
    }

    const serviceMap: Record<string, string> = {
      Видео: "AI-видео",
      Изображения: "AI-изображения",
      Сайт: "Сайт",
      "Оформление ВКонтакте": "Оформление ВКонтакте",
      "Продвижение сообщества": "Продвижение ВКонтакте",
      "Хочу комплексное решение": "Комплексная упаковка",
    };

    if (serviceMap[button]) {
      setLeadData((d) => ({ ...d, service: serviceMap[button] }));
      setStep("details");

      if (button === "Видео") {
        addBotMessage("Подскажите, для какой задачи нужно видео?", [
          "реклама",
          "презентация",
          "социальные сети",
          "творческий проект",
          "пока не знаю",
        ]);
      } else if (button === "Сайт") {
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
        "Этот вопрос лучше обсудить лично. Оставьте контакт или напишите Натали во ВКонтакте — она уточнит детали и предложит решение.",
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
    if (!consent) {
      setConsent(true);
    }

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
      <button
        onClick={() => {
          setOpen(true);
          trackEvent("chatbot_open", { bot: "adelin", source: "fab" });
        }}
        className="mobile-fab-offset fixed right-4 z-[60] flex items-center gap-2 rounded-full bg-gold text-graphite shadow-[0_4px_24px_rgba(164,148,255,0.4)] transition-transform hover:scale-105 md:bottom-6"
        aria-label={`Открыть чат с ${BOT_NAME}`}
        title={BOT_NAME}
      >
        <span className="flex h-14 w-14 items-center justify-center">
          <MessageCircle className="h-6 w-6" />
        </span>
        <span className="hidden pr-4 text-sm font-semibold md:inline">{BOT_NAME}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-fab-offset fixed right-4 z-[60] flex h-[min(500px,calc(100dvh-10rem))] w-[360px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-border-subtle bg-plum/90 shadow-2xl backdrop-blur-xl md:bottom-24 md:h-[500px]"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
          >
            <div className="flex items-center justify-between border-b border-border-subtle bg-plum/50 px-4 py-3 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/20 font-heading text-lg text-gold">
                  А
                </div>
                <div>
                  <p className="text-sm font-semibold text-white-text">{BOT_NAME}</p>
                  <p className="text-xs text-text-secondary">виртуальный ассистент</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="flex min-h-11 min-w-11 items-center justify-center"
                aria-label="Закрыть чат"
              >
                <X className="h-5 w-5 text-text-secondary" />
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                      msg.role === "user"
                        ? "bg-gold text-graphite"
                        : "bg-card-bg text-text-secondary"
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
                              else if (btn === "Написать ВКонтакте") window.open(VK_PROFILE_URL, "_blank");
                              else if (btn === "Оставить контакт") {
                                addBotMessage("Укажите телефон или мессенджер:");
                                setStep("contact");
                              } else handleButton(btn);
                            }}
                            className="min-h-9 rounded-full border border-gold/30 bg-gold/10 px-3 py-2 text-xs text-gold transition-colors hover:bg-gold/20"
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
              <div className="border-t border-border-subtle p-3">
                <div className="flex gap-2">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder={`Сообщение для ${BOT_NAME}...`}
                    className="flex-1 rounded-xl border border-border-subtle bg-card-bg px-3 py-2 text-sm text-white-text outline-none focus:border-gold"
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
        )}
      </AnimatePresence>
    </>
  );
}
