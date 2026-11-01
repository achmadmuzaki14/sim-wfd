<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('ref_tahapan', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('jenis_proses');
            $table->smallInteger('nomor_tahapan');
            $table->string('nama_tahapan');
            $table->boolean('tahapan_final')->default(false);
            $table->timestamps();

            $table->unique(['jenis_proses', 'nomor_tahapan']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ref_tahapan');
    }
};
