import { Injectable } from '@nestjs/common';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PaymentMethodsService {
  constructor(private prisma: PrismaService) {}

  async create(createPaymentMethodDto: CreatePaymentMethodDto) {
    return await this.prisma.paymentMethod.create({
      data: createPaymentMethodDto,
    });
  }

  async findAll() {
    return await this.prisma.paymentMethod.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.paymentMethod.findUnique({
      where: {
        paymentMethodId: id,
      },
    });
  }

  async update(id: number, updatePaymentMethodDto: UpdatePaymentMethodDto) {
    return await this.prisma.paymentMethod.update({
      where: {
        paymentMethodId: id,
      },
      data: updatePaymentMethodDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.paymentMethod.delete({
      where: {
        paymentMethodId: id,
      },
    });
  }
}
