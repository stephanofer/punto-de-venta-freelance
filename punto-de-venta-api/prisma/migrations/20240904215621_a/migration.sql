/*
  Warnings:

  - The primary key for the `StatusInvoice` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `statusId` on the `StatusInvoice` table. All the data in the column will be lost.
  - You are about to drop the column `statusId` on the `invoices` table. All the data in the column will be lost.
  - Added the required column `statusInvoiceId` to the `invoices` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "invoices" DROP CONSTRAINT "invoices_statusId_fkey";

-- AlterTable
ALTER TABLE "StatusInvoice" DROP CONSTRAINT "StatusInvoice_pkey",
DROP COLUMN "statusId",
ADD COLUMN     "statusInvoiceId" SERIAL NOT NULL,
ADD CONSTRAINT "StatusInvoice_pkey" PRIMARY KEY ("statusInvoiceId");

-- AlterTable
ALTER TABLE "invoices" DROP COLUMN "statusId",
ADD COLUMN     "statusInvoiceId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_statusInvoiceId_fkey" FOREIGN KEY ("statusInvoiceId") REFERENCES "StatusInvoice"("statusInvoiceId") ON DELETE RESTRICT ON UPDATE CASCADE;
