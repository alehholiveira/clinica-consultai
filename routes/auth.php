<?php

use App\Events\MyEvent;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\MailController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\Auth\AppointmentController;
use App\Http\Controllers\Auth\DashboardController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\MeetingSessionController;


Route::middleware('guest')->group(function () {
    Route::get('login', [AuthenticatedSessionController::class, 'create'])
        ->name('login');

    Route::post('login', [AuthenticatedSessionController::class, 'store']);

    Route::get('forgot-password', [PasswordResetLinkController::class, 'create'])
        ->name('password.request');

    Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])
        ->name('password.email');

    Route::get('reset-password/{token}', [NewPasswordController::class, 'create'])
        ->name('password.reset');

    Route::post('reset-password', [NewPasswordController::class, 'store'])
        ->name('password.store');

    Route::post('/send', [MailController::class, 'send'])->name('mail-send');
});

Route::middleware('auth')->group(function () {
    Route::get('dashboard', [DashboardController::class, 'dashboard']) // rota para formulario de criar paciente
        ->name('dashboard');

    Route::post('/mark-patient-arrived', [DashboardController::class, 'markPatientArrived']);

    Route::get('register', [RegisteredUserController::class, 'view']) // rota para formulario de criar paciente
        ->name('register');

    Route::post('register-paciente', [RegisteredUserController::class, 'storePaciente']); // rota post para criar paciente

    Route::post('register-psicologo', [RegisteredUserController::class, 'storePsicologo']); // rota post para criar psicologo

    Route::get('/available-times', [AppointmentController::class, 'getAvailableTimes']);

    Route::post('create-consulta', [AppointmentController::class, 'store']);

    Route::get('appointment/{user_name}/{meetingsession_id}', [MeetingSessionController::class, 'create'])
        ->name('appointment/{user_name}/{meetingsession_id}');

    Route::post('createMeetingSession', [MeetingSessionController::class, 'createMeetingSession']);

    Route::post('appointment/documents/encaminhamento', [MeetingSessionController::class, 'gerarEncaminhamento']);

    Route::post('appointment/documents/atestado', [MeetingSessionController::class, 'gerarAtestado']);

    Route::post('appointment/documents/info', [MeetingSessionController::class, 'gerarInfo']);

    Route::get('verify-email', EmailVerificationPromptController::class)
        ->name('verification.notice');

    Route::get('verify-email/{id}/{hash}', VerifyEmailController::class)
        ->middleware(['signed', 'throttle:6,1'])
        ->name('verification.verify');

    Route::post('email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
        ->middleware('throttle:6,1')
        ->name('verification.send');

    Route::get('confirm-password', [ConfirmablePasswordController::class, 'show'])
        ->name('password.confirm');

    Route::post('confirm-password', [ConfirmablePasswordController::class, 'store']);

    Route::put('password', [PasswordController::class, 'update'])->name('password.update');

    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');
});
