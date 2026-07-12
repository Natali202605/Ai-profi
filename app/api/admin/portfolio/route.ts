import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-session";
import {
  getAllPortfolioProjectsForAdmin,
  createPortfolioProject,
  updatePortfolioProject,
} from "@/lib/portfolio-store";
import { revalidatePublicSite } from "@/lib/revalidate-site";

export const runtime = "nodejs";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const projects = await getAllPortfolioProjectsForAdmin();
  return NextResponse.json({ projects });
}

export async function POST(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const project = await createPortfolioProject(body);
    revalidatePublicSite(["/portfolio", `/portfolio/${project.slug}`]);
    return NextResponse.json({ success: true, project });
  } catch {
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as {
      id?: string;
      slug?: string;
      status?: "draft" | "published";
      featured?: boolean;
      title?: string;
      shortDescription?: string;
    };

    const updated = await updatePortfolioProject(
      { id: body.id, slug: body.slug },
      {
        status: body.status,
        featured: body.featured,
        title: body.title,
        shortDescription: body.shortDescription,
      },
    );

    if (!updated) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    revalidatePublicSite(["/portfolio", `/portfolio/${updated.slug}`]);

    return NextResponse.json({ success: true, project: updated });
  } catch {
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}
