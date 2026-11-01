<?php

namespace App\Models;

use App\Enums\BasisHitung;
use App\Enums\UnitIndikator;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class RefIndikator extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'ref_indikator';

    protected $fillable = [
        'kode',
        'nama_indikator',
        'outcome',
        'nomor_output',
        'nama_output',
        'unit',
        'basis_hitung',
        'definisi_operasional',
        'mov_wajib',
        'status_dihitung',
        'target_2025',
        'target_2026',
        'target_2027',
        'aktif',
    ];

    protected $casts = [
        'outcome' => 'integer',
        'nomor_output' => 'integer',
        'target_2025' => 'integer',
        'target_2026' => 'integer',
        'target_2027' => 'integer',
        'aktif' => 'boolean',
    ];

    public function capaian(): HasMany
    {
        return $this->hasMany(WfdCapaian::class, 'indikator_id');
    }

    public function dokumen(): HasMany
    {
        return $this->hasMany(Dokumen::class, 'indikator_id');
    }

    public function proses(): HasMany
    {
        return $this->hasMany(Proses::class, 'indikator_id');
    }

    public function getUnitEnum(): UnitIndikator
    {
        return UnitIndikator::from($this->unit);
    }

    public function getBasisHitungEnum(): BasisHitung
    {
        return BasisHitung::from($this->basis_hitung);
    }

    public function isPersonBased(): bool
    {
        return $this->basis_hitung === BasisHitung::OrangUnik->value;
    }

    public function isDocumentBased(): bool
    {
        return $this->basis_hitung === BasisHitung::Dokumen->value;
    }

    public function hasCountedStatus(): bool
    {
        return $this->status_dihitung !== null;
    }

    public function getOutcomeColor(): string
    {
        return match ($this->outcome) {
            1 => '#2F7FBF',
            2 => '#3AAE7C',
            3 => '#E28A3C',
            default => '#1F3864',
        };
    }
}
