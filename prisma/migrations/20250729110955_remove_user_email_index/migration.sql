-- DropIndex
DROP INDEX "User_email_idx";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'user';
