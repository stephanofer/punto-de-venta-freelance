import { Injectable } from '@nestjs/common';
import { CreateStatusInvoiceDto } from './dto/create-status-invoice.dto';
import { UpdateStatusInvoiceDto } from './dto/update-status-invoice.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class StatusInvoiceService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async create(createStatusInvoiceDto: CreateStatusInvoiceDto) {
    return await this.prisma.statusInvoice.create({
      data: createStatusInvoiceDto,
    });
  }

  async findAll() {
    return await this.prisma.statusInvoice.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.statusInvoice.findUnique({
      where: {
        statusInvoiceId: id,
      },
    });
  }

  async update(id: number, updateStatusInvoiceDto: UpdateStatusInvoiceDto) {
    return await this.prisma.statusInvoice.update({
      where: {
        statusInvoiceId: id,
      },
      data: updateStatusInvoiceDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.statusInvoice.delete({
      where: {
        statusInvoiceId: id,
      },
    });
  }
}
