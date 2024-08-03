/*
  Warnings:

  - You are about to alter the column `price` on the `Meals` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(12,2)`.

*/
-- AlterTable
ALTER TABLE "Meals" ALTER COLUMN "price" SET DATA TYPE DECIMAL(12,2);
