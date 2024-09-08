import { Injectable } from '@nestjs/common';
import { CreateSubUnitDto } from './dto/create-sub-unit.dto';
import { UpdateSubUnitDto } from './dto/update-sub-unit.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SubUnitService {
  constructor(private prisma: PrismaService) {}

  async create(createSubUnitDto: CreateSubUnitDto) {
    return this.prisma.subUnit.create({
      data: createSubUnitDto,
    });
  }

  async findAll() {
    return await this.prisma.subUnit.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} subUnit`;
  }

  update(id: number, updateSubUnitDto: UpdateSubUnitDto) {
    return `This action updates a #${id} subUnit`;
  }

  remove(id: number) {
    return `This action removes a #${id} subUnit`;
  }
}
