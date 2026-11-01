interface StatusPillProps {
    status: string;
    variant?: 'verification' | 'process' | 'document' | 'policy' | 'leverage' | 'dqa' | 'report';
}

const statusColors: Record<string, string> = {
    'Belum diverifikasi': 'bg-slate-100 text-slate-700',
    'Terverifikasi': 'bg-green-100 text-green-700',
    'Perlu klarifikasi': 'bg-amber-100 text-amber-700',
    'Ditolak': 'bg-red-100 text-red-700',
    'Berjalan': 'bg-blue-100 text-blue-700',
    'Selesai': 'bg-green-100 text-green-700',
    'Macet': 'bg-red-100 text-red-700',
    'Disusun': 'bg-slate-100 text-slate-700',
    'Diajukan': 'bg-amber-100 text-amber-700',
    'Diadopsi': 'bg-green-100 text-green-700',
    'Advokasi berjalan': 'bg-blue-100 text-blue-700',
    'Dalam pembahasan': 'bg-amber-100 text-amber-700',
    'Disahkan': 'bg-green-100 text-green-700',
    'Dalam proses': 'bg-amber-100 text-amber-700',
    'Terealisasi': 'bg-green-100 text-green-700',
    'Open': 'bg-red-100 text-red-700',
    'In progress': 'bg-amber-100 text-amber-700',
    'Closed': 'bg-green-100 text-green-700',
    'Diterima': 'bg-green-100 text-green-700',
    'Terlambat': 'bg-amber-100 text-amber-700',
    'Belum kirim': 'bg-red-100 text-red-700',
    'Tidak wajib': 'bg-slate-100 text-slate-700',
};

export default function StatusPill({ status }: StatusPillProps) {
    const colorClass = statusColors[status] ?? 'bg-slate-100 text-slate-700';

    return (
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${colorClass}`}>
            {status}
        </span>
    );
}
