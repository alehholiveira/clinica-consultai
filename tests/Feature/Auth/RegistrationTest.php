<?php

namespace Tests\Feature\Auth;

use Illuminate\Foundation\Testing\DatabaseTransictions;
use Tests\TestCase;

class RegistrationTest extends TestCase
{
    use DatabaseTransictions;

    public function test_registration_psico_screen_can_be_rendered(): void
    {
        $response = $this->get('/register-psicologo');

        $response->assertStatus(200);
    }

    public function test_registration_patient_screen_can_be_rendered(): void
    {
        $response = $this->get('/register-paciente');

        $response->assertStatus(200);
    }

    public function test_new_psico_can_register(): void
    {
        $response = $this->post('/register', [
            'name' => 'Test User',
            'username' => 'User Test',
            'password' => 'password',
            'password_confirmation' => 'password',
            'cep' => '11111111',
            'numero' => '11111111111',
            'role' => 'psicologo',


        ]);

        $this->assertAuthenticated();
        $response->assertRedirect(route('dashboard', absolute: false));
    }

    public function test_new_patient_can_register(): void
    {
        $response = $this->post('/register', [
            'name' => 'Test User',
            'username' => 'User Test',
            'password' => 'password',
            'password_confirmation' => 'password',
            'cep' => '11111111',
            'numero' => '11111111111',
            'role' => 'paciente',


        ]);

        $this->assertAuthenticated();
        $response->assertRedirect(route('dashboard', absolute: false));
    }
}
