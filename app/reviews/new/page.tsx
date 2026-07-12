import type { Metadata } from "next";
import { ReviewForm } from "@/components/forms/ReviewForm";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Оставить отзыв",
  description: "Поделитесь впечатлениями о работе с NATALI NEERO. Отзыв публикуется после модерации.",
};

export default function NewReviewPage() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-site max-w-3xl">
        <SectionHeading
          title="Поделитесь впечатлениями о работе"
          titleAccent="впечатлениями"
          subtitle="Отзыв появится на сайте после проверки. Спасибо, что помогаете другим клиентам принять решение."
          align="center"
        />
        <ReviewForm />
      </div>
    </section>
  );
}
