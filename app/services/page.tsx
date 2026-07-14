import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/data/services";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealAnimation } from "@/components/ui/RevealAnimation";

export const metadata: Metadata = {
  title: "Услуги",
  description:
    "AI-видео, изображения, сайты, оформление и продвижение ВКонтакте. Комплексная визуальная упаковка проектов.",
};

export default function ServicesPage() {
  return (
    <div className="pt-24 pb-20 md:pt-32">
      <div className="container-site">
        <RevealAnimation>
          <SectionHeading
            label="Услуги"
            title="Чем я могу помочь"
            subtitle="Можно заказать отдельную услугу или собрать комплексное решение."
          />
        </RevealAnimation>

        <div className="grid gap-8">
          {services.map((service, i) => (
            <RevealAnimation key={service.id} delay={i * 0.08}>
              <article className="card-glass p-8 md:p-10">
                <h2 className="heading-display mb-3 text-3xl text-white-text">{service.title}</h2>
                <p className="mb-6 max-w-2xl text-text-secondary">{service.description}</p>
                {service.includes && (
                  <ul className="mb-4 grid gap-2 sm:grid-cols-2">
                    {service.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-text-secondary">
                        <span className="mt-1.5 h-1 w-1 rounded-full bg-gold" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                {service.duration && (
                  <p className="mb-2 text-sm text-text-secondary">
                    <span className="text-gold">Срок: </span>
                    {service.duration}
                  </p>
                )}
                {service.forWhom && (
                  <p className="mb-6 text-sm text-text-secondary">
                    <span className="text-gold">Для кого: </span>
                    {service.forWhom.join(", ")}
                  </p>
                )}
                <div className="flex flex-wrap gap-3">
                  <Link href={`/services/${service.slug}`} className="btn-primary">
                    {service.cta}
                  </Link>
                  {service.portfolioCategory && (
                    <Link
                      href={`/portfolio?category=${service.portfolioCategory}`}
                      className="btn-secondary"
                    >
                      Смотреть кейсы
                    </Link>
                  )}
                  <Link href="/#contact" className="btn-secondary">
                    Обсудить проект
                  </Link>
                </div>
              </article>
            </RevealAnimation>
          ))}
        </div>
      </div>
    </div>
  );
}
