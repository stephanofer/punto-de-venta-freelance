import { PartialType } from '@nestjs/mapped-types';
import { CreateUnitDto } from './create-unit.dto';

export type UpdateUnitDto = Partial<CreateUnitDto>;
