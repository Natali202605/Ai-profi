import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-session";
import {
  getProjectsForAdmin,
  updateClientProject,
  type ProjectWorkflowStatus,
} from "@/lib/crm-store";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const status = (searchParams.get("status") || "all") as ProjectWorkflowStatus | "all";
  const projects = await getProjectsForAdmin(status === "all" ? undefined : status);
  return NextResponse.json({ projects });
}

export async function PATCH(request: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = (await request.json()) as Record<string, unknown>;
    const id = String(body.id || "");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    const project = await updateClientProject(id, {
      status: body.status as ProjectWorkflowStatus | undefined,
      notes: body.notes !== undefined ? String(body.notes) : undefined,
      title: body.title !== undefined ? String(body.title) : undefined,
    });

    if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ project });
  } catch {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
