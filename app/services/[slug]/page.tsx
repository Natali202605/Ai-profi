import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { services, getServiceBySlug } from "@/data/services";
import { RevealAnimation } from "@/components/ui/RevealAnimation";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Услуга не найдена" };
  return {
    title: service.title,
    description: service.description,
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <div className="pt-24 pb-20 md:pt-32">
      <div className="container-site max-w-3xl">
        <RevealAnimation>
          <Link href="/services" className="mb-6 inline-block text-sm text-gold hover:text-peach">
            ← Все услуги
          </Link>
          <h1 className="heading-display mb-6 text-4xl text-white-text md:text-5xl">
            {service.title}
          </h1>
          <p className="mb-8 text-lg leading-relaxed text-text-secondary">{service.description}</p>
        </RevealAnimation>

        {service.includes && (
          <RevealAnimation delay={0.1}>
            <h2 className="heading-display mb-4 text-2xl text-white-text">Что может входить</h2>
            <ul className="mb-8 space-y-2">
              {service.includes.map((item) => (
                <li key={item} className="flex items-start gap-3 text-text-secondary">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </RevealAnimation>
        )}

        {service.formats && (
          <RevealAnimation delay={0.15}>
            <h2 className="heading-display mb-4 text-2xl text-white-text">Форматы</h2>
            <ul className="mb-8 flex flex-wrap gap-2">
              {service.formats.map((f) => (
                <li key={f} className="rounded-full border border-border-subtle px-4 py-1.5 text-sm text-text-secondary">
                  {f}
                </li>
              ))}
            </ul>
          </RevealAnimation>
        )}

        {service.forWhom && (
          <RevealAnimation delay={0.2}>
            <h2 className="heading-display mb-4 text-2xl text-white-text">Для кого</h2>
            <ul className="mb-8 flex flex-wrap gap-2">
              {service.forWhom.map((f) => (
                <li key={f} className="rounded-full bg-card-bg px-4 py-1.5 text-sm text-text-secondary">
                  {f}
                </li>
              ))}
            </ul>
          </RevealAnimation>
        )}

        {service.difference && (
          <RevealAnimation delay={0.22}>
            <h2 className="heading-display mb-4 text-2xl text-white-text">Отличие подхода</h2>
            <p className="mb-8 leading-relaxed text-text-secondary">{service.difference}</p>
          </RevealAnimation>
        )}

        {service.result && (
          <RevealAnimation delay={0.24}>
            <h2 className="heading-display mb-4 text-2xl text-white-text">Результат</h2>
            <p className="mb-8 leading-relaxed text-text-secondary">{service.result}</p>
          </RevealAnimation>
        )}

        <RevealAnimation delay={0.25}>
          <Link href="/#contact" className="btn-primary">
            {service.cta}
          </Link>
        </RevealAnimation>
      </div>
    </div>
  );
}
