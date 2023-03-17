/*
  Warnings:

  - You are about to alter the column `cost` on the `ChargingPort` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,3)`.
  - You are about to alter the column `cost` on the `Spot` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,3)`.

*/
-- AlterTable
ALTER TABLE "ChargingPort" ALTER COLUMN "cost" SET DATA TYPE DECIMAL(10,3);

-- AlterTable
ALTER TABLE "Spot" ALTER COLUMN "cost" SET DATA TYPE DECIMAL(10,3);
