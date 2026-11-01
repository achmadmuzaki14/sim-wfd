<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Kegiatan;
use App\Models\RefMitra;
use App\Services\PartnerScopeService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ActivityController extends Controller
{
    public function __construct(
        private PartnerScopeService $partnerScope,
    ) {}

    public function index(Request $request)
    {
        $user = $request->user();
        $mitraId = $this->partnerScope->getScopedMitraId($user);

        $query = Kegiatan::with('mitra')
            ->when($mitraId, fn ($q) => $q->where('mitra_id', $mitraId))
            ->when($request->get('search'), fn ($q, $s) => $q->where('judul', "%{$s}%"))
            ->when($request->get('mitra_id'), fn ($q, $id) => $q->where('mitra_id', $id))
            ->latest('tanggal_kegiatan');

        $kegiatan = $query->paginate(15)->withQueryString();

        return Inertia::render('Activities/Index', [
            'kegiatan' => $kegiatan,
            'filters' => $request->only(['search', 'mitra_id']),
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

        return Inertia::render('Activities/Create', [
            'mitraList' => $mitraList,
            'userMitraId' => $user->mitraId(),
        ]);
    }

    public function store(Request $request): \Illuminate\Http\RedirectResponse
    {
        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'jenis_kegiatan' => 'required|string',
            'tanggal_kegiatan' => 'required|date',
            'mitra_id' => 'required|uuid|exists:ref_mitra,id',
            'provinsi' => 'nullable|string',
            'level_kegiatan' => 'required|string',
            'peserta_perempuan' => 'required|integer|min:0',
            'peserta_laki' => 'required|integer|min:0',
            'link_daftar_hadir' => 'nullable|url',
            'link_dokumentasi' => 'nullable|url',
            'periode' => 'required|string',
            'tahun_lapor' => 'required|integer',
        ]);

        $validated['kode'] = \App\Support\CodeGenerator::generate('KEG', 'kegiatan');

        if ($request->user()->isMitra()) {
            $validated['mitra_id'] = $request->user()->mitraId();
        }

        $kegiatan = Kegiatan::create($validated);
        \App\Models\AuditLog::log('kegiatan', $kegiatan->id, 'INSERT', null, $kegiatan->toArray());

        return redirect()->route('activities.index')->with('success', 'Kegiatan berhasil ditambahkan.');
    }
}
