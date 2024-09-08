import { Module } from '@nestjs/common';
import { CashRegisterSessionService } from './cash-register-session.service';
import { CashRegisterSessionController } from './cash-register-session.controller';
import {PrismaService} from 'src/prisma.service'

@Module({
  controllers: [CashRegisterSessionController],
  providers: [CashRegisterSessionService, PrismaService],
})
export class CashRegisterSessionModule {}
