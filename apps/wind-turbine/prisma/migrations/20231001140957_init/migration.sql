/*
  Warnings:

  - You are about to drop the `TurbineData` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "TurbineData";

-- CreateTable
CREATE TABLE "WindTurbineData" (
    "id" SERIAL NOT NULL,
    "WindSpeedAvg" DOUBLE PRECISION NOT NULL,
    "RotorSpeedRpmAvg" DOUBLE PRECISION NOT NULL,
    "ActivePowerAvg" DOUBLE PRECISION NOT NULL,
    "NacellePositionAvg" DOUBLE PRECISION NOT NULL,
    "Feature1" DOUBLE PRECISION NOT NULL,
    "Feature3" DOUBLE PRECISION NOT NULL,
    "Feature7" DOUBLE PRECISION NOT NULL,
    "Feature28" DOUBLE PRECISION NOT NULL,
    "DaySin" DOUBLE PRECISION NOT NULL,
    "DayCos" DOUBLE PRECISION NOT NULL,
    "YearSin" DOUBLE PRECISION NOT NULL,
    "YearCos" DOUBLE PRECISION NOT NULL,
    "HourSin" DOUBLE PRECISION NOT NULL,
    "HourCos" DOUBLE PRECISION NOT NULL,
    "MinuteSin" DOUBLE PRECISION NOT NULL,
    "MinuteCos" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "WindTurbineData_pkey" PRIMARY KEY ("id")
);
