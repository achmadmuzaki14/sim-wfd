<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\KepatuhanLaporan;
use App\Models\RefMitra;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ComplianceController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        if (! $user->isAdmin() && ! $user->isVerifikator()) {
            abort(403);
        }

        $query = KepatuhanLaporan::with('mitra')
            ->when($request->get('mitra_id'), fn ($q, $id) => $q->where('mitra_id', $id))
            ->when($request->get('tahun'), fn ($q, $t) => $q->where('tahun', $t))
            ->when($request->get('status_laporan'), fn ($q, $s) => $q->where('status_laporan', $s))
            ->latest('tahun')
            ->latest('bulan');

        $kepatuhanLaporan = $query->paginate(15)->withQueryString();

        return Inertia::render('Compliance/Index', [
            'kepatuhanLaporan' => $kepatuhanLaporan,
            'filters' => $request->only(['mitra_id', 'tahun', 'status_laporan']),
            'mitraList' => RefMitra::where('aktif', true)->get(['id', 'nama', 'kode_mitra']),
        ]);
    }
}
