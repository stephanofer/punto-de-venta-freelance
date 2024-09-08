import { Injectable } from '@nestjs/common';
import { CreateStatusCreditDto } from './dto/create-status-credit.dto';
import { UpdateStatusCreditDto } from './dto/update-status-credit.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class StatusCreditService {
  constructor(private prisma: PrismaService) {}

  async create(createStatusCreditDto: CreateStatusCreditDto) {
    return await this.prisma.statusCredit.create({
      data: createStatusCreditDto,
    });
  }

  async findAll() {
    return await this.prisma.statusCredit.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.statusCredit.findUnique({
      where: {
        statusCreditId: id,
      },
    });
  }

  async update(id: number, updateStatusCreditDto: UpdateStatusCreditDto) {
    return await this.prisma.statusCredit.update({
      where: {
        statusCreditId: id,
      },
      data: updateStatusCreditDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.statusCredit.delete({
      where: {
        statusCreditId: id,
      },
    });
  }
}
