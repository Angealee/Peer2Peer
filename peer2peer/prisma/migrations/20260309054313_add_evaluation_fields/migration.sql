/*
  Warnings:

  - You are about to drop the column `name` on the `evaluationcriteria` table. All the data in the column will be lost.
  - Added the required column `createdBy` to the `Evaluation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `criterionName` to the `EvaluationCriteria` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `evaluation` ADD COLUMN `anonymous` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `createdBy` INTEGER NOT NULL,
    ADD COLUMN `deadline` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `evaluationcriteria` DROP COLUMN `name`,
    ADD COLUMN `criterionName` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Evaluation` ADD CONSTRAINT `Evaluation_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
