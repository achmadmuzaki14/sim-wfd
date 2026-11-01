import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/UI/PageHeader';
import Pagination from '@/Components/UI/Pagination';
import EmptyState from '@/Components/UI/EmptyState';
import StatusPill from '@/Components/UI/StatusPill';
import { Kebijakan, RefMitra } from '@/types/models';
import { PaginatedData } from '@/types/page-props';

interface Props {
    kebijakan: PaginatedData<Kebijakan & { mitra: { nama: string } }>;
    filters: { search?: string; level_kebijakan?: string; mitra_id?: string };
    mitraList: RefMitra[];
}

export default function PoliciesIndex({ kebijakan, filters, mitraList }: Props) {
    return (
        <AuthenticatedLayout>
            <Head title="Kebijakan" />
            <div className="space-y-6">
                <PageHeader title="Kebijakan" subtitle="Daftar kebijakan yang didorong oleh mitra" />

                <form method="GET" action="/policies" className="flex flex-col gap-3 rounded-card border border-border bg-card p-4 sm:flex-row sm:flex-wrap">
                    <input type="text" name="search" defaultValue={filters.search} placeholder="Cari judul kebijakan…" className="w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400 sm:w-64" />
                    <select name="level_kebijakan" defaultValue={filters.level_kebijakan} className="rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400">
                        <option value="">Semua Level</option>
                        <option value="Desa">Desa</option>
                        <option value="Kabupaten">Kabupaten</option>
                        <option value="Provinsi">Provinsi</option>
                        <option value="Nasional">Nasional</option>
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
                        {kebijakan.data.length === 0 ? (
                            <EmptyState title="Belum ada kebijakan" description="Data kebijakan yang didorong mitra akan tampil di sini." />
                        ) : (
                            <table className="w-full text-sm">
                                <thead className="bg-card border-b border-border">
                                    <tr className="text-left text-xs uppercase text-muted">
                                        <th className="px-4 py-3">Judul</th>
                                        <th className="px-4 py-3">Mitra</th>
                                        <th className="px-4 py-3">Level</th>
                                        <th className="px-4 py-3">Isu</th>
                                        <th className="px-4 py-3">Instansi</th>
                                        <th className="px-4 py-3">Status</th>
                                        <th className="px-4 py-3">Responsif Gender</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {kebijakan.data.map((k) => (
                                        <tr key={k.id} className="border-b border-border last:border-0 hover:bg-appbg">
                                            <td className="px-4 py-3 font-medium text-navy-500">{k.judul}</td>
                                            <td className="px-4 py-3 text-muted">{k.mitra?.nama ?? '–'}</td>
                                            <td className="px-4 py-3 text-muted">{k.level_kebijakan}</td>
                                            <td className="px-4 py-3 text-muted">{k.isu_didorong}</td>
                                            <td className="px-4 py-3 text-muted">{k.instansi}</td>
                                            <td className="px-4 py-3"><StatusPill status={k.status_kebijakan} /></td>
                                            <td className="px-4 py-3">
                                                <span className={`text-xs ${k.responsif_gender ? 'text-teal font-medium' : 'text-muted'}`}>
                                                    {k.responsif_gender ? 'Ya' : 'Tidak'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                    <Pagination data={kebijakan} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
