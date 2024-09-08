import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { PrismaService } from 'src/prisma.service';
import { InvoiceUtilsService } from 'src/invoiceUtils.service';

@Module({
  controllers: [InvoiceController],
  providers: [InvoiceService, PrismaService, InvoiceUtilsService],
})
export class InvoiceModule {}
