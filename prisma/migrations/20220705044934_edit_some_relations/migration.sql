/*
  Warnings:

  - You are about to drop the column `customerId` on the `customer_addresses` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `productCategoryId` on the `images` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `images` table. All the data in the column will be lost.
  - You are about to drop the column `customerAddressId` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `customerId` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `product_files` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `products` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `customers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customer_address_id` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customer_id` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "customer_addresses" DROP CONSTRAINT "customer_addresses_customerId_fkey";

-- DropForeignKey
ALTER TABLE "customers" DROP CONSTRAINT "customers_userId_fkey";

-- DropForeignKey
ALTER TABLE "images" DROP CONSTRAINT "images_productCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "images" DROP CONSTRAINT "images_productId_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_customerAddressId_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_customerId_fkey";

-- DropForeignKey
ALTER TABLE "product_files" DROP CONSTRAINT "product_files_productId_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_orderId_fkey";

-- AlterTable
ALTER TABLE "customer_addresses" DROP COLUMN "customerId",
ADD COLUMN     "customer_id" TEXT;

-- AlterTable
ALTER TABLE "customers" DROP COLUMN "userId",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "images" DROP COLUMN "productCategoryId",
DROP COLUMN "productId",
ADD COLUMN     "product_category_id" TEXT,
ADD COLUMN     "product_id" TEXT;

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "customerAddressId",
DROP COLUMN "customerId",
ADD COLUMN     "customer_address_id" TEXT NOT NULL,
ADD COLUMN     "customer_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "product_files" DROP COLUMN "productId",
ADD COLUMN     "product_id" TEXT;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "orderId";

-- CreateTable
CREATE TABLE "_OrderToProduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_OrderToProduct_AB_unique" ON "_OrderToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_OrderToProduct_B_index" ON "_OrderToProduct"("B");

-- AddForeignKey
ALTER TABLE "customers" ADD CONSTRAINT "customers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_addresses" ADD CONSTRAINT "customer_addresses_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_customer_address_id_fkey" FOREIGN KEY ("customer_address_id") REFERENCES "customer_addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_files" ADD CONSTRAINT "product_files_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_product_category_id_fkey" FOREIGN KEY ("product_category_id") REFERENCES "product_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrderToProduct" ADD CONSTRAINT "_OrderToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrderToProduct" ADD CONSTRAINT "_OrderToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
