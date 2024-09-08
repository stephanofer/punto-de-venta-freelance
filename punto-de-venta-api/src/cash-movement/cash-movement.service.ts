import { Injectable } from '@nestjs/common';
import { CreateCashMovementDto } from './dto/create-cash-movement.dto';
import { UpdateCashMovementDto } from './dto/update-cash-movement.dto';
import { PrismaService } from 'src/prisma.service';
@Injectable()
export class CashMovementService {
  constructor(private prisma: PrismaService) {}

  async create(createCashMovementDto: CreateCashMovementDto) {
    const newMovement = await this.prisma.cashMovement.create({
      data: createCashMovementDto,
    });

    return newMovement;
  }

  async findAll() {
    return await this.prisma.cashMovement.findMany({
      include: {
        CashRegisterSession: true,
        MovementType: true,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} cashMovement`;
  }

  update(id: number, updateCashMovementDto: UpdateCashMovementDto) {
    return `This action updates a #${id} cashMovement`;
  }

  remove(id: number) {
    return `This action removes a #${id} cashMovement`;
  }
}
