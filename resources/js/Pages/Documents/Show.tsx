import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/UI/PageHeader';
import Card from '@/Components/UI/Card';
import StatusPill from '@/Components/UI/StatusPill';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Dokumen } from '@/types/models';

interface Props {
    dokumen: Dokumen & {
        mitra: { id: string; nama: string };
        indikator: { id: string; kode: string; nama_indikator: string };
        kelompok: { id: string; nama: string } | null;
    };
}

export default function DocumentsShow({ dokumen }: Props) {
    return (
        <AuthenticatedLayout>
            <Head title={`Dokumen ${dokumen.kode}`} />
            <div className="space-y-6">
                <div>
                    <Link href="/documents" className="inline-flex items-center gap-1 text-sm text-muted hover:text-navy-500">
                        <ArrowLeft className="h-4 w-4" /> Kembali ke Register Dokumen
                    </Link>
                </div>
                <PageHeader title={dokumen.judul} subtitle={`Kode: ${dokumen.kode}`} />

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                    <Card title="Informasi Dokumen">
                        <div className="p-4 space-y-2 text-sm">
                            <div className="flex justify-between"><span className="text-muted">Indikator:</span> <span className="font-medium">{dokumen.indikator?.kode ?? '–'}</span></div>
                            <div className="flex justify-between"><span className="text-muted">Mitra:</span> <span className="font-medium">{dokumen.mitra?.nama ?? '–'}</span></div>
                            <div className="flex justify-between"><span className="text-muted">Jenis:</span> <span className="font-medium">{dokumen.jenis_dokumen}</span></div>
                            <div className="flex justify-between"><span className="text-muted">Level:</span> <span className="font-medium">{dokumen.level_dokumen}</span></div>
                            <div className="flex justify-between"><span className="text-muted">Periode:</span> <span className="font-medium">{dokumen.periode}</span></div>
                            <div className="flex justify-between"><span className="text-muted">Tahun Lapor:</span> <span className="font-medium">{dokumen.tahun_lapor}</span></div>
                        </div>
                    </Card>

                    <Card title="Status">
                        <div className="p-4 space-y-3">
                            <div>
                                <p className="text-xs text-muted">Status Dokumen</p>
                                <div className="mt-1"><StatusPill status={dokumen.status_dokumen} /></div>
                            </div>
                            <div>
                                <p className="text-xs text-muted">Status Verifikasi</p>
                                <div className="mt-1"><StatusPill status={dokumen.status_verifikasi} /></div>
                            </div>
                        </div>
                    </Card>

                    <Card title="Penerbit & MoV">
                        <div className="p-4 space-y-2 text-sm">
                            <div className="flex justify-between"><span className="text-muted">Tanggal Terbit:</span> <span className="font-medium">{dokumen.tanggal_terbit ?? '–'}</span></div>
                            <div className="flex justify-between"><span className="text-muted">Instansi:</span> <span className="font-medium">{dokumen.instansi_penerbit ?? '–'}</span></div>
                            {dokumen.link_mov && (
                                <a href={dokumen.link_mov} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-sm text-teal hover:text-teal-600">
                                    <ExternalLink className="h-4 w-4" /> Lihat MoV
                                </a>
                            )}
                        </div>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
