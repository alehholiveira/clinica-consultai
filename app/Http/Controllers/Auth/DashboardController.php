<?php

namespace App\Http\Controllers\Auth;

use App\Models\Appointment;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\MeetingSession;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use App\Events\MyEvent;

class DashboardController extends Controller
{
    public function dashboard(): Response
    {
        $auth = Auth::user();

        if ($auth->role == 'secretaria') {
            $ConsultasNoDiaDeHoje = $this->ConsultasNoDiaDeHoje();
            return Inertia::render('Dashboard', [
                'ConsultasNoDiaDeHoje' => $ConsultasNoDiaDeHoje,
            ]);
        } else if ($auth->role == 'paciente') {
            $historico = $this->getHistorico($auth->id);
            $proximaConsulta = $this->getProximaConsulta($auth->id);
            $proximasConsultas = $this->getProximasConsultas($auth->id);
            $psychologists = User::where('role', 'psicologo')->get();
            return Inertia::render('DashboardPaciente', [
                'historico' => $historico,
                'proximaConsulta' => $proximaConsulta,
                'proximasConsultas' => $proximasConsultas,
                'psychologists' => $psychologists
            ]);
        } else if ($auth->role == 'psicologo') {
            $pacientes = $this->getPacientes($auth->id);
            $consultas = $this->getConsultas($auth->id);
            return Inertia::render('DashboardPsicologo', [
                'pacientes' => $pacientes,
                'consultas' => $consultas
            ]);
        } else {
            return Inertia::render('Welcome');
        }
    }

    private function getHistorico($patient_id)
    {
        return Appointment::where('patient_id', $patient_id)
            ->where('date', '<', Carbon::now())
            ->orderBy('date', 'asc')
            ->orderBy('time', 'asc')
            ->with(['patient', 'psychologist'])
            ->get();
    }

    private function getProximaConsulta($patient_id)
    {
        return Appointment::where('patient_id', $patient_id)
            ->where('date', '>=', Carbon::now())
            ->orderBy('date', 'asc')
            ->orderBy('time', 'asc')
            ->with(['patient', 'psychologist'])
            ->first();
    }

    private function getProximasConsultas($patient_id)
    {
        return Appointment::where('patient_id', $patient_id)
            ->where('date', '>=', Carbon::now())
            ->orderBy('date', 'asc')
            ->orderBy('time', 'asc')
            ->with(['patient', 'psychologist'])
            ->get();
    }

    private function getPacientes($psychologist_id)
    {
        return Appointment::where('psychologist_id', $psychologist_id)
            ->with('patient')
            ->get()
            ->pluck('patient')
            ->unique('id');
    }

    private function ConsultasNoDiaDeHoje()
    {
        return Appointment::where('date', '=', Carbon::now())
            ->orderBy('date', 'asc')
            ->orderBy('time', 'asc')
            ->with(['patient', 'psychologist'])
            ->get();
    }

    private function getConsultas($psychologist_id)
    {
        $consultas = Appointment::where('psychologist_id', $psychologist_id)
            ->with('patient')
            ->orderBy('date')
            ->get();
    
        // Adiciona a informação se existe uma MeetingSession para cada consulta
        foreach ($consultas as $consulta) {
            $consulta->hasMeetingSession = $this->getMeeting($consulta->id) ? true : false;
        }
    
        return $consultas;
    }

    public function markPatientArrived(Request $request)
    {
        $request->validate([
            'appointment_id' => 'required',
        ]);
    
        $consulta = Appointment::with(['patient', 'psychologist'])
        ->find($request->appointment_id);
        if (!$consulta) {
            return response()->json(['error' => 'Consulta não encontrada'], 404);
        }
    
        event(new MyEvent($consulta));
        return response()->json('Chegada confirmada!');
    }
    

    
    private function getMeeting($appointment_id) 
    {
        return MeetingSession::where('appointment_id', $appointment_id)->first();
    }
    
}
