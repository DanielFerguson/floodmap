/*
  Warnings:

  - Added the required column `updatedAt` to the `Hazard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Hazard" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
