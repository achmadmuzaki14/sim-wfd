<?php

namespace App\Enums;

enum Peran: string
{
    case Admin = 'admin';
    case Verifikator = 'verifikator';
    case Mitra = 'mitra';
    case Peninjau = 'peninjau';

    public function label(): string
    {
        return match ($this) {
            self::Admin => 'Administrator',
            self::Verifikator => 'Verifikator',
            self::Mitra => 'Mitra',
            self::Peninjau => 'Peninjau',
        };
    }

    public function canVerify(): bool
    {
        return in_array($this, [self::Admin, self::Verifikator]);
    }

    public function canManageUsers(): bool
    {
        return $this === self::Admin;
    }

    public function isMitra(): bool
    {
        return $this === self::Mitra;
    }

    public function isPeninjau(): bool
    {
        return $this === self::Peninjau;
    }

    public function canAccessDqa(): bool
    {
        return in_array($this, [self::Admin, self::Verifikator]);
    }

    public function canAccessCompliance(): bool
    {
        return in_array($this, [self::Admin, self::Verifikator]);
    }

    public function canAccessAuditLog(): bool
    {
        return $this === self::Admin;
    }

    public function canExportPersonalData(): bool
    {
        return in_array($this, [self::Admin, self::Verifikator, self::Mitra]);
    }
}
