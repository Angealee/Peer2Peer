// app/api/evaluations/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

async function getOwnedEvaluation(
  evalId: number,
  userId: number
) {
  return prisma.evaluation.findFirst({
    where: {
      id: evalId,
      createdBy: userId,
    },
  });
}


// ================= GET =================

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = requireAdmin(req);
    const { id } = await params;

    const evalId = Number(id);

    const evaluation = await prisma.evaluation.findFirst({
      where: {
        id: evalId,
        createdBy: user.id,
      },
      include: {
        criteria: true,
      },
    });

    if (!evaluation) {
      return NextResponse.json(
        { error: "Not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(evaluation);

  } catch (err: any) {
    if (err.message === "UNAUTHORIZED")
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}


// ================= PATCH =================

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {

    const user = requireAdmin(req);
    const { id } = await params;

    const evalId = Number(id);

    const {
      title,
      description,
      deadline,
      anonymous,
      criteria,
      scoreOptions,
    } = await req.json();


    // ✅ ownership check

    const existing = await getOwnedEvaluation(
      evalId,
      user.id
    );

    if (!existing) {
      return NextResponse.json(
        { error: "Not found" },
        { status: 404 }
      );
    }


    // update main evaluation

    const updated =
      await prisma.evaluation.update({
        where: { id: evalId },
        data: {
          title,
          description,
          deadline: deadline
            ? new Date(deadline)
            : null,
          anonymous,
        },
      });


    // update criteria

    if (criteria && Array.isArray(criteria)) {

      const existingCriteria =
        await prisma.evaluationCriteria.findMany({
          where: { evaluationId: evalId },
          select: { id: true },
        });

      const criterionIds =
        existingCriteria.map((c) => c.id);


      // delete responses first

      await prisma.evaluationResponse.deleteMany({
        where: {
          criterionId: {
            in: criterionIds,
          },
        },
      });


      // delete criteria

      await prisma.evaluationCriteria.deleteMany({
        where: {
          evaluationId: evalId,
        },
      });


      // recreate criteria

      await prisma.evaluationCriteria.createMany({
        data: criteria.map(
          (name: string, i: number) => ({
            evaluationId: evalId,
            criterionName: name,
            scoreOptions: scoreOptions?.[i]
              ? JSON.stringify(scoreOptions[i])
              : null,
          })
        ),
      });

    }

    return NextResponse.json(updated);

  } catch (err: any) {

    if (err.message === "UNAUTHORIZED")
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );

    console.error(
      "[PATCH /api/evaluations/:id]",
      err
    );

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );

  }
}


// ================= DELETE =================

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {

    const user = requireAdmin(req);
    const { id } = await params;

    const evalId = Number(id);


    // ✅ ownership check

    const existing =
      await getOwnedEvaluation(
        evalId,
        user.id
      );

    if (!existing) {
      return NextResponse.json(
        { error: "Not found" },
        { status: 404 }
      );
    }


    // delete responses

    await prisma.evaluationResponse.deleteMany({
      where: {
        evaluationId: evalId,
      },
    });


    // delete criteria

    await prisma.evaluationCriteria.deleteMany({
      where: {
        evaluationId: evalId,
      },
    });


    // delete evaluation

    await prisma.evaluation.delete({
      where: {
        id: evalId,
      },
    });


    return NextResponse.json({
      message: "Evaluation deleted",
    });

  } catch (err: any) {

    if (err.message === "UNAUTHORIZED")
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );

    console.error(
      "[DELETE /api/evaluations/:id]",
      err
    );

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );

  }
}