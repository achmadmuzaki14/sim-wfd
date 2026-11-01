<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('dqa_log', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('mitra_id')->references('id')->on('ref_mitra')->cascadeOnDelete();
            $table->foreignUuid('indikator_id')->nullable()->references('id')->on('ref_indikator')->nullOnDelete();
            $table->string('jenis_isu');
            $table->text('deskripsi');
            $table->string('pic');
            $table->string('status_isu')->default('Open');
            $table->date('tanggal_temuan');
            $table->date('deadline')->nullable();
            $table->date('tanggal_selesai')->nullable();
            $table->text('tindak_lanjut')->nullable();
            $table->timestamps();

            $table->index(['status_isu', 'deadline']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('dqa_log');
    }
};
