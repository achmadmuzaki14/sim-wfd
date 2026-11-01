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

export default function WfdCreate({ partners, indicators, kelompok, userMitraId }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        nama_lengkap: '',
        mitra_id: userMitraId ?? '',
        provinsi: '',
        kabupaten: '',
        desa: '',
        kelompok_id: '',
        kelompok_usia: '25-44',
        disabilitas: false,
        tahun_bergabung: new Date().getFullYear(),
        persetujuan_data: true,
        catatan: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/wfd');
    };

    return (
        <AuthenticatedLayout>
            <Head title="Tambah WFD" />
            <div className="space-y-6">
                <div>
                    <Link href="/wfd" className="inline-flex items-center gap-1 text-sm text-muted hover:text-navy-500">
                        <ArrowLeft className="h-4 w-4" /> Kembali ke Register WFD
                    </Link>
                </div>

                <PageHeader title="Tambah WFD" subtitle="Daftarkan peserta baru Women Forest Defenders" />

                <form onSubmit={submit} className="space-y-4 max-w-2xl">
                    <div className="rounded-card border border-border bg-card p-4 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-navy-500">Nama Lengkap *</label>
                            <input
                                type="text"
                                value={data.nama_lengkap}
                                onChange={(e) => setData('nama_lengkap', e.target.value)}
                                className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400"
                            />
                            {errors.nama_lengkap && <p className="mt-1 text-xs text-danger">{errors.nama_lengkap}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-navy-500">Mitra *</label>
                                <select
                                    value={data.mitra_id}
                                    onChange={(e) => setData('mitra_id', e.target.value)}
                                    disabled={!!userMitraId}
                                    className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400 disabled:bg-appbg"
                                >
                                    <option value="">Pilih mitra…</option>
                                    {partners.map((p) => (
                                        <option key={p.id} value={p.id}>{p.nama}</option>
                                    ))}
                                </select>
                                {errors.mitra_id && <p className="mt-1 text-xs text-danger">{errors.mitra_id}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-navy-500">Kelompok Usia *</label>
                                <select
                                    value={data.kelompok_usia}
                                    onChange={(e) => setData('kelompok_usia', e.target.value)}
                                    className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400"
                                >
                                    <option value="18-24">18-24</option>
                                    <option value="25-44">25-44</option>
                                    <option value="45-59">45-59</option>
                                    <option value="60+">60+</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-navy-500">Provinsi</label>
                                <input
                                    type="text"
                                    value={data.provinsi}
                                    onChange={(e) => setData('provinsi', e.target.value)}
                                    className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-navy-500">Kabupaten</label>
                                <input
                                    type="text"
                                    value={data.kabupaten}
                                    onChange={(e) => setData('kabupaten', e.target.value)}
                                    className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-navy-500">Desa</label>
                                <input
                                    type="text"
                                    value={data.desa}
                                    onChange={(e) => setData('desa', e.target.value)}
                                    className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-navy-500">Kelompok</label>
                                <select
                                    value={data.kelompok_id}
                                    onChange={(e) => setData('kelompok_id', e.target.value)}
                                    className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400"
                                >
                                    <option value="">Tidak terikat kelompok</option>
                                    {kelompok.map((k) => (
                                        <option key={k.id} value={k.id}>{k.nama}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-navy-500">Tahun Bergabung *</label>
                                <input
                                    type="number"
                                    value={data.tahun_bergabung}
                                    onChange={(e) => setData('tahun_bergabung', parseInt(e.target.value) || new Date().getFullYear())}
                                    className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <label className="flex items-center gap-2 text-sm text-navy-500">
                                <input
                                    type="checkbox"
                                    checked={data.disabilitas}
                                    onChange={(e) => setData('disabilitas', e.target.checked)}
                                    className="rounded border-border"
                                />
                                Disabilitas
                            </label>
                            <label className="flex items-center gap-2 text-sm text-navy-500">
                                <input
                                    type="checkbox"
                                    checked={data.persetujuan_data}
                                    onChange={(e) => setData('persetujuan_data', e.target.checked)}
                                    className="rounded border-border"
                                />
                                Persetujuan pengolahan data
                            </label>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-navy-500">Catatan</label>
                            <textarea
                                value={data.catatan}
                                onChange={(e) => setData('catatan', e.target.value)}
                                rows={3}
                                className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400"
                            />
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-lg bg-navy-500 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-navy-600 disabled:opacity-50"
                        >
                            Simpan
                        </button>
                        <Link
                            href="/wfd"
                            className="rounded-lg border border-border px-6 py-2 text-sm font-medium text-muted hover:bg-appbg"
                        >
                            Batal
                        </Link>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
