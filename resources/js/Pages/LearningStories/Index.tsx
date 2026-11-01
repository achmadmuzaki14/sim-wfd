import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/UI/PageHeader';
import Pagination from '@/Components/UI/Pagination';
import EmptyState from '@/Components/UI/EmptyState';
import StatusPill from '@/Components/UI/StatusPill';
import { LearningStory, RefMitra } from '@/types/models';
import { PaginatedData } from '@/types/page-props';

interface Props {
    stories: PaginatedData<LearningStory & { mitra: { nama: string } }>;
    filters: { search?: string; tema?: string; mitra_id?: string };
    mitraList: RefMitra[];
}

export default function LearningStoriesIndex({ stories, filters, mitraList }: Props) {
    return (
        <AuthenticatedLayout>
            <Head title="Learning Stories" />
            <div className="space-y-6">
                <PageHeader title="Learning Stories" subtitle="Kumpulan cerita pembelajaran dari mitra" />

                <form method="GET" action="/learning-stories" className="flex flex-col gap-3 rounded-card border border-border bg-card p-4 sm:flex-row sm:flex-wrap">
                    <input type="text" name="search" defaultValue={filters.search} placeholder="Cari cerita…" className="w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400 sm:w-64" />
                    <input type="text" name="tema" defaultValue={filters.tema} placeholder="Tema…" className="rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400" />
                    {mitraList.length > 0 && (
                        <select name="mitra_id" defaultValue={filters.mitra_id} className="rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400">
                            <option value="">Semua Mitra</option>
                            {mitraList.map((m) => <option key={m.id} value={m.id}>{m.nama}</option>)}
                        </select>
                    )}
                    <button type="submit" className="rounded-lg bg-navy-500 px-4 py-2 text-sm font-medium text-white hover:bg-navy-600">Filter</button>
                </form>

                {stories.data.length === 0 ? (
                    <div className="rounded-card border border-border bg-card shadow-sm">
                        <EmptyState title="Belum ada cerita pembelajaran" description="Cerita pembelajaran dari mitra akan tampil di sini." />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {stories.data.map((s) => (
                            <div key={s.id} className="rounded-card border border-border bg-card p-4 shadow-sm">
                                <h3 className="text-sm font-semibold text-navy-500">{s.judul}</h3>
                                <p className="mt-1 text-xs text-muted">Oleh: {s.penulis} · {s.mitra?.nama ?? '–'}</p>
                                <p className="mt-2 text-sm text-muted line-clamp-3">{s.ringkasan}</p>
                                <div className="mt-3 flex items-center gap-2">
                                    <span className="rounded-md bg-appbg px-2 py-0.5 text-xs text-muted">{s.tema}</span>
                                    <StatusPill status={s.status_verifikasi} />
                                </div>
                                {s.link_cerita && (
                                    <a href={s.link_cerita} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-xs text-teal hover:text-teal-600">
                                        Baca selengkapnya →
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                )}
                {stories.data.length > 0 && (
                    <div className="rounded-card border border-border bg-card shadow-sm">
                        <Pagination data={stories} />
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
