<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class AppointmentControllerTest extends TestCase
{
    use DatabaseTransactions;

    public function test_create_screen_can_be_rendered_for_secretaria(): void
    {
        $user = User::factory()->create(['role' => 'secretaria']);

        $response = $this->actingAs($user)->get('/create-consulta');

        $response->assertStatus(200);
    }

    public function test_create_screen_redirects_for_non_secretaria(): void
    {
        $user = User::factory()->create(['role' => 'paciente']);

        $response = $this->actingAs($user)->get('/create-consulta');

        $response->assertRedirect(route('dashboard', absolute: false));
    }

    public function test_appointments_can_be_stored(): void
    {
        $patient = User::factory()->create(['role' => 'paciente']);
        $psychologist = User::factory()->create(['role' => 'psicologo']);

        // Garante que o usuário esteja autenticado
        $user = User::factory()->create(['role' => 'secretaria']);
        $this->actingAs($user);

        $response = $this->post('/create-consulta', [
            'date' => '2022-12-31',
            'time' => '15:00',
            'patient_id' => $patient->id,
            'psychologist_id' => $psychologist->id,
        ]);

        $this->assertDatabaseHas('appointments', [
            'date' => '2022-12-31',
            'time' => '15:00',
            'patient_id' => $patient->id,
            'psychologist_id' => $psychologist->id,
        ]);

        $response->assertStatus(201);
    }
}
