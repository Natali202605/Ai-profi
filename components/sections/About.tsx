"use client";

import Image from "next/image";
import Link from "next/link";
import { RevealAnimation } from "@/components/ui/RevealAnimation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VKButton } from "@/components/ui/VKButton";
import { useSiteContent } from "@/components/providers/SiteContentProvider";

export function About() {
  const { about, brand } = useSiteContent();

  return (
    <section id="about" className="section-light py-16 md:py-28">
      <div className="container-site">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <RevealAnimation direction="left">
            <div className="relative mx-auto max-w-md">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                <Image
                  src={about.photo}
                  alt={about.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
              <div className="absolute -bottom-4 right-0 glass-panel p-4 sm:-right-4">
                <p className="font-heading text-3xl text-gold">{about.badgeValue}</p>
                <p className="text-xs text-text-secondary">{about.badgeLabel}</p>
              </div>
            </div>
          </RevealAnimation>

          <div className="glass-panel-soft rounded-2xl p-6 md:p-8">
            <RevealAnimation>
              <SectionHeading light title={about.title} />
            </RevealAnimation>
            <RevealAnimation delay={0.1}>
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 32)} className="mb-4 text-lg leading-relaxed text-text-secondary">
                  {paragraph}
                </p>
              ))}
              <p className="mb-6 text-lg leading-relaxed text-text-secondary">
                {about.extraParagraph.includes("ВКонтакте") ? (
                  <>
                    {about.extraParagraph.split("ВКонтакте")[0]}
                    <a
                      href={brand.vkCommunityUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link"
                    >
                      ВКонтакте
                    </a>
                    {about.extraParagraph.split("ВКонтакте").slice(1).join("ВКонтакте")}
                  </>
                ) : (
                  about.extraParagraph
                )}
              </p>
            </RevealAnimation>

            <RevealAnimation delay={0.2}>
              <p className="mb-3 font-medium text-white-text">В работе я соединяю:</p>
              <ul className="mb-8 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {about.skills.map((skill) => (
                  <li key={skill} className="flex items-center gap-2 text-sm text-text-secondary">
                    <span className="h-1.5 w-1.5 rounded-full bg-berry" />
                    {skill}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-4">
                <Link href="/portfolio" className="btn-secondary-light">
                  Посмотреть работы
                </Link>
                <VKButton className="btn-secondary-light !border-0 !bg-transparent !p-0" />
                <Link href="/#contact" className="btn-primary">
                  Обсудить проект
                </Link>
              </div>
            </RevealAnimation>
          </div>
        </div>
      </div>
    </section>
  );
}
