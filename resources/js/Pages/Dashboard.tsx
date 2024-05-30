import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Appointment, PageProps, User } from '@/types';
import axios from 'axios';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Dashboard({ auth, tresproximasConsultas }: PageProps<{ tresproximasConsultas: Appointment[] }>) {
    const Submit = async (consultaid: number, e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

        try {
            const response = await axios.post('/mark-patient-arrived', { appointment_id: consultaid }, {
                headers: {
                    'X-CSRF-TOKEN': token,
                },
            });
            console.log(response.data);
            toast.success('A chegada do paciente foi confirmada!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } catch (error) {
            console.error(error);
        }
    };

    const formatDateTime = (dateString: string, timeString: string) => {
        const date = new Date(`${dateString}T${timeString}`);
        return format(date, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
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
                        <div className="m-8">
                            <div className="flex justify-between items-center mb-4">
                                <h1 className="text-2xl font-bold bg-transparent">
                                    Próximas Consultas Agendadas
                                </h1>
                                <div className="lg:flex">
                                    <Link
                                        href="/register"
                                        className="bg-gradient-to-r from-indigo-500 to-sky-500 py-2 px-3 border-white text-white rounded-md"
                                    >
                                        Página de Cadastro
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="m-4 overflow-hidden rounded-xl shadow-lg">
                            <table className="min-w-full table-auto bg-white border border-gray-200 rounded-xl">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="px-4 py-2 border border-gray-300 first:rounded-tl-xl last:rounded-tr-xl">
                                            PACIENTE
                                        </th>
                                        <th className="px-4 py-2 border border-gray-300">
                                            ENDEREÇO
                                        </th>
                                        <th className="px-4 py-2 border border-gray-300">
                                            CONTATO
                                        </th>
                                        <th className="px-4 py-2 border border-gray-300">
                                            HORÁRIO
                                        </th>
                                        <th className="px-4 py-2 border border-gray-300">
                                            PSICÓLOGO
                                        </th>
                                        <th className="px-4 py-2 border border-gray-300">
                                            CHEGADA
                                        </th>
                                    </tr>
                                </thead>
                                {tresproximasConsultas.map((consulta) => (
                                    <tbody key={consulta.id}>
                                        <tr className="hover:bg-gray-50">
                                            <td className="px-4 py-2 border border-gray-300">
                                                {consulta.patient.name}
                                            </td>
                                            <td className="px-4 py-2 border border-gray-300">
                                                {consulta.patient.logradouro}
                                            </td>
                                            <td className="px-4 py-2 border border-gray-300">
                                                {consulta.patient.celular}
                                            </td>
                                            <td className="px-4 py-2 border border-gray-300">
                                            {formatDateTime(consulta.date, consulta.time)}
                                            </td>
                                            <td className="px-4 py-2 border border-gray-300">
                                            {consulta.psychologist.name}
                                            </td>
                                            <td className="px-4 py-2 border border-gray-300 text-center">
                                                <button onClick={(e) => Submit(consulta.id, e)}
                                                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                                                    CONFIRMAR
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                ))}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
