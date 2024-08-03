/*
  Warnings:

  - Made the column `image` on table `Meals` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Meals" ALTER COLUMN "image" SET NOT NULL;
