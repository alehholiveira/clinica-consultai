<?php

namespace App\Http\Controllers\Auth;

use App\Models\Appointment;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;

class AppointmentController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'date' => 'required|date',
            'time' => 'required',
            'patient_id' => 'required|exists:users,id',
            'psychologist_id' => 'required|exists:users,id',
        ]);

        $appointment = Appointment::create([
            'date' => $request->date,
            'time' => $request->time,
            'patient_id' => $request->patient_id,
            'psychologist_id' => $request->psychologist_id,
        ]);


        return redirect(route('dashboard'));
    }

    public function getAvailableTimes(Request $request)
    {
        $date = $request->input('date');
        $psychologist_id = $request->input('psychologist_id');

        // Define os horários disponíveis
        $startTime = new \DateTime('08:00');
        $endTime = new \DateTime('18:00');
        $interval = new \DateInterval('PT1H');
        $period = new \DatePeriod($startTime, $interval, $endTime);

        $times = [];
        foreach ($period as $time) {
            $times[] = $time->format('H:i');
        }

        // Busca as consultas já agendadas para o psicólogo na data especificada
        $appointments = Appointment::where('date', $date)
            ->where('psychologist_id', $psychologist_id)
            ->pluck('time')
            ->toArray();

        // Converte os horários das consultas para o formato 'H:i'
        $occupiedTimes = array_map(function ($time) {
            return (new \DateTime($time))->format('H:i');
        }, $appointments);

        // Filtra os horários disponíveis removendo os já agendados
        $availableTimes = array_diff($times, $occupiedTimes);

        return response()->json(array_values($availableTimes));
    }
}
