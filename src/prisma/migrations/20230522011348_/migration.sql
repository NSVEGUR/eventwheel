-- DropForeignKey
ALTER TABLE "user_tickets" DROP CONSTRAINT "user_tickets_userId_fkey";

-- AlterTable
ALTER TABLE "user_tickets" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "user_tickets" ADD CONSTRAINT "user_tickets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
