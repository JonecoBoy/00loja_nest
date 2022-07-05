/*
  Warnings:

  - Added the required column `customerAddressId` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "customerAddressId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_customerAddressId_fkey" FOREIGN KEY ("customerAddressId") REFERENCES "customer_addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
