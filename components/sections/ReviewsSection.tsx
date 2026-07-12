import { getPublishedTestimonials, testimonialToReview } from "@/lib/testimonials-store";
import { Reviews } from "@/components/sections/Reviews";
import type { Review } from "@/data/content";

export async function ReviewsSection() {
  const published = await getPublishedTestimonials();
  const dynamicReviews: Review[] = published.map(testimonialToReview);

  return <Reviews dynamicReviews={dynamicReviews} />;
}
