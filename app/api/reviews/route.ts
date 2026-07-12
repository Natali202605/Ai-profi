import { NextRequest, NextResponse } from "next/server";
import { reviewFormSchema } from "@/lib/validation";
import { checkRateLimit } from "@/lib/integrations";
import { createTestimonial, getPublishedTestimonials, testimonialToReview } from "@/lib/testimonials-store";

export async function GET() {
  try {
    const records = await getPublishedTestimonials();
    return NextResponse.json({
      reviews: records.map(testimonialToReview),
    });
  } catch {
    return NextResponse.json({ error: "Не удалось загрузить отзывы" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: "Слишком много запросов" }, { status: 429 });
    }

    const body = await request.json();
    const result = reviewFormSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0]?.message || "Ошибка валидации" },
        { status: 400 },
      );
    }

    if (result.data.honeypot) {
      return NextResponse.json({ success: true });
    }

    await createTestimonial({
      name: result.data.name,
      email: result.data.email || undefined,
      company: result.data.company,
      role: result.data.role,
      service: result.data.service,
      rating: result.data.rating,
      full_text: result.data.full_text,
      consent_publication: result.data.consent_publication,
      consent_processing: result.data.consent_processing,
    });

    return NextResponse.json({
      success: true,
      message: "Спасибо! Отзыв отправлен на модерацию и появится на сайте после проверки.",
    });
  } catch (error) {
    console.error("Reviews API error:", error);
    return NextResponse.json({ error: "Внутренняя ошибка сервера" }, { status: 500 });
  }
}
