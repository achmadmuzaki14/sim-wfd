<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('dokumen', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('kode')->unique();
            $table->string('judul');
            $table->foreignUuid('indikator_id')->references('id')->on('ref_indikator')->cascadeOnDelete();
            $table->string('jenis_dokumen');
            $table->string('status_dokumen')->default('Disusun');
            $table->foreignUuid('mitra_id')->references('id')->on('ref_mitra')->cascadeOnDelete();
            $table->foreignUuid('kelompok_id')->nullable()->references('id')->on('kelompok')->nullOnDelete();
            $table->string('periode');
            $table->integer('tahun_lapor');
            $table->date('tanggal_terbit')->nullable();
            $table->string('instansi_penerbit')->nullable();
            $table->string('level_dokumen');
            $table->text('link_mov')->nullable();
            $table->string('file_mov')->nullable();
            $table->string('status_verifikasi')->default('Belum diverifikasi');
            $table->foreignId('verifikator_id')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();
            $table->timestamp('tanggal_verifikasi')->nullable();
            $table->text('catatan_verifikasi')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->index(
                ['tahun_lapor', 'indikator_id', 'status_dokumen', 'status_verifikasi'],
                'wfd_doc_report_idx'
            );
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('dokumen');
    }
};
