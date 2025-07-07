/*
  Warnings:

  - Made the column `usersId` on table `UsersFolders` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "UsersFolders" DROP CONSTRAINT "UsersFolders_usersId_fkey";

-- AlterTable
ALTER TABLE "UsersFolders" ALTER COLUMN "usersId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "UsersFolders" ADD CONSTRAINT "UsersFolders_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
