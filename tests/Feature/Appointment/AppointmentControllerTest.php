<?php

namespace Tests\Feature\Auth;

use App\Models\Appointment;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class AppointmentControllerTest extends TestCase
{
    use DatabaseTransactions;

    public function test_store_creates_an_appointment()
    {
        $psychologist = User::factory()->create(['role' => 'psicologo']);
        $patient = User::factory()->create(['role' => 'paciente']);

        $this->actingAs($psychologist);

        $response = $this->post('/create-consulta', [
            'date' => '2024-06-10',
            'time' => '10:00',
            'patient_id' => $patient->id,
            'psychologist_id' => $psychologist->id,
        ]);

        $response->assertRedirect(route('dashboard'));
        $this->assertDatabaseHas('appointments', [
            'date' => '2024-06-10',
            'time' => '10:00',
            'patient_id' => $patient->id,
            'psychologist_id' => $psychologist->id,
        ]);
    }

    public function test_store_validation_error()
    {
        $psychologist = User::factory()->create(['role' => 'psicologo']);
        $this->actingAs($psychologist);

        $response = $this->post('/create-consulta', [
            'date' => 'invalid-date',
            'time' => '10:00',
            'patient_id' => 999, // Non-existent user
            'psychologist_id' => 999, // Non-existent user
        ]);

        $response->assertSessionHasErrors(['date', 'patient_id', 'psychologist_id']);
    }

    public function test_get_available_times()
    {
        $psychologist = User::factory()->create(['role' => 'psicologo']);

        // Create an existing appointment to occupy a time slot
        Appointment::factory()->create([
            'date' => '2024-06-10',
            'time' => '10:00:00',
            'psychologist_id' => $psychologist->id,
        ]);

        $this->actingAs($psychologist);

        $response = $this->get('/available-times?date=2024-06-10&psychologist_id=' . $psychologist->id);

        $response->assertStatus(200);
        $availableTimes = json_decode($response->getContent(), true);

        $this->assertNotContains('10:00', $availableTimes);
        $this->assertContains('09:00', $availableTimes);
        $this->assertContains('11:00', $availableTimes);
    }
}
