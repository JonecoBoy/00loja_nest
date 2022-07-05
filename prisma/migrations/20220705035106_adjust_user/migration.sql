/*
  Warnings:

  - You are about to drop the column `customerId` on the `users` table. All the data in the column will be lost.
  - Added the required column `userId` to the `customers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_customerId_fkey";

-- AlterTable
ALTER TABLE "customers" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "customerId";

-- AddForeignKey
ALTER TABLE "customers" ADD CONSTRAINT "customers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
