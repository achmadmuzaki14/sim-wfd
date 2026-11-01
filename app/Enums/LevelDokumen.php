<?php

namespace App\Enums;

enum LevelDokumen: string
{
    case Desa = 'Desa';
    case Kecamatan = 'Kecamatan';
    case Kabupaten = 'Kabupaten';
    case Provinsi = 'Provinsi';
    case Nasional = 'Nasional';
    case Internasional = 'Internasional';
}
