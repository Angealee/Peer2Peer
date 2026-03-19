// GET /api/evaluations/:id/submissions
// Returns list of studentIds who have submitted
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = requireAdmin(req);
    const { id } = await params;

    const responses = await prisma.evaluationResponse.findMany({
      where: { evaluationId: Number(id) },
      select: { evaluatorStudentId: true },
      distinct: ["evaluatorStudentId"],
    });

    return NextResponse.json(responses.map((r) => r.evaluatorStudentId));
  } catch (err: any) {
    if (err.message === "UNAUTHORIZED") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    //test vercel commit
  }
}