export type StatusEquipment = 'En servicio' | 'Fuera de servicio';

export interface IFormEquipment {
  name: string;
  economicNumber: string;
  hourMeter: number;
  odoMeter: number;
  status: StatusEquipment;
}

export interface IEquipment extends IFormEquipment {
  id: string;
  registerAt: Date;
}
