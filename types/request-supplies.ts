
export type PriorityRequestSuplies = 'Baja' | 'Media' | 'Alta';

export type StateRequestSupplies = 'EN SERVICIO' | 'FUERA DE SERVICIO';

export interface IRequestSupplies{
    nameSupplie: string,
    amountSuplie: number,
    priority: PriorityRequestSuplies,
    dateRequest: Date,
    stateRequest: StateRequestSupplies,
    dateProcessingRequest: Date
}
