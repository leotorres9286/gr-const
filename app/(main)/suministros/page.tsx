'use client';
import React, { useEffect, useState } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Column, ColumnFilterElementTemplateOptions } from 'primereact/column';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { ISupplie, StatusSupplie } from '@/types/supplies';
import { SupplieService } from '@/core/service/SupplieService';
import { CONFIG_LOCALE_DATE, FORMAT_DATE_STRING, LOCALE } from '@/utils/constants_format';
import { SupplieStatusEnum } from '@/core/enum/supplies.enum';
import { useRouter } from 'next/navigation';
import { STATUS_SUPPLIE } from '@/utils/constants_supplie';

const SuppliesPage = () => {
    const [listData, setListData] = useState<ISupplie[]>([]);
    const [filters, setFilters] = useState<DataTableFilterMeta>({});
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const clearFilter1 = () => {
        initfilters();
    };

    const HeaderComponent = () => {
        return (
            <div className="flex justify-content-between ">
                <Button type="button" icon="pi pi-filter-slash" label="Quitar Filtros" outlined onClick={clearFilter1} />
                <span className="p-input-icon-left ">
                    <i className="pi pi-search" />
                    <Button type="button" icon="pi pi-plus" label="Nuevo Suministro" onClick={() => router.push('/suministros/nuevo')} />
                </span>
            </div>
        );
    };

    useEffect(() => {
        SupplieService.getAll().then((data) => {
            setListData(getPreparedData(data));
            setLoading(false);
        });

        initfilters();
    }, []);

    const getPreparedData = (data: ISupplie[]) => {
        return [...(data || [])].map((d) => {
            d.registerAt = new Date(d.registerAt);
            return d;
        });
    };

    const initfilters = () => {
        setFilters({
            name: {
                operator: FilterOperator.AND,
                constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }]
            },
            economicNumber: {
                operator: FilterOperator.AND,
                constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }]
            },
            status: {
                operator: FilterOperator.OR,
                constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }]
            },
            registerAt: {
                operator: FilterOperator.AND,
                constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }]
            }
        });
    };

    const statusBodyTemplate = (rowData: ISupplie) => {
        return <span className={`customer-badge status-${SupplieStatusEnum[rowData.status]}`}>{rowData.status}</span>;
    };

    const statusFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
        return <Dropdown value={options.value} options={STATUS_SUPPLIE} onChange={(e) => options.filterCallback(e.value, options.index)} itemTemplate={statusItemTemplate} placeholder="Seleccione un estado" className="p-column-filter" showClear />;
    };

    const statusItemTemplate = (option: StatusSupplie) => {
        return <span className={`item-badge status-${SupplieStatusEnum[option]}`}>{option}</span>;
    };

    const registerAtBodyTemplate = (rowData: ISupplie) => {
        return rowData.registerAt.toLocaleDateString(LOCALE, CONFIG_LOCALE_DATE as any);
    };

    const registerAtFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
        return <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} dateFormat={FORMAT_DATE_STRING} placeholder={FORMAT_DATE_STRING} mask="99/99/9999" />;
    };

    const header1 = HeaderComponent();

    return (
        <div className="grid grid-nogutter">
            <div className="col-12 contain-card-full-h">
                <div className="card h-full">
                    <h5>Suministros</h5>
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
                    >
                        <Column field="name" header="Nombre" filter filterPlaceholder="Filtrar por Nombre" sortable style={{ minWidth: '12rem' }} />
                        <Column field="economicNumber" dataType="numeric" header="No. Económico" frozen sortable filter filterPlaceholder="Buscar por No. Económico" style={{ minWidth: '12rem', fontWeight: 'bold' }} />
                        <Column field="status" header="Estado" align="center" body={statusBodyTemplate} sortable filter filterElement={statusFilterTemplate} style={{ minWidth: '6rem' }} />
                        <Column field="registerAt" header="Fecha de Registro" align="center" body={registerAtBodyTemplate} dataType="date" sortable filter filterElement={registerAtFilterTemplate} style={{ minWidth: '10rem' }} />
                    </DataTable>
                </div>
            </div>
        </div>
    );
};

export default SuppliesPage;
