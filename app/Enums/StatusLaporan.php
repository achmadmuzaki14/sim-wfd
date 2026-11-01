<?php

namespace App\Enums;

enum StatusLaporan: string
{
    case Diterima = 'Diterima';
    case Terlambat = 'Terlambat';
    case BelumKirim = 'Belum kirim';
    case TidakWajib = 'Tidak wajib';

    public function label(): string
    {
        return $this->value;
    }

    public function color(): string
    {
        return match ($this) {
            self::Diterima => 'green',
            self::Terlambat => 'amber',
            self::BelumKirim => 'red',
            self::TidakWajib => 'slate',
        };
    }
}
