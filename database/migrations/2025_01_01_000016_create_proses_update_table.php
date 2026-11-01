<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('proses_update', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('proses_id')->references('id')->on('proses')->cascadeOnDelete();
            $table->string('periode');
            $table->integer('nomor_tahapan');
            $table->string('nama_tahapan');
            $table->text('perkembangan');
            $table->text('hambatan')->nullable();
            $table->text('rencana_kuartal_depan')->nullable();
            $table->text('link_bukti')->nullable();
            $table->string('file_bukti')->nullable();
            $table->boolean('terkunci')->default(false);
            $table->boolean('is_carry_forward')->default(false);
            $table->foreignId('diinput_oleh')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();
            $table->timestamp('tanggal_input');
            $table->timestamps();

            $table->unique(['proses_id', 'periode']);
            $table->index('periode');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('proses_update');
    }
};
