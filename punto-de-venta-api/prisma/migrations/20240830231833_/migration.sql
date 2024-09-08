/*
  Warnings:

  - A unique constraint covering the columns `[namePlural]` on the table `SubUnit` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[namePlural]` on the table `Unit` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `namePlural` to the `SubUnit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `namePlural` to the `Unit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SubUnit" ADD COLUMN     "namePlural" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Unit" ADD COLUMN     "namePlural" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "SubUnit_namePlural_key" ON "SubUnit"("namePlural");

-- CreateIndex
CREATE UNIQUE INDEX "Unit_namePlural_key" ON "Unit"("namePlural");
