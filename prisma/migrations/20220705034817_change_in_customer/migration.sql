/*
  Warnings:

  - You are about to drop the column `roles` on the `customers` table. All the data in the column will be lost.
  - Made the column `customerId` on table `orders` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_customerId_fkey";

-- AlterTable
ALTER TABLE "customers" DROP COLUMN "roles";

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "customerId" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "customerId" TEXT;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
