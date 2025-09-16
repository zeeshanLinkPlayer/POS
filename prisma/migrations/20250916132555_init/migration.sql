/*
  Warnings:

  - The values [MANAGER_CREATE,MANAGER_READ,MANAGER_UPDATE,PRODUCT_CREATE,PRODUCT_READ,PRODUCT_UPDATE,PRODUCT_DELETE] on the enum `Permission` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."Permission_new" AS ENUM ('USER_CREATE', 'USER_READ', 'USER_UPDATE', 'USER_DELETE', 'ORDER_CREATE', 'ORDER_READ', 'ORDER_UPDATE', 'ORDER_DELETE', 'MENU_CREATE', 'MENU_READ', 'MENU_UPDATE', 'MENU_DELETE');
ALTER TABLE "public"."UserPermission" ALTER COLUMN "permission" TYPE "public"."Permission_new" USING ("permission"::text::"public"."Permission_new");
ALTER TYPE "public"."Permission" RENAME TO "Permission_old";
ALTER TYPE "public"."Permission_new" RENAME TO "Permission";
DROP TYPE "public"."Permission_old";
COMMIT;
