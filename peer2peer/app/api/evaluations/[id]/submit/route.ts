// app/api/evaluations/[id]/submit/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const evaluationId = parseInt(id);

    const { evaluatorId, responses } = await req.json();

    if (!evaluatorId || !Array.isArray(responses) || responses.length === 0) {
      return NextResponse.json(
        { error: "evaluatorId and responses array are required" },
        { status: 400 }
      );
    }

    // ✅ load evaluation with sections
    const evaluation = await prisma.evaluation.findUnique({
      where: { id: evaluationId },
      include: {
        sections: {
          include: {
            section: {
              include: {
                students: true,
              },
            },
          },
        },
        criteria: true,
      },
    });

    if (!evaluation) {
      return NextResponse.json(
        { error: "Evaluation not found" },
        { status: 404 }
      );
    }

    // ✅ find which section evaluator belongs to
    let studentSection = null;

    for (const es of evaluation.sections) {
      const found = es.section.students.find(
        (s) => s.id === evaluatorId
      );

      if (found) {
        studentSection = es.section;
        break;
      }
    }

    if (!studentSection) {
      return NextResponse.json(
        { error: "Not a member of this evaluation" },
        { status: 403 }
      );
    }

    // ✅ prevent double submit
    const already = await prisma.evaluationResponse.findFirst({
      where: {
        evaluationId,
        evaluatorStudentId: evaluatorId,
      },
    });

    if (already) {
      return NextResponse.json(
        { error: "Already submitted" },
        { status: 409 }
      );
    }

    // ✅ ensure evaluated students are in same section
    const allowedIds = studentSection.students.map(
      (s) => s.id
    );

    // ✅ save responses
    await Promise.all(
      responses.map(
        ({
          evaluatedId,
          criterionId,
          score,
          comment,
        }: {
          evaluatedId: number;
          criterionId: number;
          score: number;
          comment?: string;
        }) => {
          if (!allowedIds.includes(evaluatedId)) {
            throw new Error(
              "Cannot evaluate student outside your section"
            );
          }

          return prisma.evaluationResponse.create({
            data: {
              evaluationId,
              evaluatorStudentId: evaluatorId,
              evaluatedStudentId: evaluatedId,
              criterionId,
              score,
              comment: comment ?? null,
            },
          });
        }
      )
    );

    return NextResponse.json({
      message: "Submitted successfully",
    });
  } catch (err) {
    console.error(
      "[POST /api/evaluations/:id/submit]",
      err
    );

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}