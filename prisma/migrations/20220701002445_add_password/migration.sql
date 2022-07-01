/*
  Warnings:

  - You are about to drop the column `deletedAt` on the `customer_addresses` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `users` table. All the data in the column will be lost.
  - Added the required column `password` to the `customers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "customer_addresses" DROP COLUMN "deletedAt",
ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "customers" DROP COLUMN "deletedAt",
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "password" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "deletedAt",
ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "products" DROP COLUMN "deletedAt",
ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "users" DROP COLUMN "deletedAt",
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "password" TEXT NOT NULL DEFAULT E'aaaaa';
