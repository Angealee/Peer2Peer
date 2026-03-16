/*
  Warnings:

  - You are about to drop the column `sectionId` on the `Evaluation` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Evaluation" DROP CONSTRAINT "Evaluation_sectionId_fkey";

-- AlterTable
ALTER TABLE "Evaluation" DROP COLUMN "sectionId";

-- CreateTable
CREATE TABLE "EvaluationSection" (
    "id" SERIAL NOT NULL,
    "evaluationId" INTEGER NOT NULL,
    "sectionId" INTEGER NOT NULL,

    CONSTRAINT "EvaluationSection_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EvaluationSection" ADD CONSTRAINT "EvaluationSection_evaluationId_fkey" FOREIGN KEY ("evaluationId") REFERENCES "Evaluation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvaluationSection" ADD CONSTRAINT "EvaluationSection_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
