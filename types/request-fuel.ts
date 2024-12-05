import { IEquipment } from './equipment';

export type StatusRequestFuel = 'Iniciado' | 'Recibido' | 'Procesado';

export type TankLevel = 'Bajo' | 'Medio' | 'Lleno';

export interface IFormRequestFuel {
    equipment: IEquipment | null;
    countFuel: number | null;
    hourMeter: number;
    odoMeter: number;
    tankLevel: TankLevel | null;
}

export interface IRequestFuel extends IFormRequestFuel {
    id: string;
    equipment: IEquipment;
    countFuel: number;
    tankLevel: TankLevel;
    requestAt: Date;
    status: StatusRequestFuel;
}
