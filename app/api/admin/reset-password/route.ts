export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import {
  hashPassword,
  isAdminAuthConfigured,
  resolveAdminEmail,
  verifyResetToken,
} from "@/lib/admin-auth";
import { adminResetSchema } from "@/lib/admin-validation";
import { getSiteUrl, sendAdminEmail } from "@/lib/admin-email";

async function persistPasswordHash(hash: string, email: string) {
  if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/admin_auth?id=eq.1`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        password_hash: hash,
        updated_at: new Date().toISOString(),
      }),
    });

    if (response.ok) return;

    await fetch(`${process.env.SUPABASE_URL}/rest/v1/admin_auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        id: 1,
        email,
        password_hash: hash,
        updated_at: new Date().toISOString(),
      }),
    });
    return;
  }

  const targetPath = path.join(process.cwd(), "data", ".admin-password-hash");
  await writeFile(targetPath, hash, "utf8");
}

export async function POST(request: Request) {
  if (!isAdminAuthConfigured()) {
    return NextResponse.json({ error: "Админ-вход не настроен" }, { status: 503 });
  }

  try {
    const body = await request.json();
    const data = adminResetSchema.parse(body);
    const email = await verifyResetToken(data.token);
    const adminEmail = await resolveAdminEmail();

    if (!email || email !== adminEmail) {
      return NextResponse.json({ error: "Ссылка недействительна или устарела" }, { status: 400 });
    }

    const hash = await hashPassword(data.password);

    try {
      await persistPasswordHash(hash, adminEmail);
    } catch {
      if (process.env.RESEND_API_KEY) {
        await sendAdminEmail({
          to: adminEmail,
          subject: "Новый пароль админ-панели НАТАЛИ СМИРНОВА",
          text: `Пароль изменён. Новый hash для ADMIN_PASSWORD_HASH:\n${hash}\n\nОбновите переменную окружения на хостинге.`,
        });
      }

      return NextResponse.json({
        success: true,
        message:
          "Пароль обновлён. Если Supabase не настроен, используйте новый пароль из письма или обновите ADMIN_PASSWORD_HASH на хостинге.",
        passwordHash: hash,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Пароль успешно обновлён. Теперь можно войти с новым паролем.",
    });
  } catch {
    return NextResponse.json({ error: "Не удалось обновить пароль" }, { status: 500 });
  }
}
