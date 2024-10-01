-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "courseID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "difficulty_level" TEXT NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "empID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "performance_rate" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmployeeCourse" (
    "empID" TEXT NOT NULL,
    "courseID" TEXT NOT NULL,
    "completion_rate" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "EmployeeCourse_pkey" PRIMARY KEY ("empID","courseID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Course_courseID_key" ON "Course"("courseID");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_empID_key" ON "Employee"("empID");

-- AddForeignKey
ALTER TABLE "EmployeeCourse" ADD CONSTRAINT "EmployeeCourse_empID_fkey" FOREIGN KEY ("empID") REFERENCES "Employee"("empID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeCourse" ADD CONSTRAINT "EmployeeCourse_courseID_fkey" FOREIGN KEY ("courseID") REFERENCES "Course"("courseID") ON DELETE RESTRICT ON UPDATE CASCADE;
