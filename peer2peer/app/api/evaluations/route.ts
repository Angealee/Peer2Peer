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
        section: { select: { name: true } },
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
    const { title, description, sectionId, criteria, scoreOptions, deadline, anonymous } = await req.json();

    if (!title || !sectionId) {
      return NextResponse.json({ error: "title and sectionId are required" }, { status: 400 });
    }

    const section = await prisma.section.findFirst({
      where: { id: Number(sectionId), createdBy: user.id },
    });
    if (!section) return NextResponse.json({ error: "Section not found" }, { status: 404 });

    const evaluation = await prisma.evaluation.create({
      data: {
        title,
        description,
        sectionId: Number(sectionId),
        createdBy: user.id,
        deadline: deadline ? new Date(deadline) : null,
        anonymous: typeof anonymous === "boolean" ? anonymous : true,
        criteria: {
          create: (criteria as string[]).map((name: string, i: number) => ({
            criterionName: name,
            // Store scoreOptions as JSON string if provided
            scoreOptions: scoreOptions?.[i]
              ? JSON.stringify(scoreOptions[i])
              : null,
          })),
        },
      },
      include: { criteria: true },
    });

    return NextResponse.json(evaluation, { status: 201 });
  } catch (err: any) {
    if (err.message === "UNAUTHORIZED") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    console.error("[POST /api/evaluations]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}