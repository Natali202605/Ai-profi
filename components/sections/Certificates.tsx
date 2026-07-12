"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { certificates } from "@/data/content";
import { RevealAnimation } from "@/components/ui/RevealAnimation";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Certificates() {
  const [activeCert, setActiveCert] = useState<(typeof certificates)[0] | null>(null);

  return (
    <section id="certificates" className="py-16 md:py-24">
      <div className="container-site">
        <RevealAnimation>
          <SectionHeading
            title="Профессиональное развитие"
            subtitle="Обучение по AI-инструментам, созданию видео, разработке сайтов и другим направлениям."
            align="center"
          />
        </RevealAnimation>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {certificates.map((cert, i) => (
            <RevealAnimation key={cert.id} delay={i * 0.08}>
              <button
                type="button"
                onClick={() => setActiveCert(cert)}
                className="card-glass group w-full overflow-hidden text-left transition-all hover:border-gold/30"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
                <div className="p-4">
                  <p className="mb-1 text-sm font-medium text-white-text">{cert.title}</p>
                  <p className="text-xs text-text-secondary">
                    {cert.organization} · {cert.year}
                  </p>
                </div>
              </button>
            </RevealAnimation>
          ))}
        </div>

        {activeCert && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-plum/90 p-4 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-label={activeCert.title}
          >
            <button
              type="button"
              onClick={() => setActiveCert(null)}
              className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
              aria-label="Закрыть"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="relative h-[70vh] w-full max-w-3xl">
              <Image
                src={activeCert.image}
                alt={activeCert.title}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
