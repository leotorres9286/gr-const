import { ISupplie } from "@/types/supplies";


export const SupplieService = {
    getAll() {
        return fetch('/mock/supplies.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data as ISupplie[]);
    },
    getOnService() {
        return fetch('/mock/supplies.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data.filter((item: ISupplie) => item.status === 'Disponible') as ISupplie[]);
    }
};
