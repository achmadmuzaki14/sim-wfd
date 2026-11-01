import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/UI/PageHeader';
import Card from '@/Components/UI/Card';
import StatusPill from '@/Components/UI/StatusPill';
import { ArrowLeft, Pencil } from 'lucide-react';
import { WfdRoster, WfdCapaian, RefIndikator } from '@/types/models';

interface Props {
    wfd: WfdRoster & {
        mitra: { id: string; nama: string };
        kelompok: { id: string; nama: string } | null;
        capaian: (WfdCapaian & { indikator: RefIndikator })[];
    };
}

export default function WfdShow({ wfd }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        indikator_id: '',
        periode: `${new Date().getFullYear()}-Q1`,
        jenis_bukti: 'Daftar hadir',
        link_mov: '',
    });

    const submitCapaian = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/wfd/${wfd.id}/capaian`, {
            onSuccess: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title={`WFD ${wfd.nama_lengkap}`} />
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <Link href="/wfd" className="inline-flex items-center gap-1 text-sm text-muted hover:text-navy-500">
                        <ArrowLeft className="h-4 w-4" /> Kembali ke Register WFD
                    </Link>
                    <Link
                        href={`/wfd/${wfd.id}/edit`}
                        className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-sm text-navy-500 hover:bg-appbg"
                    >
                        <Pencil className="h-4 w-4" /> Edit
                    </Link>
                </div>

                <PageHeader title={wfd.nama_lengkap} subtitle={`Kode: ${wfd.kode}`} />

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                    <Card title="Informasi Pribadi">
                        <div className="p-4 space-y-2 text-sm">
                            <div className="flex justify-between"><span className="text-muted">Mitra:</span> <span className="font-medium">{wfd.mitra?.nama}</span></div>
                            <div className="flex justify-between"><span className="text-muted">Provinsi:</span> <span className="font-medium">{wfd.provinsi ?? '–'}</span></div>
                            <div className="flex justify-between"><span className="text-muted">Kabupaten:</span> <span className="font-medium">{wfd.kabupaten ?? '–'}</span></div>
                            <div className="flex justify-between"><span className="text-muted">Desa:</span> <span className="font-medium">{wfd.desa ?? '–'}</span></div>
                            <div className="flex justify-between"><span className="text-muted">Kelompok Usia:</span> <span className="font-medium">{wfd.kelompok_usia}</span></div>
                            <div className="flex justify-between"><span className="text-muted">Disabilitas:</span> <span className="font-medium">{wfd.disabilitas ? 'Ya' : 'Tidak'}</span></div>
                            <div className="flex justify-between"><span className="text-muted">Tahun Bergabung:</span> <span className="font-medium">{wfd.tahun_bergabung}</span></div>
                            <div className="flex justify-between"><span className="text-muted">Kelompok:</span> <span className="font-medium">{wfd.kelompok?.nama ?? '–'}</span></div>
                        </div>
                    </Card>

                    <Card title="Status">
                        <div className="p-4 space-y-3">
                            <div>
                                <p className="text-xs text-muted">Status Aktif</p>
                                <div className="mt-1"><StatusPill status={wfd.status_aktif ? 'Terverifikasi' : 'Belum diverifikasi'} /></div>
                            </div>
                            <div>
                                <p className="text-xs text-muted">Persetujuan Data</p>
                                <p className="mt-1 text-sm font-medium">{wfd.persetujuan_data ? 'Disetujui' : 'Belum disetujui'}</p>
                            </div>
                            {wfd.catatan && (
                                <div>
                                    <p className="text-xs text-muted">Catatan</p>
                                    <p className="mt-1 text-sm">{wfd.catatan}</p>
                                </div>
                            )}
                        </div>
                    </Card>

                    <Card title="Total Capaian">
                        <div className="p-4">
                            <p className="text-3xl font-bold text-teal">{wfd.capaian?.length ?? 0}</p>
                            <p className="mt-1 text-sm text-muted">catatan capaian terdaftar</p>
                        </div>
                    </Card>
                </div>

                <Card title="Riwayat Capaian">
                    <div className="overflow-x-auto">
                        {(!wfd.capaian || wfd.capaian.length === 0) ? (
                            <div className="px-4 py-8 text-center text-sm text-muted">Belum ada capaian tercatat.</div>
                        ) : (
                            <table className="w-full text-sm">
                                <thead className="bg-card border-b border-border">
                                    <tr className="text-left text-xs uppercase text-muted">
                                        <th className="px-4 py-3">Kode</th>
                                        <th className="px-4 py-3">Indikator</th>
                                        <th className="px-4 py-3">Periode</th>
                                        <th className="px-4 py-3">Jenis Bukti</th>
                                        <th className="px-4 py-3">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {wfd.capaian.map((c) => (
                                        <tr key={c.id} className="border-b border-border last:border-0">
                                            <td className="px-4 py-3 font-medium text-navy-500">{c.kode}</td>
                                            <td className="px-4 py-3 text-muted">{c.indikator?.kode ?? '–'} — {c.indikator?.nama_indikator ?? '–'}</td>
                                            <td className="px-4 py-3 text-muted">{c.periode}</td>
                                            <td className="px-4 py-3 text-muted">{c.jenis_bukti}</td>
                                            <td className="px-4 py-3"><StatusPill status={c.status_verifikasi} /></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </Card>

                <Card title="Tambah Capaian Baru">
                    <form onSubmit={submitCapaian} className="p-4 space-y-4">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-navy-500">Indikator *</label>
                                <select
                                    value={data.indikator_id}
                                    onChange={(e) => setData('indikator_id', e.target.value)}
                                    className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400"
                                >
                                    <option value="">Pilih indikator…</option>
                                </select>
                                {errors.indikator_id && <p className="mt-1 text-xs text-danger">{errors.indikator_id}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-navy-500">Periode *</label>
                                <input
                                    type="text"
                                    value={data.periode}
                                    onChange={(e) => setData('periode', e.target.value)}
                                    placeholder="2026-Q1"
                                    className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400"
                                />
                                {errors.periode && <p className="mt-1 text-xs text-danger">{errors.periode}</p>}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-navy-500">Jenis Bukti *</label>
                                <select
                                    value={data.jenis_bukti}
                                    onChange={(e) => setData('jenis_bukti', e.target.value)}
                                    className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400"
                                >
                                    <option value="Daftar hadir">Daftar hadir</option>
                                    <option value="Notulensi">Notulensi</option>
                                    <option value="Dokumentasi foto">Dokumentasi foto</option>
                                    <option value="SK/BA">SK/BA</option>
                                    <option value="Sertifikat">Sertifikat</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-navy-500">Link MoV</label>
                                <input
                                    type="url"
                                    value={data.link_mov}
                                    onChange={(e) => setData('link_mov', e.target.value)}
                                    placeholder="https://…"
                                    className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400"
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-lg bg-teal px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-600 disabled:opacity-50"
                        >
                            Tambah Capaian
                        </button>
                    </form>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
