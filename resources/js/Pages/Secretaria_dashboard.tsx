import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";

export default function Dashboard({ auth }: PageProps) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Secretaria
                </h2>
            }
        >
            <Head title="Secretaria" />

            <div className="m-8">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold bg-trasparet">
                        PACIENTES
                    </h1>
                    <div className="hidden lg:flex">
                        <a
                            href="/register"
                            className="bg-gradient-to-r from-indigo-500 to-sky-500 py-2 px-3 border-white text-white rounded-md"
                        >
                            Registrar Paciente
                        </a>
                    </div>
                </div>
            </div>
            <div className="m-4 overflow-hidden rounded-xl shadow-lg">
                <table className="min-w-full table-auto bg-white border border-gray-200 rounded-xl">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2 border border-gray-300 first:rounded-tl-xl last:rounded-tr-xl">
                                NOME
                            </th>
                            <th className="px-4 py-2 border border-gray-300">
                                ENDEREÇO
                            </th>
                            <th className="px-4 py-2 border border-gray-300">
                                CONTATO
                            </th>
                            <th className="px-4 py-2 border border-gray-300">
                                CHEGADA
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="hover:bg-gray-50">
                            <td className="px-4 py-2 border border-gray-300">
                                The Sliding
                            </td>
                            <td className="px-4 py-2 border border-gray-300">
                                Malcolm Lockyer
                            </td>
                            <td className="px-4 py-2 border border-gray-300">
                                (16) 99455-7100
                            </td>
                            <td className="px-4 py-2 border border-gray-300 text-center">
                                <button className="bg-sky-400 text-white px-4 py-2 border border-gray-300 rounded-lg hover:bg-sky-500 hover:text-black transition duration-300">
                                    CONFIRMAR
                                </button>
                            </td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                            <td className="px-4 py-2 border border-gray-300">
                                Witchy Woman
                            </td>
                            <td className="px-4 py-2 border border-gray-300">
                                The Eagles
                            </td>
                            <td className="px-4 py-2 border border-gray-300">
                                (16) 99455-7100
                            </td>
                            <td className="px-4 py-2 border border-gray-300 text-center">
                                <button className="bg-sky-400 text-white px-4 py-2 border border-gray-300 rounded-lg hover:bg-sky-500 hover:text-black transition duration-300">
                                    CONFIRMAR
                                </button>
                            </td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                            <td className="px-4 py-2 border border-gray-300">
                                Shining Star
                            </td>
                            <td className="px-4 py-2 border border-gray-300">
                                Earth, Wind, and Fire
                            </td>
                            <td className="px-4 py-2 border border-gray-300">
                                (16) 99455-7100
                            </td>
                            <td className="px-4 py-2 border border-gray-300 text-center">
                                <button className="bg-sky-400 text-white px-4 py-2 border border-gray-300 rounded-lg hover:bg-sky-500 hover:text-black transition duration-300">
                                    CONFIRMAR
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    );
}
