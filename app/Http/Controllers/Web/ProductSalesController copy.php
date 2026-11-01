<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Penjualan;
use App\Models\Produk;
use App\Models\RefMitra;
use App\Services\PartnerScopeService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductSalesController extends Controller
{
    public function __construct(
        private PartnerScopeService $partnerScope,
    ) {}

    public function index(Request $request)
    {
        $user = $request->user();
        $mitraId = $this->partnerScope->getScopedMitraId($user);

        $productsQuery = Produk::with(['mitra', 'kelompok'])
            ->when($mitraId, fn ($q) => $q->where('mitra_id', $mitraId))
            ->when($request->get('search'), fn ($q, $s) => $q->where('nama', "%{$s}%"))
            ->latest();

        $salesQuery = Penjualan::with(['produk', 'kelompok', 'mitra'])
            ->when($mitraId, fn ($q) => $q->where('mitra_id', $mitraId))
            ->when($request->get('periode'), fn ($q, $p) => $q->where('periode', $p))
            ->latest();

        $products = $productsQuery->paginate(10, ['*'], 'products_page')->withQueryString();
        $sales = $salesQuery->paginate(10, ['*'], 'sales_page')->withQueryString();

        return Inertia::render('Products/Index', [
            'products' => $products,
            'sales' => $sales,
            'filters' => $request->only(['search', 'periode']),
            'mitraList' => $user->isMitra()
                ? collect()
                : RefMitra::where('aktif', true)->get(['id', 'nama', 'kode_mitra']),
        ]);
    }
}
