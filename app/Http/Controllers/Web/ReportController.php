<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function index(Request $request)
    {
        $exports = [
            [
                'key' => 'wfd-roster',
                'label' => 'WFD Roster',
                'description' => 'Daftar peserta Women Farmer Driven per mitra.',
                'route' => 'reports.export',
                'params' => ['type' => 'wfd-roster'],
            ],
            [
                'key' => 'dokumen',
                'label' => 'Dokumen',
                'description' => 'Daftar dokumen bukti per indikator dan mitra.',
                'route' => 'reports.export',
                'params' => ['type' => 'dokumen'],
            ],
            [
                'key' => 'kegiatan',
                'label' => 'Kegiatan',
                'description' => 'Daftar kegiatan yang dilaksanakan per mitra.',
                'route' => 'reports.export',
                'params' => ['type' => 'kegiatan'],
            ],
            [
                'key' => 'proses',
                'label' => 'Proses',
                'description' => 'Daftar proses dan perkembangan per kuartal.',
                'route' => 'reports.export',
                'params' => ['type' => 'proses'],
            ],
            [
                'key' => 'kelompok',
                'label' => 'Kelompok',
                'description' => 'Daftar kelompok per mitra dan tipe.',
                'route' => 'reports.export',
                'params' => ['type' => 'kelompok'],
            ],
            [
                'key' => 'produk-penjualan',
                'label' => 'Produk & Penjualan',
                'description' => 'Daftar produk dan data penjualan per mitra.',
                'route' => 'reports.export',
                'params' => ['type' => 'produk-penjualan'],
            ],
            [
                'key' => 'kebijakan',
                'label' => 'Kebijakan',
                'description' => 'Daftar kebijakan per mitra dan level.',
                'route' => 'reports.export',
                'params' => ['type' => 'kebijakan'],
            ],
            [
                'key' => 'leverage',
                'label' => 'Leverage',
                'description' => 'Daftar leverage per mitra dan jenis.',
                'route' => 'reports.export',
                'params' => ['type' => 'leverage'],
            ],
            [
                'key' => 'learning-stories',
                'label' => 'Learning Stories',
                'description' => 'Daftar cerita pembelajaran per mitra.',
                'route' => 'reports.export',
                'params' => ['type' => 'learning-stories'],
            ],
            [
                'key' => 'indikator-capaian',
                'label' => 'Capaian Indikator',
                'description' => 'Rekap capaian per indikator dan periode.',
                'route' => 'reports.export',
                'params' => ['type' => 'indikator-capaian'],
            ],
        ];

        return Inertia::render('Reports/Index', [
            'exports' => $exports,
        ]);
    }
}
