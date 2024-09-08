import { Module } from '@nestjs/common';
import { StatusCreditService } from './status-credit.service';
import { StatusCreditController } from './status-credit.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [StatusCreditController],
  providers: [StatusCreditService, PrismaService],
})
export class StatusCreditModule {}
