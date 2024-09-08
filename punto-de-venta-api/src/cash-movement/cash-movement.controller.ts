import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CashMovementService } from './cash-movement.service';
import { CreateCashMovementDto } from './dto/create-cash-movement.dto';
import { UpdateCashMovementDto } from './dto/update-cash-movement.dto';

@Controller('cash-movement')
export class CashMovementController {
  constructor(private readonly cashMovementService: CashMovementService) {}

  @Post()
  create(@Body() createCashMovementDto: CreateCashMovementDto) {
    return this.cashMovementService.create(createCashMovementDto);
  }

  @Get()
  findAll() {
    return this.cashMovementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cashMovementService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCashMovementDto: UpdateCashMovementDto) {
    return this.cashMovementService.update(+id, updateCashMovementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cashMovementService.remove(+id);
  }
}
