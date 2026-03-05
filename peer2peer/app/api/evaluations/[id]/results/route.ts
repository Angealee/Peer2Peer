// app/api/evaluations/[id]/results/route.ts
// GET /api/evaluations/:id/results
//
// Returns aggregated peer evaluation results per student per criterion.
// Shape:
// {
//   evaluationId: number,
//   title: string,
//   results: [
//     {
//       student: { id, name, email },
//       scores: [
//         { criterion: string, average: number, count: number },
//         ...
//       ],
//       overallAverage: number
//     },
//     ...
//   ]
// }

// app/api/evaluations/[id]/results/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = requireAdmin(req);
    const evaluationId = parseInt(params.id);

    // Verify evaluation exists
    const evaluation = await prisma.evaluation.findUnique({
      where: { id: evaluationId },
      include: { criteria: true },
    });

    if (!evaluation) {
      return NextResponse.json(
        { error: "Evaluation not found" },
        { status: 404 }
      );
    }

    // Fetch all responses
    const responses = await prisma.evaluationResponse.findMany({
      where: { evaluationId },
      include: {
        evaluatedStudent: true,
        criterion: true,
      },
    });

    // Group by evaluated student → criterion
    const studentMap = new Map<
      number,
      {
        student: { id: number; name: string; email: string };
        criterionScores: Map<string, number[]>;
      }
    >();

    for (const r of responses) {
      if (!studentMap.has(r.evaluatedStudentId)) {
        studentMap.set(r.evaluatedStudentId, {
          student: {
            id: r.evaluatedStudent.id,
            name: r.evaluatedStudent.name,
            email: r.evaluatedStudent.email,
          },
          criterionScores: new Map(),
        });
      }

      const entry = studentMap.get(r.evaluatedStudentId)!;
      const criterionName = r.criterion.name;

      if (!entry.criterionScores.has(criterionName)) {
        entry.criterionScores.set(criterionName, []);
      }

      entry.criterionScores.get(criterionName)!.push(r.score);
    }

    // Build results array
    const results = Array.from(studentMap.values()).map(
      ({ student, criterionScores }) => {
        const scores = Array.from(criterionScores.entries()).map(
          ([criterion, values]) => ({
            criterion,
            average: parseFloat(
              (values.reduce((a, b) => a + b, 0) / values.length).toFixed(2)
            ),
            count: values.length,
          })
        );

        const overallAverage =
          scores.length > 0
            ? parseFloat(
                (
                  scores.reduce((a, b) => a + b.average, 0) / scores.length
                ).toFixed(2)
              )
            : 0;

        return { student, scores, overallAverage };
      }
    );

    // Sort by highest average
    results.sort((a, b) => b.overallAverage - a.overallAverage);

    return NextResponse.json({
      evaluationId,
      title: evaluation.title,
      results,
    });
  } catch (err: any) {
    if (err.message === "UNAUTHORIZED")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    console.error("[GET /api/evaluations/:id/results]", err);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}