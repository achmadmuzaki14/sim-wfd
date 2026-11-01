<?php

namespace App\Actions;

use App\Models\WfdCapaian;
use App\Models\WfdRoster;
use App\Support\CodeGenerator;
use Illuminate\Support\Facades\DB;

class CreateWfdWithAchievementsAction
{
    public function execute(array $data, $user): WfdRoster
    {
        return DB::transaction(function () use ($data, $user) {
            $mitraId = $data['mitra_id'];
            if ($user->isMitra()) {
                $mitraId = $user->mitraId();
            }

            $kode = CodeGenerator::generate('WFD', 'wfd_roster');

            $wfd = WfdRoster::create([
                'kode' => $kode,
                'nama_lengkap' => $data['nama_lengkap'],
                'mitra_id' => $mitraId,
                'provinsi' => $data['provinsi'] ?? null,
                'kabupaten' => $data['kabupaten'] ?? null,
                'desa' => $data['desa'] ?? null,
                'kelompok_id' => $data['kelompok_id'] ?? null,
                'kelompok_usia' => $data['kelompok_usia'],
                'disabilitas' => $data['disabilitas'] ?? false,
                'tahun_bergabung' => $data['tahun_bergabung'],
                'persetujuan_data' => $data['persetujuan_data'] ?? false,
                'status_aktif' => true,
                'catatan' => $data['catatan'] ?? null,
            ]);

            \App\Models\AuditLog::log('wfd_roster', $wfd->id, 'INSERT', null, $wfd->toArray());

            if (!empty($data['capaian'])) {
                foreach ($data['capaian'] as $capaianData) {
                    $capaianKode = CodeGenerator::generate('CAP', 'wfd_capaian');

                    $capaian = WfdCapaian::create([
                        'kode' => $capaianKode,
                        'wfd_id' => $wfd->id,
                        'indikator_id' => $capaianData['indikator_id'],
                        'periode' => $capaianData['periode'],
                        'tahun_lapor' => (int) substr($capaianData['periode'], 0, 4),
                        'jenis_bukti' => $capaianData['jenis_bukti'],
                        'link_mov' => $capaianData['link_mov'] ?? null,
                        'status_verifikasi' => 'Belum diverifikasi',
                    ]);

                    \App\Models\AuditLog::log('wfd_capaian', $capaian->id, 'INSERT', null, $capaian->toArray());
                }
            }

            return $wfd;
        });
    }
}
