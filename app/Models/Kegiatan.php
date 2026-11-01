<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Kegiatan extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $table = 'kegiatan';

    protected $fillable = [
        'kode',
        'judul',
        'jenis_kegiatan',
        'tanggal_kegiatan',
        'mitra_id',
        'provinsi',
        'kabupaten',
        'desa',
        'level_kegiatan',
        'peserta_perempuan',
        'peserta_laki',
        'link_daftar_hadir',
        'file_daftar_hadir',
        'link_dokumentasi',
        'periode',
        'tahun_lapor',
        'status_verifikasi',
    ];

    protected $casts = [
        'tanggal_kegiatan' => 'date',
        'peserta_perempuan' => 'integer',
        'peserta_laki' => 'integer',
        'tahun_lapor' => 'integer',
    ];

    public function mitra(): BelongsTo
    {
        return $this->belongsTo(RefMitra::class, 'mitra_id');
    }

    public function getTotalPesertaAttribute(): int
    {
        return $this->peserta_perempuan + $this->peserta_laki;
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
