import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubUnitService } from './sub-unit.service';
import { CreateSubUnitDto } from './dto/create-sub-unit.dto';
import { UpdateSubUnitDto } from './dto/update-sub-unit.dto';

@Controller('sub-unit')
export class SubUnitController {
  constructor(private readonly subUnitService: SubUnitService) {}

  @Post()
  create(@Body() createSubUnitDto: CreateSubUnitDto) {
    return this.subUnitService.create(createSubUnitDto);
  }

  @Get()
  findAll() {
    return this.subUnitService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subUnitService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubUnitDto: UpdateSubUnitDto) {
    return this.subUnitService.update(+id, updateSubUnitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subUnitService.remove(+id);
  }
}
