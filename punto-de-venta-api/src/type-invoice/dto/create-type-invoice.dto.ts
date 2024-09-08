import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTypeInvoiceDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
