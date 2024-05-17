import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { User, Appointment,} from "@/types";
import type { MeetingSession } from "@/types";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";


export default function MeetingSession({meetingsession, appointment, }: {meetingsession: MeetingSession, appointment: Appointment,}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        meetingsession_id: ''
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        console.log(errors)
        console.log(data)
        post('/createMeetingSession/documents');
    };

    return (
        <GuestLayout>
        <Head title="Register" />
        <form onSubmit={submit}>
        <div>
                    <InputLabel htmlFor="meetingsession_id" value="ID da consulta" />

                    <TextInput
                        id="meetingsession_id"
                        name="meetingsession_id"
                        value={data.meetingsession_id}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('meetingsession_id', e.target.value)}
                        required
                    />

                    <InputError message={errors.meetingsession_id} className="mt-2" />
                </div>
            <PrimaryButton className="ms-4" disabled={processing}>
                Criar consulta
            </PrimaryButton>
        </form>
        </GuestLayout>
    );
}
