<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('learning_story', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('kode')->unique();
            $table->string('judul');
            $table->string('penulis');
            $table->foreignUuid('mitra_id')->references('id')->on('ref_mitra')->cascadeOnDelete();
            $table->string('tema');
            $table->text('ringkasan');
            $table->text('link_cerita')->nullable();
            $table->string('file_cerita')->nullable();
            $table->text('link_foto')->nullable();
            $table->string('periode');
            $table->string('status_verifikasi')->default('Belum diverifikasi');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('learning_story');
    }
};
