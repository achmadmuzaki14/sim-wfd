import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/UI/PageHeader';
import Card from '@/Components/UI/Card';
import StatusPill from '@/Components/UI/StatusPill';
import { ArrowLeft } from 'lucide-react';
import { Proses, ProsesUpdate } from '@/types/models';

interface Props {
    proses: Proses & {
        mitra: { nama: string };
        indikator: { kode: string; nama_indikator: string };
        updates: ProsesUpdate[];
    };
}

export default function ProcessesShow({ proses }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        periode: `${new Date().getFullYear()}-Q1`,
        nomor_tahapan: proses.tahapan_saat_ini + 1,
        nama_tahapan: '',
        perkembangan: '',
        hambatan: '',
        rencana_kuartal_depan: '',
        link_bukti: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/processes/${proses.id}/update-quarter`, {
            onSuccess: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Proses ${proses.kode}`} />
            <div className="space-y-6">
                <div>
                    <Link href="/processes" className="inline-flex items-center gap-1 text-sm text-muted hover:text-navy-500">
                        <ArrowLeft className="h-4 w-4" /> Kembali ke Pelacak Proses
                    </Link>
                </div>
                <PageHeader title={proses.judul} subtitle={`Kode: ${proses.kode}`} />

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                    <Card title="Informasi Proses">
                        <div className="p-4 space-y-2 text-sm">
                            <div className="flex justify-between"><span className="text-muted">Indikator:</span> <span className="font-medium">{proses.indikator?.kode ?? '–'}</span></div>
                            <div className="flex justify-between"><span className="text-muted">Mitra:</span> <span className="font-medium">{proses.mitra?.nama ?? '–'}</span></div>
                            <div className="flex justify-between"><span className="text-muted">Jenis:</span> <span className="font-medium">{proses.jenis_proses}</span></div>
                            <div className="flex justify-between"><span className="text-muted">Tahapan:</span> <span className="font-medium">{proses.tahapan_saat_ini}/{proses.total_tahapan}</span></div>
                            <div className="flex justify-between items-center"><span className="text-muted">Status:</span> <StatusPill status={proses.status_proses} /></div>
                        </div>
                    </Card>

                    <Card title="Timeline">
                        <div className="p-4">
                            <div className="flex items-center gap-2">
                                <div className="flex-1 rounded-full bg-appbg h-2">
                                    <div
                                        className="rounded-full bg-teal h-2 transition-all"
                                        style={{ width: `${Math.min(100, (proses.tahapan_saat_ini / proses.total_tahapan) * 100)}%` }}
                                    />
                                </div>
                                <span className="text-sm font-medium text-navy-500">
                                    {Math.round((proses.tahapan_saat_ini / proses.total_tahapan) * 100)}%
                                </span>
                            </div>
                            <p className="mt-2 text-xs text-muted">
                                Update terakhir: {proses.periode_update_terakhir ?? 'Belum ada'}
                            </p>
                        </div>
                    </Card>
                </div>

                <Card title="Riwayat Update Kuartalan">
                    <div className="overflow-x-auto">
                        {proses.updates.length === 0 ? (
                            <div className="px-4 py-8 text-center text-sm text-muted">Belum ada update kuartalan.</div>
                        ) : (
                            <table className="w-full text-sm">
                                <thead className="bg-card border-b border-border">
                                    <tr className="text-left text-xs uppercase text-muted">
                                        <th className="px-4 py-3">Periode</th>
                                        <th className="px-4 py-3">Tahapan</th>
                                        <th className="px-4 py-3">Perkembangan</th>
                                        <th className="px-4 py-3">Hambatan</th>
                                        <th className="px-4 py-3">Rencana Depan</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {proses.updates.map((u) => (
                                        <tr key={u.id} className="border-b border-border last:border-0">
                                            <td className="px-4 py-3 font-medium text-navy-500">{u.periode}</td>
                                            <td className="px-4 py-3 text-muted">Tahap {u.nomor_tahapan}: {u.nama_tahapan}</td>
                                            <td className="px-4 py-3 text-muted">{u.perkembangan}</td>
                                            <td className="px-4 py-3 text-muted">{u.hambatan ?? '–'}</td>
                                            <td className="px-4 py-3 text-muted">{u.rencana_kuartal_depan ?? '–'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </Card>

                <Card title="Update Kuartal Baru">
                    <form onSubmit={submit} className="p-4 space-y-4">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <div>
                                <label className="block text-sm font-medium text-navy-500">Periode *</label>
                                <input type="text" value={data.periode} onChange={(e) => setData('periode', e.target.value)} placeholder="2026-Q1" className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400" />
                                {errors.periode && <p className="mt-1 text-xs text-danger">{errors.periode}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-navy-500">Nomor Tahapan *</label>
                                <input type="number" min={1} value={data.nomor_tahapan} onChange={(e) => setData('nomor_tahapan', parseInt(e.target.value) || 1)} className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400" />
                                {errors.nomor_tahapan && <p className="mt-1 text-xs text-danger">{errors.nomor_tahapan}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-navy-500">Nama Tahapan *</label>
                                <input type="text" value={data.nama_tahapan} onChange={(e) => setData('nama_tahapan', e.target.value)} className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400" />
                                {errors.nama_tahapan && <p className="mt-1 text-xs text-danger">{errors.nama_tahapan}</p>}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-navy-500">Perkembangan *</label>
                            <textarea value={data.perkembangan} onChange={(e) => setData('perkembangan', e.target.value)} rows={3} className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400" />
                            {errors.perkembangan && <p className="mt-1 text-xs text-danger">{errors.perkembangan}</p>}
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-navy-500">Hambatan</label>
                                <textarea value={data.hambatan} onChange={(e) => setData('hambatan', e.target.value)} rows={2} className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-navy-500">Rencana Kuartal Depan</label>
                                <textarea value={data.rencana_kuartal_depan} onChange={(e) => setData('rencana_kuartal_depan', e.target.value)} rows={2} className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-navy-500">Link Bukti</label>
                            <input type="url" value={data.link_bukti} onChange={(e) => setData('link_bukti', e.target.value)} placeholder="https://…" className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400" />
                        </div>
                        <button type="submit" disabled={processing} className="rounded-lg bg-teal px-6 py-2 text-sm font-medium text-white hover:bg-teal-600 disabled:opacity-50">
                            Simpan Update
                        </button>
                    </form>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
