<?php

namespace App\DTOs;

class IndikatorCalculationDTO
{
    public function __construct(
        public string $kode,
        public string $nama_indikator,
        public string $basis_hitung,
        public string $unit,
        public int $capaian_2025,
        public int $capaian_2026,
        public int $capaian_2027,
        public int $capaian_kumulatif,
        public int $capaian_periode,
        public ?int $target,
        public ?float $persentase,
        public string $status,
    ) {}

    public function toArray(): array
    {
        return [
            'kode' => $this->kode,
            'nama_indikator' => $this->nama_indikator,
            'basis_hitung' => $this->basis_hitung,
            'unit' => $this->unit,
            'capaian_2025' => $this->capaian_2025,
            'capaian_2026' => $this->capaian_2026,
            'capaian_2027' => $this->capaian_2027,
            'capaian_kumulatif' => $this->capaian_kumulatif,
            'capaian_periode' => $this->capaian_periode,
            'target' => $this->target,
            'persentase' => $this->persentase,
            'status' => $this->status,
        ];
    }
}
