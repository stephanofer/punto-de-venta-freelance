/*
  Warnings:

  - A unique constraint covering the columns `[abbrevation]` on the table `SubUnit` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[abbrevation]` on the table `Unit` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `abbrevation` to the `SubUnit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `abbrevation` to the `Unit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SubUnit" ADD COLUMN     "abbrevation" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Unit" ADD COLUMN     "abbrevation" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "SubUnit_abbrevation_key" ON "SubUnit"("abbrevation");

-- CreateIndex
CREATE UNIQUE INDEX "Unit_abbrevation_key" ON "Unit"("abbrevation");
