/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[linkId,userId]` on the table `Vote`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Vote.linkId_userId_unique" ON "Vote"("linkId", "userId");
