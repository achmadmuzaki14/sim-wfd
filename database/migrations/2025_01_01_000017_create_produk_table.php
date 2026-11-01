<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('produk', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('kode')->unique();
            $table->string('nama');
            $table->string('komoditas');
            $table->string('jenis_pengembangan');
            $table->foreignUuid('mitra_id')->references('id')->on('ref_mitra')->cascadeOnDelete();
            $table->foreignUuid('kelompok_id')->nullable()->references('id')->on('kelompok')->nullOnDelete();
            $table->text('link_foto')->nullable();
            $table->string('file_foto')->nullable();
            $table->string('periode');
            $table->string('status_verifikasi')->default('Belum diverifikasi');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('produk');
    }
};
