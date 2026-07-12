"use client";

import { RevealAnimation } from "@/components/ui/RevealAnimation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { useSiteContent } from "@/components/providers/SiteContentProvider";

export function Reviews() {
  const { reviews, brand } = useSiteContent();
  const visibleReviews = reviews.items.filter((review) => review.visible);

  return (
    <section id="reviews" className="py-16 md:py-28">
      <div className="container-site">
        <RevealAnimation>
          <SectionHeading title={reviews.title} subtitle={reviews.subtitle} align="center" />
        </RevealAnimation>
        <div className="grid items-stretch gap-6 lg:grid-cols-3">
          {visibleReviews.map((review, i) => (
            <RevealAnimation
              key={review.id}
              delay={i * 0.08}
              className={i === 0 ? "h-full lg:col-span-2 lg:row-span-2" : "h-full"}
            >
              <TestimonialCard review={review} featured={i === 0} className="h-full" />
            </RevealAnimation>
          ))}
        </div>
        <RevealAnimation delay={0.2}>
          <div className="mt-10 text-center">
            <a
              href={brand.vkReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary inline-flex"
            >
              Смотреть больше отзывов ВКонтакте
            </a>
          </div>
        </RevealAnimation>
      </div>
    </section>
  );
}
