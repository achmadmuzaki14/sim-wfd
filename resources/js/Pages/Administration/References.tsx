import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/UI/PageHeader';
import Card from '@/Components/UI/Card';
import StatusPill from '@/Components/UI/StatusPill';
import { RefIndikator, RefMitra, RefTahapan, AppSetting } from '@/types/models';

interface Props {
    indikators: RefIndikator[];
    mitra: RefMitra[];
    tahapan: RefTahapan[];
    settings: AppSetting[];
}

export default function AdministrationReferences({ indikators, mitra, tahapan, settings }: Props) {
    return (
        <AuthenticatedLayout>
            <Head title="Data Referensi" />
            <div className="space-y-6">
                <PageHeader title="Data Referensi" subtitle="Kelola indikator, mitra, tahapan, dan pengaturan" />

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    <Card title={`Indikator (${indikators.length})`}>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-card border-b border-border">
                                    <tr className="text-left text-xs uppercase text-muted">
                                        <th className="px-4 py-3">Kode</th>
                                        <th className="px-4 py-3">Outcome</th>
                                        <th className="px-4 py-3">Basis</th>
                                        <th className="px-4 py-3">Aktif</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {indikators.map((i) => (
                                        <tr key={i.id} className="border-b border-border last:border-0">
                                            <td className="px-4 py-3 font-medium text-navy-500">{i.kode}</td>
                                            <td className="px-4 py-3 text-muted">O{i.outcome} · Output {i.nomor_output}</td>
                                            <td className="px-4 py-3 text-muted">{i.basis_hitung === 'OrangUnik' ? 'Orang Unik' : 'Dokumen'}</td>
                                            <td className="px-4 py-3">
                                                <span className={`text-xs ${i.aktif ? 'text-teal font-medium' : 'text-danger'}`}>
                                                    {i.aktif ? 'Aktif' : 'Non-aktif'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>

                    <Card title={`Mitra (${mitra.length})`}>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-card border-b border-border">
                                    <tr className="text-left text-xs uppercase text-muted">
                                        <th className="px-4 py-3">Kode</th>
                                        <th className="px-4 py-3">Nama</th>
                                        <th className="px-4 py-3">Provinsi</th>
                                        <th className="px-4 py-3">Aktif</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mitra.map((m) => (
                                        <tr key={m.id} className="border-b border-border last:border-0">
                                            <td className="px-4 py-3 font-medium text-navy-500">{m.kode_mitra}</td>
                                            <td className="px-4 py-3 text-navy-500">{m.nama}</td>
                                            <td className="px-4 py-3 text-muted">{m.provinsi}</td>
                                            <td className="px-4 py-3">
                                                <span className={`text-xs ${m.aktif ? 'text-teal font-medium' : 'text-danger'}`}>
                                                    {m.aktif ? 'Aktif' : 'Non-aktif'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>

                    <Card title={`Tahapan Proses (${tahapan.length})`}>
                        <div className="overflow-x-auto max-h-96 overflow-y-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-card border-b border-border sticky top-0">
                                    <tr className="text-left text-xs uppercase text-muted">
                                        <th className="px-4 py-3">Jenis Proses</th>
                                        <th className="px-4 py-3">No.</th>
                                        <th className="px-4 py-3">Tahapan</th>
                                        <th className="px-4 py-3">Final</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tahapan.map((t) => (
                                        <tr key={t.id} className="border-b border-border last:border-0">
                                            <td className="px-4 py-3 text-muted">{t.jenis_proses}</td>
                                            <td className="px-4 py-3 text-muted">{t.nomor_tahapan}</td>
                                            <td className="px-4 py-3 text-navy-500">{t.nama_tahapan}</td>
                                            <td className="px-4 py-3">
                                                {t.tahapan_final ? <StatusPill status="Selesai" /> : <span className="text-xs text-muted">–</span>}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>

                    <Card title={`Pengaturan Aplikasi (${settings.length})`}>
                        <div className="p-4 space-y-3">
                            {settings.map((s) => (
                                <div key={s.id} className="border-b border-border last:border-0 pb-3 last:pb-0">
                                    <p className="text-xs font-medium uppercase tracking-wide text-muted">{s.key}</p>
                                    <p className="mt-1 text-sm text-navy-500">
                                        {typeof s.value === 'string' ? s.value : JSON.stringify(s.value)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
