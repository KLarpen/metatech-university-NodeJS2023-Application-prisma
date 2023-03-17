/*
  Warnings:

  - The primary key for the `Role` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `roleid` on the `Role` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "VehicleKind" AS ENUM ('bicycle', 'scooter', 'motorcycle', 'car', 'van', 'truck', 'bus');

-- CreateEnum
CREATE TYPE "CurrentKind" AS ENUM ('AC', 'DC');

-- DropForeignKey
ALTER TABLE "_AccountToRole" DROP CONSTRAINT "_AccountToRole_B_fkey";

-- AlterTable
ALTER TABLE "Role" DROP CONSTRAINT "Role_pkey",
DROP COLUMN "roleid",
ADD COLUMN     "roleId" BIGSERIAL NOT NULL,
ADD CONSTRAINT "Role_pkey" PRIMARY KEY ("roleId");

-- CreateTable
CREATE TABLE "Parking" (
    "parkingId" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR NOT NULL,
    "address" JSONB NOT NULL,
    "location" JSONB NOT NULL,

    CONSTRAINT "Parking_pkey" PRIMARY KEY ("parkingId")
);

-- CreateTable
CREATE TABLE "Spot" (
    "spotId" UUID NOT NULL DEFAULT gen_random_uuid(),
    "parkingId" UUID NOT NULL,
    "floor" INTEGER NOT NULL,
    "place" INTEGER NOT NULL,
    "cost" DOUBLE PRECISION NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "suitableFor" "VehicleKind"[],

    CONSTRAINT "Spot_pkey" PRIMARY KEY ("spotId")
);

-- CreateTable
CREATE TABLE "ElectricCharger" (
    "electricChargerId" UUID NOT NULL DEFAULT gen_random_uuid(),
    "model" VARCHAR NOT NULL,
    "parkingId" UUID,

    CONSTRAINT "ElectricCharger_pkey" PRIMARY KEY ("electricChargerId")
);

-- CreateTable
CREATE TABLE "PortType" (
    "portTypeId" BIGSERIAL NOT NULL,
    "socket" VARCHAR(64) NOT NULL,
    "current" "CurrentKind" NOT NULL,

    CONSTRAINT "PortType_pkey" PRIMARY KEY ("portTypeId")
);

-- CreateTable
CREATE TABLE "ChargingPort" (
    "chargingPortId" UUID NOT NULL DEFAULT gen_random_uuid(),
    "portTypeId" BIGINT NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "cost" DOUBLE PRECISION NOT NULL,
    "power" INTEGER NOT NULL,
    "electricChargerId" UUID NOT NULL,

    CONSTRAINT "ChargingPort_pkey" PRIMARY KEY ("chargingPortId")
);

-- CreateTable
CREATE TABLE "Vehicle" (
    "vehicleId" UUID NOT NULL DEFAULT gen_random_uuid(),
    "model" TEXT NOT NULL,
    "kind" "VehicleKind" NOT NULL,
    "portTypeId" BIGINT NOT NULL,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("vehicleId")
);

-- CreateTable
CREATE TABLE "Client" (
    "clientId" UUID NOT NULL DEFAULT gen_random_uuid(),
    "accountId" BIGINT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phones" JSONB NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("clientId")
);

-- CreateTable
CREATE TABLE "BillingSettings" (
    "billingSettingsId" UUID NOT NULL DEFAULT gen_random_uuid(),
    "clientId" UUID NOT NULL,
    "cardNo" VARCHAR(19) NOT NULL,
    "main" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "BillingSettings_pkey" PRIMARY KEY ("billingSettingsId")
);

-- CreateTable
CREATE TABLE "Rent" (
    "rentId" UUID NOT NULL DEFAULT gen_random_uuid(),
    "spotId" UUID NOT NULL,
    "chargingPortId" UUID NOT NULL,
    "clientId" UUID NOT NULL,
    "started" TIMESTAMPTZ NOT NULL,
    "finished" TIMESTAMPTZ,
    "freezedCostRates" JSONB NOT NULL,
    "totalPrice" DOUBLE PRECISION,

    CONSTRAINT "Rent_pkey" PRIMARY KEY ("rentId")
);

-- CreateTable
CREATE TABLE "Payment" (
    "paymentId" UUID NOT NULL DEFAULT gen_random_uuid(),
    "rentId" UUID NOT NULL,
    "billingSettingsId" UUID NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "when" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("paymentId")
);

-- CreateTable
CREATE TABLE "_ElectricChargerToSpot" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_ChargingPortToSpot" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "PortType_socket_key" ON "PortType"("socket");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_model_key" ON "Vehicle"("model");

-- CreateIndex
CREATE UNIQUE INDEX "Client_accountId_key" ON "Client"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "_ElectricChargerToSpot_AB_unique" ON "_ElectricChargerToSpot"("A", "B");

-- CreateIndex
CREATE INDEX "_ElectricChargerToSpot_B_index" ON "_ElectricChargerToSpot"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ChargingPortToSpot_AB_unique" ON "_ChargingPortToSpot"("A", "B");

-- CreateIndex
CREATE INDEX "_ChargingPortToSpot_B_index" ON "_ChargingPortToSpot"("B");

-- AddForeignKey
ALTER TABLE "Spot" ADD CONSTRAINT "Spot_parkingId_fkey" FOREIGN KEY ("parkingId") REFERENCES "Parking"("parkingId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ElectricCharger" ADD CONSTRAINT "ElectricCharger_parkingId_fkey" FOREIGN KEY ("parkingId") REFERENCES "Parking"("parkingId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChargingPort" ADD CONSTRAINT "ChargingPort_portTypeId_fkey" FOREIGN KEY ("portTypeId") REFERENCES "PortType"("portTypeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChargingPort" ADD CONSTRAINT "ChargingPort_electricChargerId_fkey" FOREIGN KEY ("electricChargerId") REFERENCES "ElectricCharger"("electricChargerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_portTypeId_fkey" FOREIGN KEY ("portTypeId") REFERENCES "PortType"("portTypeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BillingSettings" ADD CONSTRAINT "BillingSettings_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("clientId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rent" ADD CONSTRAINT "Rent_spotId_fkey" FOREIGN KEY ("spotId") REFERENCES "Spot"("spotId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rent" ADD CONSTRAINT "Rent_chargingPortId_fkey" FOREIGN KEY ("chargingPortId") REFERENCES "ChargingPort"("chargingPortId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rent" ADD CONSTRAINT "Rent_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("clientId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_rentId_fkey" FOREIGN KEY ("rentId") REFERENCES "Rent"("rentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccountToRole" ADD CONSTRAINT "_AccountToRole_B_fkey" FOREIGN KEY ("B") REFERENCES "Role"("roleId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ElectricChargerToSpot" ADD CONSTRAINT "_ElectricChargerToSpot_A_fkey" FOREIGN KEY ("A") REFERENCES "ElectricCharger"("electricChargerId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ElectricChargerToSpot" ADD CONSTRAINT "_ElectricChargerToSpot_B_fkey" FOREIGN KEY ("B") REFERENCES "Spot"("spotId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChargingPortToSpot" ADD CONSTRAINT "_ChargingPortToSpot_A_fkey" FOREIGN KEY ("A") REFERENCES "ChargingPort"("chargingPortId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChargingPortToSpot" ADD CONSTRAINT "_ChargingPortToSpot_B_fkey" FOREIGN KEY ("B") REFERENCES "Spot"("spotId") ON DELETE CASCADE ON UPDATE CASCADE;
