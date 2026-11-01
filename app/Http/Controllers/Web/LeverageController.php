<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Leverage;
use App\Models\RefMitra;
use App\Services\PartnerScopeService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LeverageController extends Controller
{
    public function __construct(
        private PartnerScopeService $partnerScope,
    ) {}

    public function index(Request $request)
    {
        $user = $request->user();
        $mitraId = $this->partnerScope->getScopedMitraId($user);

        $query = Leverage::with('mitra')
            ->when($mitraId, fn ($q) => $q->where('mitra_id', $mitraId))
            ->when($request->get('search'), fn ($q, $s) => $q->where('sumber', "%{$s}%"))
            ->when($request->get('jenis_leverage'), fn ($q, $j) => $q->where('jenis_leverage', $j))
            ->latest();

        $leverage = $query->paginate(15)->withQueryString();

        return Inertia::render('Leverage/Index', [
            'leverage' => $leverage,
            'filters' => $request->only(['search', 'jenis_leverage']),
            'mitraList' => $user->isMitra()
                ? collect()
                : RefMitra::where('aktif', true)->get(['id', 'nama', 'kode_mitra']),
        ]);
    }
}
