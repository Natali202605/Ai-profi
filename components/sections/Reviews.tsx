"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Review } from "@/data/content";
import { RevealAnimation } from "@/components/ui/RevealAnimation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { useSiteContent } from "@/components/providers/SiteContentProvider";

type ReviewsProps = {
  dynamicReviews?: Review[];
};

export function Reviews({ dynamicReviews = [] }: ReviewsProps) {
  const { reviews, brand } = useSiteContent();
  const staticReviews = reviews.items.filter((review) => review.visible);
  const dynamicIds = new Set(dynamicReviews.map((review) => review.id));
  const mergedReviews = [
    ...dynamicReviews,
    ...staticReviews.filter((review) => !dynamicIds.has(review.id)),
  ];
  const [activeIndex, setActiveIndex] = useState(0);

  if (mergedReviews.length === 0) return null;

  const current = mergedReviews[activeIndex];
  const featured = activeIndex === 0;

  const goPrev = () => {
    setActiveIndex((i) => (i > 0 ? i - 1 : mergedReviews.length - 1));
  };

  const goNext = () => {
    setActiveIndex((i) => (i < mergedReviews.length - 1 ? i + 1 : 0));
  };

  return (
    <section id="reviews" className="py-16 md:py-28">
      <div className="container-site">
        <RevealAnimation>
          <SectionHeading
            title={reviews.title}
            titleAccent={reviews.titleHighlight}
            subtitle={reviews.subtitle}
            align="center"
          />
        </RevealAnimation>

        <RevealAnimation delay={0.1}>
          <div className="relative mx-auto max-w-4xl">
            <div className="flex items-stretch gap-4">
              <button
                type="button"
                onClick={goPrev}
                className="hidden shrink-0 self-center rounded-full border border-border-subtle bg-card-bg/60 p-3 text-gold transition-colors hover:border-gold/40 hover:bg-gold/10 sm:flex"
                aria-label="Предыдущий отзыв"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <div className="min-w-0 flex-1">
                <TestimonialCard review={current} featured={featured} className="h-full min-h-[280px]" />
                <div className="mt-4 flex items-center justify-center gap-4 sm:hidden">
                  <button
                    type="button"
                    onClick={goPrev}
                    className="rounded-full border border-border-subtle bg-card-bg/60 p-3 text-gold"
                    aria-label="Предыдущий отзыв"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <span className="text-sm text-text-secondary">
                    {activeIndex + 1} / {mergedReviews.length}
                  </span>
                  <button
                    type="button"
                    onClick={goNext}
                    className="rounded-full border border-border-subtle bg-card-bg/60 p-3 text-gold"
                    aria-label="Следующий отзыв"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
                <p className="mt-3 hidden text-center text-sm text-text-secondary sm:block">
                  {activeIndex + 1} из {mergedReviews.length}
                </p>
              </div>

              <button
                type="button"
                onClick={goNext}
                className="hidden shrink-0 self-center rounded-full border border-border-subtle bg-card-bg/60 p-3 text-gold transition-colors hover:border-gold/40 hover:bg-gold/10 sm:flex"
                aria-label="Следующий отзыв"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 flex justify-center gap-2">
              {mergedReviews.map((review, i) => (
                <button
                  key={review.id}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === activeIndex ? "w-8 bg-gold" : "w-2 bg-border-subtle"
                  }`}
                  aria-label={`Отзыв ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </RevealAnimation>

        <RevealAnimation delay={0.2}>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/reviews/new" className="btn-primary inline-flex">
              Оставить отзыв на сайте
            </Link>
            <a
              href={brand.vkReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary inline-flex"
            >
              Смотреть отзывы ВКонтакте
            </a>
          </div>
        </RevealAnimation>
      </div>
    </section>
  );
}
