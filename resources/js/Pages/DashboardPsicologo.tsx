import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Appointment, PageProps, User } from '@/types';
import { FormEventHandler, useEffect } from 'react';
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
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Área do psicólogo</h2>}
        >
            <Head title="Área do psicólogo" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <GetNotification consultas={consultas} />
                            <div className="space-y-6">
                                {Object.values(pacientes).map((paciente) => (
                                    <div key={paciente.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="text-lg font-semibold">{paciente.name}</h3>
                                            <PrimaryButton className="bg-gradient-to-r from-indigo-500 to-sky-500 py-2 px-3 border-white text-white rounded-md" disabled={processing} >
                                                <a href={`/profile/${paciente.id}`}>
                                                    Informações do paciente
                                                </a>
                                            </PrimaryButton>
                                        </div>
                                        <p className="text-sm text-gray-600">
                                            Consultas:
                                            {consultas
                                                .filter((consulta) => consulta.patient_id === paciente.id)
                                                .map((consulta) => (
                                                    <div key={consulta.id} className="mt-2">
                                                        <span className="block">
                                                            {formatDateTime(consulta.date, consulta.time)} -
                                                            {!consulta.hasMeetingSession && (
                                                                <button
                                                                    className="ml-2 text-blue-500 hover:underline"
                                                                    onClick={submit(String(consulta.id))}
                                                                >
                                                                    Criar Informações da Sessão
                                                                </button>
                                                            )}
                                                            {consulta.hasMeetingSession && (
                                                                <Link
                                                                    href={`/appointment/${paciente.name}/${consulta.id}`}
                                                                    className="ml-2 text-blue-500 hover:underline"
                                                                >
                                                                    Informação da Sessão
                                                                </Link>
                                                            )}
                                                        </span>
                                                    </div>
                                                ))}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
