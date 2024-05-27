import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Appointment, PageProps, User } from '@/types';
import axios from 'axios';

export default function Dashboard({ auth, tresproximasConsultas}: PageProps<{ tresproximasConsultas: Appointment[]}>) {
    const Submit = async (patientName: string, e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

        try {
            const response = await axios.post('/mark-patient-arrived', { name: patientName }, {
                headers: {
                    'X-CSRF-TOKEN': token,
                },
            });
            console.log(response.data);
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">Dashboard secretaria</div>
                        <Link
                            href={route('register-paciente')}
                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20]"
                        >
                            Criar Paciente
                        </Link>
                        <Link
                            href={route('register-psicologo')}
                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20]"
                        >
                            Criar Psicologo
                        </Link>
                        <Link
                            href={route('create-consulta')}
                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20]"
                        >
                            Criar consulta
                        </Link>
                        <div className="mt-6">
                            <h3 className="font-semibold text-lg">Próximas Consultas</h3>
                            <div className="space-y-4">
                                {tresproximasConsultas.map((consulta) => (
                                    <div key={consulta.id} className="p-4 bg-gray-100 rounded shadow">
                                        <p><strong>Paciente:</strong> {consulta.patient.name}</p>
                                        <p><strong>Psicólogo:</strong> {consulta.psychologist.name}</p>
                                        <p><strong>Data:</strong> {consulta.date} / {consulta.time}</p>
                                        <button
                                            onClick={(e) => Submit(consulta.patient.name, e)}
                                            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                                        >
                                            Notificar Psicólogo
                                        </button>
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
