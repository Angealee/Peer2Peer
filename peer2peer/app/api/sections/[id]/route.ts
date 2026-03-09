// app/api/sections/[id]/route.ts
// GET    /api/sections/:id — get one section
// DELETE /api/sections/:id — delete section and its students

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = requireAdmin(req);
    const { id } = await params;
    const sectionId = parseInt(id);

    const section = await prisma.section.findFirst({
      where: { id: sectionId, createdBy: user.id },
      include: { _count: { select: { students: true } } },
    });

    if (!section) {
      return NextResponse.json({ error: "Section not found" }, { status: 404 });
    }

    return NextResponse.json(section);
  } catch (err: any) {
    if (err.message === "UNAUTHORIZED") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (err.message === "FORBIDDEN")    return NextResponse.json({ error: "Forbidden" },    { status: 403 });
    console.error("[GET /api/sections/:id]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = requireAdmin(req);
    const { id } = await params;
    const sectionId = parseInt(id);

    // Verify ownership
    const section = await prisma.section.findFirst({
      where: { id: sectionId, createdBy: user.id },
    });

    if (!section) {
      return NextResponse.json({ error: "Section not found" }, { status: 404 });
    }

    // Delete students first (FK constraint), then section
    await prisma.student.deleteMany({ where: { sectionId } });
    await prisma.section.delete({ where: { id: sectionId } });

    return NextResponse.json({ message: "Section deleted" });
  } catch (err: any) {
    if (err.message === "UNAUTHORIZED") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (err.message === "FORBIDDEN")    return NextResponse.json({ error: "Forbidden" },    { status: 403 });
    console.error("[DELETE /api/sections/:id]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}