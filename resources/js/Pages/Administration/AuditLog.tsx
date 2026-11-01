import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/UI/PageHeader';
import Pagination from '@/Components/UI/Pagination';
import EmptyState from '@/Components/UI/EmptyState';
import { AuditLog } from '@/types/models';
import { PaginatedData } from '@/types/page-props';

interface Props {
    logs: PaginatedData<AuditLog & { user: { name: string } | null }>;
    filters: { tabel?: string; aksi?: string; search?: string };
}

const aksiColors: Record<string, string> = {
    INSERT: 'bg-green-100 text-green-700',
    UPDATE: 'bg-amber-100 text-amber-700',
    DELETE: 'bg-red-100 text-red-700',
};

export default function AdministrationAuditLog({ logs, filters }: Props) {
    return (
        <AuthenticatedLayout>
            <Head title="Audit Log" />
            <div className="space-y-6">
                <PageHeader title="Audit Log" subtitle="Log perubahan data yang tidak dapat dimodifikasi" />

                <form method="GET" action="/administration/audit-log" className="flex flex-col gap-3 rounded-card border border-border bg-card p-4 sm:flex-row sm:flex-wrap">
                    <select name="tabel" defaultValue={filters.tabel} className="rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400">
                        <option value="">Semua Tabel</option>
                        <option value="wfd_roster">WFD Roster</option>
                        <option value="wfd_capaian">WFD Capaian</option>
                        <option value="dokumen">Dokumen</option>
                        <option value="kegiatan">Kegiatan</option>
                        <option value="kelompok">Kelompok</option>
                        <option value="proses">Proses</option>
                        <option value="produk">Produk</option>
                        <option value="penjualan">Penjualan</option>
                        <option value="kebijakan">Kebijakan</option>
                        <option value="leverage">Leverage</option>
                    </select>
                    <select name="aksi" defaultValue={filters.aksi} className="rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400">
                        <option value="">Semua Aksi</option>
                        <option value="INSERT">Insert</option>
                        <option value="UPDATE">Update</option>
                        <option value="DELETE">Delete</option>
                    </select>
                    <input type="text" name="search" defaultValue={filters.search} placeholder="Cari record ID…" className="rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400" />
                    <button type="submit" className="rounded-lg bg-navy-500 px-4 py-2 text-sm font-medium text-white hover:bg-navy-600">Filter</button>
                </form>

                <div className="rounded-card border border-border bg-card shadow-sm">
                    <div className="overflow-x-auto">
                        {logs.data.length === 0 ? (
                            <EmptyState title="Tidak ada log" description="Log perubahan akan tampil di sini." />
                        ) : (
                            <table className="w-full text-sm">
                                <thead className="bg-card border-b border-border">
                                    <tr className="text-left text-xs uppercase text-muted">
                                        <th className="px-4 py-3">Waktu</th>
                                        <th className="px-4 py-3">Tabel</th>
                                        <th className="px-4 py-3">Record ID</th>
                                        <th className="px-4 py-3">Aksi</th>
                                        <th className="px-4 py-3">Pengguna</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {logs.data.map((log) => (
                                        <tr key={log.id} className="border-b border-border last:border-0 hover:bg-appbg">
                                            <td className="px-4 py-3 text-muted whitespace-nowrap">{log.waktu}</td>
                                            <td className="px-4 py-3 font-medium text-navy-500">{log.tabel}</td>
                                            <td className="px-4 py-3 text-muted font-mono text-xs">{log.record_id.substring(0, 8)}…</td>
                                            <td className="px-4 py-3">
                                                <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${aksiColors[log.aksi] ?? 'bg-slate-100 text-slate-700'}`}>
                                                    {log.aksi}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-muted">{log.user?.name ?? 'Sistem'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                    <Pagination data={logs} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
