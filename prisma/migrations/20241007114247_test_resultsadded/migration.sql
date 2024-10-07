-- CreateTable
CREATE TABLE "TestResults" (
    "id" SERIAL NOT NULL,
    "courseID" TEXT NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "passed" BOOLEAN NOT NULL,

    CONSTRAINT "TestResults_pkey" PRIMARY KEY ("id")
);
