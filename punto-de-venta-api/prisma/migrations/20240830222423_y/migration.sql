-- CreateTable
CREATE TABLE "Product" (
    "productId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "brandId" INTEGER NOT NULL,
    "unitId" INTEGER NOT NULL,
    "subUnitId" INTEGER NOT NULL,
    "stock" INTEGER NOT NULL,
    "sub_stock" INTEGER NOT NULL,
    "cost_price" DECIMAL(20,2) NOT NULL,
    "quantity_for_unit" INTEGER NOT NULL,
    "selling_price_for_1" DECIMAL(20,2) NOT NULL,
    "selling_price_for_3" DECIMAL(20,2) NOT NULL,
    "selling_price_for_6" DECIMAL(20,2) NOT NULL,
    "selling_price_for_12" DECIMAL(20,2) NOT NULL,
    "selling_price_for_unit" DECIMAL(20,2) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("productId")
);

-- CreateTable
CREATE TABLE "Category" (
    "categoryId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("categoryId")
);

-- CreateTable
CREATE TABLE "Brand" (
    "brandId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("brandId")
);

-- CreateTable
CREATE TABLE "Unit" (
    "unitId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Unit_pkey" PRIMARY KEY ("unitId")
);

-- CreateTable
CREATE TABLE "SubUnit" (
    "subUnitId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "SubUnit_pkey" PRIMARY KEY ("subUnitId")
);

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("categoryId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("brandId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("unitId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_subUnitId_fkey" FOREIGN KEY ("subUnitId") REFERENCES "SubUnit"("subUnitId") ON DELETE RESTRICT ON UPDATE CASCADE;
