import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StatusInvoiceService } from './status-invoice.service';
import { CreateStatusInvoiceDto } from './dto/create-status-invoice.dto';
import { UpdateStatusInvoiceDto } from './dto/update-status-invoice.dto';

@Controller('status-invoice')
export class StatusInvoiceController {
  constructor(private readonly statusInvoiceService: StatusInvoiceService) {}

  @Post()
  create(@Body() createStatusInvoiceDto: CreateStatusInvoiceDto) {
    return this.statusInvoiceService.create(createStatusInvoiceDto);
  }

  @Get()
  findAll() {
    return this.statusInvoiceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.statusInvoiceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStatusInvoiceDto: UpdateStatusInvoiceDto) {
    return this.statusInvoiceService.update(+id, updateStatusInvoiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.statusInvoiceService.remove(+id);
  }
}
