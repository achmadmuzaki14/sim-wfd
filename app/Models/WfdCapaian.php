<?php

namespace App\Models;

use App\Enums\StatusVerifikasi;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class WfdCapaian extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $table = 'wfd_capaian';

    protected $fillable = [
        'kode',
        'wfd_id',
        'indikator_id',
        'periode',
        'tahun_lapor',
        'jenis_bukti',
        'link_mov',
        'file_mov',
        'tanggal_bukti',
        'status_verifikasi',
        'verifikator_id',
        'tanggal_verifikasi',
        'catatan_verifikasi',
    ];

    protected $casts = [
        'tanggal_bukti' => 'date',
        'tanggal_verifikasi' => 'datetime',
        'tahun_lapor' => 'integer',
    ];

    public function wfd(): BelongsTo
    {
        return $this->belongsTo(WfdRoster::class, 'wfd_id');
    }

    public function indikator(): BelongsTo
    {
        return $this->belongsTo(RefIndikator::class, 'indikator_id');
    }

    public function verifikator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'verifikator_id');
    }

    public function getStatusVerifikasiEnum(): StatusVerifikasi
    {
        return StatusVerifikasi::from($this->status_verifikasi);
    }

    public function hasEvidence(): bool
    {
        return !empty($this->file_mov) || !empty($this->link_mov);
    }

    protected static function booted(): void
    {
        static::addGlobalScope('mitra', function (Builder $builder) {
            $user = auth()->user();
            if ($user && $user->isMitra() && $user->mitraId()) {
                $builder->whereHas('wfd', function ($q) use ($user) {
                    $q->where('mitra_id', $user->mitraId());
                });
            }
        });
    }
}
