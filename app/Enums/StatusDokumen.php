<?php

namespace App\Enums;

enum StatusDokumen: string
{
    case Disusun = 'Disusun';
    case Diajukan = 'Diajukan';
    case Diadopsi = 'Diadopsi';

    public function label(): string
    {
        return $this->value;
    }

    public function color(): string
    {
        return match ($this) {
            self::Disusun => 'slate',
            self::Diajukan => 'amber',
            self::Diadopsi => 'green',
        };
    }
}
