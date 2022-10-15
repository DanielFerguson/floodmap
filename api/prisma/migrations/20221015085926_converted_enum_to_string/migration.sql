/*
  Warnings:

  - Changed the type of `hazardType` on the `Hazard` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Hazard" DROP COLUMN "hazardType",
ADD COLUMN     "hazardType" TEXT NOT NULL;
