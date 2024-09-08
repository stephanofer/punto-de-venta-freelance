import { IsDate, IsDateString, IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCashRegisterSessionDto {
  @IsInt()
  @IsNotEmpty()
  cashRegisterId: number;

  @IsDateString() //Cambiar a objeto Date
  @IsNotEmpty()
  openingDate: Date;

  @IsNumber()
  @IsNotEmpty()
  initialAmount: number;

  @IsInt()
  @IsNotEmpty()
  statusId: number;
}
