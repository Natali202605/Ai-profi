import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-session";
import {
  getPortfolioCategoriesMeta,
  savePortfolioCategoriesMeta,
  type PortfolioCategoryMeta,
} from "@/lib/portfolio-categories-store";
import { revalidatePublicSite } from "@/lib/revalidate-site";

export const runtime = "nodejs";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const categories = await getPortfolioCategoriesMeta();
  return NextResponse.json({ categories });
}

export async function PUT(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as { categories: PortfolioCategoryMeta[] };
    if (!Array.isArray(body.categories)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }
    const categories = await savePortfolioCategoriesMeta(body.categories);
    revalidatePublicSite(["/portfolio", "/"]);
    return NextResponse.json({ success: true, categories });
  } catch {
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
