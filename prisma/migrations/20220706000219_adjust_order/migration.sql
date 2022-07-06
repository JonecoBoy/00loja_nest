/*
  Warnings:

  - You are about to drop the column `first_name` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `orders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "first_name",
DROP COLUMN "last_name";
