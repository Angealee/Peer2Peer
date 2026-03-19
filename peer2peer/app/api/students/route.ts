// app/api/students/route.ts
// POST /api/students — manually add a single student to a section

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


export async function POST(req: NextRequest) {
  try {

    const user = requireAdmin(req);

    const {
      name,
      email,
      studentId,
      sectionId,
    } = await req.json();

    if (!name || !email || !sectionId) {
      return NextResponse.json(
        { error: "name, email, and sectionId are required" },
        { status: 400 }
      );
    }


    const sectionIdNum = Number(sectionId);


    // ✅ strict ownership check

    const section =
      await getOwnedSection(
        sectionIdNum,
        user.id
      );

    if (!section) {
      return NextResponse.json(
        { error: "Section not found" },
        { status: 404 }
      );
    }


    const student =
      await prisma.student.create({
        data: {
          name,
          email,
          studentId: studentId ?? "",
          sectionId: sectionIdNum,
        },
      });


    return NextResponse.json(
      student,
      { status: 201 }
    );


  } catch (err: any) {

    if (err.message === "UNAUTHORIZED")
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );


    if (err.code === "P2002") {
      return NextResponse.json(
        {
          error:
            "Student with this email already exists in this section",
        },
        { status: 409 }
      );
    }


    console.error(
      "[POST /api/students]",
      err
    );

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );

  }
}