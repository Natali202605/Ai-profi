import { ZodError } from "zod";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const runtime = "nodejs";
import {
  createSessionToken,
  getAdminEmail,
  isAdminAuthConfigured,
  verifyAdminPassword,
  SESSION_COOKIE,
} from "@/lib/admin-auth";
import { adminLoginSchema } from "@/lib/admin-validation";
import { sessionCookieOptions } from "@/lib/admin-session";

export async function POST(request: Request) {
  if (!isAdminAuthConfigured()) {
    return NextResponse.json(
      { error: "Админ-вход не настроен. Задайте AUTH_SECRET, ADMIN_EMAIL и ADMIN_PASSWORD." },
      { status: 503 },
    );
  }

  try {
    const body = await request.json();
    const data = adminLoginSchema.parse(body);
    const adminEmail = getAdminEmail();

    if (data.email.trim().toLowerCase() !== adminEmail) {
      return NextResponse.json({ error: "Неверный логин или пароль" }, { status: 401 });
    }

    const valid = await verifyAdminPassword(data.password);
    if (!valid) {
      return NextResponse.json({ error: "Неверный логин или пароль" }, { status: 401 });
    }

    const token = await createSessionToken(adminEmail, Boolean(data.remember));
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE, token, sessionCookieOptions(Boolean(data.remember)));

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: "Проверьте введённые данные" }, { status: 400 });
    }
    return NextResponse.json({ error: "Ошибка входа" }, { status: 500 });
  }
}
