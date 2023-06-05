/*
  Warnings:

  - You are about to drop the `custom_inputs_admin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `custom_inputs_user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "custom_inputs_admin" DROP CONSTRAINT "custom_inputs_admin_ticketId_fkey";

-- DropForeignKey
ALTER TABLE "custom_inputs_user" DROP CONSTRAINT "custom_inputs_user_inputId_fkey";

-- DropForeignKey
ALTER TABLE "custom_inputs_user" DROP CONSTRAINT "custom_inputs_user_ticketId_fkey";

-- AlterTable
ALTER TABLE "admin_tickets" ADD COLUMN     "labels" TEXT[],
ADD COLUMN     "optionals" BOOLEAN[];

-- AlterTable
ALTER TABLE "user_tickets" ADD COLUMN     "labels" TEXT[],
ADD COLUMN     "values" TEXT[];

-- DropTable
DROP TABLE "custom_inputs_admin";

-- DropTable
DROP TABLE "custom_inputs_user";
