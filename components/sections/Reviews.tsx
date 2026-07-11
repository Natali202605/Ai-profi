import { reviews } from "@/data/content";
import { VK_REVIEWS_URL } from "@/lib/utils";
import { RevealAnimation } from "@/components/ui/RevealAnimation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TestimonialCard } from "@/components/ui/TestimonialCard";

export function Reviews() {
  const visibleReviews = reviews.filter((r) => r.visible);

  if (visibleReviews.length === 0) {
    return (
      <section id="reviews" className="py-20 md:py-28">
        <div className="container-site text-center">
          <RevealAnimation>
            <SectionHeading
              title="Что говорят о работе со мной"
              subtitle="Отзывы появятся здесь после публикации с разрешения клиентов."
              align="center"
            />
          </RevealAnimation>
          <RevealAnimation delay={0.2}>
            <div className="card-glass mx-auto max-w-lg p-8">
              <p className="text-text-secondary">
                [Место для реальных отзывов клиентов. Добавьте отзывы в файл{" "}
                <code className="text-gold">data/content.ts</code> и установите{" "}
                <code className="text-gold">visible: true</code>]
              </p>
            </div>
          </RevealAnimation>
        </div>
      </section>
    );
  }

  return (
    <section id="reviews" className="py-20 md:py-28">
      <div className="container-site">
        <RevealAnimation>
          <SectionHeading
            title="Что говорят о работе со мной"
            subtitle="Отзывы клиентов из сообщества ВКонтакте."
            align="center"
          />
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
              href={VK_REVIEWS_URL}
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
