import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/UI/PageHeader';
import Pagination from '@/Components/UI/Pagination';
import EmptyState from '@/Components/UI/EmptyState';
import StatusPill from '@/Components/UI/StatusPill';
import { Plus, Eye } from 'lucide-react';
import { Dokumen, RefIndikator } from '@/types/models';
import { PaginatedData } from '@/types/page-props';

interface Props {
    documents: PaginatedData<Dokumen & { mitra: { nama: string }; indikator: { kode: string; nama_indikator: string } }>;
    filters: { search?: string; indikator_id?: string };
    indicators: RefIndikator[];
}

export default function DocumentsIndex({ documents, filters, indicators }: Props) {
    return (
        <AuthenticatedLayout>
            <Head title="Register Dokumen" />
            <div className="space-y-6">
                <PageHeader
                    title="Register Dokumen"
                    subtitle="Daftar dokumen bukti per indikator"
                    actions={
                        <Link href="/documents/create" className="inline-flex items-center gap-1 rounded-lg bg-teal px-4 py-2 text-sm font-medium text-white hover:bg-teal-600">
                            <Plus className="h-4 w-4" /> Tambah Dokumen
                        </Link>
                    }
                />

                <form method="GET" action="/documents" className="flex flex-col gap-3 rounded-card border border-border bg-card p-4 sm:flex-row sm:flex-wrap">
                    <input type="text" name="search" defaultValue={filters.search} placeholder="Cari judul dokumen…" className="w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400 sm:w-64" />
                    <select name="indikator_id" defaultValue={filters.indikator_id} className="rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400">
                        <option value="">Semua Indikator</option>
                        {indicators.map((i) => <option key={i.id} value={i.id}>{i.kode} — {i.nama_indikator}</option>)}
                    </select>
                    <button type="submit" className="rounded-lg bg-navy-500 px-4 py-2 text-sm font-medium text-white hover:bg-navy-600">Filter</button>
                </form>

                <div className="rounded-card border border-border bg-card shadow-sm">
                    <div className="overflow-x-auto">
                        {documents.data.length === 0 ? (
                            <EmptyState title="Belum ada dokumen" description="Tambahkan dokumen bukti untuk indikator berbasis dokumen." />
                        ) : (
                            <table className="w-full text-sm">
                                <thead className="bg-card border-b border-border">
                                    <tr className="text-left text-xs uppercase text-muted">
                                        <th className="px-4 py-3">Kode</th>
                                        <th className="px-4 py-3">Judul</th>
                                        <th className="px-4 py-3">Indikator</th>
                                        <th className="px-4 py-3">Mitra</th>
                                        <th className="px-4 py-3">Periode</th>
                                        <th className="px-4 py-3">Status Dokumen</th>
                                        <th className="px-4 py-3">Verifikasi</th>
                                        <th className="px-4 py-3"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {documents.data.map((doc) => (
                                        <tr key={doc.id} className="border-b border-border last:border-0 hover:bg-appbg">
                                            <td className="px-4 py-3 font-medium text-navy-500">{doc.kode}</td>
                                            <td className="px-4 py-3 text-navy-500">{doc.judul}</td>
                                            <td className="px-4 py-3 text-muted">{doc.indikator?.kode ?? '–'}</td>
                                            <td className="px-4 py-3 text-muted">{doc.mitra?.nama ?? '–'}</td>
                                            <td className="px-4 py-3 text-muted">{doc.periode}</td>
                                            <td className="px-4 py-3"><StatusPill status={doc.status_dokumen} /></td>
                                            <td className="px-4 py-3"><StatusPill status={doc.status_verifikasi} /></td>
                                            <td className="px-4 py-3">
                                                <Link href={`/documents/${doc.id}`} className="text-teal hover:text-teal-600"><Eye className="h-4 w-4" /></Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                    <Pagination data={documents} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
