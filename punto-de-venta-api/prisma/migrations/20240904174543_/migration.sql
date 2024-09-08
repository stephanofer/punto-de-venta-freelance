/*
  Warnings:

  - You are about to alter the column `cost_price` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(20,2)` to `Decimal(10,2)`.
  - You are about to alter the column `selling_price_for_1` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(20,2)` to `Decimal(10,2)`.
  - You are about to alter the column `selling_price_for_3` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(20,2)` to `Decimal(10,2)`.
  - You are about to alter the column `selling_price_for_6` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(20,2)` to `Decimal(10,2)`.
  - You are about to alter the column `selling_price_for_12` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(20,2)` to `Decimal(10,2)`.
  - You are about to alter the column `selling_price_for_unit` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(20,2)` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "cost_price" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "selling_price_for_1" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "selling_price_for_3" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "selling_price_for_6" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "selling_price_for_12" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "selling_price_for_unit" SET DATA TYPE DECIMAL(10,2);

-- CreateTable
CREATE TABLE "invoices" (
    "invoiceId" SERIAL NOT NULL,
    "serialNumber" TEXT NOT NULL,
    "issueDateTime" TIMESTAMP(3) NOT NULL,
    "sub_total" DECIMAL(10,2) NOT NULL,
    "total" DECIMAL(10,2) NOT NULL,
    "taxes" DECIMAL(10,2) NOT NULL,
    "statusId" INTEGER NOT NULL,
    "typeInvoiceId" INTEGER NOT NULL,
    "anonymousCustomerId" INTEGER,
    "registeredCustomerId" INTEGER,
    "customerName" TEXT,

    CONSTRAINT "invoices_pkey" PRIMARY KEY ("invoiceId")
);

-- CreateTable
CREATE TABLE "InvoiceDetail" (
    "invoiceDetailId" SERIAL NOT NULL,
    "invoiceId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unit_price" DOUBLE PRECISION NOT NULL,
    "subTotal" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "InvoiceDetail_pkey" PRIMARY KEY ("invoiceDetailId")
);

-- CreateTable
CREATE TABLE "PaymentMethod" (
    "paymentMethodId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "PaymentMethod_pkey" PRIMARY KEY ("paymentMethodId")
);

-- CreateTable
CREATE TABLE "Payment" (
    "paymentId" SERIAL NOT NULL,
    "invoiceId" INTEGER NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "paymentDate" TIMESTAMP(3) NOT NULL,
    "paymentMethodId" INTEGER NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("paymentId")
);

-- CreateTable
CREATE TABLE "StatusInvoice" (
    "statusId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "StatusInvoice_pkey" PRIMARY KEY ("statusId")
);

-- CreateTable
CREATE TABLE "TypeInvoice" (
    "typeInvoiceId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "TypeInvoice_pkey" PRIMARY KEY ("typeInvoiceId")
);

-- CreateTable
CREATE TABLE "anonymousCustomers" (
    "anonymousCustomerId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "anonymousCustomers_pkey" PRIMARY KEY ("anonymousCustomerId")
);

-- CreateTable
CREATE TABLE "registeredCustomers" (
    "customerId" SERIAL NOT NULL,
    "full_name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "registeredCustomers_pkey" PRIMARY KEY ("customerId")
);

-- CreateTable
CREATE TABLE "credits" (
    "creditId" SERIAL NOT NULL,
    "customerId" INTEGER NOT NULL,
    "creditLimit" DOUBLE PRECISION NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL,
    "approvalDate" TIMESTAMP(3) NOT NULL,
    "statusCreditId" INTEGER NOT NULL,

    CONSTRAINT "credits_pkey" PRIMARY KEY ("creditId")
);

-- CreateTable
CREATE TABLE "CreditPayment" (
    "creditPaymentId" SERIAL NOT NULL,
    "creditId" INTEGER NOT NULL,
    "paymentAmount" DOUBLE PRECISION NOT NULL,
    "paymentDate" TIMESTAMP(3) NOT NULL,
    "paymentMethodId" INTEGER NOT NULL,

    CONSTRAINT "CreditPayment_pkey" PRIMARY KEY ("creditPaymentId")
);

-- CreateTable
CREATE TABLE "StatusCredit" (
    "statusCreditId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "StatusCredit_pkey" PRIMARY KEY ("statusCreditId")
);

-- CreateIndex
CREATE UNIQUE INDEX "invoices_serialNumber_key" ON "invoices"("serialNumber");

-- CreateIndex
CREATE UNIQUE INDEX "credits_customerId_key" ON "credits"("customerId");

-- CreateIndex
CREATE UNIQUE INDEX "StatusCredit_name_key" ON "StatusCredit"("name");

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "StatusInvoice"("statusId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_typeInvoiceId_fkey" FOREIGN KEY ("typeInvoiceId") REFERENCES "TypeInvoice"("typeInvoiceId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_anonymousCustomerId_fkey" FOREIGN KEY ("anonymousCustomerId") REFERENCES "anonymousCustomers"("anonymousCustomerId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_registeredCustomerId_fkey" FOREIGN KEY ("registeredCustomerId") REFERENCES "registeredCustomers"("customerId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceDetail" ADD CONSTRAINT "InvoiceDetail_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "invoices"("invoiceId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceDetail" ADD CONSTRAINT "InvoiceDetail_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("productId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "invoices"("invoiceId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_paymentMethodId_fkey" FOREIGN KEY ("paymentMethodId") REFERENCES "PaymentMethod"("paymentMethodId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "credits" ADD CONSTRAINT "credits_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "registeredCustomers"("customerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "credits" ADD CONSTRAINT "credits_statusCreditId_fkey" FOREIGN KEY ("statusCreditId") REFERENCES "StatusCredit"("statusCreditId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreditPayment" ADD CONSTRAINT "CreditPayment_creditId_fkey" FOREIGN KEY ("creditId") REFERENCES "credits"("creditId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreditPayment" ADD CONSTRAINT "CreditPayment_paymentMethodId_fkey" FOREIGN KEY ("paymentMethodId") REFERENCES "PaymentMethod"("paymentMethodId") ON DELETE RESTRICT ON UPDATE CASCADE;
