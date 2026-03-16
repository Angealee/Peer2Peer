// app/api/evaluations/[id]/results/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1];

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    verifyToken(token);

    const { id } = await params;
    const evaluationId = parseInt(id);

    const evaluation = await prisma.evaluation.findUnique({
      where: { id: evaluationId },
      include: {
        criteria: true,

        responses: {
          include: {
            evaluatedStudent: true,
            evaluatorStudent: true,
            criterion: true,
          },
        },

        sections: {
          include: {
            section: {
              include: {
                students: true,
              },
            },
          },
        },
      },
    });

    if (!evaluation) {
      return NextResponse.json(
        { error: "Not found" },
        { status: 404 }
      );
    }

    const isAnonymous = evaluation.anonymous;

    // ✅ collect all students from all sections
    const allStudents = evaluation.sections.flatMap(
      (es) => es.section.students
    );

    const studentMap = new Map<
      number,
      {
        student: {
          id: number;
          name: string;
          email: string;
        };
        scores: Map<string, { total: number; count: number }>;
        comments: {
          evaluatorName: string;
          text: string;
        }[];
      }
    >();

    for (const student of allStudents) {
      studentMap.set(student.id, {
        student: {
          id: student.id,
          name: student.name,
          email: student.email,
        },
        scores: new Map(),
        comments: [],
      });
    }

    const commentTracker = new Map<string, boolean>();

    for (const response of evaluation.responses) {
      const entry = studentMap.get(
        response.evaluatedStudentId
      );

      if (!entry) continue;

      const criterionName =
        response.criterion.criterionName;

      const existing =
        entry.scores.get(criterionName) ??
        { total: 0, count: 0 };

      existing.total += response.score;
      existing.count += 1;

      entry.scores.set(criterionName, existing);

      const commentKey =
        `${response.evaluatorStudentId}-${response.evaluatedStudentId}`;

      if (
        response.comment &&
        response.comment.trim() &&
        !commentTracker.has(commentKey)
      ) {
        commentTracker.set(commentKey, true);

        entry.comments.push({
          evaluatorName: isAnonymous
            ? "Anonymous"
            : response.evaluatorStudent.name,
          text: response.comment.trim(),
        });
      }
    }

    const results = Array.from(
      studentMap.values()
    ).map(({ student, scores, comments }) => {
      const scoreArray = Array.from(
        scores.entries()
      ).map(([criterion, { total, count }]) => ({
        criterion,
        average:
          count > 0
            ? Math.round((total / count) * 100) / 100
            : 0,
        count,
      }));

      const overallAverage =
        scoreArray.length > 0
          ? Math.round(
              (scoreArray.reduce(
                (s, c) => s + c.average,
                0
              ) /
                scoreArray.length) *
                100
            ) / 100
          : 0;

      return {
        student,
        scores: scoreArray,
        overallAverage,
        comments,
      };
    });

    return NextResponse.json({
      evaluationId,
      title: evaluation.title,
      results,
    });
  } catch (err) {
    console.error(
      "[GET /api/evaluations/:id/results]",
      err
    );

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}