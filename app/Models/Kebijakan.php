<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Kebijakan extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $table = 'kebijakan';

    protected $fillable = [
        'kode', 'judul', 'level_kebijakan', 'mitra_id', 'isu_didorong',
        'instansi', 'status_kebijakan', 'responsif_gender', 'periode',
        'status_verifikasi',
    ];

    protected $casts = [
        'responsif_gender' => 'boolean',
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
