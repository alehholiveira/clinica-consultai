<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\DB;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit($patient_id): Response
    {
        $auth = Auth::user();
        if ($auth->role == 'psicologo'){
            $patient = User::where('id', $patient_id)->first();
            if($patient && $patient->role == 'paciente'){
                return Inertia::render('Profile/Edit', [
                    'patient' => $patient,
                ]);
            } else {
                abort(403, 'Paciente não encontrado');
            }
        } else {
            abort(403, 'Acesso negado');
        }

    }

    /**
     * Update the user's profile information.
     */
    public function update(Request $request, $patient_id): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'logradouro' => 'string|max:255',
            'bairro' => 'string|max:255',
            'localidade' => 'string|max:255',
            'uf' => 'string|max:2',
            'celular' => 'string|max:11',
        ]);
        $patient = User::where('id', $patient_id)->first();

        $patient->name = $request->name;
        $patient->logradouro = $request->logradouro;
        $patient->bairro = $request->bairro;
        $patient->localidade = $request->localidade;
        $patient->uf = $request->uf;
        $patient->celular = $request->celular;

        $patient->save();

        return Redirect::route('profile.edit', $patient_id);
    }

    /**
     * Delete the user's account.
     */
    public function destroy($patient_id)
    {
        $user = User::findOrFail($patient_id);

        DB::transaction(function () use ($user) {
            // Deleta as appointments do usuário (paciente e psicólogo)
            $user->appointmentsAsPatient()->each(function ($appointment) {
                $appointment->delete();
            });

            $user->appointmentsAsPsychologist()->each(function ($appointment) {
                $appointment->delete();
            });

            // Deleta o usuário
            $user->delete();
        });

        return redirect()->route('dashboard')->with('success', 'Usuário deletado com sucesso!');
    }
}
