-- AddForeignKey
ALTER TABLE `EvaluationResponse` ADD CONSTRAINT `EvaluationResponse_evaluationId_fkey` FOREIGN KEY (`evaluationId`) REFERENCES `Evaluation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EvaluationResponse` ADD CONSTRAINT `EvaluationResponse_evaluatorStudentId_fkey` FOREIGN KEY (`evaluatorStudentId`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EvaluationResponse` ADD CONSTRAINT `EvaluationResponse_evaluatedStudentId_fkey` FOREIGN KEY (`evaluatedStudentId`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EvaluationResponse` ADD CONSTRAINT `EvaluationResponse_criterionId_fkey` FOREIGN KEY (`criterionId`) REFERENCES `EvaluationCriteria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
