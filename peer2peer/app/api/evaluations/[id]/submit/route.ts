// app/api/evaluations/[id]/submit/route.ts
// POST /api/evaluations/:id/submit
//
// Body:
// {
//   evaluatorId: number,          ← student submitting
//   responses: [
//     { evaluatedId: number, criterionId: number, score: number },
//     ...
//   ]
// }

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const evaluationId = parseInt(params.id);
    const { evaluatorId, responses } = await req.json();

    if (!evaluatorId || !Array.isArray(responses) || responses.length === 0) {
      return NextResponse.json({ error: "evaluatorId and responses array are required" }, { status: 400 });
    }

    // Validate evaluation exists
    const evaluation = await prisma.evaluation.findUnique({
      where: { id: evaluationId },
      include: { criteria: true, section: { include: { students: true } } },
    });

    if (!evaluation) {
      return NextResponse.json({ error: "Evaluation not found" }, { status: 404 });
    }

    // Validate evaluator belongs to this section
    const evaluatorInSection = evaluation.section.students.some((s) => s.id === evaluatorId);
    if (!evaluatorInSection) {
      return NextResponse.json({ error: "Evaluator is not a member of this section" }, { status: 403 });
    }

    // Upsert all responses
const upsertPromises = responses.map(
  ({ evaluatedId, criterionId, score }: { evaluatedId: number; criterionId: number; score: number }) => {
    return prisma.evaluationResponse.create({
      data: {
        evaluationId,
        evaluatorStudentId: evaluatorId.id,
        evaluatedStudentId: evaluatedId,
        criterionId,
        score
      }
    });
  }
);

await Promise.all(upsertPromises);

    return NextResponse.json({ message: "Evaluation submitted successfully" });
  } catch (err) {
    console.error("[POST /api/evaluations/:id/submit]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
