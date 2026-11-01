<?php

namespace App\Services;

use App\Models\AuditLog;
use App\Models\Dokumen;
use App\Models\WfdCapaian;
use Illuminate\Support\Facades\DB;

class VerificationService
{
    public function verifyCapaian(WfdCapaian $capaian, $verifikator): WfdCapaian
    {
        if (!$capaian->hasEvidence()) {
            throw new \App\Exceptions\VerificationException('Tidak dapat diverifikasi: MoV belum tersedia.');
        }

        return DB::transaction(function () use ($capaian, $verifikator) {
            $oldValues = $capaian->toArray();
            $capaian->update([
                'status_verifikasi' => 'Terverifikasi',
                'verifikator_id' => $verifikator->id,
                'tanggal_verifikasi' => now(),
            ]);

            AuditLog::log('wfd_capaian', $capaian->id, 'UPDATE', $oldValues, $capaian->fresh()->toArray());

            return $capaian->fresh();
        });
    }

    public function returnCapaian(WfdCapaian $capaian, $verifikator, string $reason): WfdCapaian
    {
        return DB::transaction(function () use ($capaian, $verifikator, $reason) {
            $oldValues = $capaian->toArray();
            $capaian->update([
                'status_verifikasi' => 'Perlu klarifikasi',
                'verifikator_id' => $verifikator->id,
                'tanggal_verifikasi' => now(),
                'catatan_verifikasi' => $reason,
            ]);

            AuditLog::log('wfd_capaian', $capaian->id, 'UPDATE', $oldValues, $capaian->fresh()->toArray());

            return $capaian->fresh();
        });
    }

    public function verifyDokumen(Dokumen $dokumen, $verifikator): Dokumen
    {
        if (!$dokumen->hasEvidence()) {
            throw new \App\Exceptions\VerificationException('Tidak dapat diverifikasi: MoV belum tersedia.');
        }

        return DB::transaction(function () use ($dokumen, $verifikator) {
            $oldValues = $dokumen->toArray();
            $dokumen->update([
                'status_verifikasi' => 'Terverifikasi',
                'verifikator_id' => $verifikator->id,
                'tanggal_verifikasi' => now(),
            ]);

            AuditLog::log('dokumen', $dokumen->id, 'UPDATE', $oldValues, $dokumen->fresh()->toArray());

            return $dokumen->fresh();
        });
    }

    public function returnDokumen(Dokumen $dokumen, $verifikator, string $reason): Dokumen
    {
        return DB::transaction(function () use ($dokumen, $verifikator, $reason) {
            $oldValues = $dokumen->toArray();
            $dokumen->update([
                'status_verifikasi' => 'Perlu klarifikasi',
                'verifikator_id' => $verifikator->id,
                'tanggal_verifikasi' => now(),
                'catatan_verifikasi' => $reason,
            ]);

            AuditLog::log('dokumen', $dokumen->id, 'UPDATE', $oldValues, $dokumen->fresh()->toArray());

            return $dokumen->fresh();
        });
    }
}
