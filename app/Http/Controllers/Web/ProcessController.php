<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Proses;
use App\Models\ProsesUpdate;
use App\Models\RefIndikator;
use App\Models\RefMitra;
use App\Services\PartnerScopeService;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;

class ProcessController extends Controller
{
    public function __construct(
        private PartnerScopeService $partnerScope,
    ) {}

    public function index(Request $request)
    {
        $user = $request->user();
        $mitraId = $this->partnerScope->getScopedMitraId($user);

        $query = Proses::with(['mitra', 'indikator'])
            ->when($mitraId, fn ($q) => $q->where('mitra_id', $mitraId))
            ->when($request->get('search'), fn ($q, $s) => $q->where('judul', "%{$s}%"))
            ->when($request->get('indikator_id'), fn ($q, $id) => $q->where('indikator_id', $id))
            ->latest();

        $proses = $query->paginate(15)->withQueryString();

        return Inertia::render('Processes/Index', [
            'proses' => $proses,
            'filters' => $request->only(['search', 'indikator_id']),
            'indicators' => RefIndikator::where('aktif', true)->get(['id', 'kode', 'nama_indikator']),
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

        return Inertia::render('Processes/Create', [
            'indicators' => RefIndikator::where('aktif', true)->get(['id', 'kode', 'nama_indikator']),
            'mitraList' => $mitraList,
            'userMitraId' => $user->mitraId(),
        ]);
    }

    public function show(Request $request, string $id)
    {
        $proses = Proses::with(['mitra', 'indikator', 'updates' => fn ($q) => $q->latest()])->findOrFail($id);

        if ($request->user()->isMitra() && $proses->mitra_id !== $request->user()->mitraId()) {
            abort(403);
        }

        return Inertia::render('Processes/Show', [
            'proses' => $proses,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'indikator_id' => 'required|uuid|exists:ref_indikator,id',
            'mitra_id' => 'required|uuid|exists:ref_mitra,id',
            'jenis_proses' => 'required|string',
            'total_tahapan' => 'required|integer|min:1',
        ]);

        $validated['kode'] = 'PRS-' . now()->format('Ymd') . '-' . str_pad((string) Proses::count() + 1, 4, '0', STR_PAD_LEFT);
        $validated['tahapan_saat_ini'] = 0;
        $validated['status_proses'] = 'Belum dimulai';
        $validated['aktif'] = true;

        if ($request->user()->isMitra()) {
            $validated['mitra_id'] = $request->user()->mitraId();
        }

        $proses = Proses::create($validated);

        return redirect()->route('processes.show', $proses)->with('success', 'Proses berhasil dibuat.');
    }

    public function updateQuarter(Request $request, string $id): RedirectResponse
    {
        $proses = Proses::findOrFail($id);

        if ($request->user()->isMitra() && $proses->mitra_id !== $request->user()->mitraId()) {
            abort(403);
        }

        $validated = $request->validate([
            'periode' => 'required|string',
            'nomor_tahapan' => 'required|integer|min:1',
            'nama_tahapan' => 'required|string|max:255',
            'perkembangan' => 'required|string',
            'hambatan' => 'nullable|string',
            'rencana_kuartal_depan' => 'nullable|string',
            'link_bukti' => 'nullable|url',
        ]);

        $validated['proses_id'] = $proses->id;
        $validated['diinput_oleh'] = $request->user()->id;
        $validated['tanggal_input'] = now();

        ProsesUpdate::create($validated);

        $proses->update([
            'tahapan_saat_ini' => $validated['nomor_tahapan'],
            'periode_update_terakhir' => $validated['periode'],
            'status_proses' => $validated['nomor_tahapan'] >= $proses->total_tahapan ? 'Selesai' : 'Berjalan',
        ]);

        return redirect()->route('processes.show', $proses)->with('success', 'Update kuartal berhasil disimpan.');
    }
}
