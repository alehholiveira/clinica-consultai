import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { User, Appointment, } from "@/types";
import type { MeetingSession } from "@/types";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler, useEffect } from "react";

export default function MeetingSession({ meetingsession, appointment, }: { meetingsession: MeetingSession, appointment: Appointment, }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        appointment_id: appointment.id,
        meetingsession_id: meetingsession.id
    });

    const submit = () => (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        post('/createMeetingSession/documents');
    };

    return (
        <GuestLayout>
            <Head title="Register" />
            <button onClick={submit()}>
                Criar MeetingSession
            </button>
        </GuestLayout>
    );
}
