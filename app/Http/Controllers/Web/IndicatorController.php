<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Services\IndikatorCalculationService;
use App\Services\PartnerScopeService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class IndicatorController extends Controller
{
    public function __construct(
        private IndikatorCalculationService $calcService,
    ) {}

    public function index(Request $request)
    {
        $periodFilter = $request->get('periode', 'ALL');
        $calculations = $this->calcService->calculateAll($periodFilter);

        return Inertia::render('Indicators/Index', [
            'indicators' => $calculations,
            'periodFilter' => $periodFilter,
        ]);
    }

    public function show(Request $request, string $indikatorId)
    {
        $indikator = \App\Models\RefIndikator::findOrFail($indikatorId);
        $periodFilter = $request->get('periode', 'ALL');
        $calculation = $this->calcService->calculateForIndicator($indikator, $periodFilter);
        $partnerBreakdown = $this->calcService->getPartnerBreakdown($indikator);

        return Inertia::render('Indicators/Show', [
            'indikator' => $indikator,
            'calculation' => $calculation,
            'partnerBreakdown' => $partnerBreakdown,
        ]);
    }
}
