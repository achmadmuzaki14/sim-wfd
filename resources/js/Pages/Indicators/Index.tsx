import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/UI/PageHeader';
import StatusPill from '@/Components/UI/StatusPill';
import { IndikatorCalculation } from '@/types/models';

interface Props {
    indicators: IndikatorCalculation[];
    periodFilter: string;
}

const periodOptions = [
    { label: 'Kumulatif', value: 'ALL' },
    { label: '2025', value: '2025' },
    { label: '2026', value: '2026' },
    { label: '2027', value: '2027' },
    { label: "Q1 '26", value: '2026-Q1' },
    { label: "Q2 '26", value: '2026-Q2' },
    { label: "Q3 '26", value: '2026-Q3' },
    { label: "Q4 '26", value: '2026-Q4' },
];

export default function IndicatorsIndex({ indicators, periodFilter }: Props) {
    return (
        <AuthenticatedLayout>
            <Head title="Indikator & Output" />
            <div className="space-y-6">
                <PageHeader
                    title="Indikator & Output"
                    subtitle="12 indikator kinerja program WFD dengan perhitungan otomatis"
                />

                <div className="flex flex-wrap gap-2">
                    {periodOptions.map((opt) => (
                        <a
                            key={opt.value}
                            href={`/indicators?periode=${opt.value}`}
                            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                                periodFilter === opt.value
                                    ? 'bg-navy-500 text-white'
                                    : 'bg-card border border-border text-muted hover:bg-appbg'
                            }`}
                        >
                            {opt.label}
                        </a>
                    ))}
                </div>

                <div className="rounded-card border border-border bg-card shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="sticky top-0 bg-card border-b border-border">
                                <tr className="text-left text-xs uppercase text-muted">
                                    <th className="px-4 py-3">Kode</th>
                                    <th className="px-4 py-3">Indikator</th>
                                    <th className="px-4 py-3">Basis</th>
                                    <th className="px-4 py-3 text-right">2025</th>
                                    <th className="px-4 py-3 text-right">2026</th>
                                    <th className="px-4 py-3 text-right">2027</th>
                                    <th className="px-4 py-3 text-right">Kumulatif</th>
                                    <th className="px-4 py-3 text-right">Target</th>
                                    <th className="px-4 py-3 text-right">Progres</th>
                                    <th className="px-4 py-3">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {indicators.map((ind) => (
                                    <tr
                                        key={ind.kode}
                                        className="border-b border-border last:border-0 hover:bg-appbg cursor-pointer"
                                        onClick={() => {
                                            const el = document.querySelector(`a[data-kode="${ind.kode}"]`) as HTMLAnchorElement | null;
                                            el?.click();
                                        }}
                                    >
                                        <td className="px-4 py-3 font-medium text-navy-500">{ind.kode}</td>
                                        <td className="px-4 py-3 text-muted">
                                            <a
                                                data-kode={ind.kode}
                                                href={`/indicators?periode=${periodFilter}`}
                                                className="hidden"
                                            />
                                            {ind.nama_indikator}
                                        </td>
                                        <td className="px-4 py-3 text-xs text-muted">
                                            {ind.basis_hitung === 'OrangUnik' ? 'Orang Unik' : 'Dokumen'}
                                        </td>
                                        <td className="px-4 py-3 text-right">{ind.capaian_2025}</td>
                                        <td className="px-4 py-3 text-right">{ind.capaian_2026}</td>
                                        <td className="px-4 py-3 text-right">{ind.capaian_2027}</td>
                                        <td className="px-4 py-3 text-right font-semibold">{ind.capaian_kumulatif}</td>
                                        <td className="px-4 py-3 text-right">{ind.target ?? '–'}</td>
                                        <td className="px-4 py-3 text-right">
                                            {ind.persentase !== null ? `${ind.persentase}%` : '–'}
                                        </td>
                                        <td className="px-4 py-3">
                                            <StatusPill status={ind.status} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
