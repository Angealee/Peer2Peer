// app/api/evaluations/[id]/reset/route.ts
// POST /api/evaluations/:id/reset
// Called when instructor refreshes a student's link — deletes their previous responses
// so they can submit a fresh evaluation.

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const evaluationId = parseInt(id);
    const { evaluatorId } = await req.json();

    if (!evaluatorId) {
      return NextResponse.json({ error: "evaluatorId is required" }, { status: 400 });
    }

    // Delete all previous responses from this evaluator in this evaluation
    await prisma.evaluationResponse.deleteMany({
      where: {
        evaluationId,
        evaluatorStudentId: Number(evaluatorId),
      },
    });

    return NextResponse.json({ message: "Responses reset. Student can re-evaluate." });
  } catch (err) {
    console.error("[POST /api/evaluations/:id/reset]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}