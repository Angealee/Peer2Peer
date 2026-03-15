// app/api/evaluate/[token]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function decodeToken(token: string): { studentId: number; evaluationId: number } | null {
  try {
    const base64 = token.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(base64.length + (4 - (base64.length % 4)) % 4, "=");
    const decoded = decodeURIComponent(Buffer.from(padded, "base64").toString("utf-8"));
    const parsed = JSON.parse(decoded);
    if (!parsed.studentId || !parsed.evaluationId) return null;
    return parsed;
  } catch (e) {
    return null;
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  const payload = decodeToken(token);

  if (!payload) {
    return NextResponse.json({ error: "Invalid or expired link" }, { status: 400 });
  }

  const { studentId, evaluationId } = payload;

  const evaluation = await prisma.evaluation.findUnique({
    where: { id: evaluationId },
    include: {
      criteria: true,
      section: { include: { students: true } },
    },
  });

  if (!evaluation) {
    return NextResponse.json({ error: "Evaluation not found" }, { status: 404 });
  }

  const student = evaluation.section.students.find((s) => s.id === studentId);
  if (!student) {
    return NextResponse.json({ error: "You are not part of this evaluation" }, { status: 403 });
  }

  const peers = evaluation.section.students.filter((s) => s.id !== studentId);

  const existingResponse = await prisma.evaluationResponse.findFirst({
    where: { evaluationId, evaluatorStudentId: studentId },
  });

  let isExpired = false;
  if (evaluation.deadline) {
    const deadline = new Date(evaluation.deadline);
    deadline.setHours(23, 59, 59, 999);
    isExpired = new Date() > deadline;
  }

  return NextResponse.json({
    student: { id: student.id, name: student.name, email: student.email },
    evaluation: {
      id: evaluation.id,
      title: evaluation.title,
      description: evaluation.description,
      deadline: evaluation.deadline,
      anonymous: evaluation.anonymous,
      criteria: evaluation.criteria.map((c) => ({
        id: c.id,
        name: c.criterionName,
        // Parse scoreOptions from JSON string, fallback to default 1-5
        scoreOptions: c.scoreOptions
          ? JSON.parse(c.scoreOptions)
          : [
              { value: 1, label: "Poor" },
              { value: 2, label: "Fair" },
              { value: 3, label: "Good" },
              { value: 4, label: "Great" },
              { value: 5, label: "Excellent" },
            ],
      })),
    },
    peers: peers.map((p) => ({ id: p.id, name: p.name })),
    alreadySubmitted: !!existingResponse,
    isExpired,
  });
}