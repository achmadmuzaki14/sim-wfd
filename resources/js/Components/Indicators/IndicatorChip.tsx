interface IndicatorChipProps {
    kode: string;
    periode?: string;
    outcome?: number;
    hasMov?: boolean;
}

const outcomeColors: Record<number, string> = {
    1: 'bg-outcome1/10 text-outcome1 border-outcome1/30',
    2: 'bg-outcome2/10 text-outcome2 border-outcome2/30',
    3: 'bg-outcome3/10 text-outcome3 border-outcome3/30',
};

function getOutcome(kode: string): number {
    const firstPart = parseInt(kode.split('.')[0], 10);
    if (firstPart <= 1) return 1;
    if (firstPart <= 4) return 2;
    return 3;
}

export default function IndicatorChip({ kode, periode, outcome, hasMov = true }: IndicatorChipProps) {
    const o = outcome ?? getOutcome(kode);
    const colorClass = outcomeColors[o] ?? 'bg-slate-100 text-slate-700 border-slate-300';
    const borderClass = hasMov ? '' : 'border-2 border-dashed border-danger';

    return (
        <span
            className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium ${colorClass} ${borderClass}`}
            title={hasMov ? undefined : 'MoV belum tersedia'}
        >
            {kode}
            {periode && <span className="opacity-70">{periode}</span>}
        </span>
    );
}
