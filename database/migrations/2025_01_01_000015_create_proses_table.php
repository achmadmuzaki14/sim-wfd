<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('proses', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('kode')->unique();
            $table->string('judul');
            $table->foreignUuid('indikator_id')->references('id')->on('ref_indikator')->cascadeOnDelete();
            $table->foreignUuid('mitra_id')->references('id')->on('ref_mitra')->cascadeOnDelete();
            $table->string('jenis_proses');
            $table->integer('total_tahapan');
            $table->integer('tahapan_saat_ini')->default(1);
            $table->string('status_proses')->default('Berjalan');
            $table->string('periode_update_terakhir')->nullable();
            $table->boolean('aktif')->default(true);
            $table->timestamps();
            $table->softDeletes();

            $table->index(['mitra_id', 'indikator_id', 'status_proses']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('proses');
    }
};
