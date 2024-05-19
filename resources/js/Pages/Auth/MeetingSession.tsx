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
        meetingsession_id: meetingsession.id,
        meetinginfo: ''
    });

    const submitEncaminhamento = () => (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        post('/appointment/documents/encaminhamento');
    };

    const submitAtestado = () => (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        post('/appointment/documents/atestado');
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        console.log(errors)
        post('/appointment/documents/info');
    };

    return (
        <GuestLayout>
            <Head title="Register" />
            <button onClick={submitEncaminhamento()}>
                Criar Encaminhamento
            </button>
            <br />
            <button onClick={submitAtestado()}>
                Criar Atestado
            </button>

            <form onSubmit={submit}>
            <div className="mb-4">
                        Informacões da Consulta: 
                        <label className="block text-white text-sm font-semibold mb-2" htmlFor="">MENSAGEM</label>
                        <textarea rows={4}  className="text-white w-full px-3 py-2 border-white rounded-lg bg-slate-300 focus:outline-nome focus:border-white"  value={data.meetinginfo} onChange={(e) => setData('meetinginfo', e.target.value)}  required  />
            </div>
            <PrimaryButton className="ms-4" disabled={processing}>
                Adicionar informações da sessão
            </PrimaryButton>
            </form>
        </GuestLayout>
    );
}
