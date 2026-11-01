<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProsesUpdate extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'proses_update';

    protected $fillable = [
        'proses_id',
        'periode',
        'nomor_tahapan',
        'nama_tahapan',
        'perkembangan',
        'hambatan',
        'rencana_kuartal_depan',
        'link_bukti',
        'file_bukti',
        'terkunci',
        'is_carry_forward',
        'diinput_oleh',
        'tanggal_input',
    ];

    protected $casts = [
        'nomor_tahapan' => 'integer',
        'terkunci' => 'boolean',
        'is_carry_forward' => 'boolean',
        'tanggal_input' => 'datetime',
    ];

    public function proses(): BelongsTo
    {
        return $this->belongsTo(Proses::class, 'proses_id');
    }

    public function diinputOleh(): BelongsTo
    {
        return $this->belongsTo(User::class, 'diinput_oleh');
    }
}
