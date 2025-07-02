/*
  Warnings:

  - The values [COMMENT] on the enum `NotificationType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "NotificationType_new" AS ENUM ('INFO', 'WARNING', 'SUCCESS', 'ERROR', 'SYSTEM', 'POST_REVIEW', 'POST_REVIEW_ACCEPTED', 'POST_REVIEW_CHANGED', 'POST_PUBLISHED', 'POST_ARCHIVED', 'CATEGORY', 'TAG', 'VIDEO');
ALTER TABLE "Notification" ALTER COLUMN "type" TYPE "NotificationType_new" USING ("type"::text::"NotificationType_new");
ALTER TYPE "NotificationType" RENAME TO "NotificationType_old";
ALTER TYPE "NotificationType_new" RENAME TO "NotificationType";
DROP TYPE "NotificationType_old";
COMMIT;

-- AlterTable
ALTER TABLE "PostsReview" ADD COLUMN     "comment" TEXT;
