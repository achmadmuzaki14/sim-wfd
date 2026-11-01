<?php

namespace App\Enums;

enum AksiAudit: string
{
    case Insert = 'INSERT';
    case Update = 'UPDATE';
    case Delete = 'DELETE';

    public function label(): string
    {
        return $this->value;
    }
}
