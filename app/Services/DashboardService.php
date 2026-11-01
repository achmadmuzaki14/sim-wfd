<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\AppSetting;
use App\Models\Dokumen;
use App\Models\DqaLog;
use App\Models\Kegiatan;
use App\Models\Proses;
use App\Models\RefIndikator;
use App\Models\WfdCapaian;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use InvalidArgumentException;
use JsonSerializable;

class DashboardService
{
    public function __construct(
        private readonly IndikatorCalculationService $calcService,
        private readonly PartnerScopeService $partnerScope,
    ) {}

    public function getDashboardData($user, string $periodFilter): array
    {
        $mitraId = $this->partnerScope->getScopedMitraId($user);
        $isPeninjau = $user->isPeninjau();

        /*
         * calculateAll() mengembalikan kumpulan IndikatorCalculationDTO.
         * Normalisasi terlebih dahulu menjadi array agar tidak terjadi:
         *
         * Cannot use object of type IndikatorCalculationDTO as array
         */
        $rawIndicators = $this->calcService->calculateAll($periodFilter);

        $indicators = collect($rawIndicators)
            ->map(
                fn (mixed $indicator): array =>
                    $this->normalizeIndicator($indicator)
            )
            ->values()
            ->all();

        /*
         * Memuat metadata indikator satu kali untuk mencegah N+1 query.
         */
        $indicatorMetadata = $this->loadIndicatorMetadata($indicators);

        $kpiCards = $this->buildKpiCards(
            indicators: $indicators,
            periodFilter: $periodFilter,
            mitraId: $mitraId,
        );

        $outcomeCards = $this->buildOutcomeCards(
            indicators: $indicators,
            indicatorMetadata: $indicatorMetadata,
        );

        $outreach = $this->buildOutreachCard(
            mitraId: $mitraId,
            isPeninjau: $isPeninjau,
        );

        $dataQuality = $this->buildDataQualityCard(
            mitraId: $mitraId,
            isPeninjau: $isPeninjau,
        );

        return [
            'programGoal' => AppSetting::get('program_goal'),
            'causalLogic' => AppSetting::get('causal_logic'),
            'outcomeNames' => AppSetting::get('outcome_names', []),
            'periodFilter' => $periodFilter,
            'indicators' => $indicators,
            'kpiCards' => $kpiCards,
            'outcomeCards' => $outcomeCards,
            'outreach' => $outreach,
            'dataQuality' => $dataQuality,
            'isPeninjau' => $isPeninjau,
        ];
    }

    /**
     * @param array<int, array<string, mixed>> $indicators
     */
    private function buildKpiCards(
        array $indicators,
        string $periodFilter,
        ?string $mitraId,
    ): array {
        $indicatorCollection = collect($indicators);

        $totalCapaian = $indicatorCollection->sum(
            fn (array $indicator): int|float =>
                $this->numericValue(
                    $indicator['capaian_periode'] ?? 0
                )
        );

        $totalTarget = $indicatorCollection->sum(
            fn (array $indicator): int|float =>
                $this->numericValue(
                    $indicator['target'] ?? 0
                )
        );

        $persentase = $totalTarget > 0
            ? round(($totalCapaian / $totalTarget) * 100, 1)
            : null;

        $isQuarter = preg_match(
            '/^\d{4}-Q[1-4]$/',
            $periodFilter
        ) === 1;

        $firstLabel = $isQuarter
            ? 'Capaian Kuartal Ini'
            : 'Progres terhadap Target';

        $firstValue = $isQuarter
            ? $this->formatNumber($totalCapaian)
            : ($persentase !== null ? $persentase . '%' : '-');

        $perempuanDifasilitasi = $this->countUniqueWfd($mitraId);
        $penjualanLaba = $this->getSalesSummary($mitraId);
        $prosesMacet = $this->countStalledProcesses($mitraId);

        return [
            [
                'label' => $firstLabel,
                'value' => $firstValue,
                'color' => 'navy',
            ],
            [
                'label' => 'Perempuan Difasilitasi',
                'value' => number_format(
                    $perempuanDifasilitasi,
                    0,
                    ',',
                    '.'
                ),
                'color' => 'teal',
            ],
            [
                'label' => 'Penjualan/Laba',
                'value' => 'IDR '
                    . $this->formatJuta($penjualanLaba['omzet'])
                    . ' jt',
                'subtext' => 'Laba: IDR '
                    . $this->formatJuta($penjualanLaba['laba'])
                    . ' jt',
                'color' => 'outcome3',
            ],
            [
                'label' => 'Proses Macet',
                'value' => (string) $prosesMacet,
                'color' => 'danger',
            ],
        ];
    }

