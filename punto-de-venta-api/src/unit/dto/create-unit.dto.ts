import {Unit} from '@prisma/client'
export type CreateUnitDto = Omit<Unit, 'unitId'>
