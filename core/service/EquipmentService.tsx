import { Equipment } from '@/types/equipment';

export const EquipmentService = {
    getAll() {
        return fetch('/mock/equipment.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data as Equipment[]);
    },
};
