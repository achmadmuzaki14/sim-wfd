<?php

namespace App\Enums;

enum TipeKelompok: string
{
    case KPS = 'KPS';
    case KUPS = 'KUPS';
    case KelompokMonitoringHutan = 'Kelompok Monitoring Hutan';
    case FP3HI = 'FP3HI';

    public function label(): string
    {
        return $this->value;
    }

    public function color(): string
    {
        return match ($this) {
            self::KPS => 'blue',
            self::KUPS => 'green',
            self::KelompokMonitoringHutan => 'orange',
            self::FP3HI => 'purple',
        };
    }
}
