import { PartialType } from '@nestjs/mapped-types';
import { CreateTypeInvoiceDto } from './create-type-invoice.dto';

export class UpdateTypeInvoiceDto extends PartialType(CreateTypeInvoiceDto) {}
