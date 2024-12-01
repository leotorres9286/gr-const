export type StatusSupplie = 'Disponible' | 'No Disponible';

export interface ISupplie extends IFormEquipment{
    id: string,
    registerAt: Date
}

export interface IFormEquipment {
    name: string;
    economicNumber: string;
    status: StatusSupplie;
}
