import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/UI/PageHeader';
import Pagination from '@/Components/UI/Pagination';
import EmptyState from '@/Components/UI/EmptyState';
import StatusPill from '@/Components/UI/StatusPill';
import { Plus } from 'lucide-react';
import { Kelompok, RefMitra } from '@/types/models';
import { PaginatedData } from '@/types/page-props';

interface Props {
    kelompok: PaginatedData<Kelompok & { mitra: { nama: string } }>;
    filters: { search?: string; tipe?: string; mitra_id?: string };
    mitraList: RefMitra[];
}

export default function GroupsIndex({ kelompok, filters, mitraList }: Props) {
    return (
        <AuthenticatedLayout>
            <Head title="Kelompok" />
            <div className="space-y-6">
                <PageHeader
                    title="Kelompok"
                    subtitle="Daftar kelompok (Kelompok Monitoring, KPS, KUPS)"
                    actions={
                        <Link href="/groups/create" className="inline-flex items-center gap-1 rounded-lg bg-teal px-4 py-2 text-sm font-medium text-white hover:bg-teal-600">
                            <Plus className="h-4 w-4" /> Tambah Kelompok
                        </Link>
                    }
                />

                <form method="GET" action="/groups" className="flex flex-col gap-3 rounded-card border border-border bg-card p-4 sm:flex-row sm:flex-wrap">
                    <input type="text" name="search" defaultValue={filters.search} placeholder="Cari nama kelompok…" className="w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400 sm:w-64" />
                    <select name="tipe" defaultValue={filters.tipe} className="rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400">
                        <option value="">Semua Tipe</option>
                        <option value="Kelompok Monitoring Hutan">Kelompok Monitoring Hutan</option>
                        <option value="KPS">KPS</option>
                        <option value="KUPS">KUPS</option>
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
                        {kelompok.data.length === 0 ? (
                            <EmptyState title="Belum ada kelompok" description="Tambahkan kelompok untuk mulai mencatat data." />
                        ) : (
                            <table className="w-full text-sm">
                                <thead className="bg-card border-b border-border">
                                    <tr className="text-left text-xs uppercase text-muted">
                                        <th className="px-4 py-3">Kode</th>
                                        <th className="px-4 py-3">Nama</th>
                                        <th className="px-4 py-3">Tipe</th>
                                        <th className="px-4 py-3">Mitra</th>
                                        <th className="px-4 py-3 text-right">Anggota P</th>
                                        <th className="px-4 py-3 text-right">Anggota L</th>
                                        <th className="px-4 py-3 text-right">Luas (ha)</th>
                                        <th className="px-4 py-3">Pemimpin</th>
                                        <th className="px-4 py-3">Verifikasi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {kelompok.data.map((k) => (
                                        <tr key={k.id} className="border-b border-border last:border-0 hover:bg-appbg">
                                            <td className="px-4 py-3 font-medium text-navy-500">{k.kode}</td>
                                            <td className="px-4 py-3 text-navy-500">{k.nama}</td>
                                            <td className="px-4 py-3 text-muted">{k.tipe}</td>
                                            <td className="px-4 py-3 text-muted">{k.mitra?.nama ?? '–'}</td>
                                            <td className="px-4 py-3 text-right">{k.anggota_perempuan}</td>
                                            <td className="px-4 py-3 text-right">{k.anggota_laki}</td>
                                            <td className="px-4 py-3 text-right">{k.luas_hektar ?? '–'}</td>
                                            <td className="px-4 py-3">
                                                <span className={`text-xs ${k.dipimpin_perempuan ? 'text-teal font-medium' : 'text-muted'}`}>
                                                    {k.dipimpin_perempuan ? 'Perempuan' : 'Laki-laki'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3"><StatusPill status={k.status_verifikasi} /></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                    <Pagination data={kelompok} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
