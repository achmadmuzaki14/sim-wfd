<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\LearningStory;
use App\Models\RefMitra;
use App\Services\PartnerScopeService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LearningStoryController extends Controller
{
    public function __construct(
        private PartnerScopeService $partnerScope,
    ) {}

    public function index(Request $request)
    {
        $user = $request->user();
        $mitraId = $this->partnerScope->getScopedMitraId($user);

        $query = LearningStory::with('mitra')
            ->when($mitraId, fn ($q) => $q->where('mitra_id', $mitraId))
            ->when($request->get('search'), fn ($q, $s) => $q->where('judul', "%{$s}%"))
            ->when($request->get('tema'), fn ($q, $t) => $q->where('tema', $t))
            ->latest();

        $stories = $query->paginate(15)->withQueryString();

        return Inertia::render('LearningStories/Index', [
            'stories' => $stories,
            'filters' => $request->only(['search', 'tema']),
            'mitraList' => $user->isMitra()
                ? collect()
                : RefMitra::where('aktif', true)->get(['id', 'nama', 'kode_mitra']),
        ]);
    }
}
