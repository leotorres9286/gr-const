'use client';
import React, { useEffect, useState } from 'react';
import { CustomerService } from '../../../demo/service/CustomerService';
import { ProductService } from '../../../demo/service/ProductService';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Column, ColumnFilterApplyTemplateOptions, ColumnFilterClearTemplateOptions, ColumnFilterElementTemplateOptions } from 'primereact/column';
import { DataTable, DataTableExpandedRows, DataTableFilterMeta } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';
import { ProgressBar } from 'primereact/progressbar';
import { Rating } from 'primereact/rating';
import { Slider } from 'primereact/slider';
import { ToggleButton } from 'primereact/togglebutton';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import type { Demo } from '@/types';
import { classNames } from 'primereact/utils';
import styles from './index.module.scss';
import { PriorityRequestSuplies } from '@/types/request-supplies';
import { IPriorityRequestSupplies } from '@/core/enum/request-supplies';
import { useRouter } from 'next/router';
import { ISupplie } from '@/types/supplies';
import { EquipmentService } from '@/core/service/EquipmentService';
import { SupplieService } from '@/core/service/SupplieService';

const SuppliesPage = () => {
    const [listData, setListData] = useState<ISupplie[]>([]);
    const [filters, setFilters] = useState<DataTableFilterMeta>({});
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [loading, setLoading] = useState(true);

    const statusRequestSupplies: PriorityRequestSuplies[] = ['Baja', 'Media', 'Alta'];

    const clearFilter1 = () => {
        initfilters();
    };

    const onGlobalFilterChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        let _filters = { ...filters };
        (_filters['global'] as any).value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const HeaderComponent = () => {
        return (
            <div className="flex justify-content-between ">
                <Button type="button" icon="pi pi-filter-slash" label="Quitar Filtros" outlined onClick={clearFilter1} />
                <span className="p-input-icon-left ">
                    <i className="pi pi-search" />
                    <Button type="button" icon="pi pi-plus" label="Nuevo Suministro" />
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

    const formatDate = (value: Date) => {
        return value.toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const formatCurrency = (value: number) => {
        return value.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
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

    const filterClearTemplate = (options: ColumnFilterClearTemplateOptions) => {
        return <Button type="button" icon="pi pi-times" onClick={options.filterClearCallback} severity="secondary"></Button>;
    };

    const filterApplyTemplate = (options: ColumnFilterApplyTemplateOptions) => {
        return <Button type="button" icon="pi pi-check" onClick={options.filterApplyCallback} severity="success"></Button>;
    };


    const representativesItemTemplate = (option: any) => {
        return (
            <div className="p-multiselect-representative-option">
                <img alt={option.name} src={`/demo/images/avatar/${option.image}`} width={32} style={{ verticalAlign: 'middle' }} />
                <span style={{ marginLeft: '.5em', verticalAlign: 'middle' }}>{option.name}</span>
            </div>
        );
    };

    const dateBodyTemplate = (rowData: ISupplie) => {
        return formatDate(rowData.registerAt);
    };

    const dateFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
        return <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" mask="99/99/9999" />;
    };

    const balanceBodyTemplate = (rowData: Demo.Customer) => {
        return formatCurrency(rowData.balance as number);
    };

    const balanceFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
        return <InputNumber value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} mode="currency" currency="USD" locale="en-US" />;
    };

    const statusBodyTemplate = (rowData: Demo.Customer) => {
        return <span className={`customer-badge status-${rowData.status}`}>{rowData.status}</span>;
    };

    const requestStatusTemplate = (options: ColumnFilterElementTemplateOptions) => {
        return (
            <Dropdown
                value={options.value}
                options={statusRequestSupplies}
                onChange={(e) => options.filterCallback(e.value, options.index)}
                itemTemplate={requestStatusItemTemplate}
                placeholder="Seleccione un nivel"
                className="p-column-filter"
                showClear
            />
        );
    };

    const requestStatusItemTemplate = (option: PriorityRequestSuplies) => {
        return <span className={`item-badge tank-level-${IPriorityRequestSupplies[option]}`}>{option}</span>;
    };

    const statusItemTemplate = (option: any) => {
        return <span className={`customer-badge status-${option}`}>{option}</span>;
    };

    const activityBodyTemplate = (rowData: Demo.Customer) => {
        return <ProgressBar value={rowData.activity} showValue={false} style={{ height: '.5rem' }}></ProgressBar>;
    };

    const verifiedBodyTemplate = (rowData: Demo.Customer) => {
        return (
            <i
                className={classNames('pi', {
                    'text-green-500 pi-check-circle': rowData.verified,
                    'text-pink-500 pi-times-circle': !rowData.verified
                })}
            ></i>
        );
    };

    const verifiedFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
        return <TriStateCheckbox value={options.value} onChange={(e) => options.filterCallback(e.value)} />;
    };

    const amountBodyTemplate = (rowData: Demo.Customer) => {
        return formatCurrency(rowData.amount as number);
    };

    const statusOrderBodyTemplate = (rowData: Demo.Customer) => {
        return <span className={`order-badge order-${rowData.status?.toLowerCase()}`}>{rowData.status}</span>;
    };

    const searchBodyTemplate = () => {
        return <Button icon="pi pi-search" />;
    };

    const imageBodyTemplate = (rowData: Demo.Product) => {
        return <img src={`/demo/images/product/${rowData.image}`} onError={(e) => ((e.target as HTMLImageElement).src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')} alt={rowData.image} className="shadow-2" width={100} />;
    };

    const priceBodyTemplate = (rowData: Demo.Product) => {
        return formatCurrency(rowData.price as number);
    };

    const ratingBodyTemplate = (rowData: Demo.Product) => {
        return <Rating value={rowData.rating} readOnly cancel={false} />;
    };

    const statusBodyTemplate2 = (rowData: Demo.Product) => {
        return <span className={`product-badge status-${rowData.inventoryStatus?.toLowerCase()}`}>{rowData.inventoryStatus}</span>;
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
                        filters={filters}
                        filterDisplay="menu"
                        loading={loading}
                        responsiveLayout="scroll"
                        scrollable
                        scrollHeight="flex"
                        emptyMessage="No customers found."
                        header={header1}
                    >
                        <Column field="name" header="Nombre" filter filterPlaceholder="Filtrar por Nombre" sortable style={{ minWidth: '12rem' }} />
                        <Column field="economicNumber" header="No. Económico" frozen sortable filter filterPlaceholder="Buscar por no. económico" style={{ minWidth: '12rem', fontWeight: 'bold' }} />
                        <Column field="status" header="Estado" filterMenuStyle={{ width: '14rem' }} sortable style={{ minWidth: '12rem' }} body={statusBodyTemplate} filter filterElement={requestStatusTemplate} />
                        <Column header="Fecha de Registro" filterField="date" dataType="date" sortable style={{ minWidth: '10rem' }} body={dateBodyTemplate} filter filterElement={dateFilterTemplate} />
                    </DataTable>
                </div>
            </div>
        </div>
    );
};

export default SuppliesPage;
