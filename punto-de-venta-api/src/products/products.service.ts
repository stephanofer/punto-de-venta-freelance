import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    try {
      return await this.prisma.product.create({
        data: createProductDto,
        include: {
          category: true,
          brand: true,
          unit: true,
          subUnit: true,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(
            `El producto con el nombre ${createProductDto.name} ya existe`,
          );
        }
      }

      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    const products = await this.prisma.product.findMany({
      include: {
        category: true,
        brand: true,
        unit: true,
        subUnit: true,
      },
    });

    const formattedProducts = products.map((product) => ({
      ...product,
      cost_price: parseFloat(product.cost_price.toString()),
      selling_price_for_1: parseFloat(product.selling_price_for_1.toString()),
      selling_price_for_3: parseFloat(product.selling_price_for_3.toString()),
      selling_price_for_6: parseFloat(product.selling_price_for_6.toString()),
      selling_price_for_12: parseFloat(product.selling_price_for_12.toString()),
      selling_price_for_unit: parseFloat(
        product.selling_price_for_unit.toString(),
      ),
    }));

    return formattedProducts;
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: {
        productId: id,
      },
    });

    if (!product) {
      throw new NotFoundException(`No se encontró el producto`);
    }

    const formattedProduct = {
      ...product,
      cost_price: parseFloat(product.cost_price.toString()),
      selling_price_for_1: parseFloat(product.selling_price_for_1.toString()),
      selling_price_for_3: parseFloat(product.selling_price_for_3.toString()),
      selling_price_for_6: parseFloat(product.selling_price_for_6.toString()),
      selling_price_for_12: parseFloat(product.selling_price_for_12.toString()),
      selling_price_for_unit: parseFloat(
        product.selling_price_for_unit.toString(),
      ),
    };

    return formattedProduct;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const updatedProduct = await this.prisma.product.findUnique({
      where: {
        productId: id,
      },
      include: {
        category: true,
        brand: true,
        unit: true,
        subUnit: true,
      },
    });

    if (!updatedProduct) {
      throw new NotFoundException(`No se encontró el producto`);
    }

    try {
      return await this.prisma.product.update({
        where: {
          productId: id,
        },
        data: updateProductDto,
        include: {
          category: true,
          brand: true,
          unit: true,
          subUnit: true,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(
            `El producto con el nombre ${updateProductDto.name} ya existe`,
          );
        }
      }

      throw new InternalServerErrorException();
    }
  }

  async remove(id: number) {
    const deleteProduct = await this.prisma.product.findUnique({
      where: {
        productId: id,
      },
    });

    if (!deleteProduct) {
      throw new NotFoundException(`No se encontró el producto`);
    }

    return await this.prisma.product.delete({
      where: { productId: id },
      include: {
        category: true,
        brand: true,
        unit: true,
        subUnit: true,
      },
    });
  }
}
