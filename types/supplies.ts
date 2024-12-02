export type StatusSupplie = 'Disponible' | 'No Disponible';

export interface ISupplie extends IFormSupplie{
    id: string;
    registerAt: Date;
}

export interface IFormSupplie {
    name: string;
    economicNumber: string;
    status: StatusSupplie;
}
