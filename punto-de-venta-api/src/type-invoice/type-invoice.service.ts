import { Injectable } from '@nestjs/common';
import { CreateTypeInvoiceDto } from './dto/create-type-invoice.dto';
import { UpdateTypeInvoiceDto } from './dto/update-type-invoice.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TypeInvoiceService {
  constructor(private prisma: PrismaService) {}

  async create(createTypeInvoiceDto: CreateTypeInvoiceDto) {
    return await this.prisma.typeInvoice.create({
      data: createTypeInvoiceDto,
    });
  }

  async findAll() {
    return await this.prisma.typeInvoice.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.typeInvoice.findUnique({
      where: {
        typeInvoiceId: id,
      },
    });
  }

  async update(id: number, updateTypeInvoiceDto: UpdateTypeInvoiceDto) {
    return await this.prisma.typeInvoice.update({
      where: {
        typeInvoiceId: id,
      },
      data: updateTypeInvoiceDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.typeInvoice.delete({
      where: {
        typeInvoiceId: id,
      },
    });
  }
}
