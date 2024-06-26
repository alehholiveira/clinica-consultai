import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import GuestLayout from "@/Layouts/GuestLayout";
import { Appointment } from "@/types";
import type { MeetingSession, PageProps } from "@/types";
import { Head, useForm } from "@inertiajs/react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { FormEventHandler } from "react";
import { toast } from "react-toastify";

export default function MeetingSession({
    auth,
    meetingsession,
    appointment,
}: PageProps<{ meetingsession: MeetingSession; appointment: Appointment }>) {
    const { data, setData, post, processing, errors } = useForm({
        appointment_id: appointment.id,
        meetingsession_id: meetingsession.id,
        meetinginfo: "",
    });

    const submitEncaminhamento =
        () => (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            toast.success(`Encaminhamento gerado com sucesso!`, {
                position: "top-right",
                autoClose: 13000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            post("/appointment/documents/encaminhamento");
        };

    const submitAtestado = () => (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        toast.success(`Atestado gerado com sucesso!`, {
            position: "top-right",
            autoClose: 13000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        post("/appointment/documents/atestado");
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        toast.success(`Informações da consulta gerada com sucesso!`, {
            position: "top-right",
            autoClose: 13000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        post("/appointment/documents/info");
    };

    const formatDateTime = (dateString: string, timeString: string) => {
        const date = new Date(`${dateString}T${timeString}`);
        return format(date, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Informação Da Sessão
                </h2>
            }
        >
            <Head title="Informação Da Sessão" />
            <div className="max-w-4xl mx-auto p-6 mt-8 bg-white text-gray-900 rounded-md shadow-md">
                <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
                    Informações da Consulta
                </h2>

                <div className="flex">
                    <div className="w-1/3 p-4 bg-gray-100 rounded-md shadow-sm">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600">
                            Detalhes da Consulta
                        </h3>
                        <p>
                            <strong>Paciente:</strong> {appointment.patient.name}
                        </p>
                        <p>
                            <strong>Data:</strong> {formatDateTime(appointment.date, appointment.time)}
                        </p>
                    </div>

                    <div className="w-2/3 pl-6">
                        <div className="flex mb-6 space-x-4">
                            <div className="flex-1">
                                <p className="text-sm text-gray-500 mt-2">
                                    Informações sobre encaminhamento.
                                </p>
                                {meetingsession.referrals && (
                                    <a
                                        href={`/download/${meetingsession.referrals}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full text-center block"
                                    >
                                        Visualizar Encaminhamento
                                    </a>
                                )}
                                {!meetingsession.referrals && (
                                    <button
                                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
                                        onClick={submitEncaminhamento()}
                                    >
                                        Gerar Encaminhamento
                                    </button>
                                )}
                            </div>
                            <div className="flex-1">
                                <p className="text-sm text-gray-500 mt-2">
                                    Informações sobre atestado.
                                </p>
                                {meetingsession.attendance_certificates && (
                                    <a
                                        href={`/download/${meetingsession.attendance_certificates}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full text-center block"
                                    >
                                        Visualizar Atestado
                                    </a>
                                )}
                                {!meetingsession.attendance_certificates && (
                                    <button
                                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
                                        onClick={submitAtestado()}
                                    >
                                        Gerar Atestado
                                    </button>
                                )}
                            </div>
                        </div>

                        {!meetingsession.meeting_annotation && (
                            <form onSubmit={submit}>
                                <div className="mb-4">
                                    <InputLabel
                                        htmlFor="meetinginfo"
                                        className="text-gray-900 text-sm font-semibold mb-2"
                                    >
                                        Informações da Sessão
                                    </InputLabel>
                                    <textarea
                                        id="meetinginfo"
                                        rows={4}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:border-gray-500"
                                        value={data.meetinginfo}
                                        onChange={(e) => setData("meetinginfo", e.target.value)}
                                        required
                                    />
                                    <InputError
                                        message={errors.meetinginfo}
                                        className="mt-2"
                                    />
                                </div>
                                <PrimaryButton
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                                    disabled={processing}
                                >
                                    Adicionar Informações da Sessão
                                </PrimaryButton>
                            </form>
                        )}
                        {meetingsession.meeting_annotation && (
                            <a
                                href={`/download/${meetingsession.meeting_annotation}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full text-center block"
                            >
                                Visualizar Anotações
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
