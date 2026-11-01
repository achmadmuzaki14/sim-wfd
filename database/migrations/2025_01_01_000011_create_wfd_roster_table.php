<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('wfd_roster', function (Blueprint $table) {
            $table->uuid('id')->primary();

            $table->string('kode')->unique();
            $table->string('nama_lengkap');

            $table->foreignUuid('mitra_id')
                ->references('id')
                ->on('ref_mitra')
                ->cascadeOnDelete();

            $table->string('provinsi')->nullable();
            $table->string('kabupaten')->nullable();
            $table->string('desa')->nullable();

            $table->foreignUuid('kelompok_id')
                ->nullable()
                ->references('id')
                ->on('kelompok')
                ->nullOnDelete();

            $table->string('kelompok_usia');
            $table->boolean('disabilitas')->default(false);
            $table->integer('tahun_bergabung');
            $table->boolean('persetujuan_data')->default(false);
            $table->boolean('status_aktif')->default(true);
            $table->text('catatan')->nullable();

            $table->timestamps();
            $table->softDeletes();

            /*
             * MySQL replacement for PostgreSQL partial unique index:
             *
             * Active record:
             *   nama_mitra_unique_key = LOWER(nama_lengkap)
             *
             * Soft-deleted record:
             *   nama_mitra_unique_key = NULL
             */
            $table->string('nama_mitra_unique_key')
                ->virtualAs(
                    'CASE
                        WHEN deleted_at IS NULL
                        THEN LOWER(nama_lengkap)
                        ELSE NULL
                    END'
                );

            $table->unique(
                ['nama_mitra_unique_key', 'mitra_id'],
                'wfd_roster_nama_mitra_unique'
            );
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('wfd_roster');
    }
};
