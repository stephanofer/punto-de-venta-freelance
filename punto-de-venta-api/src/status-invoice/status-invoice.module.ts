import { Module } from '@nestjs/common';
import { StatusInvoiceService } from './status-invoice.service';
import { StatusInvoiceController } from './status-invoice.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [StatusInvoiceController],
  providers: [StatusInvoiceService, PrismaService],
})
export class StatusInvoiceModule {}
1;
