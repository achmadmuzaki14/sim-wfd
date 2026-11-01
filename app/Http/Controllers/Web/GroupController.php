<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Kelompok;
use App\Models\RefMitra;
use App\Services\PartnerScopeService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GroupController extends Controller
{
    public function __construct(
        private PartnerScopeService $partnerScope,
    ) {}

    public function index(Request $request)
    {
        $user = $request->user();
        $mitraId = $this->partnerScope->getScopedMitraId($user);

        $query = Kelompok::with('mitra')
            ->when($mitraId, fn ($q) => $q->where('mitra_id', $mitraId))
            ->when($request->get('search'), fn ($q, $s) => $q->where('nama', "%{$s}%"))
            ->when($request->get('tipe'), fn ($q, $t) => $q->where('tipe', $t))
            ->latest();

        $kelompok = $query->paginate(15)->withQueryString();

        return Inertia::render('Groups/Index', [
            'kelompok' => $kelompok,
            'filters' => $request->only(['search', 'tipe']),
            'mitraList' => $user->isMitra()
                ? collect()
                : RefMitra::where('aktif', true)->get(['id', 'nama', 'kode_mitra']),
        ]);
    }

    public function create(Request $request)
    {
        $user = $request->user();
        $mitraList = $user->isMitra()
            ? collect()
            : RefMitra::where('aktif', true)->get(['id', 'nama', 'kode_mitra']);

        return Inertia::render('Groups/Create', [
            'mitraList' => $mitraList,
            'userMitraId' => $user->mitraId(),
        ]);
    }

    public function store(Request $request): \Illuminate\Http\RedirectResponse
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'tipe' => 'required|string',
            'mitra_id' => 'required|uuid|exists:ref_mitra,id',
            'provinsi' => 'nullable|string',
            'desa' => 'nullable|string',
            'luas_hektar' => 'nullable|numeric|min:0',
            'anggota_perempuan' => 'required|integer|min:0',
            'anggota_laki' => 'required|integer|min:0',
            'dipimpin_perempuan' => 'boolean',
            'periode' => 'required|string',
        ]);

        $validated['kode'] = \App\Support\CodeGenerator::generate('KLP', 'kelompok');
        $validated['status_verifikasi'] = 'Belum diverifikasi';

        if ($request->user()->isMitra()) {
            $validated['mitra_id'] = $request->user()->mitraId();
        }

        $kelompok = Kelompok::create($validated);
        \App\Models\AuditLog::log('kelompok', $kelompok->id, 'INSERT', null, $kelompok->toArray());

        return redirect()->route('groups.index')->with('success', 'Kelompok berhasil ditambahkan.');
    }
}
