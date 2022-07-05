/*
  Warnings:

  - You are about to drop the column `email` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `first_name` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `customers` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "customers_email_key";

-- AlterTable
ALTER TABLE "customers" DROP COLUMN "email",
DROP COLUMN "first_name",
DROP COLUMN "last_name",
DROP COLUMN "password";
