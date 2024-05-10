<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log; // Adicione esta linha
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function createPsicologo(): Response
    {
        return Inertia::render('Auth/RegisterPsicologo');
    }

    public function createPaciente(): Response
    {
        return Inertia::render('Auth/RegisterPaciente');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'cep' => 'string|max:8|nullable',
            'numero' => 'string|max:11|nullable',
            'role' => 'required|string'
        ]);

        $username = Str::random(10);
        $password = Str::random(8);

        $user = User::create([
            'name' => $request->name,
            'username' => $username,
            'password' => Hash::make($password),
            'cep' => $request->cep,
            'numero' => $request->numero,
            'role' => $request->role,
        ]);

        // solução temporaria para salvar username e senha do usuário criado
        Log::info( 'Nome: '. $user->name . ', Usuário criado: ' . $username . ', Senha: ' . $password);

        event(new Registered($user));

        Auth::login($user);

        return redirect(route('dashboard', absolute: false));
    }
}
