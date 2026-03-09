// app/api/sections/[id]/students/route.ts
// GET /api/sections/:id/students — list students in a section

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }  // ← type as Promise
) {
  try {
    const user = requireAdmin(req);
    const { id } = await params;  // ← await params first
    const sectionId = parseInt(id);

    // Ensure the section belongs to this instructor
    const section = await prisma.section.findFirst({
      where: {
        id: sectionId,
        createdBy: user.id,
      },
    });

    if (!section) {
      return NextResponse.json({ error: "Section not found" }, { status: 404 });
    }

    const students = await prisma.student.findMany({
      where: { sectionId },
      orderBy: { name: "asc" },
    });

    return NextResponse.json(students);
  } catch (err: any) {
    if (err.message === "UNAUTHORIZED") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    console.error("[GET /api/sections/:id/students]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
