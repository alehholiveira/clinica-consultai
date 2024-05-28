import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";

export default function Dashboard({ auth }: PageProps) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    PACIENTE
                </h2>
            }
        >
            <Head title="Dashboard" />
            <div className="m-8">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold bg-trasparet">
                        CONSULTAS
                    </h1>
                    <div className="hidden lg:flex">
                        <a
                            href="#"
                            className="bg-gradient-to-r from-indigo-500 to-sky-500 py-2 px-3 border-white text-white rounded-md"
                        >
                            MARCAR CONSULTA
                        </a>
                    </div>
                </div>
            </div>{" "}
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
                                PROXIMAS CONSULTAS
                            </td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                            <td className="px-4 py-2 border border-gray-300">
                                15/06/2024
                            </td>
                            <td className="px-4 py-2 border border-gray-300">
                                {" "}
                                15:45
                            </td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                            <td className="px-4 py-2 border border-gray-300">
                                22/06/2024
                            </td>
                            <td className="px-4 py-2 border border-gray-300">
                                17:30
                            </td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                            <td className="px-4 py-2 border border-gray-300">
                                29/06/2024
                            </td>
                            <td className="px-4 py-2 border border-gray-300">
                                16:00
                            </td>
                        </tr>
                        <tr>
                            <td
                                colSpan={2}
                                className="bg-blue-200 text-center font-semibold py-2 border-t border-gray-300"
                            >
                                HISTORICO DE CONSULTAS
                            </td>
                        </tr>

                        <tr className="hover:bg-gray-50">
                            <td className="px-4 py-2 border border-gray-300">
                                08/06/2024
                            </td>
                            <td className="px-4 py-2 border border-gray-300">
                                15:30
                            </td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                            <td className="px-4 py-2 border border-gray-300">
                                01/06/2024
                            </td>
                            <td className="px-4 py-2 border border-gray-300">
                                14:45
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    );
}
