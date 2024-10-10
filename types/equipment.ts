export type StatusEquipment = 'En servicio' | 'Fuera de servicio';

export interface Equipment {
  id: string;
  name: string;
  economicNumber: string;
  hourMeter: number;
  odoMeter: number;
  registerAt: Date;
  status: StatusEquipment;
}