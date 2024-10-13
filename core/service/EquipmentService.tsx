import { IEquipment } from '@/types/equipment';

export const EquipmentService = {
    getAll() {
        return fetch('/mock/equipment.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data as IEquipment[]);
    },
    getOnService() {
        return fetch('/mock/equipment.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data.filter((item: IEquipment) => item.status === 'En servicio') as IEquipment[]);
    },
};
