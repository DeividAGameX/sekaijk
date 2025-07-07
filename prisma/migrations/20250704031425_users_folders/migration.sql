-- AlterTable
ALTER TABLE "UsersResources" ADD COLUMN     "cratedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "usersFoldersId" TEXT;

-- CreateTable
CREATE TABLE "UsersFolders" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "parentId" TEXT,
    "usersId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UsersFolders_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UsersFolders" ADD CONSTRAINT "UsersFolders_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersFolders" ADD CONSTRAINT "UsersFolders_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "UsersFolders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersResources" ADD CONSTRAINT "UsersResources_usersFoldersId_fkey" FOREIGN KEY ("usersFoldersId") REFERENCES "UsersFolders"("id") ON DELETE SET NULL ON UPDATE CASCADE;
