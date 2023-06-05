/*
  Warnings:

  - Added the required column `anwser` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `boxId` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `question` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "anwser" TEXT NOT NULL,
ADD COLUMN     "boxId" INTEGER NOT NULL,
ADD COLUMN     "question" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "CardBox" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "CardBox_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_boxId_fkey" FOREIGN KEY ("boxId") REFERENCES "CardBox"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardBox" ADD CONSTRAINT "CardBox_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
