<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('kegiatan', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('kode')->unique();
            $table->string('judul');
            $table->string('jenis_kegiatan');
            $table->date('tanggal_kegiatan');
            $table->foreignUuid('mitra_id')->references('id')->on('ref_mitra')->cascadeOnDelete();
            $table->string('provinsi')->nullable();
            $table->string('kabupaten')->nullable();
            $table->string('desa')->nullable();
            $table->string('level_kegiatan');
            $table->integer('peserta_perempuan')->default(0);
            $table->integer('peserta_laki')->default(0);
            $table->text('link_daftar_hadir')->nullable();
            $table->string('file_daftar_hadir')->nullable();
            $table->text('link_dokumentasi')->nullable();
            $table->string('periode');
            $table->integer('tahun_lapor');
            $table->string('status_verifikasi')->default('Belum diverifikasi');
            $table->timestamps();
            $table->softDeletes();

            $table->index(['mitra_id', 'tahun_lapor', 'periode']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('kegiatan');
    }
};
