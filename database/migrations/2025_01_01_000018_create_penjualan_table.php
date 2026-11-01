<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('penjualan', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('kode')->unique();
            $table->foreignUuid('kelompok_id')->references('id')->on('kelompok')->cascadeOnDelete();
            $table->foreignUuid('produk_id')->nullable()->references('id')->on('produk')->nullOnDelete();
            $table->string('komoditas');
            $table->foreignUuid('mitra_id')->references('id')->on('ref_mitra')->cascadeOnDelete();
            $table->string('bulan');
            $table->string('periode');
            $table->integer('tahun_lapor');
            $table->decimal('volume', 12, 2);
            $table->string('satuan');
            $table->bigInteger('omzet');
            $table->bigInteger('laba');
            $table->string('level_pasar');
            $table->string('status_verifikasi')->default('Belum diverifikasi');
            $table->timestamps();
            $table->softDeletes();

            $table->index(['tahun_lapor', 'komoditas']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('penjualan');
    }
};
