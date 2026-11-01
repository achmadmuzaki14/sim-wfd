<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DqaLog extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'dqa_log';

    protected $fillable = [
        'mitra_id', 'indikator_id', 'jenis_isu', 'deskripsi', 'pic',
        'status_isu', 'tanggal_temuan', 'deadline', 'tanggal_selesai',
        'tindak_lanjut',
    ];

    protected $casts = [
        'tanggal_temuan' => 'date',
        'deadline' => 'date',
        'tanggal_selesai' => 'date',
    ];

    public function mitra(): BelongsTo
    {
        return $this->belongsTo(RefMitra::class, 'mitra_id');
    }

    public function indikator(): BelongsTo
    {
        return $this->belongsTo(RefIndikator::class, 'indikator_id');
    }

    public function isOverdue(): bool
    {
        return $this->status_isu !== 'Closed'
            && $this->deadline !== null
            && $this->deadline->isPast();
    }
}
