import { PartialType } from '@nestjs/mapped-types';
import { CreateSubUnitDto } from './create-sub-unit.dto';

export type UpdateSubUnitDto = Partial<CreateSubUnitDto>;
