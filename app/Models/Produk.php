<?php

namespace App\Models;

use App\Enums\JenisPengembangan;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Produk extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $table = 'produk';

    protected $fillable = [
        'kode', 'nama', 'komoditas', 'jenis_pengembangan',
        'mitra_id', 'kelompok_id', 'link_foto', 'file_foto',
        'periode', 'status_verifikasi',
    ];

    public function mitra(): BelongsTo
    {
        return $this->belongsTo(RefMitra::class, 'mitra_id');
    }

    public function kelompok(): BelongsTo
    {
        return $this->belongsTo(Kelompok::class, 'kelompok_id');
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
