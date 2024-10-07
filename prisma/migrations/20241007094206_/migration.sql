-- CreateTable
CREATE TABLE "TestDetails" (
    "id" SERIAL NOT NULL,
    "courseID" TEXT NOT NULL,
    "testData" JSONB NOT NULL,

    CONSTRAINT "TestDetails_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TestDetails" ADD CONSTRAINT "TestDetails_courseID_fkey" FOREIGN KEY ("courseID") REFERENCES "Course"("courseID") ON DELETE RESTRICT ON UPDATE CASCADE;
