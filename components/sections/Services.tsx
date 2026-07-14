"use client";

import {
  Video,
  Image as ImageIcon,
  Globe,
  Users,
  TrendingUp,
  Layers,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { services as serviceMeta } from "@/data/services";
import { RevealAnimation } from "@/components/ui/RevealAnimation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useSiteContent } from "@/components/providers/SiteContentProvider";
import { trackEvent } from "@/lib/analytics";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  video: Video,
  image: ImageIcon,
  globe: Globe,
  users: Users,
  "trending-up": TrendingUp,
  layers: Layers,
  bot: MessageCircle,
};

export function Services() {
  const { services } = useSiteContent();

  return (
    <section id="services" className="py-16 md:py-28">
      <div className="container-site">
        <RevealAnimation>
          <SectionHeading
            label="Услуги"
            title={services.sectionTitle}
            titleAccent={services.sectionTitleHighlight}
            subtitle={services.sectionSubtitle}
          />
        </RevealAnimation>

        <div className="grid items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.items.map((service, i) => {
            const meta = serviceMeta.find((item) => item.id === service.id);
            const Icon = iconMap[meta?.icon || "layers"] || Layers;
            const slug = meta?.slug || service.id;

            return (
              <RevealAnimation key={service.id} delay={i * 0.08} className="h-full">
                <article className="card-glass group flex h-full flex-col p-6 transition-all duration-500 hover:border-gold/40 hover:shadow-[0_0_40px_rgba(164,148,255,0.12)] md:p-8">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold transition-colors group-hover:bg-gold/20">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="heading-display mb-3 text-2xl text-white-text md:text-[28px]">
                    {service.title}
                  </h3>
                  <p className="mb-4 flex-1 text-base leading-relaxed text-text-secondary">
                    {service.description}
                  </p>
                  {service.includes.length > 0 && (
                    <ul className="mb-4 space-y-1.5">
                      {service.includes.slice(0, 5).map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-text-secondary/90">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                  {meta?.forWhom && meta.forWhom.length > 0 && (
                    <p className="mb-2 text-xs text-text-secondary/80">
                      <span className="text-gold">Для кого: </span>
                      {meta.forWhom.slice(0, 4).join(", ")}
                    </p>
                  )}
                  {meta?.duration && (
                    <p className="mb-4 text-xs text-text-secondary/80">
                      <span className="text-gold">Срок: </span>
                      {meta.duration}
                    </p>
                  )}
                  <div className="mt-auto flex flex-wrap items-center gap-3">
                    <Link
                      href={`/services/${slug}`}
                      className="inline-flex items-center gap-2 text-sm font-medium text-gold transition-colors hover:text-peach"
                      onClick={() => trackEvent("service_select", { service: service.id })}
                    >
                      {service.cta}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                    {meta?.portfolioCategory && (
                      <Link
                        href={`/portfolio?category=${meta.portfolioCategory}`}
                        className="text-sm text-text-secondary transition-colors hover:text-gold"
                      >
                        Смотреть кейсы
                      </Link>
                    )}
                  </div>
                </article>
              </RevealAnimation>
            );
          })}
        </div>
      </div>
    </section>
  );
}
