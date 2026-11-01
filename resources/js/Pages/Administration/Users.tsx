import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/UI/PageHeader';
import Pagination from '@/Components/UI/Pagination';
import EmptyState from '@/Components/UI/EmptyState';
import { RefMitra } from '@/types/models';
import { PaginatedData } from '@/types/page-props';

interface UserRow {
    id: string;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    profile: {
        peran: string;
        aktif: boolean;
        mitra: { nama: string } | null;
    } | null;
}

interface Props {
    users: PaginatedData<UserRow>;
    filters: { search?: string };
    mitraList: RefMitra[];
}

const roleLabels: Record<string, string> = {
    admin: 'Admin',
    verifikator: 'Verifikator',
    mitra: 'Mitra',
    peninjau: 'Peninjau',
};

export default function AdministrationUsers({ users, filters, mitraList }: Props) {
    return (
        <AuthenticatedLayout>
            <Head title="Pengguna & Peran" />
            <div className="space-y-6">
                <PageHeader title="Pengguna & Peran" subtitle="Kelola akun pengguna sistem" />

                <form method="GET" action="/administration/users" className="flex flex-col gap-3 rounded-card border border-border bg-card p-4 sm:flex-row sm:flex-wrap">
                    <input type="text" name="search" defaultValue={filters.search} placeholder="Cari nama atau email…" className="w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400 sm:w-64" />
                    <button type="submit" className="rounded-lg bg-navy-500 px-4 py-2 text-sm font-medium text-white hover:bg-navy-600">Filter</button>
                </form>

                <div className="rounded-card border border-border bg-card shadow-sm">
                    <div className="overflow-x-auto">
                        {users.data.length === 0 ? (
                            <EmptyState title="Tidak ada pengguna" />
                        ) : (
                            <table className="w-full text-sm">
                                <thead className="bg-card border-b border-border">
                                    <tr className="text-left text-xs uppercase text-muted">
                                        <th className="px-4 py-3">Nama</th>
                                        <th className="px-4 py-3">Email</th>
                                        <th className="px-4 py-3">Peran</th>
                                        <th className="px-4 py-3">Mitra</th>
                                        <th className="px-4 py-3">Status</th>
                                        <th className="px-4 py-3">Terverifikasi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.data.map((u) => (
                                        <tr key={u.id} className="border-b border-border last:border-0 hover:bg-appbg">
                                            <td className="px-4 py-3 font-medium text-navy-500">{u.name}</td>
                                            <td className="px-4 py-3 text-muted">{u.email}</td>
                                            <td className="px-4 py-3">
                                                <span className="rounded-md bg-navy-50 px-2 py-0.5 text-xs font-medium text-navy-500">
                                                    {u.profile ? (roleLabels[u.profile.peran] ?? u.profile.peran) : '–'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-muted">{u.profile?.mitra?.nama ?? '–'}</td>
                                            <td className="px-4 py-3">
                                                <span className={`text-xs font-medium ${u.profile?.aktif ? 'text-teal' : 'text-danger'}`}>
                                                    {u.profile?.aktif ? 'Aktif' : 'Non-aktif'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-muted">
                                                {u.email_verified_at ? 'Ya' : 'Belum'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                    <Pagination data={users} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
