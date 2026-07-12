import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  portfolioProjects,
  getProjectBySlug,
  getAdjacentProjects,
} from "@/data/portfolio";
import { ImageLightbox } from "@/components/ui/ImageLightbox";
import { VideoPreview } from "@/components/ui/VideoPreview";
import { RevealAnimation } from "@/components/ui/RevealAnimation";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return portfolioProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Проект не найден" };
  return {
    title: project.title,
    description: project.shortDescription,
    openGraph: {
      title: project.title,
      description: project.shortDescription,
      images: [{ url: project.cover }],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const { prev, next } = getAdjacentProjects(slug);

  const creativeWorkSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.shortDescription,
    image: project.cover,
    creator: { "@type": "Person", name: "Натали Смирнова" },
  };

  return (
    <article className="pt-24 pb-20 md:pt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkSchema) }}
      />
      <div className="container-site">
        <Link
          href="/portfolio"
          className="mb-8 inline-flex items-center gap-2 text-sm text-gold transition-colors hover:text-peach"
        >
          <ArrowLeft className="h-4 w-4" />
          Все проекты
        </Link>

        <RevealAnimation>
          <span className="text-xs font-medium uppercase tracking-wider text-gold">
            {project.categoryLabel}
          </span>
          <h1 className="heading-display mt-2 mb-6 text-4xl text-white-text md:text-5xl">
            {project.title}
          </h1>
        </RevealAnimation>

        <RevealAnimation delay={0.1}>
          {project.videoUrl ? (
            <VideoPreview
              videoUrl={project.videoUrl}
              poster={project.cover}
              title={project.title}
            />
          ) : (
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
              <Image
                src={project.cover}
                alt={project.title}
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
            </div>
          )}
        </RevealAnimation>

        <div className="mt-12 grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-10">
            <RevealAnimation>
              <div>
                <h2 className="heading-display mb-3 text-2xl text-white-text">Задача</h2>
                <p className="leading-relaxed text-text-secondary">{project.task}</p>
              </div>
            </RevealAnimation>

            <RevealAnimation delay={0.1}>
              <div>
                <h2 className="heading-display mb-3 text-2xl text-white-text">Решение</h2>
                <p className="leading-relaxed text-text-secondary">{project.solution}</p>
              </div>
            </RevealAnimation>

            {project.artDirection && (
              <RevealAnimation delay={0.15}>
                <div>
                  <h2 className="heading-display mb-3 text-2xl text-white-text">
                    Художественная идея
                  </h2>
                  <p className="leading-relaxed text-text-secondary">{project.artDirection}</p>
                </div>
              </RevealAnimation>
            )}

            <RevealAnimation delay={0.2}>
              <div>
                <h2 className="heading-display mb-6 text-2xl text-white-text">Галерея</h2>
                <ImageLightbox images={project.images} alt={project.title} />
              </div>
            </RevealAnimation>
          </div>

          <aside className="space-y-6">
            <RevealAnimation>
              <div className="card-glass p-6">
                <h3 className="mb-4 font-semibold text-white-text">О проекте</h3>
                {project.client && (
                  <p className="mb-2 text-sm text-text-secondary">
                    <span className="text-gold">Клиент:</span> {project.client}
                  </p>
                )}
                {project.year && (
                  <p className="mb-4 text-sm text-text-secondary">
                    <span className="text-gold">Год:</span> {project.year}
                  </p>
                )}
                <p className="mb-2 text-sm font-medium text-white-text">Состав работ:</p>
                <ul className="space-y-1">
                  {project.services.map((s) => (
                    <li key={s} className="text-sm text-text-secondary">
                      • {s}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealAnimation>

            {project.testimonial && (
              <RevealAnimation delay={0.1}>
                <div className="card-glass p-6">
                  <p className="mb-3 text-sm italic text-text-secondary">
                    «{project.testimonial.text}»
                  </p>
                  <p className="text-sm font-medium text-white-text">
                    {project.testimonial.name}
                  </p>
                  {project.testimonial.role && (
                    <p className="text-xs text-text-secondary">{project.testimonial.role}</p>
                  )}
                </div>
              </RevealAnimation>
            )}

            <Link href="/#contact" className="btn-primary w-full text-center">
              Обсудить похожий проект
            </Link>
          </aside>
        </div>

        <nav className="mt-16 flex flex-col gap-4 border-t border-border-subtle pt-8 sm:flex-row sm:items-center sm:justify-between">
          {prev ? (
            <Link
              href={`/portfolio/${prev.slug}`}
              className="flex min-h-11 max-w-full items-center gap-2 text-sm text-gold hover:text-peach sm:max-w-[45%]"
            >
              <ArrowLeft className="h-4 w-4 shrink-0" />
              <span className="truncate">{prev.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link
              href={`/portfolio/${next.slug}`}
              className="flex min-h-11 max-w-full items-center justify-end gap-2 text-sm text-gold hover:text-peach sm:max-w-[45%] sm:text-right"
            >
              <span className="truncate">{next.title}</span>
              <ArrowRight className="h-4 w-4 shrink-0" />
            </Link>
          )}
        </nav>
      </div>
    </article>
  );
}
