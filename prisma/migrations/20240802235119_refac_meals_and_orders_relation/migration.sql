/*
  Warnings:

  - You are about to drop the `_mealsOrder` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_mealsOrder" DROP CONSTRAINT "_mealsOrder_A_fkey";

-- DropForeignKey
ALTER TABLE "_mealsOrder" DROP CONSTRAINT "_mealsOrder_B_fkey";

-- DropTable
DROP TABLE "_mealsOrder";

-- CreateTable
CREATE TABLE "_MealsToOrders" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MealsToOrders_AB_unique" ON "_MealsToOrders"("A", "B");

-- CreateIndex
CREATE INDEX "_MealsToOrders_B_index" ON "_MealsToOrders"("B");

-- AddForeignKey
ALTER TABLE "_MealsToOrders" ADD CONSTRAINT "_MealsToOrders_A_fkey" FOREIGN KEY ("A") REFERENCES "Meals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MealsToOrders" ADD CONSTRAINT "_MealsToOrders_B_fkey" FOREIGN KEY ("B") REFERENCES "Orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
