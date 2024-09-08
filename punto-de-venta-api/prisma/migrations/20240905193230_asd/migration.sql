/*
  Warnings:

  - You are about to drop the column `ClosingDate` on the `CashRegisterSession` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CashRegisterSession" DROP COLUMN "ClosingDate",
ADD COLUMN     "closingDate" TIMESTAMP(3);
