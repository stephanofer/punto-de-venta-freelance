import { Module } from '@nestjs/common';
import { TypeInvoiceService } from './type-invoice.service';
import { TypeInvoiceController } from './type-invoice.controller';
import {PrismaService} from 'src/prisma.service'

@Module({
  controllers: [TypeInvoiceController],
  providers: [TypeInvoiceService, PrismaService],
})
export class TypeInvoiceModule {}
