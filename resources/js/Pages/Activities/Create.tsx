import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/UI/PageHeader';
import { ArrowLeft } from 'lucide-react';
import { RefMitra } from '@/types/models';

interface Props {
    mitraList: RefMitra[];
    userMitraId: string | null;
}

export default function ActivitiesCreate({ mitraList, userMitraId }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        judul: '',
        jenis_kegiatan: 'Pelatihan',
        tanggal_kegiatan: new Date().toISOString().split('T')[0],
        mitra_id: userMitraId ?? '',
        provinsi: '',
        level_kegiatan: 'Kabupaten',
        peserta_perempuan: 0,
        peserta_laki: 0,
        link_daftar_hadir: '',
        link_dokumentasi: '',
        periode: `${new Date().getFullYear()}-Q1`,
        tahun_lapor: new Date().getFullYear(),
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/activities');
    };

    return (
        <AuthenticatedLayout>
            <Head title="Tambah Kegiatan" />
            <div className="space-y-6">
                <div>
                    <Link href="/activities" className="inline-flex items-center gap-1 text-sm text-muted hover:text-navy-500">
                        <ArrowLeft className="h-4 w-4" /> Kembali ke Register Kegiatan
                    </Link>
                </div>
                <PageHeader title="Tambah Kegiatan" subtitle="Catat kegiatan yang dilaksanakan" />

                <form onSubmit={submit} className="space-y-4 max-w-2xl">
                    <div className="rounded-card border border-border bg-card p-4 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-navy-500">Judul *</label>
                            <input type="text" value={data.judul} onChange={(e) => setData('judul', e.target.value)} className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400" />
                            {errors.judul && <p className="mt-1 text-xs text-danger">{errors.judul}</p>}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-navy-500">Jenis Kegiatan *</label>
                                <select value={data.jenis_kegiatan} onChange={(e) => setData('jenis_kegiatan', e.target.value)} className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400">
                                    <option value="Pelatihan">Pelatihan</option>
                                    <option value="Workshop">Workshop</option>
                                    <option value="Dialog kebijakan">Dialog kebijakan</option>
                                    <option value="Patroli/monitoring">Patroli/monitoring</option>
                                    <option value="Sosialisasi">Sosialisasi</option>
                                    <option value="Lainnya">Lainnya</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-navy-500">Mitra *</label>
                                <select value={data.mitra_id} onChange={(e) => setData('mitra_id', e.target.value)} disabled={!!userMitraId} className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400 disabled:bg-appbg">
                                    <option value="">Pilih mitra…</option>
                                    {mitraList.map((m) => <option key={m.id} value={m.id}>{m.nama}</option>)}
                                </select>
                                {errors.mitra_id && <p className="mt-1 text-xs text-danger">{errors.mitra_id}</p>}
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-navy-500">Tanggal *</label>
                                <input type="date" value={data.tanggal_kegiatan} onChange={(e) => setData('tanggal_kegiatan', e.target.value)} className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-navy-500">Periode *</label>
                                <input type="text" value={data.periode} onChange={(e) => setData('periode', e.target.value)} placeholder="2026-Q1" className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-navy-500">Level *</label>
                                <select value={data.level_kegiatan} onChange={(e) => setData('level_kegiatan', e.target.value)} className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400">
                                    <option value="Desa">Desa</option>
                                    <option value="Kabupaten">Kabupaten</option>
                                    <option value="Provinsi">Provinsi</option>
                                    <option value="Nasional">Nasional</option>
                                    <option value="Internasional">Internasional</option>
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-navy-500">Peserta Perempuan *</label>
                                <input type="number" min={0} value={data.peserta_perempuan} onChange={(e) => setData('peserta_perempuan', parseInt(e.target.value) || 0)} className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-navy-500">Peserta Laki-laki *</label>
                                <input type="number" min={0} value={data.peserta_laki} onChange={(e) => setData('peserta_laki', parseInt(e.target.value) || 0)} className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-navy-500">Link Daftar Hadir</label>
                                <input type="url" value={data.link_daftar_hadir} onChange={(e) => setData('link_daftar_hadir', e.target.value)} placeholder="https://…" className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-navy-500">Link Dokumentasi</label>
                                <input type="url" value={data.link_dokumentasi} onChange={(e) => setData('link_dokumentasi', e.target.value)} placeholder="https://…" className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400" />
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button type="submit" disabled={processing} className="rounded-lg bg-navy-500 px-6 py-2 text-sm font-medium text-white hover:bg-navy-600 disabled:opacity-50">Simpan</button>
                        <Link href="/activities" className="rounded-lg border border-border px-6 py-2 text-sm font-medium text-muted hover:bg-appbg">Batal</Link>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
