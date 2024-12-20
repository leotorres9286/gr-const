import { IPriorityRequestSupplies, StatusRequestSuppliesEnum } from '@/core/enum/request-supplies.enum';
import { ISupplie } from './supplies';

export type PriorityRequestSuplies = keyof typeof IPriorityRequestSupplies;
export type StatusRequestSupplies = keyof typeof StatusRequestSuppliesEnum;



export interface IRequestSupplies {
    id: string
    supplie: ISupplie
    countSupplie: number
    priority: PriorityRequestSuplies
    requestAt: Date
    statusRequest: StatusRequestSupplies
    requestAtFinish: Date
}
