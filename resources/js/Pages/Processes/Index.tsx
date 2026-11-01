import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/UI/PageHeader';
import Pagination from '@/Components/UI/Pagination';
import EmptyState from '@/Components/UI/EmptyState';
import StatusPill from '@/Components/UI/StatusPill';
import { Plus } from 'lucide-react';
import { Proses, RefIndikator, RefMitra } from '@/types/models';
import { PaginatedData } from '@/types/page-props';

interface Props {
    proses: PaginatedData<Proses & { mitra: { nama: string }; indikator: { kode: string; nama_indikator: string } }>;
    filters: { search?: string; indikator_id?: string };
    indicators: RefIndikator[];
    mitraList: RefMitra[];
}

export default function ProcessesIndex({ proses, filters, indicators }: Props) {
    return (
        <AuthenticatedLayout>
            <Head title="Pelacak Proses" />
            <div className="space-y-6">
                <PageHeader
                    title="Pelacak Proses"
                    subtitle="Lacak kemajuan proses per kuartal tanpa menggelembungkan capaian"
                    actions={
                        <Link href="/processes/create" className="inline-flex items-center gap-1 rounded-lg bg-teal px-4 py-2 text-sm font-medium text-white hover:bg-teal-600">
                            <Plus className="h-4 w-4" /> Tambah Proses
                        </Link>
                    }
                />

                <form method="GET" action="/processes" className="flex flex-col gap-3 rounded-card border border-border bg-card p-4 sm:flex-row sm:flex-wrap">
                    <input type="text" name="search" defaultValue={filters.search} placeholder="Cari judul proses…" className="w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400 sm:w-64" />
                    <select name="indikator_id" defaultValue={filters.indikator_id} className="rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400">
                        <option value="">Semua Indikator</option>
                        {indicators.map((i) => <option key={i.id} value={i.id}>{i.kode} — {i.nama_indikator}</option>)}
                    </select>
                    <button type="submit" className="rounded-lg bg-navy-500 px-4 py-2 text-sm font-medium text-white hover:bg-navy-600">Filter</button>
                </form>

                <div className="rounded-card border border-border bg-card shadow-sm">
                    <div className="overflow-x-auto">
                        {proses.data.length === 0 ? (
                            <EmptyState title="Belum ada proses" description="Tambahkan proses untuk melacak kemajuan per kuartal." />
                        ) : (
                            <table className="w-full text-sm">
                                <thead className="bg-card border-b border-border">
                                    <tr className="text-left text-xs uppercase text-muted">
                                        <th className="px-4 py-3">Kode</th>
                                        <th className="px-4 py-3">Judul</th>
                                        <th className="px-4 py-3">Indikator</th>
                                        <th className="px-4 py-3">Mitra</th>
                                        <th className="px-4 py-3 text-center">Tahapan</th>
                                        <th className="px-4 py-3">Status</th>
                                        <th className="px-4 py-3"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {proses.data.map((p) => (
                                        <tr key={p.id} className="border-b border-border last:border-0 hover:bg-appbg">
                                            <td className="px-4 py-3 font-medium text-navy-500">{p.kode}</td>
                                            <td className="px-4 py-3 text-navy-500">{p.judul}</td>
                                            <td className="px-4 py-3 text-muted">{p.indikator?.kode ?? '–'}</td>
                                            <td className="px-4 py-3 text-muted">{p.mitra?.nama ?? '–'}</td>
                                            <td className="px-4 py-3 text-center text-muted">{p.tahapan_saat_ini}/{p.total_tahapan}</td>
                                            <td className="px-4 py-3"><StatusPill status={p.status_proses} /></td>
                                            <td className="px-4 py-3">
                                                <Link href={`/processes/${p.id}`} className="text-sm text-teal hover:text-teal-600">Detail</Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                    <Pagination data={proses} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
