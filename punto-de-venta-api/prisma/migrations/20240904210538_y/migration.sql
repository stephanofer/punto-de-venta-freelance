/*
  Warnings:

  - You are about to drop the column `anonymousCustomerId` on the `invoices` table. All the data in the column will be lost.
  - You are about to drop the column `customerName` on the `invoices` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[invoiceId]` on the table `anonymousCustomers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `invoiceId` to the `anonymousCustomers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "invoices" DROP CONSTRAINT "invoices_anonymousCustomerId_fkey";

-- AlterTable
ALTER TABLE "anonymousCustomers" ADD COLUMN     "invoiceId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "invoices" DROP COLUMN "anonymousCustomerId",
DROP COLUMN "customerName";

-- CreateIndex
CREATE UNIQUE INDEX "anonymousCustomers_invoiceId_key" ON "anonymousCustomers"("invoiceId");

-- AddForeignKey
ALTER TABLE "anonymousCustomers" ADD CONSTRAINT "anonymousCustomers_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "invoices"("invoiceId") ON DELETE RESTRICT ON UPDATE CASCADE;
