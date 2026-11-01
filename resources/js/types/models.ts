export interface User {
    id: string;
    name: string;
    email: string;
    peran?: string;
    mitra_id?: string | null;
    mitra_nama?: string | null;
}

export interface RefMitra {
    id: string;
    nama: string;
    kode_mitra: string;
    provinsi: string;
    aktif: boolean;
}

export interface RefIndikator {
    id: string;
    kode: string;
    nama_indikator: string;
    outcome: number;
    nomor_output: number;
    nama_output: string;
    unit: string;
    basis_hitung: string;
    definisi_operasional: string;
    mov_wajib: string;
    status_dihitung: string | null;
    target_2025: number;
    target_2026: number;
    target_2027: number;
    aktif: boolean;
}

export interface WfdRoster {
    id: string;
    kode: string;
    nama_lengkap: string;
    mitra_id: string;
    mitra_nama?: string;
    provinsi: string | null;
    kabupaten: string | null;
    desa: string | null;
    kelompok_id: string | null;
    kelompok_nama?: string | null;
    kelompok_usia: string;
    disabilitas: boolean;
    tahun_bergabung: number;
    persetujuan_data: boolean;
    status_aktif: boolean;
    catatan: string | null;
    capaian?: WfdCapaian[];
}

export interface WfdCapaian {
    id: string;
    kode: string;
    wfd_id: string;
    indikator_id: string;
    indikator_kode?: string;
    periode: string;
    tahun_lapor: number;
    jenis_bukti: string;
    link_mov: string | null;
    file_mov: string | null;
    tanggal_bukti: string | null;
    status_verifikasi: string;
    verifikator_id: string | null;
    tanggal_verifikasi: string | null;
    catatan_verifikasi: string | null;
    has_evidence?: boolean;
    indikator?: RefIndikator;
}

export interface Dokumen {
    id: string;
    kode: string;
    judul: string;
    indikator_id: string;
    indikator_kode?: string;
    jenis_dokumen: string;
    status_dokumen: string;
    mitra_id: string;
    mitra_nama?: string;
    kelompok_id: string | null;
    periode: string;
    tahun_lapor: number;
    tanggal_terbit: string | null;
    instansi_penerbit: string | null;
    level_dokumen: string;
    link_mov: string | null;
    file_mov: string | null;
    status_verifikasi: string;
    is_counted?: boolean;
}

export interface Kegiatan {
    id: string;
    kode: string;
    judul: string;
    jenis_kegiatan: string;
    tanggal_kegiatan: string;
    mitra_id: string;
    mitra_nama?: string;
    provinsi: string | null;
    kabupaten: string | null;
    desa: string | null;
    level_kegiatan: string;
    peserta_perempuan: number;
    peserta_laki: number;
    total_peserta: number;
    periode: string;
    tahun_lapor: number;
    status_verifikasi: string;
}

export interface Proses {
    id: string;
    kode: string;
    judul: string;
    indikator_id: string;
    indikator_kode?: string;
    mitra_id: string;
    mitra_nama?: string;
    jenis_proses: string;
    total_tahapan: number;
    tahapan_saat_ini: number;
    status_proses: string;
    periode_update_terakhir: string | null;
    aktif: boolean;
}

export interface ProsesUpdate {
    id: string;
    proses_id: string;
    periode: string;
    nomor_tahapan: number;
    nama_tahapan: string;
    perkembangan: string;
    hambatan: string | null;
    rencana_kuartal_depan: string | null;
    link_bukti: string | null;
    file_bukti: string | null;
    terkunci: boolean;
    is_carry_forward: boolean;
    diinput_oleh: string;
    tanggal_input: string;
}

export interface Kelompok {
    id: string;
    kode: string;
    nama: string;
    tipe: string;
    mitra_id: string;
    mitra_nama?: string;
    provinsi: string;
    desa: string;
    luas_hektar: number | null;
    anggota_perempuan: number;
    anggota_laki: number;
    dipimpin_perempuan: boolean;
    dasar_hukum: string | null;
    nomor_sk: string | null;
    tanggal_sk: string | null;
    periode: string;
    status_verifikasi: string;
}

export interface Produk {
    id: string;
    kode: string;
    nama: string;
    komoditas: string;
    jenis_pengembangan: string;
    mitra_id: string;
    mitra_nama?: string;
    kelompok_id: string | null;
    periode: string;
    status_verifikasi: string;
}

export interface Penjualan {
    id: string;
    kode: string;
    kelompok_id: string;
    produk_id: string | null;
    komoditas: string;
    mitra_id: string;
    bulan: string;
    periode: string;
    tahun_lapor: number;
    volume: number;
    satuan: string;
    omzet: number;
    laba: number;
    level_pasar: string;
    status_verifikasi: string;
    margin: number;
}

export interface Kebijakan {
    id: string;
    kode: string;
    judul: string;
    level_kebijakan: string;
    mitra_id: string;
    mitra_nama?: string;
    isu_didorong: string;
    instansi: string;
    status_kebijakan: string;
    responsif_gender: boolean;
    periode: string;
    status_verifikasi: string;
}

export interface LearningStory {
    id: string;
    kode: string;
    judul: string;
    penulis: string;
    mitra_id: string;
    mitra_nama?: string;
    tema: string;
    ringkasan: string;
    link_cerita: string | null;
    file_cerita: string | null;
    link_foto: string | null;
    periode: string;
    status_verifikasi: string;
}

export interface Leverage {
    id: string;
    kode: string;
    sumber: string;
    jenis_leverage: string;
    nilai_idr: number;
    nilai_usd: number | null;
    mitra_id: string;
    mitra_nama?: string;
    status_leverage: string;
    keterangan: string | null;
    periode: string;
}

export interface DqaLog {
    id: string;
    mitra_id: string;
    mitra_nama?: string;
    indikator_id: string | null;
    indikator_kode?: string;
    jenis_isu: string;
    deskripsi: string;
    pic: string;
    status_isu: string;
    tanggal_temuan: string;
    deadline: string | null;
    tanggal_selesai: string | null;
    tindak_lanjut: string | null;
    is_overdue: boolean;
}

export interface KepatuhanLaporan {
    id: string;
    mitra_id: string;
    mitra_nama?: string;
    tahun: number;
    bulan: number;
    status_laporan: string;
    tanggal_diterima: string | null;
    catatan: string | null;
}

export interface IndikatorCalculation {
    kode: string;
    nama_indikator: string;
    basis_hitung: string;
    unit: string;
    capaian_2025: number;
    capaian_2026: number;
    capaian_2027: number;
    capaian_kumulatif: number;
    capaian_periode: number;
    target: number | null;
    persentase: number | null;
    status: string;
}

export interface AppSetting {
    id: string;
    key: string;
    value: string | Record<string, unknown> | unknown[];
}

export interface RefTahapan {
    id: string;
    jenis_proses: string;
    nomor_tahapan: number;
    nama_tahapan: string;
    tahapan_final: boolean;
}

export interface AuditLog {
    id: string;
    tabel: string;
    record_id: string;
    aksi: string;
    user_id: string | null;
    user_name?: string | null;
    nilai_lama: Record<string, unknown> | null;
    nilai_baru: Record<string, unknown> | null;
    waktu: string;
}