    /**
     * @param array<int, array<string, mixed>> $indicators
     * @param array<string, array{outcome: int, output: int}> $indicatorMetadata
     */
    private function buildOutcomeCards(
        array $indicators,
        array $indicatorMetadata,
    ): array {
        $outcomeNames = AppSetting::get('outcome_names', []);

        if (!is_array($outcomeNames)) {
            $outcomeNames = [];
        }

        $colors = [
            1 => '#2F7FBF',
            2 => '#3AAE7C',
            3 => '#E28A3C',
        ];

        $grouped = collect($indicators)->groupBy(
            function (array $indicator) use ($indicatorMetadata): int {
                $kode = (string) ($indicator['kode'] ?? '');

                return $indicatorMetadata[$kode]['outcome'] ?? 0;
            }
        );

        $cards = [];

        foreach ([1, 2, 3] as $outcome) {
            /** @var Collection<int, array<string, mixed>> $outcomeIndicators */
            $outcomeIndicators = $grouped->get(
                $outcome,
                collect()
            );

            $capaian = $outcomeIndicators->sum(
                fn (array $indicator): int|float =>
                    $this->numericValue(
                        $indicator['capaian_periode'] ?? 0
                    )
            );

            $target = $outcomeIndicators->sum(
                fn (array $indicator): int|float =>
                    $this->numericValue(
                        $indicator['target'] ?? 0
                    )
            );

            $persentase = $target > 0
                ? round(($capaian / $target) * 100, 1)
                : 0;

            $outputs = $outcomeIndicators
                ->groupBy(
                    function (
                        array $indicator
                    ) use ($indicatorMetadata): int {
                        $kode = (string) (
                            $indicator['kode'] ?? ''
                        );

                        return $indicatorMetadata[$kode]['output'] ?? 0;
                    }
                )
                ->map(
                    function (
                        Collection $items,
                        int|string $output
                    ): array {
                        return [
                            'output' => (int) $output,
                            'count' => $items->count(),
                            'capaian' => $items->sum(
                                fn (
                                    array $indicator
                                ): int|float =>
                                    $this->numericValue(
                                        $indicator[
                                            'capaian_periode'
                                        ] ?? 0
                                    )
                            ),
                        ];
                    }
                )
                ->values()
                ->all();

            $cards[] = [
                'outcome' => $outcome,
                'name' => $outcomeNames[$outcome]
                    ?? "Outcome {$outcome}",
                'color' => $colors[$outcome],
                'capaian' => $capaian,
                'target' => $target,
                'persentase' => $persentase,
                'outputs' => $outputs,
            ];
        }

        return $cards;
    }

    private function buildOutreachCard(
        ?string $mitraId,
        bool $isPeninjau,
    ): array {
        $kegiatanQuery = Kegiatan::query();

        if ($mitraId !== null) {
            $kegiatanQuery->where('mitra_id', $mitraId);
        }

        $totalActivities = (clone $kegiatanQuery)->count();

        $femaleAttendance = (int) (clone $kegiatanQuery)
            ->sum('peserta_perempuan');

        $maleAttendance = (int) (clone $kegiatanQuery)
            ->sum('peserta_laki');

        $totalAttendance = $femaleAttendance + $maleAttendance;

        $uniqueWfdQuery = WfdCapaian::query()
            ->where('status_verifikasi', 'Terverifikasi');

        if ($mitraId !== null) {
            $uniqueWfdQuery->whereHas(
                'wfd',
                fn ($query) =>
                    $query->where('mitra_id', $mitraId)
            );
        }

        $uniqueWfd = $isPeninjau
            ? 0
            : (int) $uniqueWfdQuery
                ->distinct()
                ->count('wfd_id');

        return [
            'totalActivities' => $totalActivities,
            'femaleAttendance' => $femaleAttendance,
            'maleAttendance' => $maleAttendance,
            'totalAttendance' => $totalAttendance,
            'uniqueWfd' => $uniqueWfd,
            'warning' => 'Angka kehadiran bersifat berulang — '
                . 'satu orang dapat hadir di banyak kegiatan. '
                . 'Gunakan untuk narasi "terpapar/outreach", '
                . 'bukan untuk klaim indikator.',
        ];
    }

