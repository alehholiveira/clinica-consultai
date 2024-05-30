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
    public function create(): Response
    {
        $patients = User::where('role', 'paciente')->get();
        $psychologists = User::where('role', 'psicologo')->get();
        $auth = Auth::user();

        if ($auth->role == 'paciente'){
        
            return Inertia::render('Auth/Appointment', [
                'auth' => $auth,
                'patients' => $patients,
                'psychologists' => $psychologists,
            ]);
        } else {
            abort(403, 'Acesso negado');
        }
        
    }

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


        return response()->json(['message' => 'Consulta criada com sucesso!', 'appointment' => $appointment], 201);
    }
}
