-- CreateTable
CREATE TABLE "Role" (
    "roleid" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("roleid")
);

-- CreateTable
CREATE TABLE "Account" (
    "accountId" BIGSERIAL NOT NULL,
    "login" VARCHAR(64) NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("accountId")
);

-- CreateTable
CREATE TABLE "Session" (
    "sessionId" BIGSERIAL NOT NULL,
    "accountId" BIGINT NOT NULL,
    "token" TEXT NOT NULL,
    "ip" INET NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("sessionId")
);

-- CreateTable
CREATE TABLE "Area" (
    "areaId" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "ownerId" BIGINT NOT NULL,

    CONSTRAINT "Area_pkey" PRIMARY KEY ("areaId")
);

-- CreateTable
CREATE TABLE "Message" (
    "messageId" BIGSERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "fromId" BIGINT NOT NULL,
    "areaId" BIGINT NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("messageId")
);

-- CreateTable
CREATE TABLE "_AccountToRole" (
    "A" BIGINT NOT NULL,
    "B" BIGINT NOT NULL
);

-- CreateTable
CREATE TABLE "_AreaAccount" (
    "A" BIGINT NOT NULL,
    "B" BIGINT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Account_login_key" ON "Account"("login");

-- CreateIndex
CREATE UNIQUE INDEX "Session_accountId_key" ON "Session"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_token_key" ON "Session"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Area_name_key" ON "Area"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_AccountToRole_AB_unique" ON "_AccountToRole"("A", "B");

-- CreateIndex
CREATE INDEX "_AccountToRole_B_index" ON "_AccountToRole"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AreaAccount_AB_unique" ON "_AreaAccount"("A", "B");

-- CreateIndex
CREATE INDEX "_AreaAccount_B_index" ON "_AreaAccount"("B");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("accountId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Area" ADD CONSTRAINT "Area_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Account"("accountId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_fromId_fkey" FOREIGN KEY ("fromId") REFERENCES "Account"("accountId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "Area"("areaId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccountToRole" ADD CONSTRAINT "_AccountToRole_A_fkey" FOREIGN KEY ("A") REFERENCES "Account"("accountId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccountToRole" ADD CONSTRAINT "_AccountToRole_B_fkey" FOREIGN KEY ("B") REFERENCES "Role"("roleid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AreaAccount" ADD CONSTRAINT "_AreaAccount_A_fkey" FOREIGN KEY ("A") REFERENCES "Account"("accountId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AreaAccount" ADD CONSTRAINT "_AreaAccount_B_fkey" FOREIGN KEY ("B") REFERENCES "Area"("areaId") ON DELETE CASCADE ON UPDATE CASCADE;
