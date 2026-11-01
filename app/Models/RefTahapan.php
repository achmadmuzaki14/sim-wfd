<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RefTahapan extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'ref_tahapan';

    protected $fillable = [
        'jenis_proses',
        'nomor_tahapan',
        'nama_tahapan',
        'tahapan_final',
    ];

    protected $casts = [
        'nomor_tahapan' => 'integer',
        'tahapan_final' => 'boolean',
    ];
}
