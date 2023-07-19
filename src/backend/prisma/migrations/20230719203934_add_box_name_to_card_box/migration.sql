/*
  Warnings:

  - Added the required column `boxName` to the `CardBox` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CardBox" ADD COLUMN     "boxName" TEXT NOT NULL;
