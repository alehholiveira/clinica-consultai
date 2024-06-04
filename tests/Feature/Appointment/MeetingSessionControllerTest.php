<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Appointment;
use App\Models\MeetingSession;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class MeetingSessionControllerTest extends TestCase
{
    use DatabaseTransactions;

    public function test_create_page_is_displayed_for_psicologo(): void
    {
        $psicologo = User::factory()->create(['role' => 'psicologo']);
        $paciente = User::factory()->create(['role' => 'paciente']);
        $appointment = Appointment::factory()->create(['psychologist_id' => $psicologo->id, 'patient_id' => $paciente->id]);

        $response = $this
            ->actingAs($psicologo)
            ->get(route('appointment/{user_name}/{meetingsession_id}', ['user_name' => $paciente->name, 'meetingsession_id' => $appointment->id]));

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->component('Auth/MeetingSession')
            ->has('appointment', fn ($page) => $page
                ->where('id', $appointment->id)
                ->etc()
            )
        );
    }

    public function test_create_meeting_session(): void
    {
        $psicologo = User::factory()->create(['role' => 'psicologo']);
        $appointment = Appointment::factory()->create(['psychologist_id' => $psicologo->id]);

        $response = $this
            ->actingAs($psicologo)
            ->post('createMeetingSession', [
                'appointment_id' => $appointment->id,
            ]);

        $response->assertRedirect(route('dashboard'));

        $this->assertDatabaseHas('meeting_sessions', [
            'appointment_id' => $appointment->id,
        ]);
    }

    public function test_generate_encaminhamento(): void
    {
        $psicologo = User::factory()->create(['role' => 'psicologo']);
        $appointment = Appointment::factory()->create(['psychologist_id' => $psicologo->id]);
        $meetingSession = MeetingSession::factory()->create(['appointment_id' => $appointment->id]);

        $response = $this
            ->actingAs($psicologo)
            ->post('appointment/documents/encaminhamento', [
                'appointment_id' => $appointment->id,
                'meetingsession_id' => $meetingSession->id,
            ]);

        $response->assertStatus(302);
        $response->assertRedirect("/appointment/{$appointment->patient->name}/{$appointment->id}");

        // Obter a sessão de reunião atualizada
        $meetingSession->refresh();

        // Construir o caminho esperado do arquivo
        $expectedFilePath = 'storage/' . $psicologo->name . '/' . $appointment->patient->name . '/' . $appointment->date . '/encaminhamento.docx';

        // Verificar se o caminho do arquivo foi salvo corretamente
        $this->assertDatabaseHas('meeting_sessions', [
            'appointment_id' => $appointment->id,
            'referrals' => $expectedFilePath,
        ]);
    }

    public function test_generate_atestado(): void
    {
        $psicologo = User::factory()->create(['role' => 'psicologo']);
        $appointment = Appointment::factory()->create(['psychologist_id' => $psicologo->id]);
        $meetingSession = MeetingSession::factory()->create(['appointment_id' => $appointment->id]);

        $response = $this
            ->actingAs($psicologo)
            ->post('appointment/documents/atestado', [
                'appointment_id' => $appointment->id,
                'meetingsession_id' => $meetingSession->id,
            ]);

        $response->assertStatus(302);
        $response->assertRedirect("/appointment/{$appointment->patient->name}/{$appointment->id}");

        $meetingSession->refresh();

        $expectedFilePath = 'storage/' . $psicologo->name . '/' . $appointment->patient->name . '/' . $appointment->date . '/atestado.docx';

        $this->assertDatabaseHas('meeting_sessions', [
            'appointment_id' => $appointment->id,
            'attendance_certificates' => $expectedFilePath,
        ]);
    }

    public function test_generate_info(): void
    {
        $psicologo = User::factory()->create(['role' => 'psicologo']);
        $appointment = Appointment::factory()->create(['psychologist_id' => $psicologo->id]);
        $meetingSession = MeetingSession::factory()->create(['appointment_id' => $appointment->id]);

        $response = $this
            ->actingAs($psicologo)
            ->post('appointment/documents/info', [
                'appointment_id' => $appointment->id,
                'meetingsession_id' => $meetingSession->id,
                'meetinginfo' => 'Descrição da consulta',
            ]);

        $response->assertStatus(302);
        $response->assertRedirect("/appointment/{$appointment->patient->name}/{$appointment->id}");

        $meetingSession->refresh();

        $expectedFilePath = 'storage/' . $psicologo->name . '/' . $appointment->patient->name . '/' . $appointment->date . '/info.docx';

        $this->assertDatabaseHas('meeting_sessions', [
            'appointment_id' => $appointment->id,
            'meeting_annotation' => $expectedFilePath,
        ]);
    }
}
