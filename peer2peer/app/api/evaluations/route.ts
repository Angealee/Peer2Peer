// app/api/evaluations/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const user = requireAdmin(req);
    const evaluations = await prisma.evaluation.findMany({
      where: { createdBy: user.id },
      include: {
        sections: { include: { section: true } },
        criteria: true,
        _count: { select: { responses: true } },
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(evaluations);
  } catch (err: any) {
    if (err.message === "UNAUTHORIZED") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    console.error("[GET /api/evaluations]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = requireAdmin(req);
    const { title, description, sectionIds, criteria, scoreOptions, deadline, anonymous } = await req.json();

    if (!title || !sectionIds || !Array.isArray(sectionIds) || sectionIds.length === 0) {
      return NextResponse.json({ error: "title and at least one sectionId are required" }, { status: 400 });
    }

    // Verify all sections belong to this instructor
    const sections = await prisma.section.findMany({
      where: { id: { in: sectionIds.map(Number) }, createdBy: user.id },
    });
    if (sections.length !== sectionIds.length) {
      return NextResponse.json({ error: "One or more sections not found" }, { status: 404 });
    }

    const evaluation = await prisma.evaluation.create({
      data: {
        title,
        description,
        createdBy: user.id,
        deadline: deadline ? new Date(deadline) : null,
        anonymous: typeof anonymous === "boolean" ? anonymous : true,
        sections: {
          create: sectionIds.map((id: number) => ({ sectionId: Number(id) })),
        },
        criteria: {
          create: (criteria as string[]).map((name: string, i: number) => ({
            criterionName: name,
            scoreOptions: scoreOptions?.[i] ? JSON.stringify(scoreOptions[i]) : null,
          })),
        },
      },
      include: {
        sections: { include: { section: true } },
        criteria: true,
      },
    });

    return NextResponse.json(evaluation, { status: 201 });
  } catch (err: any) {
    if (err.message === "UNAUTHORIZED") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    console.error("[POST /api/evaluations]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}