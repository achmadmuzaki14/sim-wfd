<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('leverage', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('kode')->unique();
            $table->string('sumber');
            $table->string('jenis_leverage');
            $table->bigInteger('nilai_idr');
            $table->decimal('nilai_usd', 12, 2)->nullable();
            $table->foreignUuid('mitra_id')->references('id')->on('ref_mitra')->cascadeOnDelete();
            $table->string('status_leverage')->default('Dalam proses');
            $table->text('keterangan')->nullable();
            $table->string('periode');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('leverage');
    }
};
