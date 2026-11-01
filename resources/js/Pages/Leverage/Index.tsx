import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/UI/PageHeader';
import Pagination from '@/Components/UI/Pagination';
import EmptyState from '@/Components/UI/EmptyState';
import StatusPill from '@/Components/UI/StatusPill';
import KpiCard from '@/Components/UI/KpiCard';
import { Leverage as LeverageType, RefMitra } from '@/types/models';
import { PaginatedData } from '@/types/page-props';

interface Props {
    leverage: PaginatedData<LeverageType & { mitra: { nama: string } }>;
    filters: { search?: string; jenis_leverage?: string; mitra_id?: string };
    mitraList: RefMitra[];
}

function formatRupiah(value: number): string {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);
}

function formatUsd(value: number | null): string {
    if (value === null) return '–';
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(value);
}

export default function LeverageIndex({ leverage, filters, mitraList }: Props) {
    const totalIdr = leverage.data.reduce((sum, l) => sum + (l.jenis_leverage === 'Dana' ? l.nilai_idr : 0), 0);

    return (
        <AuthenticatedLayout>
            <Head title="Dana Ungkit" />
            <div className="space-y-6">
                <PageHeader title="Dana Ungkit" subtitle="Leverage yang diperoleh mitra" />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <KpiCard label="Total Leverage (IDR)" value={formatRupiah(totalIdr)} color="teal" />
                    <KpiCard label="Jumlah Entrian" value={leverage.total} color="navy" />
                    <KpiCard label="Jenis" value={new Set(leverage.data.map((l) => l.jenis_leverage)).size} color="outcome3" />
                </div>

                <form method="GET" action="/leverage" className="flex flex-col gap-3 rounded-card border border-border bg-card p-4 sm:flex-row sm:flex-wrap">
                    <input type="text" name="search" defaultValue={filters.search} placeholder="Cari sumber leverage…" className="w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400 sm:w-64" />
                    <select name="jenis_leverage" defaultValue={filters.jenis_leverage} className="rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400">
                        <option value="">Semua Jenis</option>
                        <option value="Dana">Dana</option>
                        <option value="Tenaga Ahli">Tenaga Ahli</option>
                        <option value="Fasilitas">Fasilitas</option>
                        <option value="Pelatihan">Pelatihan</option>
                    </select>
                    {mitraList.length > 0 && (
                        <select name="mitra_id" defaultValue={filters.mitra_id} className="rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400">
                            <option value="">Semua Mitra</option>
                            {mitraList.map((m) => <option key={m.id} value={m.id}>{m.nama}</option>)}
                        </select>
                    )}
                    <button type="submit" className="rounded-lg bg-navy-500 px-4 py-2 text-sm font-medium text-white hover:bg-navy-600">Filter</button>
                </form>

                <div className="rounded-card border border-border bg-card shadow-sm">
                    <div className="overflow-x-auto">
                        {leverage.data.length === 0 ? (
                            <EmptyState title="Belum ada data leverage" description="Data leverage mitra akan tampil di sini." />
                        ) : (
                            <table className="w-full text-sm">
                                <thead className="bg-card border-b border-border">
                                    <tr className="text-left text-xs uppercase text-muted">
                                        <th className="px-4 py-3">Sumber</th>
                                        <th className="px-4 py-3">Jenis</th>
                                        <th className="px-4 py-3">Mitra</th>
                                        <th className="px-4 py-3 text-right">Nilai IDR</th>
                                        <th className="px-4 py-3 text-right">Nilai USD</th>
                                        <th className="px-4 py-3">Status</th>
                                        <th className="px-4 py-3">Periode</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {leverage.data.map((l) => (
                                        <tr key={l.id} className="border-b border-border last:border-0 hover:bg-appbg">
                                            <td className="px-4 py-3 font-medium text-navy-500">{l.sumber}</td>
                                            <td className="px-4 py-3 text-muted">{l.jenis_leverage}</td>
                                            <td className="px-4 py-3 text-muted">{l.mitra?.nama ?? '–'}</td>
                                            <td className="px-4 py-3 text-right font-medium">{formatRupiah(l.nilai_idr)}</td>
                                            <td className="px-4 py-3 text-right text-muted">{formatUsd(l.nilai_usd)}</td>
                                            <td className="px-4 py-3"><StatusPill status={l.status_leverage} /></td>
                                            <td className="px-4 py-3 text-muted">{l.periode}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                    <Pagination data={leverage} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
