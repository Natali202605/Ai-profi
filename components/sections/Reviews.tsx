"use client";

import { RevealAnimation } from "@/components/ui/RevealAnimation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { useSiteContent } from "@/components/providers/SiteContentProvider";

export function Reviews() {
  const { reviews, brand } = useSiteContent();
  const visibleReviews = reviews.items.filter((review) => review.visible);

  if (visibleReviews.length === 0) {
    return (
      <section id="reviews" className="py-16 md:py-28">
        <div className="container-site text-center">
          <RevealAnimation>
            <SectionHeading title={reviews.title} subtitle={reviews.subtitle} align="center" />
          </RevealAnimation>
          <RevealAnimation delay={0.2}>
            <div className="card-glass mx-auto max-w-lg p-8">
              <p className="text-text-secondary">
                Отзывы появятся здесь после добавления в админ-панели.
              </p>
            </div>
          </RevealAnimation>
        </div>
      </section>
    );
  }

  return (
    <section id="reviews" className="py-16 md:py-28">
      <div className="container-site">
        <RevealAnimation>
          <SectionHeading title={reviews.title} subtitle={reviews.subtitle} align="center" />
        </RevealAnimation>
        <div className="grid gap-6 lg:grid-cols-3">
          {visibleReviews.map((review, i) => (
            <TestimonialCard key={review.id} review={review} featured={i === 0} />
          ))}
        </div>
        <RevealAnimation delay={0.2}>
          <p className="mt-8 text-center text-sm text-text-secondary">
            Больше отзывов — в обсуждении{" "}
            <a
              href={brand.vkReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              ВКонтакте
            </a>
            .
          </p>
        </RevealAnimation>
      </div>
    </section>
  );
}
