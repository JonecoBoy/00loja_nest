/*
  Warnings:

  - Made the column `identification` on table `customers` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "customers" ALTER COLUMN "identification" SET NOT NULL,
ALTER COLUMN "identification" SET DATA TYPE BIGINT;
