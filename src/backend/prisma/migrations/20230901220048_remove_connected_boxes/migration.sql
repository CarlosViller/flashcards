/*
  Warnings:

  - You are about to drop the `_CardBoxToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CardBoxToUser" DROP CONSTRAINT "_CardBoxToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_CardBoxToUser" DROP CONSTRAINT "_CardBoxToUser_B_fkey";

-- DropTable
DROP TABLE "_CardBoxToUser";
