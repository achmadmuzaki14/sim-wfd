<?php

namespace App\Models;

use App\Enums\StatusDokumen;
use App\Enums\StatusVerifikasi;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Dokumen extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $table = 'dokumen';

    protected $fillable = [
        'kode',
        'judul',
        'indikator_id',
        'jenis_dokumen',
        'status_dokumen',
        'mitra_id',
        'kelompok_id',
        'periode',
        'tahun_lapor',
        'tanggal_terbit',
        'instansi_penerbit',
        'level_dokumen',
        'link_mov',
        'file_mov',
        'status_verifikasi',
        'verifikator_id',
        'tanggal_verifikasi',
        'catatan_verifikasi',
    ];

    protected $casts = [
        'tanggal_terbit' => 'date',
        'tanggal_verifikasi' => 'datetime',
        'tahun_lapor' => 'integer',
    ];

    public function indikator(): BelongsTo
    {
        return $this->belongsTo(RefIndikator::class, 'indikator_id');
    }

    public function mitra(): BelongsTo
    {
        return $this->belongsTo(RefMitra::class, 'mitra_id');
    }

    public function kelompok(): BelongsTo
    {
        return $this->belongsTo(Kelompok::class, 'kelompok_id');
    }

    public function verifikator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'verifikator_id');
    }

    public function hasEvidence(): bool
    {
        return !empty($this->file_mov) || !empty($this->link_mov);
    }

    public function getStatusDokumenEnum(): StatusDokumen
    {
        return StatusDokumen::from($this->status_dokumen);
    }

    public function getStatusVerifikasiEnum(): StatusVerifikasi
    {
        return StatusVerifikasi::from($this->status_verifikasi);
    }

    public function isCounted(): bool
    {
        $indikator = $this->indikator;
        if (!$indikator || !$indikator->hasCountedStatus()) {
            return true;
        }

        return $this->status_dokumen === $indikator->status_dihitung;
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
