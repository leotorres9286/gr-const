import { Equipment } from "./equipment";

export type StatusRequestFuel = 'Iniciado' | 'Recibido' | 'Procesado';

export type StatusRequestFuelLabel = {
  'Iniciado': 'init',
  'Recibido': 'recived',
  'Procesado': 'processed',
};

export type TankLevel = 'Bajo' | 'Medio' | 'Alto';

export interface ListRequestFuel {
  id: string;
  equipment: Equipment;
  countFuel: number;
  hourMeter: number;
  odoMeter: number;
  tankLevel: TankLevel;
  requestAt: Date;
  status: StatusRequestFuel;
}