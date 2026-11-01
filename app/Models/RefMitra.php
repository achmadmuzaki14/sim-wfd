<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class RefMitra extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'ref_mitra';

    protected $fillable = [
        'nama',
        'kode_mitra',
        'provinsi',
        'email_pic',
        'aktif',
    ];

    protected $casts = [
        'aktif' => 'boolean',
    ];

    public function wfdRoster(): HasMany
    {
        return $this->hasMany(WfdRoster::class, 'mitra_id');
    }

    public function kelompok(): HasMany
    {
        return $this->hasMany(Kelompok::class, 'mitra_id');
    }

    public function dokumen(): HasMany
    {
        return $this->hasMany(Dokumen::class, 'mitra_id');
    }

    public function kegiatan(): HasMany
    {
        return $this->hasMany(Kegiatan::class, 'mitra_id');
    }

    public function proses(): HasMany
    {
        return $this->hasMany(Proses::class, 'mitra_id');
    }

    public function produk(): HasMany
    {
        return $this->hasMany(Produk::class, 'mitra_id');
    }

    public function penjualan(): HasMany
    {
        return $this->hasMany(Penjualan::class, 'mitra_id');
    }

    public function kebijakan(): HasMany
    {
        return $this->hasMany(Kebijakan::class, 'mitra_id');
    }

    public function learningStories(): HasMany
    {
        return $this->hasMany(LearningStory::class, 'mitra_id');
    }

    public function leverage(): HasMany
    {
        return $this->hasMany(Leverage::class, 'mitra_id');
    }

    public function dqaLogs(): HasMany
    {
        return $this->hasMany(DqaLog::class, 'mitra_id');
    }

    public function kepatuhanLaporan(): HasMany
    {
        return $this->hasMany(KepatuhanLaporan::class, 'mitra_id');
    }
}
