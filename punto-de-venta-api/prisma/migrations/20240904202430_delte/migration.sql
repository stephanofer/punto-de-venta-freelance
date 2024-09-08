/*
  Warnings:

  - You are about to drop the column `unit_price` on the `InvoiceDetail` table. All the data in the column will be lost.
  - You are about to drop the column `full_name` on the `registeredCustomers` table. All the data in the column will be lost.
  - Added the required column `unitPrice` to the `InvoiceDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullName` to the `registeredCustomers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "InvoiceDetail" DROP COLUMN "unit_price",
ADD COLUMN     "unitPrice" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "registeredCustomers" DROP COLUMN "full_name",
ADD COLUMN     "fullName" TEXT NOT NULL;
