import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StatusCreditService } from './status-credit.service';
import { CreateStatusCreditDto } from './dto/create-status-credit.dto';
import { UpdateStatusCreditDto } from './dto/update-status-credit.dto';

@Controller('status-credit')
export class StatusCreditController {
  constructor(private readonly statusCreditService: StatusCreditService) {}

  @Post()
  create(@Body() createStatusCreditDto: CreateStatusCreditDto) {
    return this.statusCreditService.create(createStatusCreditDto);
  }

  @Get()
  findAll() {
    return this.statusCreditService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.statusCreditService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStatusCreditDto: UpdateStatusCreditDto) {
    return this.statusCreditService.update(+id, updateStatusCreditDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.statusCreditService.remove(+id);
  }
}
