import {Category} from '@prisma/client'

export type CreateCategoryDto = Omit<Category, 'categoryId'>
