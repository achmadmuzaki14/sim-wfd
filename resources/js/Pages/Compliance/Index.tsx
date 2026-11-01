import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/UI/PageHeader';
import Pagination from '@/Components/UI/Pagination';
import EmptyState from '@/Components/UI/EmptyState';
import StatusPill from '@/Components/UI/StatusPill';
import { KepatuhanLaporan, RefMitra } from '@/types/models';
import { PaginatedData } from '@/types/page-props';

interface Props {
    kepatuhanLaporan: PaginatedData<KepatuhanLaporan & { mitra: { nama: string } }>;
    filters: { mitra_id?: string; tahun?: string; status_laporan?: string };
    mitraList: RefMitra[];
}

const monthNames = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'];

export default function ComplianceIndex({ kepatuhanLaporan, filters, mitraList }: Props) {
    return (
        <AuthenticatedLayout>
            <Head title="Kepatuhan Laporan" />
            <div className="space-y-6">
                <PageHeader title="Kepatuhan Laporan" subtitle="Tracking kepatuhan laporan kuartalan mitra" />

                <form method="GET" action="/report-compliance" className="flex flex-col gap-3 rounded-card border border-border bg-card p-4 sm:flex-row sm:flex-wrap">
                    <select name="mitra_id" defaultValue={filters.mitra_id} className="rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400">
                        <option value="">Semua Mitra</option>
                        {mitraList.map((m) => <option key={m.id} value={m.id}>{m.nama}</option>)}
                    </select>
                    <select name="tahun" defaultValue={filters.tahun} className="rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400">
                        <option value="">Semua Tahun</option>
                        <option value="2025">2025</option>
                        <option value="2026">2026</option>
                        <option value="2027">2027</option>
                    </select>
                    <select name="status_laporan" defaultValue={filters.status_laporan} className="rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400">
                        <option value="">Semua Status</option>
                        <option value="Diterima">Diterima</option>
                        <option value="Terlambat">Terlambat</option>
                        <option value="Belum kirim">Belum kirim</option>
                        <option value="Tidak wajib">Tidak wajib</option>
                    </select>
                    <button type="submit" className="rounded-lg bg-navy-500 px-4 py-2 text-sm font-medium text-white hover:bg-navy-600">Filter</button>
                </form>

                <div className="rounded-card border border-border bg-card shadow-sm">
                    <div className="overflow-x-auto">
                        {kepatuhanLaporan.data.length === 0 ? (
                            <EmptyState title="Belum ada data kepatuhan" description="Data kepatuhan laporan mitra akan tampil di sini." />
                        ) : (
                            <table className="w-full text-sm">
                                <thead className="bg-card border-b border-border">
                                    <tr className="text-left text-xs uppercase text-muted">
                                        <th className="px-4 py-3">Mitra</th>
                                        <th className="px-4 py-3">Tahun</th>
                                        <th className="px-4 py-3">Bulan</th>
                                        <th className="px-4 py-3">Status</th>
                                        <th className="px-4 py-3">Tanggal Diterima</th>
                                        <th className="px-4 py-3">Catatan</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {kepatuhanLaporan.data.map((k) => (
                                        <tr key={k.id} className="border-b border-border last:border-0 hover:bg-appbg">
                                            <td className="px-4 py-3 font-medium text-navy-500">{k.mitra?.nama ?? '–'}</td>
                                            <td className="px-4 py-3 text-muted">{k.tahun}</td>
                                            <td className="px-4 py-3 text-muted">{monthNames[k.bulan] ?? k.bulan}</td>
                                            <td className="px-4 py-3"><StatusPill status={k.status_laporan} /></td>
                                            <td className="px-4 py-3 text-muted">{k.tanggal_diterima ?? '–'}</td>
                                            <td className="px-4 py-3 text-muted">{k.catatan ?? '–'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                    <Pagination data={kepatuhanLaporan} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
