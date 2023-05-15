/*
  Warnings:

  - You are about to drop the `faqs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "faqs" DROP CONSTRAINT "faqs_eventId_fkey";

-- AlterTable
ALTER TABLE "events" ADD COLUMN     "answers" TEXT[],
ADD COLUMN     "questions" TEXT[];

-- DropTable
DROP TABLE "faqs";
