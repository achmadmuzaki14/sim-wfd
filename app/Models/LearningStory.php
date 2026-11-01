<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class LearningStory extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $table = 'learning_story';

    protected $fillable = [
        'kode', 'judul', 'penulis', 'mitra_id', 'tema', 'ringkasan',
        'link_cerita', 'file_cerita', 'link_foto', 'periode',
        'status_verifikasi',
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
