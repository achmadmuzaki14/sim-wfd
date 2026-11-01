<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('audit_log', function (Blueprint $table) {
            $table->uuid('id')->primary();

            $table->string('tabel');
            $table->uuid('record_id');
            $table->string('aksi');

            $table->foreignId('user_id')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();

            /*
             * Gunakan JSON untuk MySQL.
             */
            $table->json('nilai_lama')->nullable();
            $table->json('nilai_baru')->nullable();

            $table->timestamp('waktu')->useCurrent();

            $table->index(
                ['tabel', 'record_id'],
                'audit_log_record_idx'
            );

            $table->index(
                ['user_id', 'waktu'],
                'audit_log_user_time_idx'
            );
        });

        /*
         * MySQL trigger untuk mencegah UPDATE.
         *
         * DELIMITER tidak diperlukan karena DELIMITER hanya merupakan
         * perintah milik MySQL command-line client, bukan sintaks SQL server.
         */
        DB::unprepared(<<<'SQL'
            CREATE TRIGGER no_update_audit_log
            BEFORE UPDATE ON audit_log
            FOR EACH ROW
            BEGIN
                SIGNAL SQLSTATE '45000'
                    SET MESSAGE_TEXT = 'Audit log bersifat append-only. UPDATE tidak diizinkan.';
            END
        SQL);

        /*
         * MySQL trigger untuk mencegah DELETE.
         */
        DB::unprepared(<<<'SQL'
            CREATE TRIGGER no_delete_audit_log
            BEFORE DELETE ON audit_log
            FOR EACH ROW
            BEGIN
                SIGNAL SQLSTATE '45000'
                    SET MESSAGE_TEXT = 'Audit log bersifat append-only. DELETE tidak diizinkan.';
            END
        SQL);
    }

    public function down(): void
    {
        /*
         * Sintaks DROP TRIGGER MySQL tidak memakai:
         * ON audit_log
         */
        DB::unprepared(
            'DROP TRIGGER IF EXISTS no_delete_audit_log'
        );

        DB::unprepared(
            'DROP TRIGGER IF EXISTS no_update_audit_log'
        );

        Schema::dropIfExists('audit_log');
    }
};
