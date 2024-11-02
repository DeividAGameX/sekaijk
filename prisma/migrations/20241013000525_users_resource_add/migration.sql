/*
  Warnings:

  - You are about to drop the `PostsResources` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PostsResources" DROP CONSTRAINT "PostsResources_postId_fkey";

-- DropTable
DROP TABLE "PostsResources";

-- CreateTable
CREATE TABLE "UsersResources" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "resourceId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "type" "ResourceType" NOT NULL DEFAULT 'IMAGE',

    CONSTRAINT "UsersResources_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UsersResources" ADD CONSTRAINT "UsersResources_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
