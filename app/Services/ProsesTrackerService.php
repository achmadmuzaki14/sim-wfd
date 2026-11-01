<?php

namespace App\Services;

use App\Models\AuditLog;
use App\Models\DqaLog;
use App\Models\Proses;
use App\Models\ProsesUpdate;
use App\Models\RefTahapan;
use Illuminate\Support\Facades\DB;

class ProsesTrackerService
{
    public function updateQuarter(Proses $proses, array $data, $user): ProsesUpdate
    {
        return DB::transaction(function () use ($proses, $data, $user) {
            $periode = $data['periode'];
            $nomorTahapan = $data['nomor_tahapan'];

            $tahapan = RefTahapan::where('jenis_proses', $proses->jenis_proses)
                ->where('nomor_tahapan', $nomorTahapan)
                ->first();

            $namaTahapan = $tahapan?->nama_tahapan ?? "Tahapan {$nomorTahapan}";

            $update = ProsesUpdate::updateOrCreate(
                ['proses_id' => $proses->id, 'periode' => $periode],
                [
                    'nomor_tahapan' => $nomorTahapan,
                    'nama_tahapan' => $namaTahapan,
                    'perkembangan' => $data['perkembangan'],
                    'hambatan' => $data['hambatan'] ?? null,
                    'rencana_kuartal_depan' => $data['rencana_kuartal_depan'] ?? null,
                    'link_bukti' => $data['link_bukti'] ?? null,
                    'file_bukti' => $data['file_bukti'] ?? null,
                    'terkunci' => false,
                    'is_carry_forward' => false,
                    'diinput_oleh' => $user->id,
                    'tanggal_input' => now(),
                ]
            );

            $oldProses = $proses->toArray();
            $proses->update([
                'tahapan_saat_ini' => $nomorTahapan,
                'periode_update_terakhir' => $periode,
                'status_proses' => $this->determineStatus($proses, $nomorTahapan, $tahapan),
            ]);

            AuditLog::log('proses', $proses->id, 'UPDATE', $oldProses, $proses->fresh()->toArray());
            AuditLog::log('proses_update', $update->id, 'INSERT', null, $update->toArray());

            $this->checkStall($proses);

            return $update;
        });
    }

    private function determineStatus(Proses $proses, int $nomorTahapan, ?RefTahapan $tahapan): string
    {
        if ($tahapan && $tahapan->tahapan_final) {
            return 'Selesai';
        }

        if ($this->isStalled($proses)) {
            return 'Macet';
        }

        return 'Berjalan';
    }

    public function isStalled(Proses $proses): bool
    {
        $updates = $proses->updates()
            ->where('is_carry_forward', false)
            ->orderByDesc('tanggal_input')
            ->limit(2)
            ->get();

        if ($updates->count() < 2) {
            return false;
        }

        $tahapanFinal = RefTahapan::where('jenis_proses', $proses->jenis_proses)
            ->where('tahapan_final', true)
            ->first();

        if ($tahapanFinal && $proses->tahapan_saat_ini >= $tahapanFinal->nomor_tahapan) {
            return false;
        }

        return $updates->get(0)->nomor_tahapan === $updates->get(1)->nomor_tahapan;
    }

    public function checkStall(Proses $proses): void
    {
        if (!$this->isStalled($proses)) {
            return;
        }

        if ($proses->status_proses !== 'Macet') {
            $proses->update(['status_proses' => 'Macet']);
        }

        $existingDqa = DqaLog::where('mitra_id', $proses->mitra_id)
            ->where('indikator_id', $proses->indikator_id)
            ->where('jenis_isu', 'Proses tidak bergerak')
            ->where('status_isu', 'Open')
            ->where('deskripsi', "%{$proses->kode}%")
            ->exists();

        if (!$existingDqa) {
            DqaLog::create([
                'mitra_id' => $proses->mitra_id,
                'indikator_id' => $proses->indikator_id,
                'jenis_isu' => 'Proses tidak bergerak',
                'deskripsi' => "Proses {$proses->kode} ({$proses->judul}) tidak bergerak selama 2 kuartal berturut-turut.",
                'pic' => $proses->mitra->nama,
                'status_isu' => 'Open',
                'tanggal_temuan' => now(),
            ]);
        }
    }

    public function generateCarryForward(Proses $proses, string $periode): ?ProsesUpdate
    {
        $existing = ProsesUpdate::where('proses_id', $proses->id)
            ->where('periode', $periode)
            ->exists();

        if ($existing) {
            return null;
        }

        $lastUpdate = $proses->updates()
            ->orderByDesc('tanggal_input')
            ->first();

        if (!$lastUpdate) {
            return null;
        }

        return ProsesUpdate::create([
            'proses_id' => $proses->id,
            'periode' => $periode,
            'nomor_tahapan' => $lastUpdate->nomor_tahapan,
            'nama_tahapan' => $lastUpdate->nama_tahapan,
            'perkembangan' => 'Tidak ada pembaruan dari mitra',
            'hambatan' => null,
            'rencana_kuartal_depan' => null,
            'link_bukti' => null,
            'file_bukti' => null,
            'terkunci' => false,
            'is_carry_forward' => true,
            'diinput_oleh' => $lastUpdate->diinput_oleh,
            'tanggal_input' => now(),
        ]);
    }
}
