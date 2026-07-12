import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-session";
import { getSiteContent, saveSiteContent } from "@/lib/site-content-store";
import { revalidatePublicSite } from "@/lib/revalidate-site";
import type { SiteContent } from "@/lib/site-content-types";

export const runtime = "nodejs";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const content = await getSiteContent();
  return NextResponse.json({ content });
}

export async function PUT(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as { content: SiteContent };
    if (!body.content) {
      return NextResponse.json({ error: "Content is required" }, { status: 400 });
    }

    await saveSiteContent(body.content);
    revalidatePublicSite();
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to save content" }, { status: 500 });
  }
}
