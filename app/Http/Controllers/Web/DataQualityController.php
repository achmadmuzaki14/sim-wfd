<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\DqaLog;
use App\Models\RefMitra;
use App\Services\PartnerScopeService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DataQualityController extends Controller
{
    public function __construct(
        private PartnerScopeService $partnerScope,
    ) {}

    public function index(Request $request)
    {
        $user = $request->user();

        if (! $user->isAdmin() && ! $user->isVerifikator()) {
            abort(403);
        }

        $mitraId = $request->get('mitra_id');

        $query = DqaLog::with(['mitra', 'indikator'])
            ->when($mitraId, fn ($q, $id) => $q->where('mitra_id', $id))
            ->when($request->get('status_isu'), fn ($q, $s) => $q->where('status_isu', $s))
            ->when($request->get('search'), fn ($q, $s) => $q->where('deskripsi', "%{$s}%"))
            ->latest('tanggal_temuan');

        $dqaLogs = $query->paginate(15)->withQueryString();

        return Inertia::render('DataQuality/Index', [
            'dqaLogs' => $dqaLogs,
            'filters' => $request->only(['search', 'status_isu', 'mitra_id']),
            'mitraList' => RefMitra::where('aktif', true)->get(['id', 'nama', 'kode_mitra']),
        ]);
    }
}
