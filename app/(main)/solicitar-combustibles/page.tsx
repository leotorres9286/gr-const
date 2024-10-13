'use client';
import React, { useEffect, useState } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Column, ColumnFilterElementTemplateOptions } from 'primereact/column';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { RequestFuelService } from '@/core/service/RequestFuelService';
import { IRequestFuel, StatusRequestFuel, TankLevel } from '@/types/request-fuel';
import { CONFIG_LOCALE_DATE, FORMAT_DATE_STRING, LOCALE } from '@/utils/constants_format';
import { StatusRequestFuelEnum, TankLevelRequestFuelEnum } from '@/core/enum/request-fuel.enum';
import { useRouter } from 'next/navigation';

const RequestFuelsPage = () => {
    const [listData, setListData] = useState<IRequestFuel[]>([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState<DataTableFilterMeta>({});

    const statuses: StatusRequestFuel[] = ['Iniciado', 'Procesado', 'Recibido'];
    const tankLevels: TankLevel[] = ['Bajo', 'Medio', 'Lleno'];

    const router = useRouter();

    const clearFilter = () => {
        initFilters();
    };

    const HeaderComponent = () => {
        return (
            <div className="flex flex-column-reverse md:flex-row justify-content-between gap-4">
                <Button type="button" icon="pi pi-filter-slash" label="Quitar Filtros" outlined onClick={clearFilter} />
                <Button type="button" icon="pi pi-plus" label="Nueva Solicitud" onClick={() => router.push('/solicitar-combustibles/nuevo')} />
            </div>
        );
    };

    useEffect(() => {
        RequestFuelService.getAll().then((data) => {
            setListData(getPreparedData(data));
            setLoading(false);
        });
        
        initFilters();
    }, []);

    const getPreparedData = (data: IRequestFuel[]) => {
        return [...(data || [])].map((d) => {
            d.requestAt = new Date(d.requestAt);
            return d;
        });
    };

    const initFilters = () => {
        setFilters({
            'equipment.name': {
                operator: FilterOperator.AND,
                constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
            },
            status: {
                operator: FilterOperator.OR,
                constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
            },
            requestAt: {
                operator: FilterOperator.AND,
                constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
            },
            countFuel: {
                operator: FilterOperator.AND,
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
            tankLevel: {
                operator: FilterOperator.AND,
                constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
            },
        });
    };

    const requestAtBodyTemplate = (rowData: IRequestFuel) => {
        return rowData.requestAt.toLocaleDateString(LOCALE, CONFIG_LOCALE_DATE as any);
    };

    const requestAtFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
        return <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} dateFormat={FORMAT_DATE_STRING} placeholder={FORMAT_DATE_STRING} mask="99/99/9999" />;
    };

    const statusBodyTemplate = (rowData: IRequestFuel) => {
        return <span className={`item-badge status-${StatusRequestFuelEnum[rowData.status]}`}>{rowData.status}</span>;
    };

    const statusFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
        return <Dropdown value={options.value} options={statuses} onChange={(e) => options.filterCallback(e.value, options.index)} itemTemplate={statusItemTemplate} placeholder="Seleccione un estado" className="p-column-filter" showClear />;
    };

    const statusItemTemplate = (option: StatusRequestFuel) => {
        return <span className={`item-badge status-${StatusRequestFuelEnum[option]}`}>{option}</span>;
    };

    const tankLevelBodyTemplate = (rowData: IRequestFuel) => {
        return <span className={`item-badge tank-level-${TankLevelRequestFuelEnum[rowData.tankLevel]}`}>{rowData.tankLevel}</span>;
    };

    const tankLevelFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
        return <Dropdown value={options.value} options={tankLevels} onChange={(e) => options.filterCallback(e.value, options.index)} itemTemplate={tankLevelItemTemplate} placeholder="Seleccione un nivel" className="p-column-filter" showClear />;
    };

    const tankLevelItemTemplate = (option: TankLevel) => {
        return <span className={`item-badge tank-level-${TankLevelRequestFuelEnum[option]}`}>{option}</span>;
    };

    return (
        <div className="grid grid-nogutter">
            <div className="col-12 contain-card-full-h">
                <div className="card h-full">
                    <h5>Solicitud de Combustibles</h5>
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
                        <Column field="equipment.name" header="Equipo" frozen sortable filter filterField="equipment.name" filterPlaceholder="Buscar por equipo" style={{ minWidth: '12rem', fontWeight: 'bold' }} />
                        <Column field="status" header="Estado" align="center" body={statusBodyTemplate} sortable filter filterElement={statusFilterTemplate} style={{ minWidth: '6rem' }} />
                        <Column field="requestAt" header="Fecha" align="center" body={requestAtBodyTemplate} dataType="date" sortable filter filterElement={requestAtFilterTemplate} style={{ minWidth: '10rem' }} />
                        <Column field="countFuel" header="Cantidad Combustible" dataType="numeric" sortable filter filterPlaceholder="Buscar por cantidad de combustible" style={{ minWidth: '6rem' }} />
                        <Column field="hourMeter" header="Horómetro" dataType="numeric" sortable filter filterPlaceholder="Buscar por horómetro" style={{ minWidth: '6rem' }} />
                        <Column field="odoMeter" header="Odómetro" dataType="numeric" sortable filter filterPlaceholder="Buscar por odómetro" style={{ minWidth: '6rem' }} />
                        <Column field="tankLevel" header="Nivel Tanque" align="center" body={tankLevelBodyTemplate} sortable filter filterElement={tankLevelFilterTemplate} style={{ minWidth: '6rem' }} />
                    </DataTable>
                </div>
            </div>
        </div>
    );
};

export default RequestFuelsPage;