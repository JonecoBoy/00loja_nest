/*
  Warnings:

  - You are about to drop the column `email` on the `orders` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "orders_email_key";

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "email";
