<?php

namespace Tests\Feature\Auth;

use App\Models\Appointment;
use App\Models\User;
use App\Models\MeetingSession;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Tests\TestCase;
use Carbon\Carbon;
use Illuminate\Support\Facades\Event;
use App\Events\MyEvent;

class DashboardControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_dashboard_for_secretaria()
    {
        $secretaria = User::factory()->create(['role' => 'secretaria']);
        $this->actingAs($secretaria);

        $response = $this->get(route('dashboard'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('Dashboard')
            ->has('ConsultasNoDiaDeHoje'));
    }

    public function test_dashboard_for_paciente()
    {
        $paciente = User::factory()->create(['role' => 'paciente']);
        $this->actingAs($paciente);

        $response = $this->get(route('dashboard'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('DashboardPaciente')
            ->has('historico')
            ->has('proximaConsulta')
            ->has('proximasConsultas')
            ->has('psychologists'));
    }

    public function test_dashboard_for_psicologo()
    {
        $psicologo = User::factory()->create(['role' => 'psicologo']);
        $this->actingAs($psicologo);

        $response = $this->get(route('dashboard'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('DashboardPsicologo')
            ->has('pacientes')
            ->has('consultas'));
    }

    public function test_unauthenticated_user_redirected_to_login()
    {
        $response = $this->get(route('dashboard'));

        $response->assertRedirect(route('login'));
    }

}
