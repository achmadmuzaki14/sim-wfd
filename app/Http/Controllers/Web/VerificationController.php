<?php

namespace App\Http\Controllers\Web;

use App\Enums\StatusVerifikasi;
use App\Http\Controllers\Controller;
use App\Models\Dokumen;
use App\Models\WfdCapaian;
use App\Services\PartnerScopeService;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Inertia\Inertia;

class VerificationController extends Controller
{
    public function __construct(
        private PartnerScopeService $partnerScope,
    ) {}

    public function index(Request $request)
    {
        $user = $request->user();
        $mitraId = $this->partnerScope->getScopedMitraId($user);

        $pendingStatuses = [
            StatusVerifikasi::Belum->value,
            StatusVerifikasi::PerluKlarifikasi->value,
        ];

        $capaianQuery = WfdCapaian::with(['wfd.mitra', 'indikator'])
            ->whereIn('status_verifikasi', $pendingStatuses)
            ->when($mitraId, fn ($q) => $q->whereHas('wfd', fn ($sq) => $sq->where('mitra_id', $mitraId)))
            ->latest();

        $dokumenQuery = Dokumen::with(['mitra', 'indikator'])
            ->whereIn('status_verifikasi', $pendingStatuses)
            ->when($mitraId, fn ($q) => $q->where('mitra_id', $mitraId))
            ->latest();

        $capaian = $capaianQuery->get()->map(fn ($c) => [
            'type' => 'capaian',
            'id' => $c->id,
            'kode' => $c->kode,
            'indikator' => $c->indikator?->nama_indikator,
            'mitra' => $c->wfd?->mitra?->nama,
            'periode' => $c->periode,
            'tahun_lapor' => $c->tahun_lapor,
            'status_verifikasi' => $c->status_verifikasi,
            'created_at' => $c->created_at,
        ]);

        $dokumen = $dokumenQuery->get()->map(fn ($d) => [
            'type' => 'dokumen',
            'id' => $d->id,
            'kode' => $d->kode,
            'judul' => $d->judul,
            'indikator' => $d->indikator?->nama_indikator,
            'mitra' => $d->mitra?->nama,
            'periode' => $d->periode,
            'tahun_lapor' => $d->tahun_lapor,
            'status_verifikasi' => $d->status_verifikasi,
            'created_at' => $d->created_at,
        ]);

        $queue = $capaian->merge($dokumen)->sortBy('created_at')->values();

        return Inertia::render('Verification/Index', [
            'queue' => $queue,
            'canVerify' => $user->canVerify(),
        ]);
    }
}
