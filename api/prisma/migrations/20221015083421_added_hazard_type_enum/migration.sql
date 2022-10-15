-- CreateEnum
CREATE TYPE "HazardType" AS ENUM ('TREE_DOWN', 'FLOODED_ROAD', 'OTHER');

-- AlterTable
ALTER TABLE "Hazard" ADD COLUMN     "hazardType" "HazardType" NOT NULL DEFAULT 'FLOODED_ROAD';
