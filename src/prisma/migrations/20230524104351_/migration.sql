/*
  Warnings:

  - You are about to drop the column `amount` on the `withdrawal_requests` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "withdrawal_requests" DROP COLUMN "amount";
