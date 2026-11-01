<?php

namespace App\Enums;

enum BasisHitung: string
{
    case OrangUnik = 'OrangUnik';
    case Dokumen = 'Dokumen';

    public function label(): string
    {
        return match ($this) {
            self::OrangUnik => 'Orang Unik',
            self::Dokumen => 'Dokumen',
        };
    }
}
