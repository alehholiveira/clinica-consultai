<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Models\Appointment;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'username',
        'password',
        'logradouro',
        'bairro',
        'localidade',
        'uf',
        'celular',
        'role'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }


    public function appointmentsAsPatient()
    {
        return $this->hasMany(Appointment::class, 'patient_id');
    }

    public function appointmentsAsPsychologist()
    {
        return $this->hasMany(Appointment::class, 'psychologist_id');
    }

    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($user) {
            // Deleta as consultas onde o usuário é paciente
            foreach ($user->appointmentsAsPatient as $appointment) {
                $appointment->delete();
            }

            // Deleta as consultas onde o usuário é psicólogo
            foreach ($user->appointmentsAsPsychologist as $appointment) {
                $appointment->delete();
            }
        });
    }


}
