import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/UI/PageHeader';
import Pagination from '@/Components/UI/Pagination';
import EmptyState from '@/Components/UI/EmptyState';
import StatusPill from '@/Components/UI/StatusPill';
import { DqaLog, RefMitra } from '@/types/models';
import { PaginatedData } from '@/types/page-props';

interface Props {
    dqaLogs: PaginatedData<DqaLog & { mitra: { nama: string }; indikator: { kode: string } | null }>;
    filters: { search?: string; status_isu?: string; mitra_id?: string };
    mitraList: RefMitra[];
}

export default function DataQualityIndex({ dqaLogs, filters, mitraList }: Props) {
    return (
        <AuthenticatedLayout>
            <Head title="Log DQA" />
            <div className="space-y-6">
                <PageHeader title="Log DQA" subtitle="Data Quality Assurance — isu dan tindak lanjut" />

                <form method="GET" action="/data-quality" className="flex flex-col gap-3 rounded-card border border-border bg-card p-4 sm:flex-row sm:flex-wrap">
                    <input type="text" name="search" defaultValue={filters.search} placeholder="Cari deskripsi isu…" className="w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400 sm:w-64" />
                    <select name="status_isu" defaultValue={filters.status_isu} className="rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400">
                        <option value="">Semua Status</option>
                        <option value="Open">Open</option>
                        <option value="In progress">In progress</option>
                        <option value="Closed">Closed</option>
                    </select>
                    <select name="mitra_id" defaultValue={filters.mitra_id} className="rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400">
                        <option value="">Semua Mitra</option>
                        {mitraList.map((m) => <option key={m.id} value={m.id}>{m.nama}</option>)}
                    </select>
                    <button type="submit" className="rounded-lg bg-navy-500 px-4 py-2 text-sm font-medium text-white hover:bg-navy-600">Filter</button>
                </form>

                <div className="rounded-card border border-border bg-card shadow-sm">
                    <div className="overflow-x-auto">
                        {dqaLogs.data.length === 0 ? (
                            <EmptyState title="Tidak ada isu DQA" description="Semua data berkualitas baik." />
                        ) : (
                            <table className="w-full text-sm">
                                <thead className="bg-card border-b border-border">
                                    <tr className="text-left text-xs uppercase text-muted">
                                        <th className="px-4 py-3">Jenis Isu</th>
                                        <th className="px-4 py-3">Deskripsi</th>
                                        <th className="px-4 py-3">Mitra</th>
                                        <th className="px-4 py-3">PIC</th>
                                        <th className="px-4 py-3">Deadline</th>
                                        <th className="px-4 py-3">Status</th>
                                        <th className="px-4 py-3">Overdue</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dqaLogs.data.map((log) => (
                                        <tr key={log.id} className="border-b border-border last:border-0 hover:bg-appbg">
                                            <td className="px-4 py-3 font-medium text-navy-500">{log.jenis_isu}</td>
                                            <td className="px-4 py-3 text-muted">{log.deskripsi}</td>
                                            <td className="px-4 py-3 text-muted">{log.mitra?.nama ?? '–'}</td>
                                            <td className="px-4 py-3 text-muted">{log.pic}</td>
                                            <td className="px-4 py-3 text-muted">{log.deadline ?? '–'}</td>
                                            <td className="px-4 py-3"><StatusPill status={log.status_isu} /></td>
                                            <td className="px-4 py-3">
                                                {log.is_overdue ? (
                                                    <span className="text-xs font-medium text-danger">Ya</span>
                                                ) : (
                                                    <span className="text-xs text-muted">–</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                    <Pagination data={dqaLogs} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