    private function buildDataQualityCard(
        ?string $mitraId,
        bool $isPeninjau,
    ): array {
        if ($isPeninjau) {
            return $this->emptyDataQuality();
        }

        $wfdPending = WfdCapaian::query()
            ->where(
                'status_verifikasi',
                'Belum diverifikasi'
            );

        $wfdClarification = WfdCapaian::query()
            ->where(
                'status_verifikasi',
                'Perlu klarifikasi'
            );

        $docPending = Dokumen::query()
            ->where(
                'status_verifikasi',
                'Belum diverifikasi'
            );

        if ($mitraId !== null) {
            $wfdPending->whereHas(
                'wfd',
                fn ($query) =>
                    $query->where('mitra_id', $mitraId)
            );

            $wfdClarification->whereHas(
                'wfd',
                fn ($query) =>
                    $query->where('mitra_id', $mitraId)
            );

            $docPending->where('mitra_id', $mitraId);
        }

        $dqaQuery = DqaLog::query()
            ->where('status_isu', 'Open');

        if ($mitraId !== null) {
            $dqaQuery->where('mitra_id', $mitraId);
        }

        $capaianTanpaMov = WfdCapaian::query()
            ->whereNull('file_mov')
            ->whereNull('link_mov');

        if ($mitraId !== null) {
            $capaianTanpaMov->whereHas(
                'wfd',
                fn ($query) =>
                    $query->where('mitra_id', $mitraId)
            );
        }

        $prosesMacet = Proses::query()
            ->where('status_proses', 'Macet');

        if ($mitraId !== null) {
            $prosesMacet->where('mitra_id', $mitraId);
        }

        return [
            'wfdMenunggu' => $wfdPending->count(),
            'wfdPerluKlarifikasi' => $wfdClarification->count(),
            'dokumenMenunggu' => $docPending->count(),
            'isuDqaTerbuka' => $dqaQuery->count(),
            'capaianTanpaMov' => $capaianTanpaMov->count(),
            'prosesMacet' => $prosesMacet->count(),
        ];
    }

    private function emptyDataQuality(): array
    {
        return [
            'wfdMenunggu' => 0,
            'wfdPerluKlarifikasi' => 0,
            'dokumenMenunggu' => 0,
            'isuDqaTerbuka' => 0,
            'capaianTanpaMov' => 0,
            'prosesMacet' => 0,
        ];
    }

    private function countUniqueWfd(?string $mitraId): int
    {
        $query = WfdCapaian::query()
            ->where('status_verifikasi', 'Terverifikasi');

        if ($mitraId !== null) {
            $query->whereHas(
                'wfd',
                fn ($relationQuery) =>
                    $relationQuery->where(
                        'mitra_id',
                        $mitraId
                    )
            );
        }

        return (int) $query
            ->distinct()
            ->count('wfd_id');
    }

    /**
     * @return array{omzet: int, laba: int}
     */
    private function getSalesSummary(?string $mitraId): array
    {
        $query = DB::table('penjualan')
            ->where(
                'status_verifikasi',
                'Terverifikasi'
            );

        if ($mitraId !== null) {
            $query->where('mitra_id', $mitraId);
        }

        $omzet = (int) (clone $query)->sum('omzet');
        $laba = (int) (clone $query)->sum('laba');

        return [
            'omzet' => $omzet,
            'laba' => $laba,
        ];
    }

    private function countStalledProcesses(
        ?string $mitraId
    ): int {
        $query = Proses::query()
            ->where('status_proses', 'Macet');

        if ($mitraId !== null) {
            $query->where('mitra_id', $mitraId);
        }

        return $query->count();
    }

