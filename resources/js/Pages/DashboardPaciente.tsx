import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { PageProps, Appointment } from '@/types';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function Dashboard({ auth, historico, proximaConsulta, proximasConsultas }: PageProps<{ historico: Appointment[], proximaConsulta: Appointment, proximasConsultas: Appointment[] }>) {
    const formatDateTime = (dateString: string, timeString: string) => {
        const date = new Date(`${dateString}T${timeString}`);
        return format(date, "dd/MM/yyyy", { locale: ptBR });
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
                                    CONSULTAS
                                </h1>
                                <div className="hidden lg:flex">
                                    <a
                                        href="/create-consulta"
                                        className="bg-gradient-to-r from-indigo-500 to-sky-500 py-2 px-3 border-white text-white rounded-md"
                                    >
                                        MARCAR CONSULTA
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="m-4 overflow-hidden rounded-xl shadow-lg">
                            <table className="min-w-full table-auto bg-white border border-gray-200 rounded-xl">
                                <thead>
                                    <tr className="bg-sky-400">
                                        <th className="px-4 py-2 border border-SKY-300">
                                            DATA
                                        </th>
                                        <th className="px-4 py-2 border border-gray-300">
                                            HORARIO
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td
                                            colSpan={2}
                                            className="bg-blue-300 text-center font-semibold py-2 border-t border-gray-300"
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
                                                {proximaConsulta.time}
                                            </td>
                                        </tr>
                                    )}
                                    <tr>
                                        <td
                                            colSpan={2}
                                            className="bg-blue-300 text-center font-semibold py-2 border-t border-gray-300"
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
                                                    {consulta.time}
                                                </td>
                                            </tr>
                                        ))}
                                    <tr>
                                        <td
                                            colSpan={2}
                                            className="bg-blue-200 text-center font-semibold py-2 border-t border-gray-300"
                                        >
                                            HISTORICO DE CONSULTAS
                                        </td>
                                    </tr>
                                    {historico.map((consulta, index) => (
                                        <tr className="hover:bg-gray-50" key={index}>
                                            <td className="px-4 py-2 border border-gray-300">
                                                {formatDateTime(consulta.date, consulta.time)}
                                            </td>
                                            <td className="px-4 py-2 border border-gray-300">
                                                {consulta.time}
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
