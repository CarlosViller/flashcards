/*
  Warnings:

  - You are about to drop the column `userId` on the `CardBox` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[creatorEmail]` on the table `CardBox` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `creatorEmail` to the `CardBox` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CardBox" DROP CONSTRAINT "CardBox_userId_fkey";

-- AlterTable
ALTER TABLE "CardBox" DROP COLUMN "userId",
ADD COLUMN     "creatorEmail" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "_CardBoxToUser" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CardBoxToUser_AB_unique" ON "_CardBoxToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_CardBoxToUser_B_index" ON "_CardBoxToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "CardBox_creatorEmail_key" ON "CardBox"("creatorEmail");

-- AddForeignKey
ALTER TABLE "CardBox" ADD CONSTRAINT "CardBox_creatorEmail_fkey" FOREIGN KEY ("creatorEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CardBoxToUser" ADD CONSTRAINT "_CardBoxToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "CardBox"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CardBoxToUser" ADD CONSTRAINT "_CardBoxToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
