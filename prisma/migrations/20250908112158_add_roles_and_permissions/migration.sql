-- CreateEnum
CREATE TYPE "public"."UserRole" AS ENUM ('ADMIN', 'MANAGER', 'USER');

-- CreateEnum
CREATE TYPE "public"."Permission" AS ENUM ('USER_CREATE', 'USER_READ', 'USER_UPDATE', 'USER_DELETE', 'MANAGER_CREATE', 'MANAGER_READ', 'MANAGER_UPDATE');

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "createdById" TEXT,
ADD COLUMN     "permissions" "public"."Permission"[],
ADD COLUMN     "role" "public"."UserRole" NOT NULL DEFAULT 'USER';

-- CreateIndex
CREATE INDEX "User_createdById_idx" ON "public"."User"("createdById");

-- AddForeignKey
ALTER TABLE "public"."User" ADD CONSTRAINT "User_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
