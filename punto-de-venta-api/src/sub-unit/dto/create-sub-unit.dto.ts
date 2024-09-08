import {SubUnit} from '@prisma/client'
export type CreateSubUnitDto = Omit<SubUnit, 'subUnitId'>;
