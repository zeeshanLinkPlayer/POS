-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "public"."Permission" ADD VALUE 'PRODUCT_CREATE';
ALTER TYPE "public"."Permission" ADD VALUE 'PRODUCT_READ';
ALTER TYPE "public"."Permission" ADD VALUE 'PRODUCT_UPDATE';
ALTER TYPE "public"."Permission" ADD VALUE 'PRODUCT_DELETE';

-- CreateTable
CREATE TABLE "public"."Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "barcode" TEXT,
    "category" TEXT NOT NULL,
    "supplier" TEXT,
    "tags" TEXT[],
    "costPrice" DOUBLE PRECISION NOT NULL,
    "salePrice" DOUBLE PRECISION NOT NULL,
    "takeawayPrice" DOUBLE PRECISION,
    "retailPrice" DOUBLE PRECISION,
    "taxRate" DOUBLE PRECISION NOT NULL,
    "takeawayTaxRate" DOUBLE PRECISION,
    "taxExempt" BOOLEAN NOT NULL DEFAULT false,
    "tillOrder" INTEGER NOT NULL DEFAULT 0,
    "sellOnTill" BOOLEAN NOT NULL DEFAULT true,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
