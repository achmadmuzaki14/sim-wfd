<?php

namespace App\Models;

use App\Enums\KelompokUsia;
use App\Enums\StatusVerifikasi;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class WfdRoster extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $table = 'wfd_roster';

    protected $fillable = [
        'kode',
        'nama_lengkap',
        'mitra_id',
        'provinsi',
        'kabupaten',
        'desa',
        'kelompok_id',
        'kelompok_usia',
        'disabilitas',
        'tahun_bergabung',
        'persetujuan_data',
        'status_aktif',
        'catatan',
    ];

    protected $casts = [
        'disabilitas' => 'boolean',
        'persetujuan_data' => 'boolean',
        'status_aktif' => 'boolean',
        'tahun_bergabung' => 'integer',
    ];

    public function mitra(): BelongsTo
    {
        return $this->belongsTo(RefMitra::class, 'mitra_id');
    }

    public function kelompok(): BelongsTo
    {
        return $this->belongsTo(Kelompok::class, 'kelompok_id');
    }

    public function capaian(): HasMany
    {
        return $this->hasMany(WfdCapaian::class, 'wfd_id');
    }

    public function getKelompokUsiaEnum(): KelompokUsia
    {
        return KelompokUsia::from($this->kelompok_usia);
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
