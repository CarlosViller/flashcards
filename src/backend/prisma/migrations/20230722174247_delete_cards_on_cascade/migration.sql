-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_boxId_fkey";

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_boxId_fkey" FOREIGN KEY ("boxId") REFERENCES "CardBox"("id") ON DELETE CASCADE ON UPDATE CASCADE;
