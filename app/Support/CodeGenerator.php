<?php

namespace App\Support;

use Illuminate\Support\Facades\DB;
use RuntimeException;

final class CodeGenerator
{
    /**
     * Membuat kode berurutan berdasarkan prefix dan tabel.
     *
     * Contoh:
     * WFD-000001
     * WFD-000002
     */
    public static function generate(
        string $prefix,
        string $table,
        int $padding = 6
    ): string {
        self::validateIdentifier($prefix, $table);

        $prefix = strtoupper($prefix);
        $lockName = sprintf(
            'sim_wfd:code_generator:%s:%s',
            strtolower($table),
            strtolower($prefix)
        );

        /*
         * GET_LOCK adalah advisory lock MySQL.
         * Timeout 10 detik.
         */
        $lockResult = DB::selectOne(
            'SELECT GET_LOCK(?, 10) AS acquired',
            [$lockName]
        );

        if ((int) ($lockResult->acquired ?? 0) !== 1) {
            throw new RuntimeException(
                "Gagal memperoleh lock untuk pembuatan kode {$prefix}."
            );
        }

        try {
            $lastCode = DB::table($table)
                ->where('kode', 'like', $prefix.'-%')
                ->orderByDesc('kode')
                ->value('kode');

            $lastNumber = self::extractNumber(
                $lastCode,
                $prefix
            );

            $nextNumber = $lastNumber + 1;

            return sprintf(
                '%s-%0'.$padding.'d',
                $prefix,
                $nextNumber
            );
        } finally {
            DB::selectOne(
                'SELECT RELEASE_LOCK(?) AS released',
                [$lockName]
            );
        }
    }

    /**
     * Mengambil bagian angka dari kode terakhir.
     */
    private static function extractNumber(
        ?string $lastCode,
        string $prefix
    ): int {
        if ($lastCode === null) {
            return 0;
        }

        $pattern = '/^'.preg_quote($prefix, '/').'-(\d+)$/';

        if (! preg_match($pattern, $lastCode, $matches)) {
            return 0;
        }

        return (int) $matches[1];
    }

    /**
     * Nama tabel tidak boleh berasal dari input pengguna.
     */
    private static function validateIdentifier(
        string $prefix,
        string $table
    ): void {
        if (! preg_match('/^[A-Za-z0-9_]+$/', $table)) {
            throw new RuntimeException(
                "Nama tabel tidak valid: {$table}"
            );
        }

        if (! preg_match('/^[A-Za-z0-9_-]+$/', $prefix)) {
            throw new RuntimeException(
                "Prefix kode tidak valid: {$prefix}"
            );
        }
    }
}
