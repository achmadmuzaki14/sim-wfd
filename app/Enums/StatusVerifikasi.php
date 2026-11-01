<?php

namespace App\Enums;

enum StatusVerifikasi: string
{
    case Belum = 'Belum diverifikasi';
    case Terverifikasi = 'Terverifikasi';
    case PerluKlarifikasi = 'Perlu klarifikasi';
    case Ditolak = 'Ditolak';

    public function label(): string
    {
        return $this->value;
    }

    public function color(): string
    {
        return match ($this) {
            self::Belum => 'slate',
            self::Terverifikasi => 'green',
            self::PerluKlarifikasi => 'amber',
            self::Ditolak => 'red',
        };
    }

    public function isVerified(): bool
    {
        return $this === self::Terverifikasi;
    }
}
