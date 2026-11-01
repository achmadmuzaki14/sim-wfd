<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Kelompok;
use App\Models\Penjualan;
use App\Models\Produk;
use App\Models\RefMitra;
use App\Services\PartnerScopeService;
use Illuminate\Http\RedirectResponse;
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
            ->when($request->get('mitra_id'), fn ($q, $id) => $q->where('mitra_id', $id))
            ->latest();

        $salesQuery = Penjualan::with(['produk', 'kelompok', 'mitra'])
            ->when($mitraId, fn ($q) => $q->where('mitra_id', $mitraId))
            ->when($request->get('periode'), fn ($q, $p) => $q->where('periode', $p))
            ->when($request->get('mitra_id'), fn ($q, $id) => $q->where('mitra_id', $id))
            ->latest();

        $products = $productsQuery->paginate(10, ['*'], 'products_page')->withQueryString();
        $sales = $salesQuery->paginate(10, ['*'], 'sales_page')->withQueryString();

        return Inertia::render('Products/Index', [
            'products' => $products,
            'sales' => $sales,
            'filters' => $request->only(['search', 'periode', 'mitra_id']),
            'mitraList' => $user->isMitra()
                ? collect()
                : RefMitra::where('aktif', true)->get(['id', 'nama', 'kode_mitra']),
        ]);
    }

    // ── Product CRUD ──

    public function createProduct(Request $request)
    {
        $user = $request->user();
        $mitraList = $user->isMitra() ? collect() : RefMitra::where('aktif', true)->get(['id', 'nama', 'kode_mitra']);
        $kelompok = Kelompok::when($user->mitraId(), fn ($q) => $q->where('mitra_id', $user->mitraId()))->get(['id', 'nama']);

        return Inertia::render('Products/CreateProduct', [
            'mitraList' => $mitraList,
            'kelompok' => $kelompok,
            'userMitraId' => $user->mitraId(),
        ]);
    }

    public function storeProduct(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'komoditas' => 'required|string|max:255',
            'jenis_pengembangan' => 'required|string',
            'mitra_id' => 'required|uuid|exists:ref_mitra,id',
            'kelompok_id' => 'nullable|uuid|exists:kelompok,id',
            'link_foto' => 'nullable|url',
            'periode' => 'required|string',
        ]);

        $validated['kode'] = \App\Support\CodeGenerator::generate('PRD', 'produk');
        $validated['status_verifikasi'] = 'Belum diverifikasi';

        if ($request->user()->isMitra()) {
            $validated['mitra_id'] = $request->user()->mitraId();
        }

        $produk = Produk::create($validated);
        \App\Models\AuditLog::log('produk', $produk->id, 'INSERT', null, $produk->toArray());

        return redirect()->route('products-sales.index')->with('success', 'Produk berhasil ditambahkan.');
    }

    public function editProduct(Request $request, string $id)
    {
        $produk = Produk::with(['mitra', 'kelompok'])->findOrFail($id);

        if ($request->user()->isMitra() && $produk->mitra_id !== $request->user()->mitraId()) {
            abort(403);
        }

        $mitraList = $request->user()->isMitra() ? collect() : RefMitra::where('aktif', true)->get(['id', 'nama', 'kode_mitra']);
        $kelompok = Kelompok::when($request->user()->mitraId(), fn ($q) => $q->where('mitra_id', $request->user()->mitraId()))->get(['id', 'nama']);

        return Inertia::render('Products/EditProduct', [
            'produk' => $produk,
            'mitraList' => $mitraList,
            'kelompok' => $kelompok,
        ]);
    }

    public function updateProduct(Request $request, string $id): RedirectResponse
    {
        $produk = Produk::findOrFail($id);

        if ($request->user()->isMitra() && $produk->mitra_id !== $request->user()->mitraId()) {
            abort(403);
        }

        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'komoditas' => 'required|string|max:255',
            'jenis_pengembangan' => 'required|string',
            'kelompok_id' => 'nullable|uuid|exists:kelompok,id',
            'link_foto' => 'nullable|url',
            'periode' => 'required|string',
        ]);

        $nilaiLama = $produk->toArray();
        $produk->update($validated);
        \App\Models\AuditLog::log('produk', $produk->id, 'UPDATE', $nilaiLama, $produk->fresh()->toArray());

        return redirect()->route('products-sales.index')->with('success', 'Produk berhasil diperbarui.');
    }

    public function destroyProduct(Request $request, string $id): RedirectResponse
    {
        $produk = Produk::findOrFail($id);

        if ($request->user()->isMitra() && $produk->mitra_id !== $request->user()->mitraId()) {
            abort(403);
        }

        \App\Models\AuditLog::log('produk', $produk->id, 'DELETE', $produk->toArray(), null);
        $produk->delete();

        return redirect()->route('products-sales.index')->with('success', 'Produk berhasil dihapus.');
    }

    // ── Sales CRUD ──

    public function createSale(Request $request)
    {
        $user = $request->user();
        $mitraList = $user->isMitra() ? collect() : RefMitra::where('aktif', true)->get(['id', 'nama', 'kode_mitra']);
        $kelompok = Kelompok::when($user->mitraId(), fn ($q) => $q->where('mitra_id', $user->mitraId()))->get(['id', 'nama']);
        $produkList = Produk::when($user->mitraId(), fn ($q) => $q->where('mitra_id', $user->mitraId()))->get(['id', 'nama', 'komoditas']);

        return Inertia::render('Products/CreateSale', [
            'mitraList' => $mitraList,
            'kelompok' => $kelompok,
            'produkList' => $produkList,
            'userMitraId' => $user->mitraId(),
        ]);
    }

    public function storeSale(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'produk_id' => 'nullable|uuid|exists:produk,id',
            'kelompok_id' => 'nullable|uuid|exists:kelompok,id',
            'komoditas' => 'required|string|max:255',
            'mitra_id' => 'required|uuid|exists:ref_mitra,id',
            'bulan' => 'required|string',
            'periode' => 'required|string',
            'tahun_lapor' => 'required|integer',
            'volume' => 'required|numeric|min:0',
            'satuan' => 'required|string',
            'omzet' => 'required|integer|min:0',
            'laba' => 'required|integer|min:0',
            'level_pasar' => 'required|string',
        ]);

        $validated['kode'] = \App\Support\CodeGenerator::generate('PNJ', 'penjualan');
        $validated['status_verifikasi'] = 'Belum diverifikasi';

        if ($request->user()->isMitra()) {
            $validated['mitra_id'] = $request->user()->mitraId();
        }

        $penjualan = Penjualan::create($validated);
        \App\Models\AuditLog::log('penjualan', $penjualan->id, 'INSERT', null, $penjualan->toArray());

        return redirect()->route('products-sales.index')->with('success', 'Data penjualan berhasil ditambahkan.');
    }

    public function editSale(Request $request, string $id)
    {
        $penjualan = Penjualan::with(['produk', 'kelompok', 'mitra'])->findOrFail($id);

        if ($request->user()->isMitra() && $penjualan->mitra_id !== $request->user()->mitraId()) {
            abort(403);
        }

        $mitraList = $request->user()->isMitra() ? collect() : RefMitra::where('aktif', true)->get(['id', 'nama', 'kode_mitra']);
        $kelompok = Kelompok::when($request->user()->mitraId(), fn ($q) => $q->where('mitra_id', $request->user()->mitraId()))->get(['id', 'nama']);
        $produkList = Produk::when($request->user()->mitraId(), fn ($q) => $q->where('mitra_id', $request->user()->mitraId()))->get(['id', 'nama', 'komoditas']);

        return Inertia::render('Products/EditSale', [
            'penjualan' => $penjualan,
            'mitraList' => $mitraList,
            'kelompok' => $kelompok,
            'produkList' => $produkList,
        ]);
    }

    public function updateSale(Request $request, string $id): RedirectResponse
    {
        $penjualan = Penjualan::findOrFail($id);

        if ($request->user()->isMitra() && $penjualan->mitra_id !== $request->user()->mitraId()) {
            abort(403);
        }

        $validated = $request->validate([
            'produk_id' => 'nullable|uuid|exists:produk,id',
            'kelompok_id' => 'nullable|uuid|exists:kelompok,id',
            'komoditas' => 'required|string|max:255',
            'bulan' => 'required|string',
            'periode' => 'required|string',
            'tahun_lapor' => 'required|integer',
            'volume' => 'required|numeric|min:0',
            'satuan' => 'required|string',
            'omzet' => 'required|integer|min:0',
            'laba' => 'required|integer|min:0',
            'level_pasar' => 'required|string',
        ]);

        $nilaiLama = $penjualan->toArray();
        $penjualan->update($validated);
        \App\Models\AuditLog::log('penjualan', $penjualan->id, 'UPDATE', $nilaiLama, $penjualan->fresh()->toArray());

        return redirect()->route('products-sales.index')->with('success', 'Data penjualan berhasil diperbarui.');
    }

    public function destroySale(Request $request, string $id): RedirectResponse
    {
        $penjualan = Penjualan::findOrFail($id);

        if ($request->user()->isMitra() && $penjualan->mitra_id !== $request->user()->mitraId()) {
            abort(403);
        }

        \App\Models\AuditLog::log('penjualan', $penjualan->id, 'DELETE', $penjualan->toArray(), null);
        $penjualan->delete();

        return redirect()->route('products-sales.index')->with('success', 'Data penjualan berhasil dihapus.');
    }
}
