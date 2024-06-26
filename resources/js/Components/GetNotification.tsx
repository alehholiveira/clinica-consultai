import React, { useEffect } from 'react';
import echo from '@/echo'; // Certifique-se de importar 'echo' minúsculo
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';
import { Appointment } from '@/types';

export const GetNotification = ({ consultas }: { consultas: Appointment[] }) => {
    const formatDateTime = (dateString: string, timeString: string) => {
        const date = new Date(`${dateString}T${timeString}`);
        return format(date, "'do dia' dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
    };
    useEffect(() => {
        console.log('Component mounted and useEffect called');

        // Assina o canal MyEvent
        var channel = echo.channel('MyEvent');
        console.log('Subscribed to channel: MyEvent');

        // Escuta pelo evento .my-event
        channel.listen('.my-event', function (data: any) {
            const psychologistId = data.appointment.psychologist.id;

            // Verifica se o ID do psicólogo(que veio da notificação) está presente em alguma das consultas(do psicologo logado)
            const consultaEncontrada = consultas.some((consulta) => consulta.psychologist_id === psychologistId);

            if (consultaEncontrada) {
                toast.success(`${data.appointment.patient.name} chegou para a consulta ${formatDateTime(data.appointment.date, data.appointment.time)}!`, {
                    position: "top-right",
                    autoClose: 13000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        });


        // Cleanup
        return () => {
            console.log('Cleaning up...');
            echo.leave('MyEvent');
        };
    }, []);

    return <></>
};
