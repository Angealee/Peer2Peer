// app/api/evaluations/[id]/results/route.ts
// GET /api/evaluations/:id/results

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> } // ← Next.js 15
) {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    verifyToken(token);

    const { id } = await params; // ← await before use
    const evaluationId = parseInt(id);

    const evaluation = await prisma.evaluation.findUnique({
      where: { id: evaluationId },
      include: {
        criteria: true,
        responses: {
          include: {
            evaluatedStudent: true,
            criterion: true,
          },
        },
        section: { include: { students: true } },
      },
    });

    if (!evaluation) {
      return NextResponse.json({ error: "Evaluation not found" }, { status: 404 });
    }

    // Group responses by evaluated student
    const studentMap = new Map<number, {
      student: { id: number; name: string; email: string };
      scores: Map<string, { total: number; count: number }>;
    }>();

    for (const student of evaluation.section.students) {
      studentMap.set(student.id, {
        student: { id: student.id, name: student.name, email: student.email },
        scores: new Map(),
      });
    }

    for (const response of evaluation.responses) {
      const entry = studentMap.get(response.evaluatedStudentId);
      if (!entry) continue;
      const criterionName = response.criterion.criterionName;
      const existing = entry.scores.get(criterionName) ?? { total: 0, count: 0 };
      existing.total += response.score;
      existing.count += 1;
      entry.scores.set(criterionName, existing);
    }

    const results = Array.from(studentMap.values()).map(({ student, scores }) => {
      const scoreArray = Array.from(scores.entries()).map(([criterion, { total, count }]) => ({
        criterion,
        average: count > 0 ? Math.round((total / count) * 100) / 100 : 0,
        count,
      }));
      const overallAverage =
        scoreArray.length > 0
          ? Math.round((scoreArray.reduce((s, c) => s + c.average, 0) / scoreArray.length) * 100) / 100
          : 0;
      return { student, scores: scoreArray, overallAverage };
    });

    return NextResponse.json({
      evaluationId,
      title: evaluation.title,
      results,
    });
  } catch (err) {
    console.error("[GET /api/evaluations/:id/results]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}