'use client';
import React, { useEffect, useState } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Column, ColumnFilterElementTemplateOptions } from 'primereact/column';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { CONFIG_LOCALE_DATE, FORMAT_DATE_STRING, LOCALE } from '@/utils/constants_format';
import { useRouter } from 'next/navigation';
import { IRequestSupplies, PriorityRequestSuplies, StatusRequestSupplies } from '@/types/request-supplies';
import { RequestSupplieService } from '@/core/service/RequestSupplieService';
import { IPriorityRequestSupplies, StatusRequestSuppliesEnum } from '@/core/enum/request-supplies.enum';
import { PRIORITY_SUPPLIE, STATUS_REQUEST_SUPPLIE, STATUS_SUPPLIE } from '@/utils/constants_supplie';

const RequestFuelsPage = () => {
    const [listData, setListData] = useState<IRequestSupplies[]>([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState<DataTableFilterMeta>({});
    const router = useRouter();

    const clearFilter = () => {
        initFilters();
    };

    const HeaderComponent = () => {
        return (
            <div className="flex flex-column-reverse md:flex-row justify-content-between gap-4">
                <Button type="button" icon="pi pi-filter-slash" label="Quitar Filtros" outlined onClick={clearFilter} />
                <Button type="button" icon="pi pi-plus" label="Nueva Solicitud" onClick={() => router.push('/solicitar-suministros/nuevo')} />
            </div>
        );
    };

    useEffect(() => {
        RequestSupplieService.getAll().then((data) => {
            setListData(getPreparedData(data));
            setLoading(false);
        });

        initFilters();
    }, []);

    const getPreparedData = (data: IRequestSupplies[]) => {
        return [...(data || [])].map((d) => {
            d.requestAt = new Date(d.requestAt);
            return d;
        });
    };

    const initFilters = () => {
        setFilters({
            'supplie.name': {
                operator: FilterOperator.AND,
                constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }]
            },
            countSupplie: {
                operator: FilterOperator.AND,
                constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }]
            },
            priority: {
                operator: FilterOperator.OR,
                constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }]
            },
            requestAt: {
                operator: FilterOperator.AND,
                constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }]
            },
            statusRequest: {
                operator: FilterOperator.OR,
                constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }]
            },
            requestAtFinish: {
                operator: FilterOperator.AND,
                constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }]
            }
        });
    };

    const requestAtBodyTemplate = (rowData: IRequestSupplies) => {
        return rowData.requestAt.toLocaleDateString(LOCALE, CONFIG_LOCALE_DATE as any);
    };

    const requestAtFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
        return <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} dateFormat={FORMAT_DATE_STRING} placeholder={FORMAT_DATE_STRING} mask="99/99/9999" />;
    };

    const priorityBodyTemplate = (rowData: IRequestSupplies) => {
        return <span className={`item-badge status-${IPriorityRequestSupplies[rowData.priority]}`}>{rowData.priority}</span>;
    };

    const priorityFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
        return (
            <Dropdown
                value={options.value}
                options={PRIORITY_SUPPLIE}
                onChange={(e) => options.filterCallback(e.value, options.index)}
                itemTemplate={priorityItemTemplate}
                placeholder="Seleccione nivel de prioridad"
                className="p-column-filter"
                showClear
            />
        );
    };

    const priorityItemTemplate = (option: PriorityRequestSuplies) => {
        return <span className={`item-badge status-${IPriorityRequestSupplies[option]}`}>{option}</span>;
    };

    const statusRequestBodyTemplate = (rowData: IRequestSupplies) => {
        return <span className={`item-badge status-${StatusRequestSuppliesEnum[rowData.statusRequest]}`}>{rowData.statusRequest}</span>;
    };

    const statusRequestFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
        return (
            <Dropdown
                value={options.value}
                options={STATUS_REQUEST_SUPPLIE}
                onChange={(e) => options.filterCallback(e.value, options.index)}
                itemTemplate={statusRequestItemTemplate}
                placeholder="Seleccione un estado"
                className="p-column-filter"
                showClear
            />
        );
    };

    const statusRequestItemTemplate = (option: StatusRequestSupplies) => {
        return <span className={`item-badge status-${StatusRequestSuppliesEnum[option]}`}>{option}</span>
    };

    return (
        <div className="grid grid-nogutter">
            <div className="col-12 contain-card-full-h">
                <div className="card h-full">
                    <h5>Solicitud de Suministros</h5>
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
                        <Column field="supplie.name" header="Suministro" frozen sortable filter filterField="name" filterPlaceholder="Buscar por suministro" style={{ minWidth: '12rem', fontWeight: 'bold' }} />
                        <Column field="countSupplie" header="Cantidad de Unidades" dataType="numeric" sortable filter filterPlaceholder="Buscar por cantidad de suministro" style={{ minWidth: '6rem' }} />
                        <Column field="priority" header="Prioridad" align="center" body={priorityBodyTemplate} sortable filter filterElement={priorityFilterTemplate} style={{ minWidth: '6rem' }} />
                        <Column field="requestAt" header="Fecha de la Solicitud" align="center" body={requestAtBodyTemplate} dataType="date" sortable filter filterElement={requestAtFilterTemplate} style={{ minWidth: '10rem' }} />
                        <Column field="statusRequest" header="Estado de la Solicitud" align="center" body={statusRequestBodyTemplate} sortable filter filterElement={statusRequestFilterTemplate} style={{ minWidth: '6rem' }} />
                        <Column field="requestAtFinish" header="Fecha de Procesado" align="center" body={requestAtBodyTemplate} dataType="date" sortable filter filterElement={requestAtFilterTemplate} style={{ minWidth: '10rem' }} />
                    </DataTable>
                </div>
            </div>
        </div>
    );
};

export default RequestFuelsPage;
