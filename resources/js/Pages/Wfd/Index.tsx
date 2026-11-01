import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/UI/PageHeader';
import Pagination from '@/Components/UI/Pagination';
import EmptyState from '@/Components/UI/EmptyState';
import StatusPill from '@/Components/UI/StatusPill';
import { Plus, Eye } from 'lucide-react';
import { WfdRoster, RefMitra } from '@/types/models';
import { PaginatedData } from '@/types/page-props';

interface Props {
    wfd: PaginatedData<WfdRoster & { mitra: RefMitra }>;
    filters: { search?: string; mitra_id?: string; status_aktif?: string };
    partners: RefMitra[];
}

export default function WfdIndex({ wfd, filters, partners }: Props) {
    return (
        <AuthenticatedLayout>
            <Head title="Register WFD" />
            <div className="space-y-6">
                <PageHeader
                    title="Register WFD"
                    subtitle="Daftar peserta Women Forest Defenders"
                    actions={
                        <Link
                            href="/wfd/create"
                            className="inline-flex items-center gap-1 rounded-lg bg-teal px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-600"
                        >
                            <Plus className="h-4 w-4" /> Tambah WFD
                        </Link>
                    }
                />

                <form method="GET" action="/wfd" className="flex flex-col gap-3 rounded-card border border-border bg-card p-4 sm:flex-row sm:flex-wrap">
                    <input
                        type="text"
                        name="search"
                        defaultValue={filters.search}
                        placeholder="Cari nama atau desa…"
                        className="w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400 sm:w-64"
                    />
                    {partners.length > 0 && (
                        <select name="mitra_id" defaultValue={filters.mitra_id} className="rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400">
                            <option value="">Semua Mitra</option>
                            {partners.map((p) => (
                                <option key={p.id} value={p.id}>{p.nama}</option>
                            ))}
                        </select>
                    )}
                    <select name="status_aktif" defaultValue={filters.status_aktif} className="rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400">
                        <option value="">Semua Status</option>
                        <option value="1">Aktif</option>
                        <option value="0">Non-aktif</option>
                    </select>
                    <button type="submit" className="rounded-lg bg-navy-500 px-4 py-2 text-sm font-medium text-white hover:bg-navy-600">
                        Filter
                    </button>
                </form>

                <div className="rounded-card border border-border bg-card shadow-sm">
                    <div className="overflow-x-auto">
                        {wfd.data.length === 0 ? (
                            <EmptyState title="Belum ada data WFD" description="Tambahkan peserta WFD untuk mulai mencatat capaian." />
                        ) : (
                            <table className="w-full text-sm">
                                <thead className="bg-card border-b border-border">
                                    <tr className="text-left text-xs uppercase text-muted">
                                        <th className="px-4 py-3">Kode</th>
                                        <th className="px-4 py-3">Nama</th>
                                        <th className="px-4 py-3">Mitra</th>
                                        <th className="px-4 py-3">Provinsi</th>
                                        <th className="px-4 py-3">Tahun Bergabung</th>
                                        <th className="px-4 py-3">Status</th>
                                        <th className="px-4 py-3"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {wfd.data.map((item) => (
                                        <tr key={item.id} className="border-b border-border last:border-0 hover:bg-appbg">
                                            <td className="px-4 py-3 font-medium text-navy-500">{item.kode}</td>
                                            <td className="px-4 py-3 text-navy-500">{item.nama_lengkap}</td>
                                            <td className="px-4 py-3 text-muted">{item.mitra?.nama ?? '–'}</td>
                                            <td className="px-4 py-3 text-muted">{item.provinsi ?? '–'}</td>
                                            <td className="px-4 py-3 text-muted">{item.tahun_bergabung}</td>
                                            <td className="px-4 py-3">
                                                <StatusPill status={item.status_aktif ? 'Terverifikasi' : 'Belum diverifikasi'} />
                                            </td>
                                            <td className="px-4 py-3">
                                                <Link href={`/wfd/${item.id}`} className="text-teal hover:text-teal-600" title="Lihat detail">
                                                    <Eye className="h-4 w-4" />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                    <Pagination data={wfd} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
