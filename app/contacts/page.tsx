import type { Metadata } from "next";
import Link from "next/link";
import { VK_PROFILE_URL, VK_COMMUNITY_URL } from "@/lib/utils";
import { ContactForm } from "@/components/forms/ContactForm";
import { RevealAnimation } from "@/components/ui/RevealAnimation";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Контакты",
  description: "Свяжитесь с NATALI NEERO для обсуждения вашего визуального проекта.",
};

export default function ContactsPage() {
  return (
    <>
      <section className="pt-24 pb-12 md:pt-32">
        <div className="container-site max-w-3xl text-center">
          <RevealAnimation>
            <SectionHeading
              title="Давайте обсудим вашу идею"
              subtitle="Даже если задача пока сформулирована не полностью, можно начать с короткого сообщения. Я помогу определить подходящий формат и расскажу, с чего лучше начать."
              align="center"
            />
          </RevealAnimation>

          <RevealAnimation delay={0.1}>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={VK_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Написать лично
              </a>
              <a
                href={VK_COMMUNITY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                Перейти в сообщество
              </a>
              <Link href="/#contact" className="btn-secondary">
                Оставить заявку
              </Link>
            </div>
          </RevealAnimation>

          <RevealAnimation delay={0.2}>
            <div className="mt-12 card-glass p-6 text-left">
              <p className="mb-2 text-sm text-text-secondary">
                <span className="text-gold">ВКонтакте (личная):</span>{" "}
                <a href={VK_PROFILE_URL} className="text-link" target="_blank" rel="noopener noreferrer">
                  {VK_PROFILE_URL}
                </a>
              </p>
              <p className="mb-2 text-sm text-text-secondary">
                <span className="text-gold">Сообщество:</span>{" "}
                <a href={VK_COMMUNITY_URL} className="text-link" target="_blank" rel="noopener noreferrer">
                  {VK_COMMUNITY_URL}
                </a>
              </p>
              <p className="text-sm text-text-secondary">
                <span className="text-gold">Email:</span> [Добавить после подтверждения]
              </p>
            </div>
          </RevealAnimation>
        </div>
      </section>
      <ContactForm />
    </>
  );
}
