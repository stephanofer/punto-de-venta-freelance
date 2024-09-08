import { Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { PrismaService } from 'src/prisma.service';
import { InvoiceUtilsService } from 'src/invoiceUtils.service';

@Injectable()
export class InvoiceService {
  constructor(
    private prisma: PrismaService,
    private invoiceUtils: InvoiceUtilsService,
  ) {}

  async invoiceNumber() {
   return await this.invoiceUtils.getNextInvoiceNumber();
  }

  async create(createInvoiceDto: CreateInvoiceDto) {
    const {
      invoiceDetails,
      paymentDetails,
      anonymousCustomer,
      ...invoiceData
    } = createInvoiceDto;
    console.log(invoiceDetails);
    console.log(paymentDetails);
    console.log(anonymousCustomer);
    console.log(invoiceData);

    const invoiceNumber = await this.invoiceUtils.getNextInvoiceNumberAdd();

    return await this.prisma.invoice.create({
      data: {
        ...invoiceData,
        serialNumber: invoiceNumber,
        invoiceDetails: {
          create: invoiceDetails,
        },
        anonymousCustomer: {
          create: anonymousCustomer,
        },
        payment: {
          create: paymentDetails,
        },
      },
      include: {
        invoiceDetails: true,
        anonymousCustomer: true,
        payment: true,
        statusInvoice: true,
        typeInvoice: true
      },
    });
  }

  async findAll() {
    return await this.prisma.invoice.findMany({
      include: {
        statusInvoice: true,
        typeInvoice: true,
        anonymousCustomer: true,
        registeredCustomer: true,

        invoiceDetails: {
          include: {
            product: true,

          },
        },
        payment: {
          include: {
            paymentMethod: true,
            CashRegisterSession: true,
            
          },
        },
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} invoice`;
  }

  update(id: number, updateInvoiceDto: UpdateInvoiceDto) {
    return `This action updates a #${id} invoice`;
  }

  remove(id: number) {
    return `This action removes a #${id} invoice`;
  }



}
