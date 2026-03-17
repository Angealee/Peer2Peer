// app/api/sections/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

async function getOwnedSection(
  sectionId: number,
  userId: number
) {
  return prisma.section.findFirst({
    where: {
      id: sectionId,
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

    const sectionId = parseInt(id);

    const section = await prisma.section.findFirst({
      where: {
        id: sectionId,
        createdBy: user.id,
      },
      include: {
        _count: {
          select: {
            students: true,
          },
        },
      },
    });

    if (!section) {
      return NextResponse.json(
        { error: "Section not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(section);

  } catch (err: any) {

    if (err.message === "UNAUTHORIZED")
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );

    if (err.message === "FORBIDDEN")
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );

    console.error(
      "[GET /api/sections/:id]",
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

    const sectionId = parseInt(id);


    // ✅ strict ownership check

    const section =
      await getOwnedSection(
        sectionId,
        user.id
      );

    if (!section) {
      return NextResponse.json(
        { error: "Section not found" },
        { status: 404 }
      );
    }


    // ✅ delete responses linked to students in this section

    await prisma.evaluationResponse.deleteMany({
      where: {
        evaluatorStudent: {
          sectionId,
        },
      },
    });

    await prisma.evaluationResponse.deleteMany({
      where: {
        evaluatedStudent: {
          sectionId,
        },
      },
    });


    // ✅ delete evaluation-section links

    await prisma.evaluationSection.deleteMany({
      where: {
        sectionId,
      },
    });


    // ✅ delete students

    await prisma.student.deleteMany({
      where: {
        sectionId,
      },
    });


    // ✅ delete section

    await prisma.section.delete({
      where: {
        id: sectionId,
      },
    });


    return NextResponse.json({
      message: "Section deleted",
    });

  } catch (err: any) {

    if (err.message === "UNAUTHORIZED")
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );

    if (err.message === "FORBIDDEN")
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );

    console.error(
      "[DELETE /api/sections/:id]",
      err
    );

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}