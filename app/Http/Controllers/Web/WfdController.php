<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\RefMitra;
use App\Services\PartnerScopeService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WfdController extends Controller
{
    public function __construct(
        private PartnerScopeService $partnerScope,
    ) {}

    public function index(Request $request)
    {
        $user = $request->user();
        $mitraId = $this->partnerScope->getScopedMitraId($user);

        $query = \App\Models\WfdRoster::with(['mitra', 'capaian.indikator'])
            ->when($mitraId, fn($q) => $q->where('mitra_id', $mitraId));

        if ($search = $request->get('search')) {
            $query->where(function($q) use ($search) {
                $q->where('nama_lengkap', "%{$search}%")
                  ->orWhere('desa', "%{$search}%");
            });
        }

        if ($mitraFilter = $request->get('mitra_id')) {
            $query->where('mitra_id', $mitraFilter);
        }

        if ($request->get('status_aktif') !== null && $request->get('status_aktif') !== '') {
            $query->where('status_aktif', $request->boolean('status_aktif'));
        }

        $wfd = $query->paginate(15)->withQueryString();
        $partners = $user->isMitra() ? collect() : RefMitra::where('aktif', true)->get();

        return Inertia::render('Wfd/Index', [
            'wfd' => $wfd,
            'filters' => $request->only(['search', 'mitra_id', 'status_aktif']),
            'partners' => $partners,
        ]);
    }

    public function create(Request $request)
    {
        $user = $request->user();
        $partners = $user->isMitra() ? collect() : RefMitra::where('aktif', true)->get();
        $indicators = \App\Models\RefIndikator::where('basis_hitung', 'OrangUnik')->where('aktif', true)->get();
        $kelompok = \App\Models\Kelompok::when($user->mitraId(), fn($q) => $q->where('mitra_id', $user->mitraId()))->get();

        return Inertia::render('Wfd/Create', [
            'partners' => $partners,
            'indicators' => $indicators,
            'kelompok' => $kelompok,
            'userMitraId' => $user->mitraId(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_lengkap' => 'required|string|max:255',
            'mitra_id' => 'required|uuid|exists:ref_mitra,id',
            'provinsi' => 'nullable|string',
            'kabupaten' => 'nullable|string',
            'desa' => 'nullable|string',
            'kelompok_id' => 'nullable|uuid|exists:kelompok,id',
            'kelompok_usia' => 'required|string',
            'disabilitas' => 'boolean',
            'tahun_bergabung' => 'required|integer',
            'persetujuan_data' => 'boolean',
            'catatan' => 'nullable|string',
            'capaian' => 'array',
            'capaian.*.indikator_id' => 'required|uuid|exists:ref_indikator,id',
            'capaian.*.periode' => 'required|string',
            'capaian.*.jenis_bukti' => 'required|string',
            'capaian.*.link_mov' => 'nullable|url',
        ]);

        $action = new \App\Actions\CreateWfdWithAchievementsAction();
        $action->execute($validated, $request->user());

        return redirect()->route('verification.index')->with('success', 'WFD berhasil ditambahkan.');
    }

    public function show(Request $request, string $id)
    {
        $wfd = \App\Models\WfdRoster::with(['mitra', 'kelompok', 'capaian.indikator'])->findOrFail($id);

        if ($request->user()->isMitra() && $wfd->mitra_id !== $request->user()->mitraId()) {
            abort(403);
        }

        return Inertia::render('Wfd/Show', ['wfd' => $wfd]);
    }

    public function edit(Request $request, string $id)
    {
        $wfd = \App\Models\WfdRoster::with(['mitra', 'kelompok'])->findOrFail($id);

        if ($request->user()->isMitra() && $wfd->mitra_id !== $request->user()->mitraId()) {
            abort(403);
        }

        return Inertia::render('Wfd/Edit', ['wfd' => $wfd]);
    }

    public function update(Request $request, string $id)
    {
        $wfd = \App\Models\WfdRoster::findOrFail($id);

        if ($request->user()->isMitra() && $wfd->mitra_id !== $request->user()->mitraId()) {
            abort(403);
        }

        $validated = $request->validate([
            'nama_lengkap' => 'required|string|max:255',
            'provinsi' => 'nullable|string',
            'kabupaten' => 'nullable|string',
            'desa' => 'nullable|string',
            'kelompok_id' => 'nullable|uuid|exists:kelompok,id',
            'kelompok_usia' => 'required|string',
            'disabilitas' => 'boolean',
            'tahun_bergabung' => 'required|integer',
            'persetujuan_data' => 'boolean',
            'status_aktif' => 'boolean',
            'catatan' => 'nullable|string',
        ]);

        $wfd->update($validated);

        return redirect()->route('wfd.index')->with('success', 'Data WFD berhasil diperbarui.');
    }

    public function addCapaian(Request $request, string $id)
    {
        $wfd = \App\Models\WfdRoster::findOrFail($id);

        if ($request->user()->isMitra() && $wfd->mitra_id !== $request->user()->mitraId()) {
            abort(403);
        }

        $validated = $request->validate([
            'indikator_id' => 'required|uuid|exists:ref_indikator,id',
            'periode' => 'required|string',
            'jenis_bukti' => 'required|string',
            'link_mov' => 'nullable|url',
        ]);

        $validated['wfd_id'] = $wfd->id;
        $validated['kode'] = \App\Support\CodeGenerator::generate('CAP', 'wfd_capaian');
        $validated['tahun_lapor'] = (int) substr($validated['periode'], 0, 4);

        \App\Models\WfdCapaian::create($validated);

        return redirect()->route('wfd.show', $wfd->id)->with('success', 'Capaian berhasil ditambahkan.');
    }
}
