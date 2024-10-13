'use client';
import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { STATUS_EQUIPMENT } from '@/utils/constants_equipment';
import { InputNumber } from 'primereact/inputnumber';
import { useRouter } from 'next/navigation';
import { IFormEquipment, StatusEquipment } from '@/types/equipment';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { classNames } from 'primereact/utils';

const FormEquipment = () => {
    const { control, formState: { errors }, handleSubmit } = useForm<IFormEquipment>({
        defaultValues: {
            name: '',
            economicNumber: '',
            hourMeter: 0,
            odoMeter: 0,
            status: 'En servicio',
        }
    });
    const router = useRouter();

    const onSubmit: SubmitHandler<IFormEquipment> = data => {
        console.log(data);
    };

    return (
        <div className="grid">
            <div className="col-12 md:col-6 md:col-offset-3">
                <form className="card p-fluid flex flex-column gap-3" onSubmit={handleSubmit(onSubmit)}>
                    <h5>Nuevo Equipo</h5>
                    <div className="field">
                        <label htmlFor="name">Nombre</label>
                        <Controller
                            name="name"
                            control={control}
                            rules={{ required: 'El nombre es obligatorio.' }}
                            render={({ field, fieldState }) => (
                                <InputText
                                    id={field.name}
                                    {...field}
                                    className={classNames({ 'p-invalid': fieldState.invalid })} />
                            )} />
                        {errors.name
                            ? <small className='p-error'>{errors.name.message}</small>
                            : <small>El nombre del equipo no debe coincidir con otro ya registrado.</small>}
                    </div>
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 md:col-6">
                            <label htmlFor="economic-number">No. Económico</label>
                            <Controller
                                name="economicNumber"
                                control={control}
                                rules={{ required: 'El número económico es obligatorio.' }}
                                render={({ field, fieldState }) => (
                                    <InputText
                                        id={field.name}
                                        {...field}
                                        className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                            {errors.economicNumber
                                && <small className='p-error'>{errors.economicNumber.message}</small>}
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="status">Estado</label>
                            <Controller
                                name="status"
                                control={control}
                                render={({ field }) => (
                                    <Dropdown
                                        id={field.name}
                                        value={field.value}
                                        onChange={(e) => field.onChange(e.value)}
                                        options={STATUS_EQUIPMENT} />
                                )} />
                        </div>
                    </div>
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 md:col-6">
                            <label htmlFor="hour-meter">Horómetro</label>
                            <Controller
                                name="hourMeter"
                                control={control}
                                rules={{ required: 'El horómetro inicial es obligatorio.' }}
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
                            <label htmlFor="hour-meter">Odómetro</label>
                            <Controller
                                name="odoMeter"
                                control={control}
                                rules={{ required: 'El odómetro inicial es obligatorio.' }}
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
                    <div className="flex md:justify-content-end">
                        <div className="flex flex-column-reverse md:flex-row w-full md:w-20rem gap-4 md:gap-3 mt-5">
                            <Button type="button" label="Cancelar" outlined onClick={() => router.back()} />
                            <Button type="submit" label="Crear" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FormEquipment;
