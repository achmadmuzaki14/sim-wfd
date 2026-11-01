<?php

namespace App\Enums;

enum StatusLeverage: string
{
    case DalamProses = 'Dalam proses';
    case Terealisasi = 'Terealisasi';

    public function label(): string
    {
        return $this->value;
    }

    public function color(): string
    {
        return match ($this) {
            self::DalamProses => 'amber',
            self::Terealisasi => 'green',
        };
    }
}
