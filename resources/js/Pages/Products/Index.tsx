import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/UI/PageHeader';
import Pagination from '@/Components/UI/Pagination';
import EmptyState from '@/Components/UI/EmptyState';
import StatusPill from '@/Components/UI/StatusPill';
import { Produk, Penjualan, RefMitra } from '@/types/models';
import { PaginatedData } from '@/types/page-props';
import { Plus, Pencil, Trash2 } from 'lucide-react';

interface Props {
    products: PaginatedData<Produk & { mitra: { nama: string }; kelompok: { nama: string } | null }>;
    sales: PaginatedData<Penjualan & { produk: { nama: string } | null; kelompok: { nama: string } | null; mitra: { nama: string } }>;
    filters: { search?: string; periode?: string; mitra_id?: string };
    mitraList: RefMitra[];
    auth: { user: { peran: string } };
}

function formatRupiah(value: number): string {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);
}

export default function ProductsIndex({ products, sales, filters, mitraList, auth }: Props) {
    const canManage = auth.user.peran === 'Admin' || auth.user.peran === 'Mitra';

    return (
        <AuthenticatedLayout>
            <Head title="Produk & Penjualan" />
            <div className="space-y-6">
                <PageHeader title="Produk & Penjualan" subtitle="Daftar produk HHBK dan data penjualan" actions={canManage ? <div className="flex gap-2"><Link href="/products-sales/products/create" className="inline-flex items-center gap-2 rounded-lg bg-navy-500 px-4 py-2 text-sm font-medium text-white hover:bg-navy-600"><Plus className="h-4 w-4" /> Produk</Link><Link href="/products-sales/sales/create" className="inline-flex items-center gap-2 rounded-lg bg-teal px-4 py-2 text-sm font-medium text-white hover:bg-teal-600"><Plus className="h-4 w-4" /> Penjualan</Link></div> : undefined} />

                <form method="GET" action="/products-sales" className="flex flex-col gap-3 rounded-card border border-border bg-card p-4 sm:flex-row sm:flex-wrap">
                    <input type="text" name="search" defaultValue={filters.search} placeholder="Cari produk…" className="w-full rounded-lg border border-border px-3 py-2 text-sm sm:w-64" />
                    <input type="text" name="periode" defaultValue={filters.periode} placeholder="Periode (2026-Q1)" className="rounded-lg border border-border px-3 py-2 text-sm" />
                    {mitraList.length > 0 && (
                        <select name="mitra_id" defaultValue={filters.mitra_id} className="rounded-lg border border-border px-3 py-2 text-sm">
                            <option value="">Semua Mitra</option>
                            {mitraList.map((m) => <option key={m.id} value={m.id}>{m.nama}</option>)}
                        </select>
                    )}
                    <button type="submit" className="rounded-lg bg-navy-500 px-4 py-2 text-sm font-medium text-white hover:bg-navy-600">Filter</button>
                </form>

                <div className="rounded-card border border-border bg-card shadow-sm">
                    <div className="border-b border-border px-4 py-3"><h3 className="text-sm font-semibold text-navy-500">Produk</h3></div>
                    <div className="overflow-x-auto">
                        {products.data.length === 0 ? (
                            <EmptyState title="Belum ada produk" />
                        ) : (
                            <table className="w-full text-sm">
                                <thead className="bg-card border-b border-border"><tr className="text-left text-xs uppercase text-muted">
                                    <th className="px-4 py-3">Kode</th><th className="px-4 py-3">Nama</th><th className="px-4 py-3">Komoditas</th>
                                    <th className="px-4 py-3">Mitra</th><th className="px-4 py-3">Kelompok</th><th className="px-4 py-3">Periode</th>
                                    <th className="px-4 py-3">Verifikasi</th>{canManage && <th className="px-4 py-3 text-right">Aksi</th>}
                                </tr></thead>
                                <tbody>
                                    {products.data.map((p) => (
                                        <tr key={p.id} className="border-b border-border last:border-0 hover:bg-appbg">
                                            <td className="px-4 py-3 font-medium text-navy-500">{p.kode}</td>
                                            <td className="px-4 py-3 text-navy-500">{p.nama}</td>
                                            <td className="px-4 py-3 text-muted">{p.komoditas}</td>
                                            <td className="px-4 py-3 text-muted">{p.mitra?.nama ?? '–'}</td>
                                            <td className="px-4 py-3 text-muted">{p.kelompok?.nama ?? '–'}</td>
                                            <td className="px-4 py-3 text-muted">{p.periode}</td>
                                            <td className="px-4 py-3"><StatusPill status={p.status_verifikasi} /></td>
                                            {canManage && (
                                                <td className="px-4 py-3"><div className="flex items-center justify-end gap-2">
                                                    <Link href={`/products-sales/products/${p.id}/edit`} className="text-navy-500 hover:text-navy-700"><Pencil className="h-4 w-4" /></Link>
                                                    <button type="button" onClick={() => { if (confirm('Hapus produk ini?')) router.delete(`/products-sales/products/${p.id}`); }} className="text-red-500 hover:text-red-700"><Trash2 className="h-4 w-4" /></button>
                                                </div></td>
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                    <Pagination data={products} pageName="products_page" />
                </div>

                <div className="rounded-card border border-border bg-card shadow-sm">
                    <div className="border-b border-border px-4 py-3"><h3 className="text-sm font-semibold text-navy-500">Penjualan</h3></div>
                    <div className="overflow-x-auto">
                        {sales.data.length === 0 ? (
                            <EmptyState title="Belum ada data penjualan" />
                        ) : (
                            <table className="w-full text-sm">
                                <thead className="bg-card border-b border-border"><tr className="text-left text-xs uppercase text-muted">
                                    <th className="px-4 py-3">Kode</th><th className="px-4 py-3">Komoditas</th><th className="px-4 py-3">Mitra</th>
                                    <th className="px-4 py-3">Bulan</th><th className="px-4 py-3 text-right">Volume</th><th className="px-4 py-3 text-right">Omzet</th>
                                    <th className="px-4 py-3 text-right">Laba</th><th className="px-4 py-3">Pasar</th><th className="px-4 py-3">Verifikasi</th>
                                    {canManage && <th className="px-4 py-3 text-right">Aksi</th>}
                                </tr></thead>
                                <tbody>
                                    {sales.data.map((s) => (
                                        <tr key={s.id} className="border-b border-border last:border-0 hover:bg-appbg">
                                            <td className="px-4 py-3 font-medium text-navy-500">{s.kode}</td>
                                            <td className="px-4 py-3 text-muted">{s.komoditas}</td>
                                            <td className="px-4 py-3 text-muted">{s.mitra?.nama ?? '–'}</td>
                                            <td className="px-4 py-3 text-muted">{s.bulan}</td>
                                            <td className="px-4 py-3 text-right">{s.volume} {s.satuan}</td>
                                            <td className="px-4 py-3 text-right font-medium">{formatRupiah(s.omzet)}</td>
                                            <td className="px-4 py-3 text-right text-teal font-medium">{formatRupiah(s.laba)}</td>
                                            <td className="px-4 py-3 text-muted">{s.level_pasar}</td>
                                            <td className="px-4 py-3"><StatusPill status={s.status_verifikasi} /></td>
                                            {canManage && (
                                                <td className="px-4 py-3"><div className="flex items-center justify-end gap-2">
                                                    <Link href={`/products-sales/sales/${s.id}/edit`} className="text-navy-500 hover:text-navy-700"><Pencil className="h-4 w-4" /></Link>
                                                    <button type="button" onClick={() => { if (confirm('Hapus data penjualan ini?')) router.delete(`/products-sales/sales/${s.id}`); }} className="text-red-500 hover:text-red-700"><Trash2 className="h-4 w-4" /></button>
                                                </div></td>
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                    <Pagination data={sales} pageName="sales_page" />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
