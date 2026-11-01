import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/UI/PageHeader';
import { Download, FileSpreadsheet } from 'lucide-react';

interface ExportItem {
    key: string;
    label: string;
    description: string;
    route: string;
    params: Record<string, string>;
}

interface Props {
    exports: ExportItem[];
}

export default function ReportsIndex({ exports }: Props) {
    return (
        <AuthenticatedLayout>
            <Head title="Laporan & Ekspor" />
            <div className="space-y-6">
                <PageHeader
                    title="Laporan & Ekspor"
                    subtitle="Unduh laporan terstruktur untuk kebutuhan donor"
                />

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {exports.map((exp) => (
                        <div key={exp.key} className="rounded-card border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-md">
                            <div className="flex items-start gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy-50 text-navy-500">
                                    <FileSpreadsheet className="h-5 w-5" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-sm font-semibold text-navy-500">{exp.label}</h3>
                                    <p className="mt-1 text-xs text-muted">{exp.description}</p>
                                </div>
                            </div>
                            <a
                                href={`/reports/export?type=${exp.params.type}`}
                                className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-teal px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-teal-600"
                            >
                                <Download className="h-3.5 w-3.5" /> Unduh Excel
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
