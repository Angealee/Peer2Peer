// app/api/evaluations/[id]/route.ts
// GET /api/evaluations/:id — get one evaluation with full details

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = requireAdmin(req);
    const evaluationId = parseInt(params.id);

    const evaluation = await prisma.evaluation.findFirst({
      where: { id: evaluationId, createdBy: user.userId },
      include: {
        criteria: true,
        section: {
          include: { students: true },
        },
      },
    });

    if (!evaluation) {
      return NextResponse.json({ error: "Evaluation not found" }, { status: 404 });
    }

    return NextResponse.json(evaluation);
  } catch (err: any) {
    if (err.message === "UNAUTHORIZED") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    console.error("[GET /api/evaluations/:id]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
