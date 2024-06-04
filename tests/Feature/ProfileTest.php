<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class ProfileTest extends TestCase
{
    use DatabaseTransactions;

    public function test_profile_page_is_displayed(): void
    {
        $psychologist = User::factory()->create(['role' => 'psicologo']);
        $patient = User::factory()->create(['role' => 'paciente']);

        $response = $this
            ->actingAs($psychologist)
            ->get(route('profile.edit', ['patient_id' => $patient->id]));

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->component('Profile/Edit')
            ->has('patient', fn ($page) => $page
                ->where('id', $patient->id)
                ->etc()
            )
        );
    }

    public function test_profile_information_can_be_updated(): void
    {
        $psychologist = User::factory()->create(['role' => 'psicologo']);
        $patient = User::factory()->create(['role' => 'paciente']);

        $response = $this
            ->actingAs($psychologist)
            ->patch(route('profile.update', ['patient_id' => $patient->id]), [
                'name' => 'Test User',
                'logradouro' => 'Test Logradouro',
                'bairro' => 'Test Bairro',
                'localidade' => 'Test Localidade',
                'uf' => 'TS',
                'celular' => '12345678901',
            ]);

        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect(route('profile.edit', ['patient_id' => $patient->id]));

        $patient->refresh();

        $this->assertSame('Test User', $patient->name);
        $this->assertSame('Test Logradouro', $patient->logradouro);
        $this->assertSame('Test Bairro', $patient->bairro);
        $this->assertSame('Test Localidade', $patient->localidade);
        $this->assertSame('TS', $patient->uf);
        $this->assertSame('12345678901', $patient->celular);
    }

    public function test_user_can_delete_their_account(): void
    {
        $psychologist = User::factory()->create(['role' => 'psicologo']);
        $patient = User::factory()->create(['role' => 'paciente']);

        $response = $this
            ->actingAs($psychologist)
            ->delete(route('profile.destroy', ['patient_id' => $patient->id]));

        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect(route('dashboard'));

        $this->assertNull($patient->fresh());
    }
}
