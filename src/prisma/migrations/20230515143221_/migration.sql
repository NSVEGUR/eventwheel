/*
  Warnings:

  - You are about to drop the column `count` on the `admin_tickets` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[productId]` on the table `admin_tickets` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `available` to the `admin_tickets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `user_tickets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "admin_tickets" DROP COLUMN "count",
ADD COLUMN     "available" INTEGER NOT NULL,
ADD COLUMN     "sold" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "user_tickets" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "phone" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "admin_tickets_productId_key" ON "admin_tickets"("productId");
