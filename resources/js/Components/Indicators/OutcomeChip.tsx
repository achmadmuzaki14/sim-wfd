interface OutcomeChipProps {
    outcome: number;
    label?: string;
}

const outcomeColors: Record<number, string> = {
    1: 'bg-outcome1/10 text-outcome1 border-outcome1/30',
    2: 'bg-outcome2/10 text-outcome2 border-outcome2/30',
    3: 'bg-outcome3/10 text-outcome3 border-outcome3/30',
};

export default function OutcomeChip({ outcome, label }: OutcomeChipProps) {
    const colorClass = outcomeColors[outcome] ?? 'bg-slate-100 text-slate-700 border-slate-300';

    return (
        <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium ${colorClass}`}>
            {label ?? `Outcome ${outcome}`}
        </span>
    );
}
