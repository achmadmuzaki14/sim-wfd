<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Leverage extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $table = 'leverage';

    protected $fillable = [
        'kode', 'sumber', 'jenis_leverage', 'nilai_idr', 'nilai_usd',
        'mitra_id', 'status_leverage', 'keterangan', 'periode',
    ];

    protected $casts = [
        'nilai_idr' => 'integer',
        'nilai_usd' => 'decimal:2',
    ];

    public function mitra(): BelongsTo
    {
        return $this->belongsTo(RefMitra::class, 'mitra_id');
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
