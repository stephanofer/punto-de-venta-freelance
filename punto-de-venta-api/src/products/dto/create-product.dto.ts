import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {

  @IsString({message: "El nombre no es un texto"})
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  categoryId: number;

  @IsNumber()
  @IsNotEmpty()
  brandId: number;

  @IsNumber()
  @IsNotEmpty()
  unitId: number;

  @IsNumber()
  @IsNotEmpty()
  subUnitId: number;

  @IsNumber()
  @IsNotEmpty()
  stock: number;

  @IsNumber()
  @IsNotEmpty()
  sub_stock: number;

  @IsNumber()
  @IsNotEmpty()
  cost_price: number;

  @IsNumber()
  @IsNotEmpty()
  quantity_for_unit: number;

  @IsNumber()
  @IsNotEmpty()
  selling_price_for_1: number;

  @IsNumber()
  @IsNotEmpty()
  selling_price_for_3: number;

  @IsNumber()
  @IsNotEmpty()
  selling_price_for_6: number;

  @IsNumber()
  @IsNotEmpty()
  selling_price_for_12: number;

  @IsNumber()
  @IsNotEmpty()
  selling_price_for_unit: number;
}

// import { Product } from '@prisma/client';

// // omit types
// export type CreateProductDto = Omit<Product, 'productId'>;
