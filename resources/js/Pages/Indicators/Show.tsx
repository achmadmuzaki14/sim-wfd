import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/UI/PageHeader';
import { Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import Card from '@/Components/UI/Card';
import StatusPill from '@/Components/UI/StatusPill';
import { IndikatorCalculation, RefIndikator } from '@/types/models';

interface PartnerRow {
    mitra_id: string;
    mitra_nama: string;
    capaian: number;
    target: number;
    persentase: number | null;
}

interface Props {
    indikator: RefIndikator;
    calculation: IndikatorCalculation;
    partnerBreakdown: PartnerRow[];
}

export default function IndicatorsShow({ indikator, calculation, partnerBreakdown }: Props) {
    const outcomeColors: Record<number, string> = { 1: 'text-outcome1', 2: 'text-outcome2', 3: 'text-outcome3' };

    return (
        <AuthenticatedLayout>
            <Head title={`Indikator ${indikator.kode}`} />
            <div className="space-y-6">
                <div>
                    <Link href="/indicators" className="inline-flex items-center gap-1 text-sm text-muted hover:text-navy-500">
                        <ArrowLeft className="h-4 w-4" /> Kembali ke Indikator
                    </Link>
                </div>

                <PageHeader
                    title={`Indikator ${indikator.kode}`}
                    subtitle={indikator.nama_indikator}
                />

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                    <Card title="Capaian Kumulatif">
                        <div className="p-4">
                            <p className={`text-3xl font-bold ${outcomeColors[indikator.outcome] ?? 'text-navy-500'}`}>
                                {calculation.capaian_kumulatif}
                            </p>
                            <p className="mt-1 text-sm text-muted">
                                dari target {calculation.target ?? '–'} {indikator.unit}
                            </p>
                            <p className="mt-2 text-sm font-medium">
                                {calculation.persentase !== null ? `${calculation.persentase}%` : '–'}
                            </p>
                            <div className="mt-3">
                                <StatusPill status={calculation.status} />
                            </div>
                        </div>
                    </Card>

                    <Card title="Capaian per Tahun">
                        <div className="p-4 space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted">2025</span>
                                <span className="font-semibold">{calculation.capaian_2025}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted">2026</span>
                                <span className="font-semibold">{calculation.capaian_2026}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted">2027</span>
                                <span className="font-semibold">{calculation.capaian_2027}</span>
                            </div>
                        </div>
                    </Card>

                    <Card title="Informasi Indikator">
                        <div className="p-4 space-y-2 text-sm">
                            <div><span className="text-muted">Outcome:</span> <span className={`font-medium ${outcomeColors[indikator.outcome]}`}>{indikator.outcome}</span></div>
                            <div><span className="text-muted">Output:</span> <span className="font-medium">{indikator.nomor_output}</span></div>
                            <div><span className="text-muted">Basis hitung:</span> <span className="font-medium">{indikator.basis_hitung === 'OrangUnik' ? 'Orang Unik' : 'Dokumen'}</span></div>
                            <div><span className="text-muted">Satuan:</span> <span className="font-medium">{indikator.unit}</span></div>
                        </div>
                    </Card>
                </div>

                <Card title="Definisi Operasional">
                    <div className="p-4 text-sm text-muted leading-relaxed">
                        {indikator.definisi_operasional}
                    </div>
                </Card>

                <Card title="MoV Wajib">
                    <div className="p-4 text-sm text-muted">
                        {indikator.mov_wajib}
                    </div>
                </Card>

                <Card title="Capaian per Mitra">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-card border-b border-border">
                                <tr className="text-left text-xs uppercase text-muted">
                                    <th className="px-4 py-3">Mitra</th>
                                    <th className="px-4 py-3 text-right">Capaian</th>
                                    <th className="px-4 py-3 text-right">Target</th>
                                    <th className="px-4 py-3 text-right">Persentase</th>
                                </tr>
                            </thead>
                            <tbody>
                                {partnerBreakdown.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-4 py-8 text-center text-muted">Belum ada data capaian</td>
                                    </tr>
                                ) : (
                                    partnerBreakdown.map((row) => (
                                        <tr key={row.mitra_id} className="border-b border-border last:border-0">
                                            <td className="px-4 py-3 font-medium text-navy-500">{row.mitra_nama}</td>
                                            <td className="px-4 py-3 text-right">{row.capaian}</td>
                                            <td className="px-4 py-3 text-right">{row.target ?? '–'}</td>
                                            <td className="px-4 py-3 text-right">
                                                {row.persentase !== null ? `${row.persentase}%` : '–'}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
