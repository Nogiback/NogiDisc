-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "profilePic" TEXT DEFAULT 'https://www.shutterstock.com/image-vector/default-avatar-profile-icon-transparent-600nw-2463868853.jpg',
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "googleID" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Disc" (
    "id" TEXT NOT NULL,
    "manufacturer" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "colour" TEXT DEFAULT '#FFFFFF',
    "speed" DOUBLE PRECISION NOT NULL,
    "glide" DOUBLE PRECISION NOT NULL,
    "turn" DOUBLE PRECISION NOT NULL,
    "fade" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "userID" TEXT NOT NULL,
    "bagID" TEXT,

    CONSTRAINT "Disc_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bag" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "userID" TEXT,

    CONSTRAINT "Bag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RefreshToken" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RefreshToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_googleID_key" ON "User"("googleID");

-- CreateIndex
CREATE UNIQUE INDEX "Disc_id_key" ON "Disc"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Bag_id_key" ON "Bag"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Bag_name_key" ON "Bag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_id_key" ON "RefreshToken"("id");

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_token_key" ON "RefreshToken"("token");

-- AddForeignKey
ALTER TABLE "Disc" ADD CONSTRAINT "Disc_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Disc" ADD CONSTRAINT "Disc_bagID_fkey" FOREIGN KEY ("bagID") REFERENCES "Bag"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bag" ADD CONSTRAINT "Bag_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
