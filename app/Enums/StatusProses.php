<?php

namespace App\Enums;

enum StatusProses: string
{
    case Berjalan = 'Berjalan';
    case Selesai = 'Selesai';
    case Macet = 'Macet';

    public function label(): string
    {
        return $this->value;
    }

    public function color(): string
    {
        return match ($this) {
            self::Berjalan => 'blue',
            self::Selesai => 'green',
            self::Macet => 'red',
        };
    }
}
