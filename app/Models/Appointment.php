<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Appointment extends Authenticatable
{
    use HasFactory;

    protected $fillable = ['date', 'time', 'patient_id', 'psychologist_id'];

    public function patient()
    {
        return $this->belongsTo(User::class, 'patient_id');
    }

    public function psychologist()
    {
        return $this->belongsTo(User::class, 'psychologist_id');
    }

    public function meetingSessions()
    {
        return $this->hasMany(MeetingSession::class, 'appointment_id');
    }

    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($appointment) {
            // Deleta as sessões de reunião relacionadas
            $appointment->meetingSessions()->each(function ($meetingSession) {
                $meetingSession->delete();
            });
        });
    }
}
