<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Services\PartnerScopeService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DocumentController extends Controller
{
    public function __construct(private PartnerScopeService $partnerScope) {}

    public function index(Request $request)
    {
        $user = $request->user();
        $mitraId = $this->partnerScope->getScopedMitraId($user);

        $query = \App\Models\Dokumen::with(['mitra', 'indikator'])
            ->when($mitraId, fn($q) => $q->where('mitra_id', $mitraId))
            ->when($request->get('search'), fn($q, $s) => $q->where('judul', "%{$s}%"))
            ->when($request->get('indikator_id'), fn($q, $id) => $q->where('indikator_id', $id));

        $documents = $query->paginate(15)->withQueryString();

        return Inertia::render('Documents/Index', [
            'documents' => $documents,
            'filters' => $request->only(['search', 'indikator_id']),
            'indicators' => \App\Models\RefIndikator::where('basis_hitung', 'Dokumen')->where('aktif', true)->get(),
        ]);
    }

    public function create(Request $request)
    {
        $user = $request->user();
        $partners = $user->isMitra() ? collect() : \App\Models\RefMitra::where('aktif', true)->get();

        return Inertia::render('Documents/Create', [
            'partners' => $partners,
            'indicators' => \App\Models\RefIndikator::where('basis_hitung', 'Dokumen')->where('aktif', true)->get(),
            'kelompok' => \App\Models\Kelompok::when($user->mitraId(), fn($q) => $q->where('mitra_id', $user->mitraId()))->get(),
            'userMitraId' => $user->mitraId(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'indikator_id' => 'required|uuid|exists:ref_indikator,id',
            'jenis_dokumen' => 'required|string',
            'status_dokumen' => 'required|string',
            'mitra_id' => 'required|uuid|exists:ref_mitra,id',
            'kelompok_id' => 'nullable|uuid|exists:kelompok,id',
            'periode' => 'required|string',
            'tahun_lapor' => 'required|integer',
            'tanggal_terbit' => 'nullable|date',
            'instansi_penerbit' => 'nullable|string',
            'level_dokumen' => 'required|string',
            'link_mov' => 'nullable|url',
        ]);

        $validated['kode'] = \App\Support\CodeGenerator::generate('DOK', 'dokumen');

        if ($request->user()->isMitra()) {
            $validated['mitra_id'] = $request->user()->mitraId();
        }

        $dokumen = \App\Models\Dokumen::create($validated);
        \App\Models\AuditLog::log('dokumen', $dokumen->id, 'INSERT', null, $dokumen->toArray());

        return redirect()->route('documents.index')->with('success', 'Dokumen berhasil ditambahkan.');
    }

    public function show(Request $request, string $id)
    {
        $dokumen = \App\Models\Dokumen::with(['mitra', 'indikator', 'kelompok'])->findOrFail($id);

        if ($request->user()->isMitra() && $dokumen->mitra_id !== $request->user()->mitraId()) {
            abort(403);
        }

        return Inertia::render('Documents/Show', ['dokumen' => $dokumen]);
    }
}
