/*
  Warnings:

  - Added the required column `vehicleId` to the `Client` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BillingSettings" ALTER COLUMN "main" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ChargingPort" ALTER COLUMN "available" DROP NOT NULL,
ALTER COLUMN "power" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "vehicleId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "Spot" ALTER COLUMN "available" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("vehicleId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_billingSettingsId_fkey" FOREIGN KEY ("billingSettingsId") REFERENCES "BillingSettings"("billingSettingsId") ON DELETE RESTRICT ON UPDATE CASCADE;
