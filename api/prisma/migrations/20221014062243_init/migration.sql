-- CreateTable
CREATE TABLE "Hazard" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "point" point NOT NULL,

    CONSTRAINT "Hazard_pkey" PRIMARY KEY ("id")
);
