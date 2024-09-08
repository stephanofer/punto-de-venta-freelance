import { Module } from '@nestjs/common';
import { SubUnitService } from './sub-unit.service';
import { SubUnitController } from './sub-unit.controller';
import {PrismaService} from 'src/prisma.service'

@Module({
  controllers: [SubUnitController],
  providers: [SubUnitService, PrismaService],
})
export class SubUnitModule {}
