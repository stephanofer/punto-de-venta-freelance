import { PartialType } from '@nestjs/mapped-types';
import { CreateCashRegisterSessionDto } from './create-cash-register-session.dto';

export class UpdateCashRegisterSessionDto extends PartialType(CreateCashRegisterSessionDto) {}
