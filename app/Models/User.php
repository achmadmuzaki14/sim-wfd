<?php

namespace App\Models;

use App\Enums\Peran;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, HasFactory, HasRoles, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function profile(): HasOne
    {
        return $this->hasOne(Profile::class, 'user_id', 'id');
    }

    public function peran(): ?Peran
    {
        if (!$this->profile) {
            return null;
        }

        return Peran::tryFrom($this->profile->peran);
    }

    public function mitraId(): ?string
    {
        return $this->profile?->mitra_id;
    }

    public function isAdmin(): bool
    {
        return $this->peran() === Peran::Admin;
    }

    public function isVerifikator(): bool
    {
        return $this->peran() === Peran::Verifikator;
    }

    public function isMitra(): bool
    {
        return $this->peran() === Peran::Mitra;
    }

    public function isPeninjau(): bool
    {
        return $this->peran() === Peran::Peninjau;
    }

    public function canVerify(): bool
    {
        $peran = $this->peran();

        return $peran !== null && $peran->canVerify();
    }
}
