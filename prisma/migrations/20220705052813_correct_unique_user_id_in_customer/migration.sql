/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `customers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `customers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "customers" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "customers_user_id_key" ON "customers"("user_id");
