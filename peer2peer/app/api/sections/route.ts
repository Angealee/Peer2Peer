// app/api/sections/route.ts
// GET  /api/sections  — list all sections for the logged-in instructor
// POST /api/sections  — create a new section

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const user = requireAdmin(req);

    const sections = await prisma.section.findMany({
      where: { createdBy: user.id },
      include: { _count: { select: { students: true } } },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(sections);
  } catch (err: any) {
    if (err.message === "UNAUTHORIZED") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (err.message === "FORBIDDEN")    return NextResponse.json({ error: "Forbidden" },    { status: 403 });
    console.error("[GET /api/sections]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = requireAdmin(req);
    const { name, description } = await req.json();

    if (!name) {
      return NextResponse.json({ error: "Section name is required" }, { status: 400 });
    }

    const section = await prisma.section.create({
      data: { name, description, createdBy: user.id },
    });

    return NextResponse.json(section, { status: 201 });
  } catch (err: any) {
    if (err.message === "UNAUTHORIZED") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (err.message === "FORBIDDEN")    return NextResponse.json({ error: "Forbidden" },    { status: 403 });
    console.error("[POST /api/sections] FULL:", JSON.stringify(err, Object.getOwnPropertyNames(err)));
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}