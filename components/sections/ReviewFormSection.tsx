import { ReviewForm } from "@/components/forms/ReviewForm";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ReviewFormSection() {
  return (
    <section id="review-form" className="section-light py-16 md:py-24">
      <div className="container-site max-w-3xl">
        <SectionHeading
          light
          title="Поделитесь впечатлениями о работе"
          titleAccent="впечатлениями"
          subtitle="Отзыв появится на сайте после модерации."
          align="center"
        />
        <ReviewForm />
      </div>
    </section>
  );
}
