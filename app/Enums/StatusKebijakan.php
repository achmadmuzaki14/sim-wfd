<?php

namespace App\Enums;

enum StatusKebijakan: string
{
    case AdvokasiBerjalan = 'Advokasi berjalan';
    case DalamPembahasan = 'Dalam pembahasan';
    case Disahkan = 'Disahkan';

    public function label(): string
    {
        return $this->value;
    }

    public function color(): string
    {
        return match ($this) {
            self::AdvokasiBerjalan => 'blue',
            self::DalamPembahasan => 'amber',
            self::Disahkan => 'green',
        };
    }
}
