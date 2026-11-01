<?php

namespace App\Enums;

enum JenisPengembangan: string
{
    case ProdukBaru = 'Produk baru';
    case UpgradeKemasan = 'Upgrade kemasan & label';
    case PenyempurnaanResep = 'Penyempurnaan resep';

    public function label(): string
    {
        return $this->value;
    }
}
