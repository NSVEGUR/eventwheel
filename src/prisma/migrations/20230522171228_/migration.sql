/*
  Warnings:

  - A unique constraint covering the columns `[checkoutSessionId]` on the table `user_tickets` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `checkoutSessionId` to the `user_tickets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_tickets" ADD COLUMN     "checkoutSessionId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "user_tickets_checkoutSessionId_key" ON "user_tickets"("checkoutSessionId");
