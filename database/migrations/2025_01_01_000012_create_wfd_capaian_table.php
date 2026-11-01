<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('wfd_capaian', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('kode')->unique();
            $table->foreignUuid('wfd_id')->references('id')->on('wfd_roster')->cascadeOnDelete();
            $table->foreignUuid('indikator_id')->references('id')->on('ref_indikator')->cascadeOnDelete();
            $table->string('periode');
            $table->integer('tahun_lapor');
            $table->string('jenis_bukti');
            $table->text('link_mov')->nullable();
            $table->string('file_mov')->nullable();
            $table->date('tanggal_bukti')->nullable();
            $table->string('status_verifikasi')->default('Belum diverifikasi');
            $table->foreignId('verifikator_id')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();
            $table->timestamp('tanggal_verifikasi')->nullable();
            $table->text('catatan_verifikasi')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->unique(
                ['wfd_id', 'indikator_id', 'periode'],
                'wfd_cap_wfd_ind_per_uq'
            );

            $table->index(
                ['tahun_lapor', 'periode', 'indikator_id', 'status_verifikasi'],
                'wfd_cap_report_idx'
            );

            $table->index(
                'wfd_id',
                'wfd_cap_wfd_idx'
            );
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('wfd_capaian');
    }
};
