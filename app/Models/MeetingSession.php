<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Appointment;

class MeetingSession extends Model
{
    use HasFactory;

    protected $fillable = [
        'referrals', // encaminhamentos
        'attendance_certificates', // atestados de atendimentos
        'meeting_annotation',
        'appointment_id'
    ];

    public function appointment()
    {
        return $this->belongsTo(Appointment::class);
    }
}
