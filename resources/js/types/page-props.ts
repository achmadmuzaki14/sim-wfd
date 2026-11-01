export interface PageProps {
    auth: {
        user: {
            id: string;
            name: string;
            email: string;
            peran: string;
            mitra_id: string | null;
            mitra_nama: string | null;
        };
    };
    flash?: {
        success?: string | null;
        error?: string | null;
        warning?: string | null;
    };
    ziggy?: {
        url: string;
        port?: number | null;
        defaults?: string[];
        routes?: Record<string, unknown>;
    };
    [key: string]: unknown;
}

export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface PaginationMeta {
    current_page: number;
    from: number | null;
    last_page: number;
    per_page: number;
    to: number | null;
    total: number;
}

export interface PaginatedData<T> {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number | null;
    last_page: number;
    last_page_url: string;
    links: PaginationLink[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number | null;
    total: number;
}

export interface Filters {
    search?: string;
    mitra_id?: string;
    periode?: string;
    status_verifikasi?: string;
    indikator_id?: string;
    status_aktif?: string;
    tipe?: string;
    level_kebijakan?: string;
    tema?: string;
    jenis_leverage?: string;
    status_isu?: string;
    tahun?: string;
    status_laporan?: string;
    tabel?: string;
    aksi?: string;
    page?: number;
}
