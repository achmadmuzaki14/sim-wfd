<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Kebijakan;
use App\Models\RefMitra;
use App\Services\PartnerScopeService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PolicyController extends Controller
{
    public function __construct(
        private PartnerScopeService $partnerScope,
    ) {}

    public function index(Request $request)
    {
        $user = $request->user();
        $mitraId = $this->partnerScope->getScopedMitraId($user);

        $query = Kebijakan::with('mitra')
            ->when($mitraId, fn ($q) => $q->where('mitra_id', $mitraId))
            ->when($request->get('search'), fn ($q, $s) => $q->where('judul', "%{$s}%"))
            ->when($request->get('level_kebijakan'), fn ($q, $l) => $q->where('level_kebijakan', $l))
            ->latest();

        $kebijakan = $query->paginate(15)->withQueryString();

        return Inertia::render('Policies/Index', [
            'kebijakan' => $kebijakan,
            'filters' => $request->only(['search', 'level_kebijakan']),
            'mitraList' => $user->isMitra()
                ? collect()
                : RefMitra::where('aktif', true)->get(['id', 'nama', 'kode_mitra']),
        ]);
    }
}
