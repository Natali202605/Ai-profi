import { NextResponse } from "next/server";
import {
  createResetToken,
  isAdminAuthConfigured,
  resolveAdminEmail,
} from "@/lib/admin-auth";
import { adminForgotSchema } from "@/lib/admin-validation";
import { getSiteUrl, sendAdminEmail } from "@/lib/admin-email";

export async function POST(request: Request) {
  if (!isAdminAuthConfigured()) {
    return NextResponse.json({ error: "Админ-вход не настроен" }, { status: 503 });
  }

  try {
    const body = await request.json();
    const data = adminForgotSchema.parse(body);
    const adminEmail = await resolveAdminEmail();

    if (data.email.trim().toLowerCase() !== adminEmail) {
      return NextResponse.json({
        success: true,
        message: "Если email найден, на него отправлена ссылка для восстановления.",
      });
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: "Email-сервис не настроен. Добавьте RESEND_API_KEY." },
        { status: 503 },
      );
    }

    const token = await createResetToken(adminEmail);
    const resetUrl = `${getSiteUrl()}/admin/reset-password?token=${encodeURIComponent(token)}`;

    await sendAdminEmail({
      to: adminEmail,
      subject: "Восстановление пароля админ-панели NATALI NEERO",
      text: `Для смены пароля перейдите по ссылке (действует 1 час):\n${resetUrl}`,
      html: `<p>Для смены пароля перейдите по ссылке (действует 1 час):</p><p><a href="${resetUrl}">${resetUrl}</a></p>`,
    });

    return NextResponse.json({
      success: true,
      message: "Ссылка для восстановления отправлена на email администратора.",
    });
  } catch {
    return NextResponse.json({ error: "Не удалось отправить письмо" }, { status: 500 });
  }
}
