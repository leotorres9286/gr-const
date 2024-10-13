import { IRequestFuel } from '@/types/request-fuel';

export const RequestFuelService = {
    getAll() {
        return fetch('/mock/request-fuel.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data as IRequestFuel[]);
    },
};
