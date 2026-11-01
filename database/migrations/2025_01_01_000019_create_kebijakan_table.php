<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('kebijakan', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('kode')->unique();
            $table->string('judul');
            $table->string('level_kebijakan');
            $table->foreignUuid('mitra_id')->references('id')->on('ref_mitra')->cascadeOnDelete();
            $table->text('isu_didorong');
            $table->string('instansi');
            $table->string('status_kebijakan')->default('Advokasi berjalan');
            $table->boolean('responsif_gender')->default(false);
            $table->string('periode');
            $table->string('status_verifikasi')->default('Belum diverifikasi');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('kebijakan');
    }
};
