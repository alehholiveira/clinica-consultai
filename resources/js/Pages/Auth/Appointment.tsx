import React, { useEffect, useState } from 'react';
import PrimaryButton from "@/Components/PrimaryButton";
import { PageProps, User } from "@/types";
import { useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import axios from 'axios';

export default function AppointmentForm({ auth, psychologists }: PageProps<{ psychologists: User[] }>) {
    const { data, setData, post, processing, errors, reset } = useForm({
        date: '',
        time: '',
        patient_id: auth.id,
        psychologist_id: ''
    });

    const [availableTimes, setAvailableTimes] = useState<string[]>([]);

    const fetchAvailableTimes = async () => {
        if (data.date && data.psychologist_id) {
            try {
                const response = await axios.get('/available-times', {
                    params: {
                        date: data.date,
                        psychologist_id: data.psychologist_id
                    }
                });
                setAvailableTimes(response.data);
            } catch (error) {
                console.error('Error fetching available times:', error);
            }
        } else {
            setAvailableTimes([]);
        }
    };

    useEffect(() => {
        fetchAvailableTimes();
    }, [data.date, data.psychologist_id]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/create-consulta');
    };

    // Obtendo a data atual no formato YYYY-MM-DD
    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="max-w-md mx-auto bg-white p-8 mt-10 shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Agendar Consulta</h2>
            <form onSubmit={submit} className="space-y-4">
                <div>
                    <label className="block text-gray-700">Data:</label>
                    <input
                        type="date"
                        value={data.date}
                        onChange={(e) => setData('date', e.target.value)}
                        required
                        min={today} // Definindo a data mínima como hoje
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Psicólogo:</label>
                    <select
                        value={data.psychologist_id}
                        onChange={(e) => setData('psychologist_id', e.target.value)}
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                        <option value="">Selecione um psicólogo</option>
                        {psychologists.map((psychologist: User) => (
                            <option key={psychologist.id} value={psychologist.id}>{psychologist.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-gray-700">Hora:</label>
                    <select
                        value={data.time}
                        onChange={(e) => setData('time', e.target.value)}
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                        <option value="">Selecione um horário</option>
                        {availableTimes.map((time) => (
                            <option key={time} value={time}>{time}</option>
                        ))}
                    </select>
                </div>
                <div className="text-center">
                    <PrimaryButton className="w-full" disabled={processing}>
                        Criar consulta
                    </PrimaryButton>
                </div>
            </form>
        </div>
    );
}