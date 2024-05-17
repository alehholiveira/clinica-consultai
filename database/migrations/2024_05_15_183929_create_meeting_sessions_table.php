<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('meeting_sessions', function (Blueprint $table) {
            $table->id();
            $table->string('referrals')->nullable(); // encaminhamentos
            $table->string('attendance_certificates')->nullable(); // atestados de atendimentos
            $table->string('meeting_annotation')->nullable(); 
            $table->foreignId('appointment_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('meeting_sessions');
    }
};
