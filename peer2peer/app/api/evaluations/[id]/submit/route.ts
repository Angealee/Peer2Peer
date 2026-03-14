// app/api/evaluations/[id]/submit/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const evaluationId = parseInt(id);
    const { evaluatorId, responses } = await req.json();

    if (!evaluatorId || !Array.isArray(responses) || responses.length === 0) {
      return NextResponse.json({ error: "evaluatorId and responses array are required" }, { status: 400 });
    }

    const evaluation = await prisma.evaluation.findUnique({
      where: { id: evaluationId },
      include: { section: { include: { students: true } } },
    });
    if (!evaluation) return NextResponse.json({ error: "Evaluation not found" }, { status: 404 });

    const inSection = evaluation.section.students.some((s) => s.id === evaluatorId);
    if (!inSection) return NextResponse.json({ error: "Not a member of this section" }, { status: 403 });

    const already = await prisma.evaluationResponse.findFirst({
      where: { evaluationId, evaluatorStudentId: evaluatorId },
    });
    if (already) return NextResponse.json({ error: "Already submitted" }, { status: 409 });

    await Promise.all(
      responses.map(({ evaluatedId, criterionId, score, comment }: {
        evaluatedId: number; criterionId: number; score: number; comment?: string;
      }) =>
        prisma.evaluationResponse.create({
          data: {
            evaluationId,
            evaluatorStudentId: evaluatorId,
            evaluatedStudentId: evaluatedId,
            criterionId,
            score,
            comment: comment ?? null,
          },
        })
      )
    );

    return NextResponse.json({ message: "Submitted successfully" });
  } catch (err) {
    console.error("[POST /api/evaluations/:id/submit]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}