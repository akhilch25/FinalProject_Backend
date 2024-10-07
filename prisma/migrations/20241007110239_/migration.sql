/*
  Warnings:

  - A unique constraint covering the columns `[courseID]` on the table `TestDetails` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TestDetails_courseID_key" ON "TestDetails"("courseID");
