interface KpiCardProps {
    label: string;
    value: string | number;
    subtext?: string;
    color?: string;
}

const colorMap: Record<string, string> = {
    navy: '#1F3864',
    teal: '#2E9B8F',
    outcome1: '#2F7FBF',
    outcome2: '#3AAE7C',
    outcome3: '#E28A3C',
    danger: '#D9534F',
    warning: '#E8B93B',
};

export default function KpiCard({ label, value, subtext, color = 'navy' }: KpiCardProps) {
    const borderColor = colorMap[color] ?? colorMap.navy;

    return (
        <div
            className="rounded-card border border-border bg-card shadow-sm"
            style={{ borderTop: `3px solid ${borderColor}` }}
        >
            <div className="p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-muted">{label}</p>
                <p className="mt-2 text-2xl font-bold text-navy-500">{value}</p>
                {subtext && (
                    <p className="mt-1 text-xs text-muted">{subtext}</p>
                )}
            </div>
        </div>
    );
}
