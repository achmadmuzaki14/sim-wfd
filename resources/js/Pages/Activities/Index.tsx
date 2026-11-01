import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/UI/PageHeader';
import Pagination from '@/Components/UI/Pagination';
import EmptyState from '@/Components/UI/EmptyState';
import { Plus } from 'lucide-react';
import { Kegiatan, RefMitra } from '@/types/models';
import { PaginatedData } from '@/types/page-props';

interface Props {
    kegiatan: PaginatedData<Kegiatan & { mitra: { nama: string } }>;
    filters: { search?: string; mitra_id?: string };
    mitraList: RefMitra[];
}

export default function ActivitiesIndex({ kegiatan, filters, mitraList }: Props) {
    return (
        <AuthenticatedLayout>
            <Head title="Register Kegiatan" />
            <div className="space-y-6">
                <PageHeader
                    title="Register Kegiatan"
                    subtitle="Daftar kegiatan yang dilaksanakan"
                    actions={
                        <Link href="/activities/create" className="inline-flex items-center gap-1 rounded-lg bg-teal px-4 py-2 text-sm font-medium text-white hover:bg-teal-600">
                            <Plus className="h-4 w-4" /> Tambah Kegiatan
                        </Link>
                    }
                />

                <form method="GET" action="/activities" className="flex flex-col gap-3 rounded-card border border-border bg-card p-4 sm:flex-row sm:flex-wrap">
                    <input type="text" name="search" defaultValue={filters.search} placeholder="Cari judul kegiatan…" className="w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400 sm:w-64" />
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
                        {kegiatan.data.length === 0 ? (
                            <EmptyState title="Belum ada kegiatan" description="Catat kegiatan yang dilaksanakan oleh mitra." />
                        ) : (
                            <table className="w-full text-sm">
                                <thead className="bg-card border-b border-border">
                                    <tr className="text-left text-xs uppercase text-muted">
                                        <th className="px-4 py-3">Kode</th>
                                        <th className="px-4 py-3">Judul</th>
                                        <th className="px-4 py-3">Mitra</th>
                                        <th className="px-4 py-3">Tanggal</th>
                                        <th className="px-4 py-3 text-right">Peserta P</th>
                                        <th className="px-4 py-3 text-right">Peserta L</th>
                                        <th className="px-4 py-3">Periode</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {kegiatan.data.map((k) => (
                                        <tr key={k.id} className="border-b border-border last:border-0 hover:bg-appbg">
                                            <td className="px-4 py-3 font-medium text-navy-500">{k.kode}</td>
                                            <td className="px-4 py-3 text-navy-500">{k.judul}</td>
                                            <td className="px-4 py-3 text-muted">{k.mitra?.nama ?? '–'}</td>
                                            <td className="px-4 py-3 text-muted">{k.tanggal_kegiatan}</td>
                                            <td className="px-4 py-3 text-right">{k.peserta_perempuan}</td>
                                            <td className="px-4 py-3 text-right">{k.peserta_laki}</td>
                                            <td className="px-4 py-3 text-muted">{k.periode}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                    <Pagination data={kegiatan} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
