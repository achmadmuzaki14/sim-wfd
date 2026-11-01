<?php

namespace App\Services;

use App\Models\User;

class PartnerScopeService
{
    public function getScopedMitraId(?User $user): ?string
    {
        if (!$user || !$user->isMitra()) {
            return null;
        }

        return $user->mitraId();
    }

    public function isMitraScoped(?User $user): bool
    {
        return $user !== null && $user->isMitra() && $user->mitraId() !== null;
    }

    public function canAccessMitra(?User $user, ?string $mitraId): bool
    {
        if (!$user) {
            return false;
        }

        if ($user->isAdmin() || $user->isVerifikator()) {
            return true;
        }

        if ($user->isMitra()) {
            return $user->mitraId() === $mitraId;
        }

        return false;
    }
}
