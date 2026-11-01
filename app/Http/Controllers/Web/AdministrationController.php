<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\AppSetting;
use App\Models\AuditLog;
use App\Models\Profile;
use App\Models\RefIndikator;
use App\Models\RefMitra;
use App\Models\RefTahapan;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdministrationController extends Controller
{
    public function users(Request $request)
    {
        $user = $request->user();

        if (! $user->isAdmin()) {
            abort(403);
        }

        $users = User::with('profile.mitra')
            ->when($request->get('search'), fn ($q, $s) => $q->where('name', "%{$s}%")->orWhere('email', "%{$s}%"))
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Administration/Users', [
            'users' => $users,
            'filters' => $request->only(['search']),
            'mitraList' => RefMitra::where('aktif', true)->get(['id', 'nama', 'kode_mitra']),
        ]);
    }

    public function references(Request $request)
    {
        $user = $request->user();

        if (! $user->isAdmin()) {
            abort(403);
        }

        return Inertia::render('Administration/References', [
            'indikators' => RefIndikator::orderBy('outcome')->orderBy('nomor_output')->get(),
            'mitra' => RefMitra::orderBy('nama')->get(),
            'tahapan' => RefTahapan::orderBy('nomor_tahapan')->get(),
            'settings' => AppSetting::orderBy('key')->get(),
        ]);
    }

    public function auditLog(Request $request)
    {
        $user = $request->user();

        if (! $user->isAdmin()) {
            abort(403);
        }

        $logs = AuditLog::with('user')
            ->when($request->get('tabel'), fn ($q, $t) => $q->where('tabel', $t))
            ->when($request->get('aksi'), fn ($q, $a) => $q->where('aksi', $a))
            ->when($request->get('search'), fn ($q, $s) => $q->where('record_id', "%{$s}%"))
            ->latest('waktu')
            ->paginate(25)
            ->withQueryString();

        return Inertia::render('Administration/AuditLog', [
            'logs' => $logs,
            'filters' => $request->only(['tabel', 'aksi', 'search']),
        ]);
    }
}
