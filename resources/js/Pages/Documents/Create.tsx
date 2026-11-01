import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/UI/PageHeader';
import { ArrowLeft } from 'lucide-react';
import { RefIndikator, RefMitra, Kelompok } from '@/types/models';

interface Props {
    partners: RefMitra[];
    indicators: RefIndikator[];
    kelompok: Kelompok[];
    userMitraId: string | null;
}

export default function DocumentsCreate({ partners, indicators, kelompok, userMitraId }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        judul: '',
        indikator_id: '',
        jenis_dokumen: 'Dokumen perencanaan',
        status_dokumen: 'Disusun',
        mitra_id: userMitraId ?? '',
        kelompok_id: '',
        periode: `${new Date().getFullYear()}-Q1`,
        tahun_lapor: new Date().getFullYear(),
        tanggal_terbit: '',
        instansi_penerbit: '',
        level_dokumen: 'Kabupaten',
        link_mov: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/documents');
    };

    return (
        <AuthenticatedLayout>
            <Head title="Tambah Dokumen" />
            <div className="space-y-6">
                <div>
                    <Link href="/documents" className="inline-flex items-center gap-1 text-sm text-muted hover:text-navy-500">
                        <ArrowLeft className="h-4 w-4" /> Kembali ke Register Dokumen
                    </Link>
                </div>
                <PageHeader title="Tambah Dokumen" subtitle="Daftarkan dokumen bukti untuk indikator" />

                <form onSubmit={submit} className="space-y-4 max-w-2xl">
                    <div className="rounded-card border border-border bg-card p-4 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-navy-500">Judul *</label>
                            <input type="text" value={data.judul} onChange={(e) => setData('judul', e.target.value)} className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400" />
                            {errors.judul && <p className="mt-1 text-xs text-danger">{errors.judul}</p>}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-navy-500">Indikator *</label>
                                <select value={data.indikator_id} onChange={(e) => setData('indikator_id', e.target.value)} className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400">
                                    <option value="">Pilih indikator…</option>
                                    {indicators.map((i) => <option key={i.id} value={i.id}>{i.kode} — {i.nama_indikator}</option>)}
                                </select>
                                {errors.indikator_id && <p className="mt-1 text-xs text-danger">{errors.indikator_id}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-navy-500">Mitra *</label>
                                <select value={data.mitra_id} onChange={(e) => setData('mitra_id', e.target.value)} disabled={!!userMitraId} className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400 disabled:bg-appbg">
                                    <option value="">Pilih mitra…</option>
                                    {partners.map((p) => <option key={p.id} value={p.id}>{p.nama}</option>)}
                                </select>
                                {errors.mitra_id && <p className="mt-1 text-xs text-danger">{errors.mitra_id}</p>}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-navy-500">Jenis Dokumen *</label>
                                <select value={data.jenis_dokumen} onChange={(e) => setData('jenis_dokumen', e.target.value)} className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400">
                                    <option value="Dokumen perencanaan">Dokumen perencanaan</option>
                                    <option value="SK/BA kepengurusan">SK/BA kepengurusan</option>
                                    <option value="Izin/sertifikat">Izin/sertifikat</option>
                                    <option value="MoU/kontrak">MoU/kontrak</option>
                                    <option value="Laporan">Laporan</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-navy-500">Status Dokumen *</label>
                                <select value={data.status_dokumen} onChange={(e) => setData('status_dokumen', e.target.value)} className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400">
                                    <option value="Disusun">Disusun</option>
                                    <option value="Diajukan">Diajukan</option>
                                    <option value="Diadopsi">Diadopsi</option>
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-navy-500">Periode *</label>
                                <input type="text" value={data.periode} onChange={(e) => setData('periode', e.target.value)} placeholder="2026-Q1" className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-navy-500">Tahun Lapor *</label>
                                <input type="number" value={data.tahun_lapor} onChange={(e) => setData('tahun_lapor', parseInt(e.target.value) || new Date().getFullYear())} className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-navy-500">Tanggal Terbit</label>
                                <input type="date" value={data.tanggal_terbit} onChange={(e) => setData('tanggal_terbit', e.target.value)} className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-navy-500">Instansi Penerbit</label>
                                <input type="text" value={data.instansi_penerbit} onChange={(e) => setData('instansi_penerbit', e.target.value)} className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-navy-500">Level Dokumen *</label>
                                <select value={data.level_dokumen} onChange={(e) => setData('level_dokumen', e.target.value)} className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400">
                                    <option value="Desa">Desa</option>
                                    <option value="Kabupaten">Kabupaten</option>
                                    <option value="Provinsi">Provinsi</option>
                                    <option value="Nasional">Nasional</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-navy-500">Link MoV</label>
                                <input type="url" value={data.link_mov} onChange={(e) => setData('link_mov', e.target.value)} placeholder="https://…" className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400" />
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button type="submit" disabled={processing} className="rounded-lg bg-navy-500 px-6 py-2 text-sm font-medium text-white hover:bg-navy-600 disabled:opacity-50">Simpan</button>
                        <Link href="/documents" className="rounded-lg border border-border px-6 py-2 text-sm font-medium text-muted hover:bg-appbg">Batal</Link>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
