<?php

namespace App\Models;

use App\Enums\StatusProses;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Proses extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $table = 'proses';

    protected $fillable = [
        'kode',
        'judul',
        'indikator_id',
        'mitra_id',
        'jenis_proses',
        'total_tahapan',
        'tahapan_saat_ini',
        'status_proses',
        'periode_update_terakhir',
        'aktif',
    ];

    protected $casts = [
        'total_tahapan' => 'integer',
        'tahapan_saat_ini' => 'integer',
        'aktif' => 'boolean',
    ];

    public function indikator(): BelongsTo
    {
        return $this->belongsTo(RefIndikator::class, 'indikator_id');
    }

    public function mitra(): BelongsTo
    {
        return $this->belongsTo(RefMitra::class, 'mitra_id');
    }

    public function updates(): HasMany
    {
        return $this->hasMany(ProsesUpdate::class, 'proses_id');
    }

    public function getStatusProsesEnum(): StatusProses
    {
        return StatusProses::from($this->status_proses);
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
