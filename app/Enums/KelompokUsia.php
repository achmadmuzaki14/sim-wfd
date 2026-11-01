<?php

namespace App\Enums;

enum KelompokUsia: string
{
    case Under25 = '<25';
    case Age25to44 = '25-44';
    case Age45to65 = '45-65';
    case Over65 = '>65';

    public function label(): string
    {
        return $this->value;
    }
}
