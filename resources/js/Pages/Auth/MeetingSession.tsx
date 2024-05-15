import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { User } from "@/types";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function MeetingSession() {
    const { data, setData, post, processing, errors, reset } = useForm({
        appointment_id: ''
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        console.log(errors)
        console.log(data)
        post('gerar-documento-rs');
    };

    return (
        <GuestLayout>
        <Head title="Register" />
        <form onSubmit={submit}>
        <div>
                    <InputLabel htmlFor="appointment_id" value="ID da consulta" />

                    <TextInput
                        id="appointment_id"
                        name="appointment_id"
                        value={data.appointment_id}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('appointment_id', e.target.value)}
                        required
                    />

                    <InputError message={errors.appointment_id} className="mt-2" />
                </div>
            <PrimaryButton className="ms-4" disabled={processing}>
                Criar consulta
            </PrimaryButton>
        </form>
        </GuestLayout>
    );
}
