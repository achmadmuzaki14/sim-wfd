<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class KepatuhanLaporan extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'kepatuhan_laporan';

    protected $fillable = [
        'mitra_id', 'tahun', 'bulan', 'status_laporan',
        'tanggal_diterima', 'catatan',
    ];

    protected $casts = [
        'tahun' => 'integer',
        'bulan' => 'integer',
        'tanggal_diterima' => 'date',
    ];

    public function mitra(): BelongsTo
    {
        return $this->belongsTo(RefMitra::class, 'mitra_id');
    }
}
