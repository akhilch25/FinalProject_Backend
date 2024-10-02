/*
  Warnings:

  - The primary key for the `EmployeeCourse` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[empID,courseID]` on the table `EmployeeCourse` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "EmployeeCourse" DROP CONSTRAINT "EmployeeCourse_pkey";

-- CreateIndex
CREATE UNIQUE INDEX "EmployeeCourse_empID_courseID_key" ON "EmployeeCourse"("empID", "courseID");
