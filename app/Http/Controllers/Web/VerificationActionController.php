<?php

namespace App\Http\Controllers\Web;

use App\Enums\StatusVerifikasi;
use App\Http\Controllers\Controller;
use App\Models\Dokumen;
use App\Models\WfdCapaian;
use App\Services\PartnerScopeService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class VerificationActionController extends Controller
{
    public function __construct(
        private PartnerScopeService $partnerScope,
    ) {}

    public function approve(Request $request, string $type, string $id): RedirectResponse
    {
        $user = $request->user();

        if (! $user->canVerify()) {
            abort(403);
        }

        $record = $this->resolveRecord($type, $id);

        if (! $this->partnerScope->canAccessMitra($user, $this->getMitraId($type, $record))) {
            abort(403);
        }

        $record->update([
            'status_verifikasi' => StatusVerifikasi::Terverifikasi->value,
            'verifikator_id' => $user->id,
            'tanggal_verifikasi' => now(),
            'catatan_verifikasi' => $request->input('catatan_verifikasi'),
        ]);

        return redirect()->route('verification.index')->with('success', 'Record berhasil diverifikasi.');
    }

    public function return(Request $request, string $type, string $id): RedirectResponse
    {
        $user = $request->user();

        if (! $user->canVerify()) {
            abort(403);
        }

        $request->validate([
            'catatan_verifikasi' => 'required|string|max:1000',
        ]);

        $record = $this->resolveRecord($type, $id);

        if (! $this->partnerScope->canAccessMitra($user, $this->getMitraId($type, $record))) {
            abort(403);
        }

        $record->update([
            'status_verifikasi' => StatusVerifikasi::PerluKlarifikasi->value,
            'verifikator_id' => $user->id,
            'tanggal_verifikasi' => now(),
            'catatan_verifikasi' => $request->input('catatan_verifikasi'),
        ]);

        return redirect()->route('verification.index')->with('success', 'Record dikembalikan untuk klarifikasi.');
    }

    private function resolveRecord(string $type, string $id): Dokumen|WfdCapaian
    {
        return match ($type) {
            'dokumen' => Dokumen::findOrFail($id),
            'capaian' => WfdCapaian::findOrFail($id),
            default => abort(404),
        };
    }

    private function getMitraId(string $type, Dokumen|WfdCapaian $record): ?string
    {
        return match ($type) {
            'dokumen' => $record->mitra_id,
            'capaian' => $record->wfd?->mitra_id,
            default => null,
        };
    }
}
