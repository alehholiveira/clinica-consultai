<?php

namespace App\Http\Controllers\Auth;

use App\Models\Appointment;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function dashboard(): Response
    {
        $auth = Auth::user();

        if ($auth->role == 'secretaria') {
            return Inertia::render('Dashboard');
        } else if ($auth->role == 'paciente') {
            $historico = $this->getHistorico($auth->id);
            $proximaConsulta = $this->getProximaConsulta($auth->id);
            $proximasConsultas = $this->getProximasConsultas($auth->id);
            return Inertia::render('DashboardPaciente', [
                'historico' => $historico,
                'proximaConsulta' => $proximaConsulta,
                'proximasConsultas' => $proximasConsultas
            ]);
        } else if ($auth->role == 'psicologo') {
            return Inertia::render('DashboardPsicologo');
        } else {
            return Inertia::render('Welcome');
        }
    }

    private function getHistorico($patient_id)
    {
        return Appointment::where('patient_id', $patient_id)
            ->where('date', '<', Carbon::now())
            ->get();
    }

    private function getProximaConsulta($patient_id)
    {
        return Appointment::where('patient_id', $patient_id)
            ->where('date', '>=', Carbon::now())
            ->orderBy('date', 'asc')
            ->first();
    }

    private function getProximasConsultas($patient_id)
    {
        return Appointment::where('patient_id', $patient_id)
            ->where('date', '>=', Carbon::now())
            ->orderBy('date', 'asc')
            ->get();
    }
}
