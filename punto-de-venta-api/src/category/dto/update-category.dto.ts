import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';

export type UpdateCategoryDto = Partial<CreateCategoryDto>;
