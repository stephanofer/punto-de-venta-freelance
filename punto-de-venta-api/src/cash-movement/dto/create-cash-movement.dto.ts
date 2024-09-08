import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCashMovementDto {
  @IsInt()
  @IsNotEmpty()
  cashRegisterSessionId: number;

  @IsInt()
  @IsNotEmpty()
  movementTypeId: number;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  reason: string;

  @IsString() // cambiar a Date Luego xddd
  @IsNotEmpty()
  timestamp: string;
}
