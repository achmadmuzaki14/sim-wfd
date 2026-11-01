import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/UI/PageHeader';
import { ArrowLeft } from 'lucide-react';
import { RefIndikator, RefMitra } from '@/types/models';

interface Props {
    indicators: RefIndikator[];
    mitraList: RefMitra[];
    userMitraId: string | null;
}

const jenisProsesOptions = [
    'Advokasi Kebijakan',
    'Penguatan Kelembagaan',
    'Dokumen Perencanaan',
    'Legalitas Produk',
    'Akses Pasar',
    'Pengembangan Produk',
    'Peningkatan Kapasitas',
];

export default function ProcessesCreate({ indicators, mitraList, userMitraId }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        judul: '',
        indikator_id: '',
        mitra_id: userMitraId ?? '',
        jenis_proses: 'Advokasi Kebijakan',
        total_tahapan: 5,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/processes');
    };

    return (
        <AuthenticatedLayout>
            <Head title="Tambah Proses" />
            <div className="space-y-6">
                <div>
                    <Link href="/processes" className="inline-flex items-center gap-1 text-sm text-muted hover:text-navy-500">
                        <ArrowLeft className="h-4 w-4" /> Kembali ke Pelacak Proses
                    </Link>
                </div>
                <PageHeader title="Tambah Proses" subtitle="Buat pelacak proses baru" />

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
                                    {mitraList.map((m) => <option key={m.id} value={m.id}>{m.nama}</option>)}
                                </select>
                                {errors.mitra_id && <p className="mt-1 text-xs text-danger">{errors.mitra_id}</p>}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-navy-500">Jenis Proses *</label>
                                <select value={data.jenis_proses} onChange={(e) => setData('jenis_proses', e.target.value)} className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400">
                                    {jenisProsesOptions.map((j) => <option key={j} value={j}>{j}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-navy-500">Total Tahapan *</label>
                                <input type="number" min={1} max={20} value={data.total_tahapan} onChange={(e) => setData('total_tahapan', parseInt(e.target.value) || 1)} className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400" />
                                {errors.total_tahapan && <p className="mt-1 text-xs text-danger">{errors.total_tahapan}</p>}
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button type="submit" disabled={processing} className="rounded-lg bg-navy-500 px-6 py-2 text-sm font-medium text-white hover:bg-navy-600 disabled:opacity-50">Simpan</button>
                        <Link href="/processes" className="rounded-lg border border-border px-6 py-2 text-sm font-medium text-muted hover:bg-appbg">Batal</Link>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
