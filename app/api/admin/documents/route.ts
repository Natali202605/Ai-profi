import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-session";
import {
  addProjectDocument,
  deleteProjectDocument,
  type ProjectDocumentType,
} from "@/lib/crm-store";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const projectId = searchParams.get("projectId");
  const clientId = searchParams.get("clientId");

  const { getClientById } = await import("@/lib/crm-store");

  if (clientId) {
    const detail = await getClientById(clientId);
    if (!detail) return NextResponse.json({ error: "Not found" }, { status: 404 });
    const documents = projectId
      ? detail.documents.filter((item) => item.projectId === projectId)
      : detail.documents;
    return NextResponse.json({ documents });
  }

  return NextResponse.json({ documents: [] });
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = (await request.json()) as Record<string, unknown>;
    const document = await addProjectDocument({
      projectId: String(body.projectId || ""),
      clientId: String(body.clientId || ""),
      type: (body.type as ProjectDocumentType) || "other",
      title: String(body.title || "Документ"),
      url: String(body.url || ""),
      filename: String(body.filename || ""),
    });
    return NextResponse.json({ document });
  } catch {
    return NextResponse.json({ error: "Create failed" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  const ok = await deleteProjectDocument(id);
  if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}
