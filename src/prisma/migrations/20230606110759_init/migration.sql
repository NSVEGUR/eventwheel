-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "organizer" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "subCategory" TEXT,
    "location" TEXT NOT NULL,
    "starts" TIMESTAMP(3) NOT NULL,
    "ends" TIMESTAMP(3) NOT NULL,
    "displayStart" BOOLEAN NOT NULL DEFAULT true,
    "displayEnd" BOOLEAN NOT NULL DEFAULT true,
    "recurrence" TEXT,
    "summary" TEXT,
    "description" TEXT,
    "image" TEXT,
    "views" INTEGER NOT NULL DEFAULT 0,
    "questions" TEXT[],
    "answers" TEXT[],
    "published" BOOLEAN NOT NULL DEFAULT false,
    "publishDate" TIMESTAMP(3),

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin_tickets" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "available" INTEGER NOT NULL,
    "displayAvailable" BOOLEAN NOT NULL DEFAULT true,
    "sold" INTEGER NOT NULL DEFAULT 0,
    "labels" TEXT[],
    "optionals" BOOLEAN[],

    CONSTRAINT "admin_tickets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_tickets" (
    "id" TEXT NOT NULL,
    "slNo" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "phone" TEXT,
    "checkoutSessionId" TEXT NOT NULL,
    "ticketId" TEXT NOT NULL,
    "userId" TEXT,
    "scanned" BOOLEAN NOT NULL DEFAULT false,
    "labels" TEXT[],
    "values" TEXT[],

    CONSTRAINT "user_tickets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "withdrawal_requests" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "transitNumber" INTEGER NOT NULL,
    "institutionNumber" INTEGER NOT NULL,
    "accountNumber" INTEGER NOT NULL,
    "approved" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "withdrawal_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_likes" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "admin_tickets_productId_key" ON "admin_tickets"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "user_tickets_checkoutSessionId_key" ON "user_tickets"("checkoutSessionId");

-- CreateIndex
CREATE UNIQUE INDEX "user_tickets_ticketId_slNo_key" ON "user_tickets"("ticketId", "slNo");

-- CreateIndex
CREATE UNIQUE INDEX "_likes_AB_unique" ON "_likes"("A", "B");

-- CreateIndex
CREATE INDEX "_likes_B_index" ON "_likes"("B");

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_tickets" ADD CONSTRAINT "admin_tickets_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_tickets" ADD CONSTRAINT "user_tickets_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "admin_tickets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_tickets" ADD CONSTRAINT "user_tickets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "withdrawal_requests" ADD CONSTRAINT "withdrawal_requests_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_likes" ADD CONSTRAINT "_likes_A_fkey" FOREIGN KEY ("A") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_likes" ADD CONSTRAINT "_likes_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
