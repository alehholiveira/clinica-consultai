<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use App\Models\Appointment;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;
use Tests\Traits\AccessPrivateMethods;


class DashboardControllerTest extends TestCase
{
    use DatabaseTransactions, AccessPrivateMethods;

    public function test_dashboard_screen_can_be_rendered_for_secretaria(): void
    {
        $user = User::factory()->create(['role' => 'secretaria']);

        $response = $this->post('/login', [
            'username' => $user->username,
            'password' => 'password',
        ]);

        $this->assertAuthenticated();
        $response->assertRedirect(route('dashboard', absolute: false));
    }

    public function test_dashboard_screen_can_be_rendered_for_patient(): void
    {
        $user = User::factory()->create(['role' => 'paciente']);

        $response = $this->post('/login', [
            'username' => $user->username,
            'password' => 'password',
        ]);

        $this->assertAuthenticated();
        $response->assertRedirect(route('dashboard', absolute: false));
    }

    public function test_dashboard_screen_can_be_rendered_for_psico(): void
    {
        $user = User::factory()->create(['role' => 'psicologo']);

        $response = $this->post('/login', [
            'username' => $user->username,
            'password' => 'password',
        ]);

        $this->assertAuthenticated();
        $response->assertRedirect(route('dashboard', absolute: false));
    }

    public function test_unauthenticated_user_is_redirected(): void
    {
        $response = $this->get('/dashboard');

        $response->assertRedirect('/'); // Verifique se a rota correta de redirecionamento está sendo usada
    }

    public function test_getHistorico()
    {
        $patient = User::factory()->create(['role' => 'patient']);
        $pastAppointment = Appointment::factory()->create([
            'patient_id' => $patient->id,
            'date' => Carbon::now()->subDays(10)
        ]);
        $futureAppointment = Appointment::factory()->create([
            'patient_id' => $patient->id,
            'date' => Carbon::now()->addDays(10)
        ]);

        $controller = $this->app->make('App\Http\Controllers\AppointmentController');
        $result = $this->callMethod($controller, 'getHistorico', [$patient->id]);

        $this->assertCount(1, $result);
        $this->assertTrue($result->contains($pastAppointment));
        $this->assertFalse($result->contains($futureAppointment));
    }

    public function test_getProximaConsulta()
    {
        $patient = User::factory()->create(['role' => 'patient']);
        $futureAppointment = Appointment::factory()->create([
            'patient_id' => $patient->id,
            'date' => Carbon::now()->addDays(10)
        ]);
        $laterAppointment = Appointment::factory()->create([
            'patient_id' => $patient->id,
            'date' => Carbon::now()->addDays(20)
        ]);

        $controller = $this->app->make('App\Http\Controllers\AppointmentController');
        $result = $this->callMethod($controller, 'getProximaConsulta', [$patient->id]);

        $this->assertEquals($futureAppointment->id, $result->id);
    }

    public function test_getProximasConsultas()
    {
        $patient = User::factory()->create(['role' => 'patient']);
        $futureAppointment = Appointment::factory()->create([
            'patient_id' => $patient->id,
            'date' => Carbon::now()->addDays(10)
        ]);
        $laterAppointment = Appointment::factory()->create([
            'patient_id' => $patient->id,
            'date' => Carbon::now()->addDays(20)
        ]);

        $controller = $this->app->make('App\Http\Controllers\AppointmentController');
        $result = $this->callMethod($controller, 'getProximasConsultas', [$patient->id]);

        $this->assertCount(2, $result);
        $this->assertTrue($result->contains($futureAppointment));
        $this->assertTrue($result->contains($laterAppointment));
    }

    public function test_getPacientes()
    {
        $psychologist = User::factory()->create(['role' => 'psychologist']);
        $patient = User::factory()->create(['role' => 'patient']);
        Appointment::factory()->create([
            'psychologist_id' => $psychologist->id,
            'patient_id' => $patient->id,
        ]);

        $controller = $this->app->make('App\Http\Controllers\AppointmentController');
        $result = $this->callMethod($controller, 'getPacientes', [$psychologist->id]);

        $this->assertCount(1, $result);
        $this->assertTrue($result->contains($patient));
    }

    public function test_getConsultas()
    {
        $psychologist = User::factory()->create(['role' => 'psychologist']);
        $patient = User::factory()->create(['role' => 'patient']);
        $appointment = Appointment::factory()->create([
            'psychologist_id' => $psychologist->id,
            'patient_id' => $patient->id,
        ]);
        $meeting = MeetingSession::factory()->create([
            'appointment_id' => $appointment->id,
        ]);

        $controller = $this->app->make('App\Http\Controllers\AppointmentController');
        $result = $this->callMethod($controller, 'getConsultas', [$psychologist->id]);

        $this->assertCount(1, $result);
        $this->assertTrue($result->contains($appointment));
        $this->assertTrue($result->first()->hasMeetingSession);
    }
}
