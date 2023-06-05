-- AlterTable
ALTER TABLE "events" ADD COLUMN     "publishDate" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "custom_inputs" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "optional" BOOLEAN NOT NULL,
    "ticketId" TEXT NOT NULL,

    CONSTRAINT "custom_inputs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "custom_inputs" ADD CONSTRAINT "custom_inputs_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "admin_tickets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
