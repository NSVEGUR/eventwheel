/*
  Warnings:

  - A unique constraint covering the columns `[ticketId,slNo]` on the table `user_tickets` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slNo` to the `user_tickets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_tickets" ADD COLUMN     "slNo" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "user_tickets_ticketId_slNo_key" ON "user_tickets"("ticketId", "slNo");
