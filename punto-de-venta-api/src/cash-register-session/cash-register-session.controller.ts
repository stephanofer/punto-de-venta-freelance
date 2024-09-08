import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CashRegisterSessionService } from './cash-register-session.service';
import { CreateCashRegisterSessionDto } from './dto/create-cash-register-session.dto';
import { UpdateCashRegisterSessionDto } from './dto/update-cash-register-session.dto';

@Controller('cash-register-session')
export class CashRegisterSessionController {
  constructor(
    private readonly cashRegisterSessionService: CashRegisterSessionService,
  ) {}

  @Post()
  create(@Body() createCashRegisterSessionDto: CreateCashRegisterSessionDto) {
    return this.cashRegisterSessionService.create(createCashRegisterSessionDto);
  }

  @Get('/validate')
  validate() {
    return this.cashRegisterSessionService.validateCashRegisterSession();
  }

  @Get()
  findAll() {
    return this.cashRegisterSessionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cashRegisterSessionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCashRegisterSessionDto: UpdateCashRegisterSessionDto,
  ) {
    return this.cashRegisterSessionService.update(
      +id,
      updateCashRegisterSessionDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cashRegisterSessionService.remove(+id);
  }
}
