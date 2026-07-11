import type { Review } from "@/data/content";

type TestimonialCardProps = {
  review: Review;
  featured?: boolean;
};

export function TestimonialCard({ review, featured }: TestimonialCardProps) {
  return (
    <article
      className={`card-glass p-6 md:p-8 ${
        featured ? "lg:col-span-2 lg:row-span-2 lg:p-10" : ""
      }`}
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 font-heading text-lg text-gold">
        {review.name.charAt(0)}
      </div>
      <p
        className={`mb-6 leading-relaxed text-text-secondary ${
          featured ? "text-lg" : "text-sm"
        }`}
      >
        «{review.text}»
      </p>
      <div>
        <p className="font-medium text-white-text">{review.name}</p>
        <p className="text-sm text-text-secondary">{review.role}</p>
        <p className="mt-1 text-xs text-gold">{review.service}</p>
      </div>
    </article>
  );
}
