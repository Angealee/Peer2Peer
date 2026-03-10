// app/api/students/import/route.ts
// POST /api/students/import — upload an Excel file and bulk-import students into a section
//
// Expected multipart form fields:
//   file      — .xlsx file
//   sectionId — target section ID
//
// Expected Excel columns (case-insensitive): Name | Email | StudentID

import { NextRequest, NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

interface ExcelRow {
  name?: string;
  Name?: string;
  email?: string;
  Email?: string;
  studentid?: string;
  StudentID?: string;
  studentId?: string;
}

export async function POST(req: NextRequest) {
  try {
    const user = requireAdmin(req);

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const sectionId = formData.get("sectionId");

    if (!file || !sectionId) {
      return NextResponse.json({ error: "file and sectionId are required" }, { status: 400 });
    }

    // Verify section ownership
    const section = await prisma.section.findFirst({
      where: { id: Number(sectionId), createdBy: user.id },
    });
    if (!section) {
      return NextResponse.json({ error: "Section not found" }, { status: 404 });
    }

    // Parse Excel
    const buffer = Buffer.from(await file.arrayBuffer());
    const workbook = XLSX.read(buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const rows: ExcelRow[] = XLSX.utils.sheet_to_json(sheet);

    if (rows.length === 0) {
      return NextResponse.json({ error: "Excel file is empty" }, { status: 400 });
    }

    // Normalise & validate rows
    const students = rows.map((row, i) => {
      const name = row.name ?? row.Name;
      const email = row.email ?? row.Email;
      const studentId = row.studentid ?? row.StudentID ?? row.studentId ?? "";

      if (!name || !email) {
        throw new Error(`Row ${i + 2}: missing name or email`);
      }

      return { name: String(name), email: String(email), studentId: String(studentId), sectionId: Number(sectionId) };
    });

    // Bulk insert — skip duplicates (upsert by email+sectionId)
    let inserted = 0;
    let skipped = 0;

    for (const s of students) {
      try {
        await prisma.student.create({ data: s });
        inserted++;
      } catch (e: any) {
        if (e.code === "P2002") {
          skipped++; // duplicate
        } else {
          throw e;
        }
      }
    }

    return NextResponse.json({
      message: `Import complete: ${inserted} inserted, ${skipped} skipped (duplicates)`,
      inserted,
      skipped,
    });
  } catch (err: any) {
    if (err.message === "UNAUTHORIZED") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (err.message?.startsWith("Row ")) return NextResponse.json({ error: err.message }, { status: 400 });
    console.error("[POST /api/students/import]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
