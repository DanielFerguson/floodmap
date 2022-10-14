/*
  Warnings:

  - You are about to alter the column `lat` on the `Hazard` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(11,8)`.
  - You are about to alter the column `lng` on the `Hazard` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(11,8)`.

*/
-- AlterTable
ALTER TABLE "Hazard" ALTER COLUMN "lat" SET DATA TYPE DECIMAL(11,8),
ALTER COLUMN "lng" SET DATA TYPE DECIMAL(11,8);
