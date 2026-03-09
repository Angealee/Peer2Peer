// app/api/students/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = requireAdmin(req);
    const { id } = await params;
    const studentId = parseInt(id);

    const student = await prisma.student.findFirst({
      where: {
        id: studentId,
        section: { createdBy: user.id },
      },
    });

    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    await prisma.student.delete({ where: { id: studentId } });

    return NextResponse.json({ message: "Student removed" });
  } catch (err: any) {
    if (err.message === "UNAUTHORIZED") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (err.message === "FORBIDDEN")    return NextResponse.json({ error: "Forbidden" },    { status: 403 });
    console.error("[DELETE /api/students/:id]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}