import { PartialType } from '@nestjs/mapped-types';
import { CreateStatusCreditDto } from './create-status-credit.dto';

export class UpdateStatusCreditDto extends PartialType(CreateStatusCreditDto) {}
