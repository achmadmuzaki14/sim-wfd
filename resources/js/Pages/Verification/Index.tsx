import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/UI/PageHeader';
import EmptyState from '@/Components/UI/EmptyState';
import StatusPill from '@/Components/UI/StatusPill';
import { CheckCircle2, RotateCcw } from 'lucide-react';

interface QueueItem {
    type: 'capaian' | 'dokumen';
    id: string;
    kode: string;
    judul?: string;
    indikator: string | null;
    mitra: string | null;
    periode: string;
    tahun_lapor: number;
    status_verifikasi: string;
    created_at: string;
}

interface Props {
    queue: QueueItem[];
    canVerify: boolean;
}

export default function VerificationIndex({ queue, canVerify }: Props) {
    return (
        <AuthenticatedLayout>
            <Head title="Antrean Verifikasi" />
            <div className="space-y-6">
                <PageHeader
                    title="Antrean Verifikasi"
                    subtitle={`${queue.length} item menunggu verifikasi`}
                />

                <div className="rounded-card border border-border bg-card shadow-sm">
                    <div className="overflow-x-auto">
                        {queue.length === 0 ? (
                            <EmptyState title="Tidak ada item menunggu verifikasi" description="Semua data telah terverifikasi." />
                        ) : (
                            <table className="w-full text-sm">
                                <thead className="bg-card border-b border-border">
                                    <tr className="text-left text-xs uppercase text-muted">
                                        <th className="px-4 py-3">Tipe</th>
                                        <th className="px-4 py-3">Kode</th>
                                        <th className="px-4 py-3">Indikator</th>
                                        <th className="px-4 py-3">Mitra</th>
                                        <th className="px-4 py-3">Periode</th>
                                        <th className="px-4 py-3">Status</th>
                                        {canVerify && <th className="px-4 py-3 text-right">Aksi</th>}
                                    </tr>
                                </thead>
                                <tbody>
                                    {queue.map((item) => (
                                        <tr key={`${item.type}-${item.id}`} className="border-b border-border last:border-0 hover:bg-appbg">
                                            <td className="px-4 py-3">
                                                <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${item.type === 'capaian' ? 'bg-navy-50 text-navy-500' : 'bg-teal-50 text-teal'}`}>
                                                    {item.type === 'capaian' ? 'Capaian' : 'Dokumen'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 font-medium text-navy-500">{item.kode}</td>
                                            <td className="px-4 py-3 text-muted">{item.indikator ?? '–'}</td>
                                            <td className="px-4 py-3 text-muted">{item.mitra ?? '–'}</td>
                                            <td className="px-4 py-3 text-muted">{item.periode}</td>
                                            <td className="px-4 py-3"><StatusPill status={item.status_verifikasi} /></td>
                                            {canVerify && (
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <form action={`/verification/${item.type}/${item.id}/approve`} method="POST" className="inline">
                                                            <button type="submit" className="inline-flex items-center gap-1 rounded-lg bg-green-100 px-3 py-1.5 text-xs font-medium text-green-700 hover:bg-green-200">
                                                                <CheckCircle2 className="h-3.5 w-3.5" /> Setujui
                                                            </button>
                                                        </form>
                                                        <form action={`/verification/${item.type}/${item.id}/return`} method="POST" className="inline">
                                                            <button type="submit" className="inline-flex items-center gap-1 rounded-lg bg-amber-100 px-3 py-1.5 text-xs font-medium text-amber-700 hover:bg-amber-200">
                                                                <RotateCcw className="h-3.5 w-3.5" /> Kembalikan
                                                            </button>
                                                        </form>
                                                    </div>
                                                </td>
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
