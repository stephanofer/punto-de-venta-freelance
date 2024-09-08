/*
  Warnings:

  - You are about to drop the column `sub_total` on the `invoices` table. All the data in the column will be lost.
  - You are about to drop the column `taxes` on the `invoices` table. All the data in the column will be lost.
  - Added the required column `subTotal` to the `invoices` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "invoices" DROP COLUMN "sub_total",
DROP COLUMN "taxes",
ADD COLUMN     "subTotal" DECIMAL(10,2) NOT NULL;
