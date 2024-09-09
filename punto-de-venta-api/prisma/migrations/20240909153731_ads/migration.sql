/*
  Warnings:

  - Added the required column `profitAmount` to the `InvoiceDetail` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "InvoiceDetail" DROP CONSTRAINT "InvoiceDetail_productId_fkey";

-- AlterTable
ALTER TABLE "InvoiceDetail" ADD COLUMN     "profitAmount" DECIMAL(10,2) NOT NULL,
ALTER COLUMN "productId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "InvoiceDetail" ADD CONSTRAINT "InvoiceDetail_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("productId") ON DELETE SET NULL ON UPDATE CASCADE;
