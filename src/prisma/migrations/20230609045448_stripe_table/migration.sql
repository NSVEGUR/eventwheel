-- AlterTable
ALTER TABLE "user_tickets" ADD COLUMN     "stripeId" TEXT;

-- CreateTable
CREATE TABLE "stripe_users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "phone" TEXT,
    "userId" TEXT,

    CONSTRAINT "stripe_users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "stripe_users_email_key" ON "stripe_users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "stripe_users_userId_key" ON "stripe_users"("userId");

-- AddForeignKey
ALTER TABLE "user_tickets" ADD CONSTRAINT "user_tickets_stripeId_fkey" FOREIGN KEY ("stripeId") REFERENCES "stripe_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stripe_users" ADD CONSTRAINT "stripe_users_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
