import { Type } from 'class-transformer';
import {
  IsDate,
  IsNumber,
  IsInt,
  IsOptional,
  IsString,
  ValidateNested,
  IsDecimal,
} from 'class-validator';

class CreateInvoiceDetailDto {
  @IsInt()
  productId: number;

  @IsInt()
  quantity: number;

  @IsNumber()
  subTotal: number;
  
  @IsNumber()
  profitAmount: number;
}

class createAnonymousCustomerDto {
  @IsString()
  name: string;
}

class createPaymentDto {
  @IsNumber()
  amount: number;

  @IsString()
  paymentDate: Date;

  @IsInt()
  paymentMethodId: number;

  @IsInt()
  CashRegisterSessionId: number;
}

export class CreateInvoiceDto {
  @IsString()
  issueDateTime: Date;

  // @IsOptional()
  // @IsNumber()
  // remainingBalance: number;

  @IsInt()
  statusInvoiceId: number;

  @IsInt()
  typeInvoiceId: number;

  // anonymousCustomerId?: number;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => createAnonymousCustomerDto)
  anonymousCustomer: createAnonymousCustomerDto;


  @IsOptional()
  @IsInt()
  registeredCustomerId?: number;

  
  @ValidateNested({ each: true })
  @Type(() => createPaymentDto)
  paymentDetails: createPaymentDto;

  @ValidateNested({ each: true })
  @Type(() => CreateInvoiceDetailDto)
  invoiceDetails: CreateInvoiceDetailDto[];
}
