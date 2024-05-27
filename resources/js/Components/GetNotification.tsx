import React, { useEffect } from 'react';
import echo from '@/echo'; // Certifique-se de importar 'echo' minúsculo

export const GetNotification = () => {
  useEffect(() => {
    console.log('Component mounted and useEffect called');

    // Assina o canal MyEvent
    var channel = echo.channel('MyEvent');
    console.log('Subscribed to channel: MyEvent');

    // Escuta pelo evento .my-event
    channel.listen('.my-event', function(data: any) {
      console.log('Received notification event:', data); // Adiciona log detalhado do evento recebido
      alert(JSON.stringify(data)); // Mostra os dados do evento
    });

    // Cleanup
    return () => {
      console.log('Cleaning up...');
      echo.leave('MyEvent');
    };
  }, []);

  return <div>GetNotification</div>;
};
