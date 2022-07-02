/*
  Warnings:

  - You are about to drop the column `role` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "customers" ADD COLUMN     "roles" "Role"[];

-- AlterTable
ALTER TABLE "users" DROP COLUMN "role",
ADD COLUMN     "roles" "Role"[],
ALTER COLUMN "password" DROP DEFAULT;
