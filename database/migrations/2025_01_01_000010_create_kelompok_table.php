<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('kelompok', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('kode')->unique();
            $table->string('nama');
            $table->string('tipe');
            $table->foreignUuid('mitra_id')->references('id')->on('ref_mitra')->cascadeOnDelete();
            $table->string('provinsi');
            $table->string('desa');
            $table->decimal('luas_hektar', 10, 2)->nullable();
            $table->integer('anggota_perempuan')->default(0);
            $table->integer('anggota_laki')->default(0);
            $table->boolean('dipimpin_perempuan')->default(false);
            $table->text('dasar_hukum')->nullable();
            $table->string('nomor_sk')->nullable();
            $table->date('tanggal_sk')->nullable();
            $table->string('periode');
            $table->string('status_verifikasi')->default('Belum diverifikasi');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('kelompok');
    }
};
