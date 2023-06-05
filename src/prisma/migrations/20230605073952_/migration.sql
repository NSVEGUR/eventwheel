/*
  Warnings:

  - You are about to drop the `custom_inputs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "custom_inputs" DROP CONSTRAINT "custom_inputs_ticketId_fkey";

-- DropTable
DROP TABLE "custom_inputs";

-- CreateTable
CREATE TABLE "custom_inputs_admin" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "optional" BOOLEAN NOT NULL,
    "ticketId" TEXT NOT NULL,

    CONSTRAINT "custom_inputs_admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "custom_inputs_user" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "ticketId" TEXT NOT NULL,
    "inputId" TEXT NOT NULL,

    CONSTRAINT "custom_inputs_user_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "custom_inputs_admin" ADD CONSTRAINT "custom_inputs_admin_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "admin_tickets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "custom_inputs_user" ADD CONSTRAINT "custom_inputs_user_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "user_tickets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "custom_inputs_user" ADD CONSTRAINT "custom_inputs_user_inputId_fkey" FOREIGN KEY ("inputId") REFERENCES "custom_inputs_admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
