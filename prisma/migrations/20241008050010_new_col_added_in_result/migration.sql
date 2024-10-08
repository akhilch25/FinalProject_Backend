/*
  Warnings:

  - Added the required column `empID` to the `TestResults` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TestResults" ADD COLUMN     "empID" TEXT NOT NULL;
