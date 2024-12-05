'use client';
import { SupplieService } from '@/core/service/SupplieService';
import { IRequestSupplies } from '@/types/request-supplies';
import { ISupplie } from '@/types/supplies';
import { PRIORITY_SUPPLIE } from '@/utils/constants_supplie';
import { useRouter } from 'next/navigation';
import router from 'next/router';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { SelectButton } from 'primereact/selectbutton';
import { Skeleton } from 'primereact/skeleton';
import { classNames } from 'primereact/utils';
import { useMemo, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

export const FormRquestSuppliesPage = () => {
    const [listSupplies, setListSupplies] = useState<ISupplie[]>();
    const [loading, setLoading] = useState<boolean>(true);

    const {
        control,
        formState: { errors },
        setValue,
        handleSubmit
    } = useForm<IRequestSupplies>();

    const onSubmit: SubmitHandler<IRequestSupplies> = (data) => {
        console.log(data);
    };

    useMemo(() => {
        SupplieService.getOnService().then((data) => {
            setTimeout(() => {
                setListSupplies(data);
                setLoading(false);
            }, 2500);
        });
    }, []);

    return (
        <div className="grid">
            <div className="col-12 md:col-6 md:col-offset-3">
                <form className="card p-fluid flex flex-column gap-3" onSubmit={handleSubmit(onSubmit)}>
                    <h5>Nueva Solicitud de Suministro</h5>
                    <div className="field">
                        <label htmlFor="supplie">Suministro *</label>
                        {loading ? (
                            <Skeleton width="100%" height="2.8rem"></Skeleton>
                        ) : (
                            <Controller
                                name="supplie"
                                control={control}
                                rules={{ required: 'Suministro es obligatorio.' }}
                                render={({ field, fieldState }) => (
                                    <Dropdown
                                        id={field.name}
                                        value={field.value}
                                        onChange={(e) => field.onChange(e.value)}
                                        options={listSupplies}
                                        optionLabel="name"
                                        optionValue="id"
                                        placeholder="Seleccione un suministro"
                                        className={classNames({ 'p-invalid': fieldState.invalid })}
                                    />
                                )}
                            />
                        )}
                        {errors.supplie && <small className="p-error">{errors.supplie.message}</small>}
                    </div>
                    <div className="field">
                        <label htmlFor="countSupplie">Cantidad de combustible *</label>
                        <Controller
                            name="countSupplie"
                            control={control}
                            rules={{ required: 'La cantidad de combustible es obligatoria.' }}
                            render={({ field, fieldState }) => (
                                <InputNumber id={field.name} {...field} value={field.value} onChange={(e) => field.onChange(e.value)} maxFractionDigits={2} min={0} className={classNames({ 'p-invalid': fieldState.invalid })} />
                            )}
                        />
                        {errors.countSupplie && <small className="p-error">{errors.countSupplie.message}</small>}
                    </div>
                    <div className="field">
                        <label htmlFor="priority">Prioridad *</label>
                        <Controller
                            name="priority"
                            control={control}
                            rules={{ required: 'La prioridad es obligatoria.' }}
                            render={({ field, fieldState }) => (
                                <Dropdown id={field.value} value={field.value} onChange={(e) => field.onChange(e.value)} className={classNames({ 'p-invalid': fieldState.invalid })} placeholder="Seleccione Prioridad" options={PRIORITY_SUPPLIE} />
                            )}
                        />
                        <div className="flex flex-column-reverse md:flex-row w-full md:w-20rem gap-4 md:gap-3 mt-5">
                            <Button type="button" label="Cancelar" outlined onClick={() => router.back()} />
                            <Button type="submit" label="Crear" loading={loading} />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FormRquestSuppliesPage;
