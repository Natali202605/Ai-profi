"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqItems } from "@/data/faq";
import { RevealAnimation } from "@/components/ui/RevealAnimation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <section id="faq" className="py-20 md:py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="container-site max-w-3xl">
        <RevealAnimation>
          <SectionHeading title="Частые вопросы" align="center" />
        </RevealAnimation>

        <div className="space-y-3">
          {faqItems.map((item, i) => (
            <RevealAnimation key={item.question} delay={i * 0.05}>
              <div className="card-glass overflow-hidden">
                <button
                  className="flex w-full items-center justify-between gap-4 p-5 text-left md:p-6"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  aria-expanded={openIndex === i}
                >
                  <span className="font-medium text-white-text">{item.question}</span>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 shrink-0 text-gold transition-transform",
                      openIndex === i && "rotate-180"
                    )}
                  />
                </button>
                {openIndex === i && (
                  <div className="border-t border-border-subtle px-5 pb-5 md:px-6 md:pb-6">
                    <p className="pt-4 text-sm leading-relaxed text-text-secondary">{item.answer}</p>
                  </div>
                )}
              </div>
            </RevealAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}
