import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class InvoiceUtilsService {
  constructor(private prisma: PrismaService) {}
  // const prisma =

  async getNextInvoiceNumber() {
    return await this.prisma.$transaction(async (prisma) => {
      const sequence = await this.prisma.sequence.findUnique({
        where: { name: 'invoiceSequence' },
      });

      if (!sequence) {
        throw new Error('Secuencia no encontrada');
      }

      const currentValue = sequence.currentValue;
      const newValue = currentValue + 1;

      const formattedNumber = `1-${String(newValue).padStart(8, '0')}`;
      return formattedNumber;
    });
  }

  async getNextInvoiceNumberAdd() {
    return await this.prisma.$transaction(async (prisma) => {
      const sequence = await this.prisma.sequence.findUnique({
        where: { name: 'invoiceSequence' },
      });

      if (!sequence) {
        throw new Error('Secuencia no encontrada');
      }

      const currentValue = sequence.currentValue;
      const newValue = currentValue + 1;

      await this.prisma.sequence.update({
        where: { name: 'invoiceSequence' },
        data: { currentValue: newValue },
      });

      const formattedNumber = `1-${String(newValue).padStart(8, '0')}`;
      return formattedNumber;
    });
  }
}
