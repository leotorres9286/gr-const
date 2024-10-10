'use client';
import React, { useEffect, useState } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Column, ColumnFilterElementTemplateOptions } from 'primereact/column';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { Equipment, StatusEquipment } from '@/types/equipment';
import { useRouter } from 'next/navigation';
import { EquipmentService } from '@/core/service/EquipmentService';
import { StatusEquipmetEnum } from '@/core/enum/equipment.enum';
import { CONFIG_LOCALE_DATE, FORMAT_DATE_STRING, LOCALE } from '@/utils/constants_format';

const EquipmentsPage = () => {
    const [listData, setListData] = useState<Equipment[]>([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState<DataTableFilterMeta>({});

    const statuses: StatusEquipment[] = ['En servicio', 'Fuera de servicio'];

    const router = useRouter();

    const clearFilter = () => {
        initFilters();
    };

    const HeaderComponent = () => {
        return (
            <div className="flex flex-column-reverse md:flex-row justify-content-between gap-4">
                <Button type="button" icon="pi pi-filter-slash" label="Quitar Filtros" outlined onClick={clearFilter} />
                <Button type="button" icon="pi pi-plus" label="Nuevo Equipo" onClick={() => router.push('/equipos/nuevo')} />
            </div>
        );
    };

    useEffect(() => {
        EquipmentService.getAll().then((data) => {
            setListData(getPreparedData(data));
            setLoading(false);
        });
        
        initFilters();
    }, []);

    const getPreparedData = (data: Equipment[]) => {
        return [...(data || [])].map((d) => {
            d.registerAt = new Date(d.registerAt);
            return d;
        });
    };

    const initFilters = () => {
        setFilters({
            name: {
                operator: FilterOperator.AND,
                constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
            },
            economicNumber: {
                operator: FilterOperator.AND,
                constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
            },
            status: {
                operator: FilterOperator.OR,
                constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
            },
            hourMeter: {
                operator: FilterOperator.AND,
                constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
            },
            odoMeter: {
                operator: FilterOperator.AND,
                constraints: [
                    { value: null, matchMode: FilterMatchMode.EQUALS },
                ],
            },
            registerAt: {
                operator: FilterOperator.AND,
                constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
            },
        });
    };

    const registerAtBodyTemplate = (rowData: Equipment) => {
        return rowData.registerAt.toLocaleDateString(LOCALE, CONFIG_LOCALE_DATE as any);
    };

    const registerAtFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
        return <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} dateFormat={FORMAT_DATE_STRING} placeholder={FORMAT_DATE_STRING} mask="99/99/9999" />;
    };

    const statusBodyTemplate = (rowData: Equipment) => {
        return <span className={`item-badge status-${StatusEquipmetEnum[rowData.status]}`}>{rowData.status}</span>;
    };

    const statusFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
        return <Dropdown value={options.value} options={statuses} onChange={(e) => options.filterCallback(e.value, options.index)} itemTemplate={statusItemTemplate} placeholder="Seleccione un estado" className="p-column-filter" showClear />;
    };

    const statusItemTemplate = (option: StatusEquipment) => {
        return <span className={`item-badge status-${StatusEquipmetEnum[option]}`}>{option}</span>;
    };

    return (
        <div className="grid grid-nogutter">
            <div className="col-12 contain-card-full-h">
                <div className="card h-full">
                    <h5>Equipos</h5>
                    <DataTable
                        value={listData}
                        paginator
                        className="p-datatable-gridlines pb-5"
                        showGridlines
                        rows={10}
                        dataKey="id"
                        sortMode="multiple"
                        removableSort
                        filters={filters}
                        filterDisplay="menu"
                        loading={loading}
                        responsiveLayout="scroll"
                        scrollable
                        scrollHeight="flex"
                        emptyMessage="No hay registros."
                        header={HeaderComponent}
                        stateStorage="session" 
                        stateKey="gr-const-dt-state-request-fuel-local"
                    >
                        <Column field="name" header="Nombre" sortable filter filterPlaceholder="Buscar por nombre" style={{ minWidth: '12rem' }} />
                        <Column field="economicNumber" header="No. Económico" sortable filter filterPlaceholder="Buscar por no. económico" style={{ minWidth: '12rem', fontWeight: 'bold' }} />
                        <Column field="status" header="Estado" align="center" body={statusBodyTemplate} sortable filter filterElement={statusFilterTemplate} style={{ minWidth: '6rem' }} />
                        <Column field="hourMeter" header="Horómetro" dataType="numeric" sortable filter filterPlaceholder="Buscar por horómetro" style={{ minWidth: '6rem' }} />
                        <Column field="odoMeter" header="Odómetro" dataType="numeric" sortable filter filterPlaceholder="Buscar por odómetro" style={{ minWidth: '6rem' }} />
                        <Column field="registerAt" header="Fecha Reg." align="center" body={registerAtBodyTemplate} dataType="date" sortable filter filterElement={registerAtFilterTemplate} style={{ minWidth: '10rem' }} />
                    </DataTable>
                </div>
            </div>
        </div>
    );
};

export default EquipmentsPage;