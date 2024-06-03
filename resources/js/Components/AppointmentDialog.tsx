import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { useState, useRef, useEffect, FormEventHandler } from 'react';
import axios from 'axios';
import { PageProps, User } from '@/types';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { useForm } from '@inertiajs/react';
import PrimaryButton from './PrimaryButton';
import { toast } from 'react-toastify';

dayjs.extend(isSameOrBefore);

export default function AppointmentDialog({ auth, psychologists }: PageProps<{ psychologists: User[] }>) {
    const closeRef = useRef<HTMLButtonElement>(null);
    const { data, setData, post, processing, errors, reset } = useForm({
        date: '',
        time: '',
        patient_id: auth.user.id,  
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
        post('/create-consulta', {
            onSuccess: () => {
                reset();
                if (closeRef.current) closeRef.current.click();
                toast.success(`Consulta criada com sucesso!`, {
                    position: "top-right",
                    autoClose: 13000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            },
            onError: (errors) => {
                console.error('Erro ao criar consulta:', errors);
            }
        });
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
        <>
            <Dialog.Trigger className="bg-gradient-to-r from-indigo-500 to-sky-500 py-2 px-3 border-white text-white rounded-md">
                <span className="text-md font-medium text-white">
                    Agendar Consulta
                </span>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="inset-0 fixed bg-black/50" />
                <Dialog.Content className="fixed overflow-hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-8 shadow-md rounded-md text-gray-900 max-w-md w-full">
                    <Dialog.Close ref={closeRef} className="absolute right-0 top-0 bg-white p-1.5 text-red-600 rounded-md">
                        <X className="size-5" />
                    </Dialog.Close>

                    <form onSubmit={submit} className="space-y-4">
                        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Agendar Consulta</h2>
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
                                className="text-gray-400 "
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
                                        className={`py-2 ${day.isSame(selectedDate, 'day') ? 'bg-blue-500' : 'bg-gray-400 hover:bg-blue-600'} rounded-md ${isPastDay ? 'opacity-50 cursor-not-allowed' : ''}`}
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
                                        className={`flex flex-col items-center p-2 hover:bg-blue-500 rounded-md ${data.psychologist_id === String(psychologist.id) ? 'border border-blue-500' : ''}`}
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
                                        className={`py-2 px-4 border ${data.time === time ? 'border-blue-500' : 'border-gray-700 hover:bg-blue-600'} rounded-md`}
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
                    </form>
                </Dialog.Content>
            </Dialog.Portal>
        </>
    );
}
