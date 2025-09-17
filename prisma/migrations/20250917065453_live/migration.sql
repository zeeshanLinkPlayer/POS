/*
  Warnings:

  - You are about to drop the column `category` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `supplier` on the `Product` table. All the data in the column will be lost.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "public"."Permission" ADD VALUE 'MANAGER_CREATE';
ALTER TYPE "public"."Permission" ADD VALUE 'MANAGER_READ';
ALTER TYPE "public"."Permission" ADD VALUE 'MANAGER_UPDATE';
ALTER TYPE "public"."Permission" ADD VALUE 'PRODUCT_CREATE';
ALTER TYPE "public"."Permission" ADD VALUE 'PRODUCT_READ';
ALTER TYPE "public"."Permission" ADD VALUE 'PRODUCT_UPDATE';
ALTER TYPE "public"."Permission" ADD VALUE 'PRODUCT_DELETE';

-- AlterTable
ALTER TABLE "public"."Product" DROP COLUMN "category",
DROP COLUMN "supplier",
ADD COLUMN     "categoryId" TEXT,
ADD COLUMN     "supplierId" TEXT;

-- CreateTable
CREATE TABLE "public"."ProductCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ProductSupplier" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "contactName" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "address" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductSupplier_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductCategory_name_key" ON "public"."ProductCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ProductSupplier_name_key" ON "public"."ProductSupplier"("name");

-- AddForeignKey
ALTER TABLE "public"."Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."ProductCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Product" ADD CONSTRAINT "Product_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "public"."ProductSupplier"("id") ON DELETE SET NULL ON UPDATE CASCADE;
