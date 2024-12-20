'use client';
import { IFormSupplie } from "@/types/supplies";
import { STATUS_SUPPLIE } from "@/utils/constants_supplie";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

export const FormSuppliesPage = () => {
    const {
        control,
        formState: { errors },
        handleSubmit
    } = useForm<IFormSupplie>({
        defaultValues: {
            name: '',
            economicNumber: '',
            status: 'Disponible'
        }
    });

    const router = useRouter();

    const onSubmit: SubmitHandler<IFormSupplie> = (data) => {
        console.log(data);
    };

    return (
        <div className="grid">
            <div className="col-12 md:col-6 md:col-offset-3">
                <form className="card p-fluid flex flex-column gap-3" onSubmit={handleSubmit(onSubmit)}>
                    <h5>Nuevo Suministro</h5>
                    <div className="field">
                        <label htmlFor="name">Nombre</label>
                        <Controller
                            name="name"
                            control={control}
                            rules={{ required: 'El nombre es obligatorio.' }}
                            render={({ field, fieldState }) => <InputText id={field.name} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />}
                        />
                        {errors.name ? <small className="p-error">{errors.name.message}</small> : <small>El nombre del suministro no debe coincidir con otro ya registrado.</small>}
                    </div>
                    <div className="p-fluid formgrid grid gap-3 md:gap-0">
                        <div className="field col-12 md:col-6">
                            <label htmlFor="economicNumber">No. Económico</label>
                            <Controller
                                name="economicNumber"
                                control={control}
                                rules={{ required: 'El número económico es obligatorio.' }}
                                render={({ field, fieldState }) => <InputText id={field.name} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />}
                            />
                            {errors.economicNumber && <small className="p-error">{errors.economicNumber.message}</small>}
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="status">Estado</label>
                            <Controller name="status" control={control} render={({ field }) => <Dropdown id={field.name} value={field.value} onChange={(e) => field.onChange(e.value)} options={STATUS_SUPPLIE} />} />
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
}

export default FormSuppliesPage;
