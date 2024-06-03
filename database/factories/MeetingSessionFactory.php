<?php

namespace Database\Factories;

use App\Models\MeetingSession;
use App\Models\Appointment;
use Illuminate\Database\Eloquent\Factories\Factory;

class MeetingSessionFactory extends Factory
{
    protected $model = MeetingSession::class;

    public function definition()
    {
        return [
            'referrals' => $this->faker->sentence,
            'attendance_certificates' => $this->faker->sentence,
            'meeting_annotation' => $this->faker->paragraph,
            'appointment_id' => Appointment::factory(),
        ];
    }
}
