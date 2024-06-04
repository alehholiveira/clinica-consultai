<?php

namespace Database\Factories;

use App\Models\Appointment;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class AppointmentFactory extends Factory
{
    protected $model = Appointment::class;

    public function definition()
    {
        return [
            'patient_id' => User::factory()->create(['role' => 'paciente'])->id,
            'psychologist_id' => User::factory()->create(['role' => 'psicologo'])->id,
            'date' => $this->faker->date(),
            'time' => $this->faker->time(),
        ];
    }
}
