# SIM-WFD — Sistem Informasi Monitoring Women Forest Defenders

Sistem informasi monitoring untuk program Women Forest Defenders (WFD) yang dikelola oleh The Asia Foundation dan tujuh mitra organisasi di Indonesia. Sistem ini menggantikan alur kerja manual berbasis Excel dengan platform terpusat yang mencegah double counting, memastikan integritas data, dan mempermudah pelaporan donor.

## Fitur Utama

- **12 Indikator Kinerja** dengan perhitungan otomatis berbasis Orang Unik atau Dokumen
- **Anti Double Counting** — satu perempuan = satu baris permanen per mitra
- **Pelacak Proses Kuartalan** — melacak kemajuan tanpa menggelembungkan capaian indikator
- **Verifikasi Berjenjang** — data hanya masuk hitungan setelah berstatus Terverifikasi
- **Manajemen MoV** — bukti wajib untuk setiap capaian sebelum verifikasi
- **Isolasi Mitra** — mitra hanya dapat mengakses data organisasinya sendiri
- **Audit Trail Immutable** — log perubahan yang tidak dapat dimodifikasi
- **Ekspor Donor** — laporan terstruktur untuk kebutuhan donor
- **Dashboard Interaktif** — KPI, donut chart, heatmap per mitra

## Tech Stack

- Laravel 11, PHP 8.3, PostgreSQL 16
- Laravel Inertia.js, React, TypeScript
- Tailwind CSS, Vite
- Laravel Breeze (Inertia React + TypeScript)
- Laravel Sanctum (API)
- Spatie Laravel Permission, Spatie Laravel Activitylog
- Maatwebsite Laravel Excel
- Pest PHP
- Redis (cache & queue)
- Docker Compose

## Persyaratan Lokal

- Docker & Docker Compose
- atau PHP 8.3, PostgreSQL 16, Redis, Composer, Node.js 20+

## Setup dengan Docker

```bash
cp .env.example .env
docker compose up -d
docker compose exec app composer install
docker compose exec app php artisan key:generate
docker compose exec app php artisan migrate --seed
docker compose exec app npm install
docker compose exec app npm run build
```

Akses: http://localhost:8080

## Setup Tanpa Docker

```bash
composer install
cp .env.example .env
php artisan key:generate
# Konfigurasi DB di .env
php artisan migrate --seed
npm install && npm run build
php artisan serve
```

## User Development

| Email | Peran | Mitra |
|-------|-------|-------|
| admin@example.test | admin | — |
| verifikator@example.test | verifikator | — |
| mitra.pinus@example.test | mitra | PINUS |
| mitra.aman@example.test | mitra | AMAN |
| peninjau@example.test | peninjau | — |

Password: `password` (development only)

## Menjalankan Tests

```bash
php artisan test
```

## Acceptance Fixtures

```bash
php artisan migrate:fresh --seed
# Verifikasi angka acceptance di dashboard
```

## Konfigurasi Storage

Evidence files disimpan di private disk (local atau S3). File disajikan melalui temporary signed URL yang diautorisasi per request.

## Deployment

Lihat `docs/deployment.md` untuk panduan deployment produksi.
