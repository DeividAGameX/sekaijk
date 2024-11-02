-- CreateEnum
CREATE TYPE "PostsStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "ResourceType" AS ENUM ('VIDEO', 'AUDIO', 'DOCUMENT', 'IMAGE');

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "banner" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "rolesId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "social" (
    "id" SERIAL NOT NULL,
    "icon" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "social_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Roles" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permissions" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "permissions" TEXT NOT NULL,
    "roleId" INTEGER NOT NULL,

    CONSTRAINT "Permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Posts" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "banner" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT,
    "slug" TEXT,
    "draft" INTEGER,
    "status" "PostsStatus" NOT NULL DEFAULT 'DRAFT',
    "authorId" INTEGER NOT NULL,
    "categoryId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tags" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostsResources" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "postId" INTEGER NOT NULL,
    "resourceId" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "type" "ResourceType" NOT NULL DEFAULT 'IMAGE',

    CONSTRAINT "PostsResources_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "YtVideos" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "publishedAt" TIMESTAMP(3) NOT NULL,
    "videoId" TEXT NOT NULL,
    "type_video" INTEGER NOT NULL,

    CONSTRAINT "YtVideos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PostsToTags" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_name_key" ON "Users"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Roles_name_key" ON "Roles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Posts_title_key" ON "Posts"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Categories_name_key" ON "Categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Tags_name_key" ON "Tags"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_PostsToTags_AB_unique" ON "_PostsToTags"("A", "B");

-- CreateIndex
CREATE INDEX "_PostsToTags_B_index" ON "_PostsToTags"("B");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_rolesId_fkey" FOREIGN KEY ("rolesId") REFERENCES "Roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "social" ADD CONSTRAINT "social_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Permissions" ADD CONSTRAINT "Permissions_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Posts" ADD CONSTRAINT "Posts_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Posts" ADD CONSTRAINT "Posts_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostsResources" ADD CONSTRAINT "PostsResources_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostsToTags" ADD CONSTRAINT "_PostsToTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostsToTags" ADD CONSTRAINT "_PostsToTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
