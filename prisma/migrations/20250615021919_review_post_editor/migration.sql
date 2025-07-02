-- AlterTable
ALTER TABLE "PostsReview" ADD COLUMN     "editorId" INTEGER;

-- AddForeignKey
ALTER TABLE "PostsReview" ADD CONSTRAINT "PostsReview_editorId_fkey" FOREIGN KEY ("editorId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
