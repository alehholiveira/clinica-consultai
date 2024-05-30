import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Appointment, PageProps, User } from '@/types';
import { FormEventHandler, useEffect } from 'react';
import axios from 'axios';
import PrimaryButton from '@/Components/PrimaryButton';
import { GetNotification } from './../Components/GetNotification';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';


export default function Dashboard({ auth, pacientes, consultas }: PageProps<{ pacientes: User[], consultas: Appointment[] }>) {
    const { data, setData, post, processing, errors, reset } = useForm({
        appointment_id: ''
    });

    const formatDateTime = (dateString: string, timeString: string) => {
        const date = new Date(`${dateString}T${timeString}`);
        return format(date, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
    };

    const submit = (consultaId: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setData('appointment_id', consultaId);
    };

    useEffect(() => {
        if (data.appointment_id) {
            console.log(errors)
            console.log(data)
            post('createMeetingSession')
        }
    }, [data]);


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <GetNotification/>
                            Dashboard psicologo
                            {Object.values(pacientes).map((paciente) => (
                                <div key={paciente.id}>
                                    <h3>{paciente.name} -
                                        <PrimaryButton className="ms-4 h-8" disabled={processing} >
                                            <Link
                                                href={`/profile/${paciente.id}`}
                                                className="rounded-md px-3 py-2 text-white ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20]"
                                            >
                                                informacões do paciente
                                            </Link>
                                        </PrimaryButton>
                                    </h3>
                                    <p>
                                        consultas:{" "}
                                        {consultas
                                            .filter((consulta) => consulta.patient_id === paciente.id)
                                            .map((consulta) => (
                                                <span key={consulta.id}>
                                                    <br />{formatDateTime(consulta.date, consulta.time)} -

                                                    {!consulta.hasMeetingSession && (

                                                        <button onClick={submit(String(consulta.id))}>
                                                            Criar MeetingSession
                                                        </button>
                                                    )}
                                                    {consulta.hasMeetingSession && (
                                                        <Link
                                                            href={`/appointment/${paciente.name}/${consulta.id}`}
                                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20]"
                                                        >
                                                            informacao da sessao
                                                        </Link>
                                                    )}
                                                </span>
                                            ))}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
