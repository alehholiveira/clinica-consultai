import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps, Appointment, User } from '@/types';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import * as Dialog from '@radix-ui/react-dialog';
import AppointmentDialog from '@/Components/AppointmentDialog';

export default function Dashboard({ auth, historico, proximaConsulta, proximasConsultas, psychologists }: PageProps<{ historico: Appointment[], proximaConsulta: Appointment, proximasConsultas: Appointment[], psychologists: User[] }>) {
    const formatDateTime = (dateString: string, timeString: string) => {
        const date = new Date(`${dateString}T${timeString}`);
        return format(date, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Área do paciente</h2>}
        >
            <Head title="Área do paciente" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="m-8">
                            <div className="flex justify-between items-center mb-4">
                                <h1 className="text-2xl font-bold bg-trasparet">
                                    Suas Consultas!
                                </h1>
                                <div className="hidden lg:flex">
                                <Dialog.Root>
                                    <AppointmentDialog auth= {auth} psychologists={psychologists} />
                                </Dialog.Root>
                                </div>
                            </div>
                        </div>
                        <div className="m-4 overflow-hidden rounded-xl shadow-lg">
                            <table className="min-w-full table-auto bg-white border border-gray-200 rounded-xl">
                                <thead>
                                    <tr className="bg-gradient-to-r from-sky-500  to-indigo-500">
                                        <th className="px-4 py-2 border border-SKY-300">
                                            DATA
                                        </th>
                                        <th className="px-4 py-2 border border-gray-300">
                                            PSICÓLOGO
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td
                                            colSpan={2}
                                            className="bg-gray-200 text-center font-semibold py-2 border-t border-gray-300"
                                        >
                                            PRÓXIMA CONSULTA
                                        </td>
                                    </tr>
                                    {proximaConsulta && (
                                        <tr className="hover:bg-gray-50">
                                            <td className="px-4 py-2 border border-gray-300">
                                                {formatDateTime(proximaConsulta.date, proximaConsulta.time)}
                                            </td>
                                            <td className="px-4 py-2 border border-gray-300">
                                                {proximaConsulta.psychologist.name}
                                            </td>
                                        </tr>
                                    )}
                                    <tr>
                                        <td
                                            colSpan={2}
                                            className="bg-gray-200 text-center font-semibold py-2 border-t border-gray-300"
                                        >
                                            PRÓXIMAS CONSULTAS
                                        </td>
                                    </tr>
                                    {proximasConsultas
                                        .filter(consulta => consulta.date !== proximaConsulta.date || consulta.time !== proximaConsulta.time)
                                        .map((consulta, index) => (
                                            <tr className="hover:bg-gray-50" key={index}>
                                                <td className="px-4 py-2 border border-gray-300">
                                                    {formatDateTime(consulta.date, consulta.time)}
                                                </td>
                                                <td className="px-4 py-2 border border-gray-300">
                                                    {consulta.psychologist.name}
                                                </td>
                                            </tr>
                                        ))}
                                    <tr>
                                        <td
                                            colSpan={2}
                                            className="bg-gray-200 text-center font-semibold py-2 border-t border-gray-300"
                                        >
                                            HISTÓRICO DE CONSULTAS
                                        </td>
                                    </tr>
                                    {historico.map((consulta, index) => (
                                        <tr className="hover:bg-gray-50" key={index}>
                                            <td className="px-4 py-2 border border-gray-300">
                                                {formatDateTime(consulta.date, consulta.time)}
                                            </td>
                                            <td className="px-4 py-2 border border-gray-300">
                                                {consulta.psychologist.name}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
