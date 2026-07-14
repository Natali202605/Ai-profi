import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  getProjectBySlug,
  getAdjacentProjects,
  portfolioProjects,
  type PortfolioProject,
} from "@/data/portfolio";
import { getPublishedPortfolioProjects } from "@/lib/portfolio-store";
import { ImageLightbox } from "@/components/ui/ImageLightbox";
import { VideoPreview } from "@/components/ui/VideoPreview";
import { RevealAnimation } from "@/components/ui/RevealAnimation";

type Props = { params: Promise<{ slug: string }> };

async function loadProjects(): Promise<PortfolioProject[]> {
  try {
    const published = await getPublishedPortfolioProjects();
    return published.length ? published : portfolioProjects;
  } catch {
    return portfolioProjects;
  }
}

export async function generateStaticParams() {
  const projects = await loadProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const projects = await loadProjects();
  const project = getProjectBySlug(slug, projects);
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

function CaseBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="heading-display mb-3 text-2xl text-white-text">{title}</h2>
      <div className="leading-relaxed text-text-secondary">{children}</div>
    </div>
  );
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const projects = await loadProjects();
  const project = getProjectBySlug(slug, projects);
  if (!project) notFound();

  const { prev, next } = getAdjacentProjects(slug, projects);
  const clientLabel = project.confidential ? "Конфиденциальный клиент" : project.client;

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
            {project.taskType ? ` · ${project.taskType}` : ""}
          </span>
          <h1 className="heading-display mt-2 mb-4 text-4xl text-white-text md:text-5xl">
            {project.title}
          </h1>
          <p className="max-w-3xl text-lg text-text-secondary">{project.shortDescription}</p>
        </RevealAnimation>

        <RevealAnimation delay={0.1} className="mt-8">
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
          <div className="space-y-10 lg:col-span-2">
            {clientLabel && (
              <RevealAnimation>
                <CaseBlock title="О клиенте / направлении">{clientLabel}</CaseBlock>
              </RevealAnimation>
            )}

            <RevealAnimation>
              <CaseBlock title="Задача">{project.task}</CaseBlock>
            </RevealAnimation>

            {project.problem && (
              <RevealAnimation>
                <CaseBlock title="Проблема">{project.problem}</CaseBlock>
              </RevealAnimation>
            )}

            {project.clientWishes && (
              <RevealAnimation>
                <CaseBlock title="Пожелания клиента">{project.clientWishes}</CaseBlock>
              </RevealAnimation>
            )}

            {project.references && (
              <RevealAnimation>
                <CaseBlock title="Референсы и ограничения">{project.references}</CaseBlock>
              </RevealAnimation>
            )}

            <RevealAnimation>
              <CaseBlock title="Концепция / решение">
                {project.concept || project.solution}
              </CaseBlock>
            </RevealAnimation>

            {(project.artDirection || project.artRefinement) && (
              <RevealAnimation>
                <CaseBlock title="Художественная доработка">
                  {project.artRefinement || project.artDirection}
                </CaseBlock>
              </RevealAnimation>
            )}

            {project.stages && project.stages.length > 0 && (
              <RevealAnimation>
                <CaseBlock title="Этапы работы">
                  <ol className="list-decimal space-y-2 pl-5">
                    {project.stages.map((stage) => (
                      <li key={stage}>{stage}</li>
                    ))}
                  </ol>
                </CaseBlock>
              </RevealAnimation>
            )}

            {project.tools && project.tools.length > 0 && (
              <RevealAnimation>
                <CaseBlock title="AI-инструменты и технологии">
                  <ul className="flex flex-wrap gap-2">
                    {project.tools.map((tool) => (
                      <li
                        key={tool}
                        className="rounded-full border border-border-subtle bg-card-bg px-3 py-1 text-sm"
                      >
                        {tool}
                      </li>
                    ))}
                  </ul>
                </CaseBlock>
              </RevealAnimation>
            )}

            {project.beforeAfter && project.beforeAfter.length > 0 && (
              <RevealAnimation>
                <CaseBlock title="До / после">
                  <div className="grid gap-4 sm:grid-cols-2">
                    {project.beforeAfter.map((pair) => (
                      <div key={pair.before + pair.after} className="space-y-2">
                        {pair.label && (
                          <p className="text-sm font-medium text-gold">{pair.label}</p>
                        )}
                        <div className="grid grid-cols-2 gap-2">
                          <div className="relative aspect-square overflow-hidden rounded-xl">
                            <Image src={pair.before} alt="До" fill className="object-cover" />
                            <span className="absolute bottom-2 left-2 rounded bg-black/60 px-2 py-0.5 text-xs">
                              До
                            </span>
                          </div>
                          <div className="relative aspect-square overflow-hidden rounded-xl">
                            <Image src={pair.after} alt="После" fill className="object-cover" />
                            <span className="absolute bottom-2 left-2 rounded bg-black/60 px-2 py-0.5 text-xs">
                              После
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CaseBlock>
              </RevealAnimation>
            )}

            {project.result && (
              <RevealAnimation>
                <CaseBlock title="Итоговый результат">{project.result}</CaseBlock>
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
                {clientLabel && (
                  <p className="mb-2 text-sm text-text-secondary">
                    <span className="text-gold">Клиент:</span> {clientLabel}
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
                  <p className="text-sm font-medium text-white-text">{project.testimonial.name}</p>
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
