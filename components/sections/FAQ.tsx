"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { RevealAnimation } from "@/components/ui/RevealAnimation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useSiteContent } from "@/components/providers/SiteContentProvider";
import { cn } from "@/lib/utils";

export function FAQ() {
  const { faq } = useSiteContent();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const visibleItems = faq.items.filter((item) => item.visible);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: visibleItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <section id="faq" className="py-16 md:py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="container-site max-w-3xl">
        <RevealAnimation>
          <SectionHeading title={faq.title} align="center" />
        </RevealAnimation>

        <div className="space-y-3">
          {visibleItems.map((item, i) => (
            <RevealAnimation key={item.id} delay={i * 0.05}>
              <div className="card-glass overflow-hidden">
                <button
                  className="flex min-h-11 w-full items-center justify-between gap-4 p-5 text-left md:p-6"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  aria-expanded={openIndex === i}
                >
                  <span className="break-words font-medium text-white-text">{item.question}</span>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 shrink-0 text-gold transition-transform",
                      openIndex === i && "rotate-180",
                    )}
                  />
                </button>
                {openIndex === i && (
                  <div className="border-t border-border-subtle px-5 pb-5 md:px-6 md:pb-6">
                    <p className="break-words pt-4 text-sm leading-relaxed text-text-secondary">
                      {item.answer}
                    </p>
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
