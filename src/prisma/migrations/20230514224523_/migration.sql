/*
  Warnings:

  - Added the required column `count` to the `admin_tickets` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `admin_tickets` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "admin_tickets" ADD COLUMN     "count" INTEGER NOT NULL,
ALTER COLUMN "description" SET NOT NULL;
