/*
  Warnings:

  - You are about to drop the column `point` on the `Hazard` table. All the data in the column will be lost.
  - Added the required column `lat` to the `Hazard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lng` to the `Hazard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Hazard" DROP COLUMN "point",
ADD COLUMN     "lat" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "lng" DECIMAL(65,30) NOT NULL;
