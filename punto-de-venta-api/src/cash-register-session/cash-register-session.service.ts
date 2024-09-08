import { Injectable } from '@nestjs/common';
import { CreateCashRegisterSessionDto } from './dto/create-cash-register-session.dto';
import { UpdateCashRegisterSessionDto } from './dto/update-cash-register-session.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CashRegisterSessionService {
  constructor(private prisma: PrismaService) {}

  async create(createCashRegisterSessionDto: CreateCashRegisterSessionDto) {
    const cashRegisterSession = await this.prisma.cashRegisterSession.create({
      data: createCashRegisterSessionDto,
    });

    console.log(cashRegisterSession);

    return cashRegisterSession;
  }

  async findAll() {
    return `This action returns all cashRegisterSession`;
  }

  async findOne(id: number) {
    console.log(id);
    const cashRegisterSession =
      await this.prisma.cashRegisterSession.findUnique({
        where: {
          id: id,
        },
        include: {
          CashMovement: {
            include: {
              CashRegisterSession: true,
              MovementType: true,
            },
          },
          CashRegister: true,
          CreditPayment: true,
          Payments: true,
          Status: true,
        },
      });

    return cashRegisterSession;
  }

  async update(
    id: number,
    updateCashRegisterSessionDto: UpdateCashRegisterSessionDto,
  ) {
    return `This action updates a #${id} cashRegisterSession`;
  }

  async remove(id: number) {
    return `This action removes a #${id} cashRegisterSession`;
  }

  async validateCashRegisterSession() {
    const todayDate = new Date();
    const startOfDay = new Date(todayDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(todayDate.setHours(23, 59, 59, 999));
    const cashRegister = await this.prisma.cashRegisterSession.findMany({
      where: {
        openingDate: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });

    return cashRegister.length > 0;
  }
}
