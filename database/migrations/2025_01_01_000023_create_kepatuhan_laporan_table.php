<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('kepatuhan_laporan', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('mitra_id')->references('id')->on('ref_mitra')->cascadeOnDelete();
            $table->integer('tahun');
            $table->integer('bulan');
            $table->string('status_laporan')->default('Belum kirim');
            $table->date('tanggal_diterima')->nullable();
            $table->text('catatan')->nullable();
            $table->timestamps();

            $table->unique(['mitra_id', 'tahun', 'bulan']);
            $table->index(['tahun', 'bulan', 'mitra_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('kepatuhan_laporan');
    }
};
