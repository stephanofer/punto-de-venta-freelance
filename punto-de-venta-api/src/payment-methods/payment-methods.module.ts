import { Module } from '@nestjs/common';
import { PaymentMethodsService } from './payment-methods.service';
import { PaymentMethodsController } from './payment-methods.controller';
import {PrismaService} from 'src/prisma.service'

@Module({
  controllers: [PaymentMethodsController],
  providers: [PaymentMethodsService, PrismaService],
})
export class PaymentMethodsModule {}
