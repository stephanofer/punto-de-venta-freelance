/*
  Warnings:

  - You are about to drop the column `subTotal` on the `invoices` table. All the data in the column will be lost.
  - You are about to drop the column `total` on the `invoices` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "invoices" DROP COLUMN "subTotal",
DROP COLUMN "total";
