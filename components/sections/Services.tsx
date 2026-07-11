import {
  Video,
  Image as ImageIcon,
  Globe,
  Users,
  TrendingUp,
  Layers,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { services } from "@/data/services";
import { RevealAnimation } from "@/components/ui/RevealAnimation";
import { SectionHeading } from "@/components/ui/SectionHeading";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  video: Video,
  image: ImageIcon,
  globe: Globe,
  users: Users,
  "trending-up": TrendingUp,
  layers: Layers,
};

export function Services() {
  return (
    <section id="services" className="py-20 md:py-28">
      <div className="container-site">
        <RevealAnimation>
          <SectionHeading
            label="Услуги"
            title="Чем я могу помочь"
            subtitle="Можно заказать отдельную услугу или собрать комплексное решение для вашего проекта."
          />
        </RevealAnimation>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] || Layers;
            return (
              <RevealAnimation key={service.id} delay={i * 0.08}>
                <article className="card-glass group flex h-full flex-col p-6 transition-all duration-500 hover:border-gold/30 hover:shadow-[0_0_40px_rgba(213,168,93,0.08)] md:p-8">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold transition-colors group-hover:bg-gold/20">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="heading-display mb-3 text-2xl text-white-text md:text-[28px]">
                    {service.title}
                  </h3>
                  <p className="mb-4 flex-1 text-text-secondary leading-relaxed">
                    {service.description}
                  </p>
                  {service.includes && (
                    <ul className="mb-6 space-y-1">
                      {service.includes.slice(0, 4).map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-text-secondary/80">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold" />
                          {item}
                        </li>
                      ))}
                      {service.includes.length > 4 && (
                        <li className="text-sm text-gold/70">
                          и ещё {service.includes.length - 4}...
                        </li>
                      )}
                    </ul>
                  )}
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-gold transition-colors hover:text-peach"
                  >
                    {service.cta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </article>
              </RevealAnimation>
            );
          })}
        </div>
      </div>
    </section>
  );
}
