import { NextRequest, NextResponse } from "next/server";
import { leadFormSchema } from "@/lib/validation";
import { saveLead, checkRateLimit } from "@/lib/integrations";

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: "Слишком много запросов" }, { status: 429 });
    }

    const body = await request.json();
    const result = leadFormSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0]?.message || "Ошибка валидации" },
        { status: 400 }
      );
    }

    if (result.data.honeypot) {
      return NextResponse.json({ success: true });
    }

    await saveLead(result.data);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Lead API error:", error);
    return NextResponse.json({ error: "Внутренняя ошибка сервера" }, { status: 500 });
  }
}
