import { prisma } from "@/lib/prisma";

export async function checkEvaluationOwnership(
  evaluationId: number,
  userId: number
) {
  return prisma.evaluation.findFirst({
    where: {
      id: evaluationId,
      createdBy: userId,
    },
  });
}