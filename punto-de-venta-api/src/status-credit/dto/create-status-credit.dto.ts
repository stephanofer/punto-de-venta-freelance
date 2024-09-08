import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStatusCreditDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