    /**
     * Memuat seluruh metadata indikator dalam satu query.
     *
     * @param array<int, array<string, mixed>> $indicators
     *
     * @return array<string, array{outcome: int, output: int}>
     */
    private function loadIndicatorMetadata(
        array $indicators
    ): array {
        $codes = collect($indicators)
            ->pluck('kode')
            ->filter(
                fn (mixed $kode): bool =>
                    is_string($kode) && $kode !== ''
            )
            ->unique()
            ->values()
            ->all();

        if ($codes === []) {
            return [];
        }

        return RefIndikator::query()
            ->whereIn('kode', $codes)
            ->get([
                'kode',
                'outcome',
                'nomor_output',
            ])
            ->mapWithKeys(
                fn (RefIndikator $indicator): array => [
                    (string) $indicator->kode => [
                        'outcome' => (int) (
                            $indicator->outcome ?? 0
                        ),
                        'output' => (int) (
                            $indicator->nomor_output ?? 0
                        ),
                    ],
                ]
            )
            ->all();
    }

    /**
     * Mengubah DTO atau object indikator menjadi array.
     *
     * Mendukung:
     * - array
     * - object dengan method toArray()
     * - JsonSerializable
     * - public property
     * - getter seperti getKode()
     *
     * @return array<string, mixed>
     */
    private function normalizeIndicator(
        mixed $indicator
    ): array {
        if (!is_array($indicator) && !is_object($indicator)) {
            throw new InvalidArgumentException(
                'Data indikator harus berupa array atau object DTO.'
            );
        }

        $data = [];

        if (is_array($indicator)) {
            $data = $indicator;
        } elseif (
            is_object($indicator)
            && is_callable([$indicator, 'toArray'])
        ) {
            $converted = $indicator->toArray();

            if (is_array($converted)) {
                $data = $converted;
            }
        } elseif ($indicator instanceof JsonSerializable) {
            $converted = $indicator->jsonSerialize();

            if (is_array($converted)) {
                $data = $converted;
            }
        } elseif (is_object($indicator)) {
            $data = get_object_vars($indicator);
        }

        $kode = $this->readIndicatorValue(
            indicator: $indicator,
            data: $data,
            keys: [
                'kode',
                'code',
            ],
        );

        $target = $this->readIndicatorValue(
            indicator: $indicator,
            data: $data,
            keys: [
                'target',
            ],
            default: 0,
        );

        $capaianPeriode = $this->readIndicatorValue(
            indicator: $indicator,
            data: $data,
            keys: [
                'capaian_periode',
                'capaianPeriode',
            ],
            default: 0,
        );

        if ($kode === null || trim((string) $kode) === '') {
            throw new InvalidArgumentException(
                'IndikatorCalculationDTO tidak memiliki '
                . 'property atau getter kode.'
            );
        }

        $data['kode'] = trim((string) $kode);
        $data['target'] = $this->numericValue($target);
        $data['capaian_periode'] = $this->numericValue(
            $capaianPeriode
        );

        return $data;
    }

    /**
     * @param array<string, mixed> $data
     * @param array<int, string> $keys
     */
    private function readIndicatorValue(
        mixed $indicator,
        array $data,
        array $keys,
        mixed $default = null,
    ): mixed {
        foreach ($keys as $key) {
            if (array_key_exists($key, $data)) {
                return $data[$key];
            }

            $camelKey = Str::camel($key);

            if (array_key_exists($camelKey, $data)) {
                return $data[$camelKey];
            }
        }

        if (!is_object($indicator)) {
            return $default;
        }

        $publicProperties = get_object_vars($indicator);

        foreach ($keys as $key) {
            $camelKey = Str::camel($key);

            foreach ([$key, $camelKey] as $property) {
                if (
                    array_key_exists(
                        $property,
                        $publicProperties
                    )
                ) {
                    return $publicProperties[$property];
                }
            }

            $possibleMethods = [
                'get' . Str::studly($key),
                $key,
                $camelKey,
            ];

            foreach ($possibleMethods as $method) {
                if (is_callable([$indicator, $method])) {
                    return $indicator->{$method}();
                }
            }
        }

        return $default;
    }

    private function numericValue(
        mixed $value
    ): int|float {
        if ($value === null || $value === '') {
            return 0;
        }

        if (!is_numeric($value)) {
            return 0;
        }

        return $value + 0;
    }

    private function formatNumber(
        int|float $value
    ): string {
        if (is_float($value) && floor($value) !== $value) {
            return number_format(
                $value,
                1,
                ',',
                '.'
            );
        }

        return number_format(
            (int) $value,
            0,
            ',',
            '.'
        );
    }

    private function formatJuta(
        int|float $value
    ): string {
        $juta = $value / 1_000_000;

        return number_format(
            $juta,
            1,
            ',',
            '.'
        );
    }
}
