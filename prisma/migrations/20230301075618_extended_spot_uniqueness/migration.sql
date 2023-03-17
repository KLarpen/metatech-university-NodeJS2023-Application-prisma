/*
  Warnings:

  - A unique constraint covering the columns `[parkingId,place]` on the table `Spot` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Spot_parkingId_place_key" ON "Spot"("parkingId", "place");
