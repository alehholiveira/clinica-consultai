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
    public function view(): Response
    {
        $auth = Auth::user();
        if ($auth->role == 'secretaria') {
            return Inertia::render('Auth/Register');
        } else {
            abort(403, 'Acesso negado');
        }
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function storePaciente(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'logradouro' => 'string|max:255',
            'bairro' => 'string|max:255',
            'localidade' => 'string|max:255',
            'uf' => 'string|max:2',
            'celular' => 'string|max:11',
            'role' => 'required|string'
        ]);

        $username = Str::random(10);
        $password = Str::random(8);

        $user = User::create([
            'name' => $request->name,
            'username' => $username,
            'password' => Hash::make($password),
            'logradouro' => $request->logradouro,
            'bairro' => $request->bairro,
            'localidade' => $request->localidade,
            'uf' => $request->uf,
            'celular' => $request->celular,
            'role' => $request->role,
        ]);

        // solução temporaria para salvar username e senha do usuário criado
        Log::info('Nome: ' . $user->name . ', Usuário criado: ' . $username . ', Senha: ' . $password);

        event(new Registered($user));


        return redirect(route('dashboard'));
    }

    public function storePsicologo(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'role' => 'required|string'
        ]);

        $username = Str::random(10);
        $password = Str::random(8);

        $user = User::create([
            'name' => $request->name,
            'username' => $username,
            'password' => Hash::make($password),
            'role' => $request->role,
        ]);

        // solução temporaria para salvar username e senha do usuário criado
        Log::info('Nome: ' . $user->name . ', Usuário criado: ' . $username . ', Senha: ' . $password);

        event(new Registered($user));


        return redirect(route('dashboard'));
    }
}
