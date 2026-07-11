import type { Review } from "@/data/content";

type TestimonialCardProps = {
  review: Review;
  featured?: boolean;
  className?: string;
};

export function TestimonialCard({ review, featured, className }: TestimonialCardProps) {
  return (
    <article
      className={`card-glass flex h-full flex-col p-6 md:p-8 ${
        featured ? "lg:p-10" : ""
      } ${className || ""}`}
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 font-heading text-lg text-gold">
        {review.name.charAt(0)}
      </div>
      <p
        className={`mb-6 flex-1 leading-relaxed text-text-secondary ${
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
