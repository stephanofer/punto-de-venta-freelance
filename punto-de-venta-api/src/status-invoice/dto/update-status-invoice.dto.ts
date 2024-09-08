import { PartialType } from '@nestjs/mapped-types';
import { CreateStatusInvoiceDto } from './create-status-invoice.dto';

export class UpdateStatusInvoiceDto extends PartialType(CreateStatusInvoiceDto) {}
