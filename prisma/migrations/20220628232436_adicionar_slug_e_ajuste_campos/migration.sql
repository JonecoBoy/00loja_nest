/*
  Warnings:

  - The values [mm,cm,m,km] on the enum `LengthUnit` will be removed. If these variants are still used in the database, this will fail.
  - The values [g,kg,ton] on the enum `WeightUnit` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `address_1` on the `customer_addresses` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `product_category` table. All the data in the column will be lost.
  - You are about to drop the column `minimum` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `cpf` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `product_category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `products` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `street` to the `customer_addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `product_category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DiscountType" AS ENUM ('PERCENTAGE', 'VALUE');

-- CreateEnum
CREATE TYPE "ImageType" AS ENUM ('COVER', 'BANNER', 'COMMON');

-- AlterEnum
BEGIN;
CREATE TYPE "LengthUnit_new" AS ENUM ('MM', 'CM', 'M');
ALTER TABLE "products" ALTER COLUMN "length_unit" DROP DEFAULT;
ALTER TABLE "products" ALTER COLUMN "length_unit" TYPE "LengthUnit_new" USING ("length_unit"::text::"LengthUnit_new");
ALTER TYPE "LengthUnit" RENAME TO "LengthUnit_old";
ALTER TYPE "LengthUnit_new" RENAME TO "LengthUnit";
DROP TYPE "LengthUnit_old";
ALTER TABLE "products" ALTER COLUMN "length_unit" SET DEFAULT 'MM';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "WeightUnit_new" AS ENUM ('G', 'KG', 'TON');
ALTER TABLE "products" ALTER COLUMN "weight_unit" DROP DEFAULT;
ALTER TABLE "products" ALTER COLUMN "weight_unit" TYPE "WeightUnit_new" USING ("weight_unit"::text::"WeightUnit_new");
ALTER TYPE "WeightUnit" RENAME TO "WeightUnit_old";
ALTER TYPE "WeightUnit_new" RENAME TO "WeightUnit";
DROP TYPE "WeightUnit_old";
ALTER TABLE "products" ALTER COLUMN "weight_unit" SET DEFAULT 'G';
COMMIT;

-- AlterTable
ALTER TABLE "customer_addresses" DROP COLUMN "address_1",
ADD COLUMN     "complement" TEXT,
ADD COLUMN     "number" INTEGER,
ADD COLUMN     "street" TEXT NOT NULL,
ALTER COLUMN "company" DROP NOT NULL;

-- AlterTable
ALTER TABLE "product_category" DROP COLUMN "productId",
ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "minimum",
ADD COLUMN     "minimum_amount" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "slug" TEXT NOT NULL,
ALTER COLUMN "weight_unit" SET DEFAULT E'G',
ALTER COLUMN "length_unit" SET DEFAULT E'MM';

-- AlterTable
ALTER TABLE "users" DROP COLUMN "cpf";

-- CreateTable
CREATE TABLE "Discount" (
    "id" TEXT NOT NULL,
    "discount_type" "DiscountType" NOT NULL,

    CONSTRAINT "Discount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderTransaction" (
    "id" TEXT NOT NULL,
    "product" TEXT NOT NULL,

    CONSTRAINT "OrderTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductFile" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "url" TEXT NOT NULL,
    "productId" TEXT,

    CONSTRAINT "ProductFile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "url" TEXT NOT NULL,
    "productId" TEXT,
    "productCategoryId" TEXT,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "product_category_slug_key" ON "product_category"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "products_slug_key" ON "products"("slug");

-- AddForeignKey
ALTER TABLE "ProductFile" ADD CONSTRAINT "ProductFile_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_productCategoryId_fkey" FOREIGN KEY ("productCategoryId") REFERENCES "product_category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
