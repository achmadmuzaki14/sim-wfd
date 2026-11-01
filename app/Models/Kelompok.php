<?php

namespace App\Models;

use App\Enums\TipeKelompok;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Kelompok extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $table = 'kelompok';

    protected $fillable = [
        'kode', 'nama', 'tipe', 'mitra_id', 'provinsi', 'desa',
        'luas_hektar', 'anggota_perempuan', 'anggota_laki',
        'dipimpin_perempuan', 'dasar_hukum', 'nomor_sk', 'tanggal_sk',
        'periode', 'status_verifikasi',
    ];

    protected $casts = [
        'luas_hektar' => 'decimal:2',
        'anggota_perempuan' => 'integer',
        'anggota_laki' => 'integer',
        'dipimpin_perempuan' => 'boolean',
        'tanggal_sk' => 'date',
    ];

    public function mitra(): BelongsTo
    {
        return $this->belongsTo(RefMitra::class, 'mitra_id');
    }

    public function getTipeEnum(): TipeKelompok
    {
        return TipeKelompok::from($this->tipe);
    }

    protected static function booted(): void
    {
        static::addGlobalScope('mitra', function (Builder $builder) {
            $user = auth()->user();
            if ($user && $user->isMitra() && $user->mitraId()) {
                $builder->where('mitra_id', $user->mitraId());
            }
        });
    }
}
