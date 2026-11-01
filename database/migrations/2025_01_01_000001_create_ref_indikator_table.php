<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('ref_indikator', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('kode')->unique();
            $table->text('nama_indikator');
            $table->smallInteger('outcome');
            $table->smallInteger('nomor_output');
            $table->text('nama_output');
            $table->string('unit');
            $table->string('basis_hitung');
            $table->text('definisi_operasional');
            $table->text('mov_wajib');
            $table->string('status_dihitung')->nullable();
            $table->integer('target_2025')->default(0);
            $table->integer('target_2026')->default(0);
            $table->integer('target_2027')->default(0);
            $table->boolean('aktif')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ref_indikator');
    }
};
