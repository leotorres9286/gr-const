import { IRequestSupplies } from "@/types/request-supplies";

export const RequestSupplieService = {
    getAll() {
        return fetch('/mock/request-supplie.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data as IRequestSupplies[]);
    }
};
