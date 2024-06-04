<?php

namespace Tests\Feature\Auth;

use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;
use App\Models\User;

class RegistrationTest extends TestCase
{
    use DatabaseTransactions;

    public function test_registration_screen_can_be_rendered(): void
    {
        // Crie um usuário com a role 'secretaria'
        $user = User::factory()->create(['role' => 'secretaria']);

        // Autentique-se com este usuário
        $response = $this->actingAs($user)->get('/register');

        // Verifique se a página de registro pode ser renderizada
        $response->assertStatus(200);
    }

    public function test_new_psico_can_register(): void
    {
        $user = User::factory()->create(['role' => 'secretaria']);

        $response = $this->actingAs($user)->post('/register-psicologo', [
            'name' => 'Test Psicologo',
            'role' => 'psicologo',
            'email' => 'psico@test.com', // Necessário para o envio do email, mas não será verificado no banco de dados
        ]);

        $response->assertRedirect(route('dashboard'));

        $this->assertDatabaseHas('users', [
            'name' => 'Test Psicologo',
            'role' => 'psicologo',
        ]);
    }

    public function test_new_patient_can_register(): void
    {
        $user = User::factory()->create(['role' => 'secretaria']);

        $response = $this->actingAs($user)->post('/register-paciente', [
            'name' => 'Test Patient',
            'logradouro' => 'Rua Teste',
            'bairro' => 'Bairro Teste',
            'localidade' => 'Cidade Teste',
            'uf' => 'SP',
            'celular' => '11999999999',
            'role' => 'paciente',
            'email' => 'patient@test.com', // Necessário para o envio do email, mas não será verificado no banco de dados
        ]);

        $response->assertRedirect(route('dashboard'));

        $this->assertDatabaseHas('users', [
            'name' => 'Test Patient',
            'role' => 'paciente',
        ]);
    }
}
