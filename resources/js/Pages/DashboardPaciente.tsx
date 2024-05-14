import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { PageProps, Appointment } from '@/types';

export default function Dashboard({ auth, historico, proximaConsulta, proximasConsultas }: PageProps<{ historico: Appointment[], proximaConsulta: Appointment, proximasConsultas: Appointment[] }>) {

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">Dashboard paciente</div>

                        <h1>Próxima Consulta</h1>
                        {proximaConsulta && (
                            <table>
                                <thead>
                                    <tr>
                                        <th>Data</th>
                                        <th>Horário</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{proximaConsulta.date}</td>
                                        <td>{proximaConsulta.time}</td>
                                    </tr>
                                </tbody>
                            </table>
                        )}
                        <h2>Próximas Consultas</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Data</th>
                                    <th>Horário</th>
                                </tr>
                            </thead>
                            <tbody>
                                {proximasConsultas.map((consulta, index) => (
                                    <tr key={index}>
                                        <td>{consulta.date}</td>
                                        <td>{consulta.time}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <h2>Histórico</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Data</th>
                                    <th>Horário</th>
                                </tr>
                            </thead>
                            <tbody>
                                {historico.map((consulta, index) => (
                                    <tr key={index}>
                                        <td>{consulta.date}</td>
                                        <td>{consulta.time}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
