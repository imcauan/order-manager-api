/*
  Warnings:

  - Added the required column `author_name` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "author_name" TEXT NOT NULL;
