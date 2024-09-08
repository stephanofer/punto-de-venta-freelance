import { Module } from '@nestjs/common';
import { UnitService } from './unit.service';
import { UnitController } from './unit.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [UnitController],
  providers: [UnitService, PrismaService],
})
export class UnitModule {}
