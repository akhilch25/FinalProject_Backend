-- DropIndex
DROP INDEX "EmployeeCourse_empID_courseID_key";

-- AlterTable
ALTER TABLE "EmployeeCourse" ADD CONSTRAINT "EmployeeCourse_pkey" PRIMARY KEY ("empID", "courseID");
