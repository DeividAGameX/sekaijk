-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "publicOrder" INTEGER;

-- CreateTable
CREATE TABLE "TeamRole" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TeamRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TeamRoleToUsers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_TeamRoleToUsers_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_TeamRoleToUsers_B_index" ON "_TeamRoleToUsers"("B");

-- AddForeignKey
ALTER TABLE "_TeamRoleToUsers" ADD CONSTRAINT "_TeamRoleToUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "TeamRole"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeamRoleToUsers" ADD CONSTRAINT "_TeamRoleToUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
