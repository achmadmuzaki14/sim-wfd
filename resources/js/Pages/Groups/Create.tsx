import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/UI/PageHeader';
import { ArrowLeft } from 'lucide-react';
import { RefMitra } from '@/types/models';

interface Props {
    mitraList: RefMitra[];
    userMitraId: string | null;
}

export default function GroupsCreate({ mitraList, userMitraId }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        nama: '',
        tipe: 'KUPS',
        mitra_id: userMitraId ?? '',
        provinsi: '',
        desa: '',
        luas_hektar: '',
        anggota_perempuan: 0,
        anggota_laki: 0,
        dipimpin_perempuan: true,
        periode: `${new Date().getFullYear()}-Q1`,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/groups');
    };

    return (
        <AuthenticatedLayout>
            <Head title="Tambah Kelompok" />
            <div className="space-y-6">
                <div>
                    <Link href="/groups" className="inline-flex items-center gap-1 text-sm text-muted hover:text-navy-500">
                        <ArrowLeft className="h-4 w-4" /> Kembali ke Kelompok
                    </Link>
                </div>
                <PageHeader title="Tambah Kelompok" subtitle="Daftarkan kelompok baru" />

                <form onSubmit={submit} className="space-y-4 max-w-2xl">
                    <div className="rounded-card border border-border bg-card p-4 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-navy-500">Nama Kelompok *</label>
                            <input type="text" value={data.nama} onChange={(e) => setData('nama', e.target.value)} className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400" />
                            {errors.nama && <p className="mt-1 text-xs text-danger">{errors.nama}</p>}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-navy-500">Tipe *</label>
                                <select value={data.tipe} onChange={(e) => setData('tipe', e.target.value)} className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400">
                                    <option value="Kelompok Monitoring Hutan">Kelompok Monitoring Hutan</option>
                                    <option value="KPS">KPS</option>
                                    <option value="KUPS">KUPS</option>
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
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-navy-500">Provinsi</label>
                                <input type="text" value={data.provinsi} onChange={(e) => setData('provinsi', e.target.value)} className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-navy-500">Desa</label>
                                <input type="text" value={data.desa} onChange={(e) => setData('desa', e.target.value)} className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400" />
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-navy-500">Luas (hektar)</label>
                                <input type="number" step="0.01" value={data.luas_hektar} onChange={(e) => setData('luas_hektar', e.target.value)} className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-navy-500">Anggota Perempuan</label>
                                <input type="number" min={0} value={data.anggota_perempuan} onChange={(e) => setData('anggota_perempuan', parseInt(e.target.value) || 0)} className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-navy-500">Anggota Laki-laki</label>
                                <input type="number" min={0} value={data.anggota_laki} onChange={(e) => setData('anggota_laki', parseInt(e.target.value) || 0)} className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400" />
                            </div>
                        </div>
                        <div>
                            <label className="flex items-center gap-2 text-sm text-navy-500">
                                <input type="checkbox" checked={data.dipimpin_perempuan} onChange={(e) => setData('dipimpin_perempuan', e.target.checked)} className="rounded border-border" />
                                Dipimpin oleh perempuan
                            </label>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button type="submit" disabled={processing} className="rounded-lg bg-navy-500 px-6 py-2 text-sm font-medium text-white hover:bg-navy-600 disabled:opacity-50">Simpan</button>
                        <Link href="/groups" className="rounded-lg border border-border px-6 py-2 text-sm font-medium text-muted hover:bg-appbg">Batal</Link>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
