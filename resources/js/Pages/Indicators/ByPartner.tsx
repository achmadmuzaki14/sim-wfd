import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/UI/PageHeader';

interface PartnerCell {
    mitra_id?: string | null;
    kode_mitra?: string | null;

    // Format yang diharapkan frontend
    mitra_nama?: string | null;
    capaian?: number | null;

    // Format yang saat ini mungkin dikirim backend
    nama?: string | null;
    jumlah?: number | null;

    target?: number | null;
    persentase?: number | null;
}

interface HeatmapRow {
    indikator_id: string;
    kode: string;
    nama_indikator: string;
    outcome: number;
    unit: string;
    target: number | null;
    capaian_periode: number;
    persentase: number | null;
    status: string;
    partners?: PartnerCell[] | null;
}

interface Props {
    heatmap?: HeatmapRow[] | null;
    periodFilter: string;
}

interface NormalizedPartner {
    id: string;
    nama: string;
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

function heatColor(persentase: number | null | undefined): string {
    if (persentase === null || persentase === undefined) {
        return '#F4F6F9';
    }

    if (persentase >= 80) {
        return '#3AAE7C';
    }

    if (persentase >= 50) {
        return '#E8B93B';
    }

    if (persentase >= 1) {
        return '#E28A3C';
    }

    return '#FBE9E9';
}

function getPartnerName(partner: PartnerCell): string {
    const name = partner.mitra_nama ?? partner.nama;

    if (typeof name !== 'string' || name.trim() === '') {
        return 'Mitra tanpa nama';
    }

    return name.trim();
}

function getPartnerId(
    partner: PartnerCell,
    fallbackIndex: number,
): string {
    const id =
        partner.mitra_id ??
        partner.kode_mitra ??
        partner.mitra_nama ??
        partner.nama;

    if (id === null || id === undefined || String(id).trim() === '') {
        return `partner-${fallbackIndex}`;
    }

    return String(id);
}

function getPartnerCapaian(partner?: PartnerCell): number {
    if (!partner) {
        return 0;
    }

    const value = partner.capaian ?? partner.jumlah ?? 0;
    const numericValue = Number(value);

    return Number.isFinite(numericValue) ? numericValue : 0;
}

function shortenPartnerName(name: string): string {
    if (name.length <= 10) {
        return name;
    }

    return `${name.substring(0, 8)}…`;
}

export default function ByPartner({
    heatmap,
    periodFilter,
}: Props) {
    const rows = Array.isArray(heatmap) ? heatmap : [];

    /*
     * Mengumpulkan mitra dari seluruh baris.
     * Tidak hanya dari heatmap[0], karena setiap indikator bisa mempunyai
     * daftar mitra yang berbeda.
     */
    const partnerMap = new Map<string, NormalizedPartner>();

    rows.forEach((row) => {
        const partners = Array.isArray(row.partners)
            ? row.partners
            : [];

        partners.forEach((partner, index) => {
            const id = getPartnerId(partner, index);

            if (!partnerMap.has(id)) {
                partnerMap.set(id, {
                    id,
                    nama: getPartnerName(partner),
                });
            }
        });
    });

    const allPartners = Array.from(partnerMap.values());

    return (
        <AuthenticatedLayout>
            <Head title="Capaian per Mitra" />

            <div className="space-y-6">
                <PageHeader
                    title="Capaian per Mitra"
                    subtitle="Heatmap capaian indikator per mitra organisasi"
                />

                <div className="flex flex-wrap gap-2">
                    {periodOptions.map((option) => (
                        <a
                            key={option.value}
                            href={`/achievements-by-partner?periode=${option.value}`}
                            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                                periodFilter === option.value
                                    ? 'bg-navy-500 text-white'
                                    : 'border border-border bg-card text-muted hover:bg-appbg'
                            }`}
                        >
                            {option.label}
                        </a>
                    ))}
                </div>

                <div className="overflow-x-auto rounded-card border border-border bg-card shadow-sm">
                    <table className="w-full text-sm">
                        <thead className="border-b border-border bg-card">
                            <tr className="text-left text-xs uppercase text-muted">
                                <th className="sticky left-0 bg-card px-4 py-3">
                                    Indikator
                                </th>

                                <th className="px-4 py-3 text-right">
                                    Total
                                </th>

                                <th className="px-4 py-3 text-right">
                                    Target
                                </th>

                                {allPartners.map((partner) => (
                                    <th
                                        key={partner.id}
                                        className="px-4 py-3 text-center"
                                        title={partner.nama}
                                    >
                                        {shortenPartnerName(partner.nama)}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {rows.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={3 + allPartners.length}
                                        className="px-4 py-10 text-center text-muted"
                                    >
                                        Belum ada data capaian per mitra.
                                    </td>
                                </tr>
                            ) : (
                                rows.map((row) => {
                                    const rowPartners = Array.isArray(
                                        row.partners,
                                    )
                                        ? row.partners
                                        : [];

                                    const rowPartnerMap =
                                        new Map<string, PartnerCell>();

                                    rowPartners.forEach(
                                        (partner, index) => {
                                            rowPartnerMap.set(
                                                getPartnerId(
                                                    partner,
                                                    index,
                                                ),
                                                partner,
                                            );
                                        },
                                    );

                                    return (
                                        <tr
                                            key={row.indikator_id}
                                            className="border-b border-border last:border-0 hover:bg-appbg"
                                        >
                                            <td className="sticky left-0 bg-card px-4 py-3">
                                                <span className="font-medium text-navy-500">
                                                    {row.kode}
                                                </span>

                                                <span className="ml-2 text-xs text-muted">
                                                    {row.nama_indikator}
                                                </span>
                                            </td>

                                            <td className="px-4 py-3 text-right font-semibold">
                                                {row.capaian_periode}
                                            </td>

                                            <td className="px-4 py-3 text-right">
                                                {row.target ?? '–'}
                                            </td>

                                            {allPartners.map(
                                                (partner) => {
                                                    const cell =
                                                        rowPartnerMap.get(
                                                            partner.id,
                                                        );

                                                    return (
                                                        <td
                                                            key={
                                                                partner.id
                                                            }
                                                            className="px-4 py-3 text-center"
                                                            style={{
                                                                backgroundColor:
                                                                    heatColor(
                                                                        cell?.persentase,
                                                                    ),
                                                            }}
                                                            title={
                                                                partner.nama
                                                            }
                                                        >
                                                            <span className="text-xs font-medium">
                                                                {getPartnerCapaian(
                                                                    cell,
                                                                )}
                                                            </span>
                                                        </td>
                                                    );
                                                },
                                            )}
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-muted">
                    <span>Legend:</span>

                    <span className="flex items-center gap-1">
                        <span
                            className="inline-block h-3 w-3 rounded"
                            style={{ backgroundColor: '#3AAE7C' }}
                        />
                        ≥80%
                    </span>

                    <span className="flex items-center gap-1">
                        <span
                            className="inline-block h-3 w-3 rounded"
                            style={{ backgroundColor: '#E8B93B' }}
                        />
                        50–79%
                    </span>

                    <span className="flex items-center gap-1">
                        <span
                            className="inline-block h-3 w-3 rounded"
                            style={{ backgroundColor: '#E28A3C' }}
                        />
                        1–49%
                    </span>

                    <span className="flex items-center gap-1">
                        <span
                            className="inline-block h-3 w-3 rounded"
                            style={{ backgroundColor: '#FBE9E9' }}
                        />
                        0%
                    </span>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
