import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStatusInvoiceDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
