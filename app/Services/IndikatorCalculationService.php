<?php


    namespace App\Services;

    use App\DTOs\IndikatorCalculationDTO;
    use App\Models\RefIndikator;
    use Illuminate\Support\Collection;
    use Illuminate\Support\Facades\DB;
    use App\Models\WfdRoster;

    class IndikatorCalculationService
    {
        public function calculateForIndicator(RefIndikator $indikator, string $periodFilter = 'ALL'): IndikatorCalculationDTO
        {
            $capaian2025 = $this->calculateYear($indikator, 2025);
            $capaian2026 = $this->calculateYear($indikator, 2026);
            $capaian2027 = $this->calculateYear($indikator, 2027);
            $capaianKumulatif = $this->calculateCumulative($indikator);
            $capaianPeriode = $this->calculateForPeriod($indikator, $periodFilter);

            $target = $this->getTarget($indikator, $periodFilter);
            $persentase = $this->calculatePercentage($capaianPeriode, $target);
            $status = $this->determineStatus($periodFilter, $persentase);

            return new IndikatorCalculationDTO(
                kode: $indikator->kode,
                nama_indikator: $indikator->nama_indikator,
                basis_hitung: $indikator->basis_hitung,
                unit: $indikator->unit,
                capaian_2025: $capaian2025,
                capaian_2026: $capaian2026,
                capaian_2027: $capaian2027,
                capaian_kumulatif: $capaianKumulatif,
                capaian_periode: $capaianPeriode,
                target: $target,
                persentase: $persentase,
                status: $status,
            );
        }

        public function calculateAll(string $periodFilter = 'ALL'): array
        {
            $indikators = RefIndikator::where('aktif', true)->orderBy('outcome')->orderBy('nomor_output')->get();

            return $indikators->map(fn ($i) => $this->calculateForIndicator($i, $periodFilter))->all();
        }

        private function calculateYear(RefIndikator $indikator, int $tahun): int
        {
            if ($indikator->isPersonBased()) {
                return (int) DB::table('wfd_capaian')
                    ->where('indikator_id', $indikator->id)
                    ->where('status_verifikasi', 'Terverifikasi')
                    ->where('tahun_lapor', $tahun)
                    ->distinct('wfd_id')
                    ->count('wfd_id');
            }

            $query = DB::table('dokumen')
                ->where('indikator_id', $indikator->id)
                ->where('status_verifikasi', 'Terverifikasi')
                ->where('tahun_lapor', $tahun);

            if ($indikator->hasCountedStatus()) {
                $query->where('status_dokumen', $indikator->status_dihitung);
            }

            return (int) $query->count();
        }

        private function calculateCumulative(RefIndikator $indikator): int
        {
            if ($indikator->isPersonBased()) {
                return (int) DB::table('wfd_capaian')
                    ->where('indikator_id', $indikator->id)
                    ->where('status_verifikasi', 'Terverifikasi')
                    ->distinct('wfd_id')
                    ->count('wfd_id');
            }

            $query = DB::table('dokumen')
                ->where('indikator_id', $indikator->id)
                ->where('status_verifikasi', 'Terverifikasi');

            if ($indikator->hasCountedStatus()) {
                $query->where('status_dokumen', $indikator->status_dihitung);
            }

            return (int) $query->count();
        }

        private function calculateForPeriod(RefIndikator $indikator, string $periodFilter): int
        {
            if ($periodFilter === 'ALL') {
                return $this->calculateCumulative($indikator);
            }

            if (preg_match('/^\d{4}$/', $periodFilter)) {
                return $this->calculateYear($indikator, (int) $periodFilter);
            }

            if (preg_match('/^(\d{4})-Q([1-4])$/', $periodFilter, $matches)) {
                $tahun = (int) $matches[1];
                $kuartal = (int) $matches[2];

                return $this->calculateQuarter($indikator, $tahun, $kuartal);
            }

            return $this->calculateCumulative($indikator);
        }

        private function calculateQuarter(RefIndikator $indikator, int $tahun, int $kuartal): int
        {
            $periode = "{$tahun}-Q{$kuartal}";

            if ($indikator->isPersonBased()) {
                return (int) DB::table('wfd_capaian')
                    ->where('indikator_id', $indikator->id)
                    ->where('status_verifikasi', 'Terverifikasi')
                    ->where('periode', $periode)
                    ->distinct('wfd_id')
                    ->count('wfd_id');
            }

            $query = DB::table('dokumen')
                ->where('indikator_id', $indikator->id)
                ->where('status_verifikasi', 'Terverifikasi')
                ->where('periode', $periode);

            if ($indikator->hasCountedStatus()) {
                $query->where('status_dokumen', $indikator->status_dihitung);
            }

            return (int) $query->count();
        }

        private function getTarget(RefIndikator $indikator, string $periodFilter): ?int
        {
            if ($periodFilter === 'ALL') {
                $target = $indikator->target_2025 + $indikator->target_2026 + $indikator->target_2027;

                return $target > 0 ? $target : null;
            }

            if (preg_match('/^\d{4}$/', $periodFilter)) {
                $targetProp = "target_{$periodFilter}";

                return $indikator->$targetProp > 0 ? $indikator->$targetProp : null;
            }

            if (preg_match('/^\d{4}-Q[1-4]$/', $periodFilter)) {
                return null;
            }

            return null;
        }

        private function calculatePercentage(int $capaian, ?int $target): ?float
        {
            if ($target === null || $target === 0) {
                return null;
            }

            return round(($capaian / $target) * 100, 1);
        }

        private function determineStatus(string $periodFilter, ?float $persentase): string
        {
            if (preg_match('/^\d{4}-Q[1-4]$/', $periodFilter)) {
                return 'dinilai per tahun';
            }

            if ($persentase === null) {
                return 'dinilai per tahun';
            }

            if ($persentase >= 80) {
                return 'On-track';
            }

            if ($persentase >= 50) {
                return 'Perlu perhatian';
            }

            return 'Tertinggal';
        }

    public function getPartnerBreakdown(
        RefIndikator $indikator,
        ?string $mitraId = null
    ): Collection {
        if ($indikator->isPersonBased()) {
            /*
                * Mengambil nama tabel dari model agar tetap benar apabila model
                * memakai nama tabel custom, misalnya wfd_roster atau wfd_rosters.
                */
            $wfdRosterTable = (new WfdRoster())->getTable();

            $query = DB::table('wfd_capaian')
                ->join(
                    $wfdRosterTable,
                    'wfd_capaian.wfd_id',
                    '=',
                    "{$wfdRosterTable}.id"
                )
                ->join(
                    'ref_mitra',
                    "{$wfdRosterTable}.mitra_id",
                    '=',
                    'ref_mitra.id'
                )
                ->select([
                    'ref_mitra.id as mitra_id',
                    'ref_mitra.kode_mitra',
                    'ref_mitra.nama as mitra_nama',
                    DB::raw(
                        'COUNT(DISTINCT wfd_capaian.wfd_id) as capaian'
                    ),
                ])
                ->where(
                    'wfd_capaian.indikator_id',
                    $indikator->id
                )
                ->where(
                    'wfd_capaian.status_verifikasi',
                    'Terverifikasi'
                )
                ->groupBy([
                    'ref_mitra.id',
                    'ref_mitra.kode_mitra',
                    'ref_mitra.nama',
                ]);

            if ($mitraId !== null) {
                $query->where(
                    "{$wfdRosterTable}.mitra_id",
                    $mitraId
                );
            }

            return $query->get();
        }

        $query = DB::table('dokumen')
            ->join(
                'ref_mitra',
                'dokumen.mitra_id',
                '=',
                'ref_mitra.id'
            )
            ->select([
                'ref_mitra.id as mitra_id',
                'ref_mitra.kode_mitra',
                'ref_mitra.nama as mitra_nama',
                DB::raw('COUNT(*) as capaian'),
            ])
            ->where(
                'dokumen.indikator_id',
                $indikator->id
            )
            ->where(
                'dokumen.status_verifikasi',
                'Terverifikasi'
            )
            ->groupBy([
                'ref_mitra.id',
                'ref_mitra.kode_mitra',
                'ref_mitra.nama',
            ]);

        if ($indikator->hasCountedStatus()) {
            $query->where(
                'dokumen.status_dokumen',
                $indikator->status_dihitung
            );
        }

        if ($mitraId !== null) {
            $query->where(
                'dokumen.mitra_id',
                $mitraId
            );
        }

        return $query->get();
    }
}
