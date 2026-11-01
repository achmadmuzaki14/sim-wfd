<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\RefIndikator;
use App\Services\IndikatorCalculationService;
use App\Services\PartnerScopeService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AchievementByPartnerController extends Controller
{
    public function __construct(
        private IndikatorCalculationService $calcService,
        private PartnerScopeService $partnerScope,
    ) {}

    public function index(Request $request)
    {
        $user = $request->user();
        $mitraId = $this->partnerScope->getScopedMitraId($user);
        $periodFilter = $request->get('periode', 'ALL');

        $indikators = RefIndikator::where('aktif', true)
            ->orderBy('outcome')
            ->orderBy('nomor_output')
            ->get();

        $heatmap = $indikators->map(function ($indikator) use ($mitraId, $periodFilter) {
            $calculation = $this->calcService->calculateForIndicator($indikator, $periodFilter);
            $partnerBreakdown = $this->calcService->getPartnerBreakdown($indikator, $mitraId);

            return [
                'indikator_id' => $indikator->id,
                'kode' => $indikator->kode,
                'nama_indikator' => $indikator->nama_indikator,
                'outcome' => $indikator->outcome,
                'unit' => $indikator->unit,
                'target' => $calculation->target,
                'capaian_periode' => $calculation->capaian_periode,
                'persentase' => $calculation->persentase,
                'status' => $calculation->status,
                'partners' => $partnerBreakdown,
            ];
        })->values();

        return Inertia::render('Indicators/ByPartner', [
            'heatmap' => $heatmap,
            'periodFilter' => $periodFilter,
        ]);
    }
}
