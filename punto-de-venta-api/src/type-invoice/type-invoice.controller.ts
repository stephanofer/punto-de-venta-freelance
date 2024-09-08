import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TypeInvoiceService } from './type-invoice.service';
import { CreateTypeInvoiceDto } from './dto/create-type-invoice.dto';
import { UpdateTypeInvoiceDto } from './dto/update-type-invoice.dto';

@Controller('type-invoice')
export class TypeInvoiceController {
  constructor(private readonly typeInvoiceService: TypeInvoiceService) {}

  @Post()
  create(@Body() createTypeInvoiceDto: CreateTypeInvoiceDto) {
    return this.typeInvoiceService.create(createTypeInvoiceDto);
  }

  @Get()
  findAll() {
    return this.typeInvoiceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typeInvoiceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTypeInvoiceDto: UpdateTypeInvoiceDto) {
    return this.typeInvoiceService.update(+id, updateTypeInvoiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typeInvoiceService.remove(+id);
  }
}
