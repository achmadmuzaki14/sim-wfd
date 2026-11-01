<?php

namespace App\Enums;

enum StatusIsuDqa: string
{
    case Open = 'Open';
    case InProgress = 'In progress';
    case Closed = 'Closed';

    public function label(): string
    {
        return $this->value;
    }

    public function color(): string
    {
        return match ($this) {
            self::Open => 'red',
            self::InProgress => 'amber',
            self::Closed => 'green',
        };
    }
}
