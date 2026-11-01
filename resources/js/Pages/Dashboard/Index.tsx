import { Head, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import KpiCard from '@/Components/UI/KpiCard';
import { IndikatorCalculation } from '@/types/models';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface DashboardProps {
    programGoal: string;
    causalLogic: string;
    outcomeNames: Record<number, string>;
    periodFilter: string;
    indicators: IndikatorCalculation[];
    kpiCards: Array<{ label: string; value: string | number; subtext?: string; color: string }>;
    outcomeCards: Array<{
        outcome: number;
        name: string;
        color: string;
        capaian: number;
        target: number;
        persentase: number;
        outputs: Array<{ output: number; count: number; capaian: number }>;
    }>;
    outreach: {
        totalActivities: number;
        femaleAttendance: number;
        maleAttendance: number;
        totalAttendance: number;
        uniqueWfd: number;
        warning: string;
    };
    dataQuality: {
        wfdMenunggu: number;
        wfdPerluKlarifikasi: number;
        dokumenMenunggu: number;
        isuDqaTerbuka: number;
        capaianTanpaMov: number;
        prosesMacet: number;
    };
    isPeninjau: boolean;
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

export default function DashboardIndex() {
    const props = usePage().props as unknown as DashboardProps;

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="space-y-6">
                {/* Goal Banner */}
                <div className="rounded-card bg-gradient-to-r from-purple-600 to-pink-500 p-6 text-white">
                    <p className="text-xs font-semibold uppercase tracking-wider opacity-80">GOAL PROGRAM</p>
                    <p className="mt-2 text-sm leading-relaxed">{props.programGoal}</p>
                </div>

                {/* Causal Logic */}
                <div className="rounded-card border-l-4 border-outcome1 bg-outcome1/5 p-4">
                    <p className="text-sm font-semibold text-outcome1">⇢ Logika berjenjang antar-outcome</p>
                    <p className="mt-1 text-sm text-navy-500">{props.causalLogic}</p>
                </div>

                {/* Period Filter */}
                <div className="flex flex-wrap gap-2">
                    {periodOptions.map((opt) => (
                        <a
                            key={opt.value}
                            href={`/dashboard?periode=${opt.value}`}
                            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                                props.periodFilter === opt.value
                                    ? 'bg-navy-500 text-white'
                                    : 'bg-card border border-border text-muted hover:bg-appbg'
                            }`}
                        >
                            {opt.label}
                        </a>
                    ))}
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {props.kpiCards.map((card, i) => (
                        <KpiCard
                            key={i}
                            label={card.label}
                            value={card.value}
                            subtext={card.subtext}
                            color={card.color}
                        />
                    ))}
                </div>

                {/* Outcome Cards */}
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                    {props.outcomeCards.map((card) => {
                        const chartData = [
                            { name: 'Capaian', value: card.capaian, color: card.color },
                            { name: 'Sisa', value: Math.max(0, card.target - card.capaian), color: '#E3E8EF' },
                        ];
                        return (
                            <div key={card.outcome} className="rounded-card border border-border bg-card p-4 shadow-sm">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-xs font-medium text-muted">Outcome {card.outcome}</p>
                                        <p className="mt-1 text-sm font-semibold text-navy-500">{card.name}</p>
                                    </div>
                                    <div className="h-20 w-20">
                                        <ResponsiveContainer>
                                            <PieChart>
                                                <Pie data={chartData} dataKey="value" innerRadius={24} outerRadius={36} paddingAngle={2}>
                                                    {chartData.map((entry, idx) => (
                                                        <Cell key={idx} fill={entry.color} />
                                                    ))}
                                                </Pie>
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                                <div className="mt-3 flex items-baseline gap-2">
                                    <span className="text-2xl font-bold" style={{ color: card.color }}>{card.capaian}</span>
                                    <span className="text-sm text-muted">/ {card.target}</span>
                                    <span className="ml-auto text-sm font-medium" style={{ color: card.color }}>{card.persentase}%</span>
                                </div>
                                <div className="mt-3 flex flex-wrap gap-1">
                                    {card.outputs.map((out) => (
                                        <span key={out.output} className="rounded-md bg-appbg px-2 py-0.5 text-xs text-muted">
                                            Output {out.output}: {out.capaian}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Indicators Table */}
                <div className="rounded-card border border-border bg-card shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="sticky top-0 bg-card border-b border-border">
                                <tr className="text-left text-xs uppercase text-muted">
                                    <th className="px-4 py-3">Kode</th>
                                    <th className="px-4 py-3">Indikator</th>
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
                                {props.indicators.map((ind) => (
                                    <tr key={ind.kode} className="border-b border-border last:border-0 hover:bg-appbg">
                                        <td className="px-4 py-3 font-medium text-navy-500">{ind.kode}</td>
                                        <td className="px-4 py-3 text-muted">{ind.nama_indikator}</td>
                                        <td className="px-4 py-3 text-right">{ind.capaian_2025}</td>
                                        <td className="px-4 py-3 text-right">{ind.capaian_2026}</td>
                                        <td className="px-4 py-3 text-right">{ind.capaian_2027}</td>
                                        <td className="px-4 py-3 text-right font-semibold">{ind.capaian_kumulatif}</td>
                                        <td className="px-4 py-3 text-right">{ind.target ?? '–'}</td>
                                        <td className="px-4 py-3 text-right">{ind.persentase !== null ? `${ind.persentase}%` : '–'}</td>
                                        <td className="px-4 py-3">
                                            <span className="text-xs">{ind.status}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Outreach & Data Quality */}
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    {/* Outreach */}
                    <div className="rounded-card border border-border bg-card p-4 shadow-sm">
                        <h3 className="text-sm font-semibold text-navy-500">Jangkauan Kegiatan</h3>
                        <div className="mt-2 rounded-lg bg-warning/10 p-3 text-xs text-warning">
                            ⚠ {props.outreach.warning}
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                            <div><span className="text-muted">Kegiatan:</span> <span className="font-semibold">{props.outreach.totalActivities}</span></div>
                            <div><span className="text-muted">Hadir P:</span> <span className="font-semibold">{props.outreach.femaleAttendance}</span></div>
                            <div><span className="text-muted">Sekutu (L):</span> <span className="font-semibold">{props.outreach.maleAttendance}</span></div>
                            <div><span className="text-muted">Total:</span> <span className="font-semibold">{props.outreach.totalAttendance}</span></div>
                        </div>
                        {!props.isPeninjau && (
                            <div className="mt-4 rounded-lg border border-teal/30 bg-teal/5 p-3">
                                <p className="text-xs text-muted">WFD unik terverifikasi</p>
                                <p className="text-xl font-bold text-teal">{props.outreach.uniqueWfd}</p>
                            </div>
                        )}
                    </div>

                    {/* Data Quality */}
                    <div className="rounded-card border border-border bg-card p-4 shadow-sm">
                        <h3 className="text-sm font-semibold text-navy-500">Kualitas Data</h3>
                        <div className="mt-4 space-y-2 text-sm">
                            <div className="flex justify-between"><span className="text-muted">WFD menunggu verifikasi</span><span className="font-semibold">{props.dataQuality.wfdMenunggu}</span></div>
                            <div className="flex justify-between"><span className="text-muted">WFD perlu klarifikasi</span><span className="font-semibold">{props.dataQuality.wfdPerluKlarifikasi}</span></div>
                            <div className="flex justify-between"><span className="text-muted">Dokumen menunggu verifikasi</span><span className="font-semibold">{props.dataQuality.dokumenMenunggu}</span></div>
                            <div className="flex justify-between"><span className="text-muted">Isu DQA terbuka</span><span className="font-semibold">{props.dataQuality.isuDqaTerbuka}</span></div>
                            <div className="flex justify-between"><span className="text-muted">Capaian tanpa MoV</span><span className="font-semibold">{props.dataQuality.capaianTanpaMov}</span></div>
                            <div className="flex justify-between"><span className="text-muted">Proses macet</span><span className="font-semibold">{props.dataQuality.prosesMacet}</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
