"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import type { CertificateRecord } from "@/lib/certificates-store";
import { RevealAnimation } from "@/components/ui/RevealAnimation";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function CertificatesGrid({ certificates }: { certificates: CertificateRecord[] }) {
  const [activeCert, setActiveCert] = useState<CertificateRecord | null>(null);

  if (certificates.length === 0) return null;

  return (
    <section id="certificates" className="py-16 md:py-24">
      <div className="container-site">
        <RevealAnimation>
          <SectionHeading
            title="Образование и профессиональное развитие"
            titleAccent="профессиональное развитие"
            subtitle="Постоянное обучение помогает сочетать художественный опыт, современные AI-инструменты и актуальные технологии создания цифрового контента."
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
                  <p className="text-xs text-body-secondary">
                    {cert.organization} · {cert.year}
                  </p>
                  {cert.direction ? (
                    <p className="mt-2 line-clamp-2 text-xs text-caption-strong">{cert.direction}</p>
                  ) : null}
                </div>
              </button>
            </RevealAnimation>
          ))}
        </div>

        {activeCert && (
          <div
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-plum/90 p-4 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-label={activeCert.title}
          >
            <button
              type="button"
              onClick={() => setActiveCert(null)}
              className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
              aria-label="Закрыть"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="relative h-[60vh] w-full max-w-3xl">
              <Image
                src={activeCert.image}
                alt={activeCert.title}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
            <div className="mt-4 max-w-3xl text-center">
              <p className="font-heading text-xl text-white-text">{activeCert.title}</p>
              <p className="mt-1 text-sm text-body-secondary">
                {activeCert.organization} · {activeCert.year}
              </p>
              {activeCert.direction ? (
                <p className="mt-2 text-sm text-caption-strong">{activeCert.direction}</p>
              ) : null}
              {activeCert.description ? (
                <p className="mt-2 text-sm text-body-secondary">{activeCert.description}</p>
              ) : null}
              {activeCert.verify_url ? (
                <a
                  href={activeCert.verify_url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-block text-sm text-gold hover:underline"
                >
                  Подтверждение →
                </a>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
