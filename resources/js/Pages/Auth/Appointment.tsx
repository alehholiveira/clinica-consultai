import React, { useEffect, useState } from 'react';
import PrimaryButton from "@/Components/PrimaryButton";
import { PageProps, User } from "@/types";
import { useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import axios from 'axios';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'; // Importe o plugin

dayjs.extend(isSameOrBefore); // Registre o plugin

export default function AppointmentForm({ auth, psychologists }: PageProps<{ psychologists: User[] }>) {
    const { data, setData, post, processing, errors, reset } = useForm({
        date: '',
        time: '',
        patient_id: auth.id,  // Corrigido aqui
        psychologist_id: ''
    });

    const [availableTimes, setAvailableTimes] = useState<string[]>([]);
    const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));
    const [selectedWeekStart, setSelectedWeekStart] = useState(dayjs().startOf('week').format('YYYY-MM-DD'));

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

    const today = dayjs().startOf('day');

    const handlePreviousWeek = () => {
        const newWeekStart = dayjs(selectedWeekStart).subtract(1, 'week').format('YYYY-MM-DD');
        setSelectedWeekStart(newWeekStart);
    };

    const handleNextWeek = () => {
        const newWeekStart = dayjs(selectedWeekStart).add(1, 'week').format('YYYY-MM-DD');
        setSelectedWeekStart(newWeekStart);
    };

    return (
        <form onSubmit={submit} className="space-y-4">
            <div className="max-w-md mx-auto bg-gray-900 p-8 mt-10 shadow-md rounded-md text-white">
                <h2 className="text-2xl font-bold mb-6 text-center">Agendar Consulta</h2>
                <div className="flex justify-between mb-4">
                    <button
                        type="button"
                        className="text-gray-400"
                        onClick={handlePreviousWeek}
                        disabled={dayjs(selectedWeekStart).isSameOrBefore(today, 'week')}
                    >
                        &larr;
                    </button>
                    <span>{dayjs(selectedWeekStart).format('MMMM/YYYY')}</span>
                    <button
                        type="button"
                        className="text-gray-400"
                        onClick={handleNextWeek}
                    >
                        &rarr;
                    </button>
                </div>
                <div className="grid grid-cols-7 gap-2 mb-6">
                    {[...Array(7)].map((_, index) => {
                        const day = dayjs(selectedWeekStart).add(index, 'day').startOf('day');
                        const isPastDay = day.isBefore(today);

                        return (
                            <button
                                type="button"
                                key={index}
                                className={`py-2  ${day.isSame(selectedDate, 'day') ? 'bg-blue-600' : 'bg-gray-700 hover:bg-blue-900 '} rounded-md ${isPastDay ? 'opacity-50 cursor-not-allowed ' : ''}`}
                                onClick={() => {
                                    if (!isPastDay) {
                                        setSelectedDate(day.format('YYYY-MM-DD'));
                                        setData('date', day.format('YYYY-MM-DD'));
                                    }
                                }}
                                disabled={isPastDay}
                            >
                                {day.format('DD')}
                            </button>
                        );
                    })}
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Selecione um profissional</h3>
                    <div className="flex flex-wrap space-x-2">
                        {psychologists.map((psychologist: User) => (
                            <button
                                type="button"
                                key={psychologist.id}
                                className={`flex flex-col items-center p-2 hover:bg-yellow-700 ${data.psychologist_id === String(psychologist.id) ? 'border border-yellow-500'  : ''}`}
                                onClick={() => setData('psychologist_id', String(psychologist.id))}
                            >
                                <span>{psychologist.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-2">Horários disponíveis</h3>
                    <div className="flex flex-wrap space-x-2">
                        {availableTimes.map((time) => (
                            <button
                                type="button"
                                key={time}
                                className={`py-2 px-4 border ${data.time === time ? 'border-blue-500' : 'border-gray-700 hover:bg-gray-700'} rounded-md`}
                                onClick={() => setData('time', time)}
                            >
                                {time}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="text-center mt-6">
                    <PrimaryButton className="w-full" type="submit" disabled={processing}>
                        Criar consulta
                    </PrimaryButton>
                </div>
            </div>
        </form>
    );
}
