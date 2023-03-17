/*
  Warnings:

  - A unique constraint covering the columns `[socket,current]` on the table `PortType` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "PortType_socket_key";

-- CreateIndex
CREATE UNIQUE INDEX "PortType_socket_current_key" ON "PortType"("socket", "current");
