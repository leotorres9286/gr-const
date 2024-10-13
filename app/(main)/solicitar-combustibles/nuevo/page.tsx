'use client';
import React, { useMemo, useState } from 'react';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { useRouter } from 'next/navigation';
import { IFormRequestFuel, TankLevel } from '@/types/request-fuel';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { classNames } from 'primereact/utils';
import { IEquipment } from '@/types/equipment';
import { EquipmentService } from '@/core/service/EquipmentService';
import { Skeleton } from 'primereact/skeleton';
import { SelectButton } from 'primereact/selectbutton';

const FormRequestFuel = () => {
    const [listEquipments, setListEquipments] = useState<IEquipment[]>();
    const [loading, setLoading] = useState<boolean>(true);

    const tankLevelOpts: TankLevel[] = ['Bajo', 'Medio', 'Lleno'];
    const { control, formState: { errors }, setValue, handleSubmit } = useForm<IFormRequestFuel>();
    const router = useRouter();

    const onSubmit: SubmitHandler<IFormRequestFuel> = data => {
        console.log(data);
    };

    useMemo(() => {
        EquipmentService.getOnService().then(data => {
            setTimeout(() => {
                setListEquipments(data);
                setLoading(false);
            }, 2500);
        });
    }, []);

    return (
        <div className="grid">
            <div className="col-12 md:col-6 md:col-offset-3">
                <form className="card p-fluid flex flex-column gap-3" onSubmit={handleSubmit(onSubmit)}>
                    <h5>Nueva Solicitud de Combustible</h5>
                    <div className="field">
                        <label htmlFor="equipment">Equipo *</label>
                        {loading
                            ? <Skeleton width="100%" height="2.8rem"></Skeleton>
                            : <Controller
                                name="equipment"
                                control={control}
                                rules={{ required: 'Equipo es obligatorio.' }}
                                render={({ field, fieldState }) => (
                                    <Dropdown
                                        id={field.name}
                                        value={field.value}
                                        onChange={(e) => field.onChange(e.value)}
                                        options={listEquipments}
                                        optionLabel='name'
                                        optionValue='id'
                                        placeholder="Seleccione un equipo"
                                        className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />}
                        {errors.equipment
                            && <small className='p-error'>{errors.equipment.message}</small>}
                    </div>
                    <div className="field">
                        <label htmlFor="countFuel">Cantidad de combustible *</label>
                        <Controller
                            name="countFuel"
                            control={control}
                            rules={{ required: 'La cantidad de combustible es obligatoria.' }}
                            render={({ field, fieldState }) => (
                                <InputNumber
                                    id={field.name}
                                    {...field}
                                    value={field.value}
                                    onChange={(e) => field.onChange(e.value)}
                                    maxFractionDigits={2}
                                    min={0}
                                    className={classNames({ 'p-invalid': fieldState.invalid })} />
                            )} />
                        {errors.countFuel
                            && <small className='p-error'>{errors.countFuel.message}</small>}
                    </div>
                    <div className="p-fluid formgrid grid gap-3 md:gap-0">
                        <div className="field col-12 md:col-6">
                            <label htmlFor="hourMeter">Horómetro *</label>
                            <Controller
                                name="hourMeter"
                                control={control}
                                rules={{ required: 'El horómetro es obligatorio.' }}
                                render={({ field, fieldState }) => (
                                    <InputNumber
                                        id={field.name}
                                        {...field}
                                        value={field.value}
                                        onChange={(e) => field.onChange(e.value)}
                                        min={0}
                                        className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                            {errors.hourMeter
                                && <small className='p-error'>{errors.hourMeter.message}</small>}
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="odoMeter">Odómetro *</label>
                            <Controller
                                name="odoMeter"
                                control={control}
                                rules={{ required: 'El odómetro es obligatorio.' }}
                                render={({ field, fieldState }) => (
                                    <InputNumber
                                        id={field.name}
                                        {...field}
                                        value={field.value}
                                        onChange={(e) => field.onChange(e.value)}
                                        min={0}
                                        className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                            {errors.odoMeter
                                && <small className='p-error'>{errors.odoMeter.message}</small>}
                        </div>
                    </div>
                    <div className="field">
                        <label htmlFor="hourMeter">Nivel del tanque *</label>
                        <Controller
                            name="tankLevel"
                            control={control}
                            rules={{ required: 'El nivel del tanque es obligatorio.' }}
                            render={({ field, fieldState }) => (
                                <SelectButton
                                    id={field.name}
                                    {...field}
                                    value={field.value}
                                    onChange={(e) => field.onChange(e.value)}
                                    options={tankLevelOpts}
                                    allowEmpty={false}
                                    className={
                                        classNames(
                                            'w-full md:w-8',
                                            { 'p-invalid': fieldState.invalid }
                                        )
                                    }></SelectButton>
                            )} />
                        {errors.tankLevel
                            && <small className='p-error'>{errors.tankLevel.message}</small>}
                    </div>
                    <div className="flex md:justify-content-end">
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

export default FormRequestFuel;
