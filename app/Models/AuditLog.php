<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class AuditLog extends Model
{
    use HasUuids;

    protected $table = 'audit_log';

    public $timestamps = false;

    protected $fillable = [
        'tabel', 'record_id', 'aksi', 'user_id',
        'nilai_lama', 'nilai_baru', 'waktu',
    ];

    protected $casts = [
        'nilai_lama' => 'array',
        'nilai_baru' => 'array',
        'waktu' => 'datetime',
    ];

    public static function log(string $tabel, string $recordId, string $aksi, ?array $nilaiLama = null, ?array $nilaiBaru = null): void
    {
        self::create([
            'tabel' => $tabel,
            'record_id' => $recordId,
            'aksi' => $aksi,
            'user_id' => auth()->id(),
            'nilai_lama' => $nilaiLama,
            'nilai_baru' => $nilaiBaru,
            'waktu' => now(),
        ]);
    }
}
