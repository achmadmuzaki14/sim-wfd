<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Penjualan extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $table = 'penjualan';

    protected $fillable = [
        'kode', 'kelompok_id', 'produk_id', 'komoditas', 'mitra_id',
        'bulan', 'periode', 'tahun_lapor', 'volume', 'satuan',
        'omzet', 'laba', 'level_pasar', 'status_verifikasi',
    ];

    protected $casts = [
        'tahun_lapor' => 'integer',
        'volume' => 'decimal:2',
        'omzet' => 'integer',
        'laba' => 'integer',
    ];

    public function kelompok(): BelongsTo
    {
        return $this->belongsTo(Kelompok::class, 'kelompok_id');
    }

    public function produk(): BelongsTo
    {
        return $this->belongsTo(Produk::class, 'produk_id');
    }

    public function mitra(): BelongsTo
    {
        return $this->belongsTo(RefMitra::class, 'mitra_id');
    }

    public function getMarginAttribute(): float
    {
        if ($this->omzet <= 0) {
            return 0.0;
        }

        return round(($this->laba / $this->omzet) * 100, 1);
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
