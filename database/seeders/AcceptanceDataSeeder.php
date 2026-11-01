<?php

namespace Database\Seeders;

use App\Models\Dokumen;
use App\Models\Kegiatan;
use App\Models\Kelompok;
use App\Models\Penjualan;
use App\Models\Produk;
use App\Models\RefIndikator;
use App\Models\RefMitra;
use App\Models\WfdCapaian;
use App\Models\WfdRoster;
use App\Support\CodeGenerator;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AcceptanceDataSeeder extends Seeder
{
    public function run(): void
    {
        $mitras = RefMitra::all()->keyBy('kode_mitra');
        $indikators = RefIndikator::all()->keyBy('kode');

        $personIndicators = ['1.1', '2.1', '2.2', '3.1', '3.2', '3.3', '5.1', '6.1'];
        $docIndicators = ['1.2', '4.1', '7.1', '7.2'];

        $this->seedPersonAchievements($mitras, $indikators, $personIndicators);
        $this->seedDocumentAchievements($mitras, $indikators, $docIndicators);
        $this->seedGroups($mitras);
        $this->seedProductsAndSales($mitras);
        $this->seedActivities($mitras);
    }

    private function seedPersonAchievements($mitras, $indikators, $personIndicators): void
    {
        $targets = [
            '1.1' => ['2025' => 55, '2026' => 46],
            '2.1' => ['2025' => 5, '2026' => 3],
            '2.2' => ['2025' => 20, '2026' => 5],
            '3.1' => ['2025' => 0, '2026' => 35],
            '3.2' => ['2025' => 17, '2026' => 131],
            '3.3' => ['2025' => 4, '2026' => 25],
            '5.1' => ['2025' => 0, '2026' => 70],
            '6.1' => ['2025' => 0, '2026' => 20],
        ];

        $wfdCounter = 1;

        foreach ($targets as $kode => $yearData) {
            $indikator = $indikators[$kode];
            $mitraKeys = $mitras->keys()->toArray();

            foreach ($yearData as $tahun => $count) {
                if ($count === 0) {
                    continue;
                }

                for ($i = 0; $i < $count; $i++) {
                    $mitraKey = $mitraKeys[$i % count($mitraKeys)];
                    $mitra = $mitras[$mitraKey];

                    $wfdCode = CodeGenerator::generate('WFD', 'wfd_roster');

                    $wfd = WfdRoster::create([
                        'kode' => $wfdCode,
                        'nama_lengkap' => "WFD {$kode} {$tahun} " . ($i + 1),
                        'mitra_id' => $mitra->id,
                        'provinsi' => $mitra->provinsi,
                        'kabupaten' => 'Kabupaten Test',
                        'desa' => 'Desa Test',
                        'kelompok_usia' => '25-44',
                        'disabilitas' => false,
                        'tahun_bergabung' => $tahun,
                        'persetujuan_data' => true,
                        'status_aktif' => true,
                    ]);

                    $kuartal = (($i % 2) === 0) ? 'Q1' : 'Q2';
                    $periode = "{$tahun}-{$kuartal}";

                    $capaianCode = CodeGenerator::generate('CAP', 'wfd_capaian');

                    WfdCapaian::create([
                        'kode' => $capaianCode,
                        'wfd_id' => $wfd->id,
                        'indikator_id' => $indikator->id,
                        'periode' => $periode,
                        'tahun_lapor' => (int) $tahun,
                        'jenis_bukti' => 'Daftar hadir',
                        'link_mov' => 'https://example.com/mov',
                        'tanggal_bukti' => "{$tahun}-0" . ($i % 9 + 1) . "-15",
                        'status_verifikasi' => 'Terverifikasi',
                        'tanggal_verifikasi' => now(),
                    ]);

                    $wfdCounter++;
                }
            }
        }
    }

    private function seedDocumentAchievements($mitras, $indikators, $docIndicators): void
    {
        $targets = [
            '1.2' => ['2025' => 3, '2026' => 0],
            '4.1' => ['2025' => 24, '2026' => 8],
            '7.1' => ['2025' => 6, '2026' => 15],
            '7.2' => ['2025' => 0, '2026' => 1],
        ];

        foreach ($targets as $kode => $yearData) {
            $indikator = $indikators[$kode];
            $mitraKeys = $mitras->keys()->toArray();

            foreach ($yearData as $tahun => $count) {
                if ($count === 0) {
                    continue;
                }

                for ($i = 0; $i < $count; $i++) {
                    $mitraKey = $mitraKeys[$i % count($mitraKeys)];
                    $mitra = $mitras[$mitraKey];

                    $kuartal = (($i % 2) === 0) ? 'Q1' : 'Q2';
                    $periode = "{$tahun}-{$kuartal}";
                    $statusDokumen = $indikator->status_dihitung ?? 'Diadopsi';

                    $dokumenCode = CodeGenerator::generate('DOK', 'dokumen');

                    Dokumen::create([
                        'kode' => $dokumenCode,
                        'judul' => "Dokumen {$kode} {$tahun} " . ($i + 1),
                        'indikator_id' => $indikator->id,
                        'jenis_dokumen' => 'Dokumen perencanaan',
                        'status_dokumen' => $statusDokumen,
                        'mitra_id' => $mitra->id,
                        'periode' => $periode,
                        'tahun_lapor' => (int) $tahun,
                        'tanggal_terbit' => $indikator->status_dihitung ? "{$tahun}-0" . ($i % 9 + 1) . "-15" : null,
                        'instansi_penerbit' => 'Instansi Test',
                        'level_dokumen' => 'Kabupaten',
                        'link_mov' => 'https://example.com/dokumen',
                        'status_verifikasi' => 'Terverifikasi',
                        'tanggal_verifikasi' => now(),
                    ]);
                }
            }
        }

        $this->seedNonCountedDocuments($mitras, $indikators);
    }

    private function seedNonCountedDocuments($mitras, $indikators): void
    {
        $indikator41 = $indikators['4.1'];
        $mitraKeys = $mitras->keys()->toArray();

        for ($i = 0; $i < 24; $i++) {
            $mitraKey = $mitraKeys[$i % count($mitraKeys)];
            $mitra = $mitras[$mitraKey];

            $dokumenCode = CodeGenerator::generate('DOK', 'dokumen');

            Dokumen::create([
                'kode' => $dokumenCode,
                'judul' => "Dokumen Disusun " . ($i + 1),
                'indikator_id' => $indikator41->id,
                'jenis_dokumen' => 'Dokumen perencanaan',
                'status_dokumen' => 'Disusun',
                'mitra_id' => $mitra->id,
                'periode' => '2025-Q1',
                'tahun_lapor' => 2025,
                'tanggal_terbit' => null,
                'instansi_penerbit' => null,
                'level_dokumen' => 'Desa',
                'link_mov' => 'https://example.com/dokumen-disusun',
                'status_verifikasi' => 'Terverifikasi',
                'tanggal_verifikasi' => now(),
            ]);
        }
    }

    private function seedGroups($mitras): void
    {
        $monitoringMembers = 0;
        $mitraKeys = $mitras->keys()->toArray();

        for ($i = 0; $i < 7; $i++) {
            $mitraKey = $mitraKeys[$i % count($mitraKeys)];
            $mitra = $mitras[$mitraKey];

            $kode = CodeGenerator::generate('KLP', 'kelompok');

            $kelompok = Kelompok::create([
                'kode' => $kode,
                'nama' => "Kelompok Monitoring " . ($i + 1),
                'tipe' => 'Kelompok Monitoring Hutan',
                'mitra_id' => $mitra->id,
                'provinsi' => $mitra->provinsi,
                'desa' => 'Desa Hutan',
                'luas_hektar' => 500.00,
                'anggota_perempuan' => 30,
                'anggota_laki' => 15,
                'dipimpin_perempuan' => true,
                'periode' => '2025-Q1',
                'status_verifikasi' => 'Terverifikasi',
            ]);

            $monitoringMembers += 30 + 15;
        }

        for ($i = 0; $i < 3; $i++) {
            $mitraKey = $mitraKeys[$i % count($mitraKeys)];
            $mitra = $mitras[$mitraKey];

            $kode = CodeGenerator::generate('KLP', 'kelompok');

            Kelompok::create([
                'kode' => $kode,
                'nama' => "KPS " . ($i + 1),
                'tipe' => 'KPS',
                'mitra_id' => $mitra->id,
                'provinsi' => $mitra->provinsi,
                'desa' => 'Desa KPS',
                'luas_hektar' => 200.00,
                'anggota_perempuan' => 15,
                'anggota_laki' => 10,
                'dipimpin_perempuan' => true,
                'periode' => '2025-Q1',
                'status_verifikasi' => 'Terverifikasi',
            ]);
        }

        for ($i = 0; $i < 4; $i++) {
            $mitraKey = $mitraKeys[$i % count($mitraKeys)];
            $mitra = $mitras[$mitraKey];

            $kode = CodeGenerator::generate('KLP', 'kelompok');

            Kelompok::create([
                'kode' => $kode,
                'nama' => "KUPS " . ($i + 1),
                'tipe' => 'KUPS',
                'mitra_id' => $mitra->id,
                'provinsi' => $mitra->provinsi,
                'desa' => 'Desa KUPS',
                'luas_hektar' => 100.00,
                'anggota_perempuan' => 20,
                'anggota_laki' => 5,
                'dipimpin_perempuan' => true,
                'periode' => '2025-Q1',
                'status_verifikasi' => 'Terverifikasi',
            ]);
        }
    }

    private function seedProductsAndSales($mitras): void
    {
        $komoditasList = ['Madu Hutan', 'Resin/Damar', 'Kopi', 'Rotan', 'Bambu'];
        $mitraKeys = $mitras->keys()->toArray();

        for ($i = 0; $i < 26; $i++) {
            $mitraKey = $mitraKeys[$i % count($mitraKeys)];
            $mitra = $mitras[$mitraKey];
            $komoditas = $komoditasList[$i % count($komoditasList)];

            $kode = CodeGenerator::generate('PRD', 'produk');

            Produk::create([
                'kode' => $kode,
                'nama' => "Produk {$komoditas} " . ($i + 1),
                'komoditas' => $komoditas,
                'jenis_pengembangan' => 'Produk baru',
                'mitra_id' => $mitra->id,
                'periode' => '2026-Q1',
                'status_verifikasi' => 'Terverifikasi',
            ]);
        }

        $kelompoks = Kelompok::where('tipe', 'KUPS')->get();
        $totalOmzet = 0;
        $totalLaba = 0;

        for ($i = 0; $i < 10; $i++) {
            $kelompok = $kelompoks[$i % $kelompoks->count()];
            $mitra = $mitras[$mitraKeys[$i % count($mitraKeys)]];
            $komoditas = $komoditasList[$i % count($komoditasList)];
            $omzet = 4380000;
            $laba = 1660000;

            $totalOmzet += $omzet;
            $totalLaba += $laba;

            $kode = CodeGenerator::generate('SAL', 'penjualan');

            Penjualan::create([
                'kode' => $kode,
                'kelompok_id' => $kelompok->id,
                'komoditas' => $komoditas,
                'mitra_id' => $mitra->id,
                'bulan' => 'Januari',
                'periode' => '2026-Q1',
                'tahun_lapor' => 2026,
                'volume' => 100.00,
                'satuan' => 'kg',
                'omzet' => $omzet,
                'laba' => $laba,
                'level_pasar' => 'Desa',
                'status_verifikasi' => 'Terverifikasi',
            ]);
        }
    }

    private function seedActivities($mitras): void
    {
        $mitraKeys = $mitras->keys()->toArray();
        $totalAttendance = 0;

        for ($i = 0; $i < 136; $i++) {
            $mitraKey = $mitraKeys[$i % count($mitraKeys)];
            $mitra = $mitras[$mitraKey];

            $perempuan = 25 + ($i % 15);
            $laki = 10 + ($i % 8);
            $totalAttendance += $perempuan + $laki;

            $kode = CodeGenerator::generate('KEG', 'kegiatan');

            Kegiatan::create([
                'kode' => $kode,
                'judul' => "Kegiatan " . ($i + 1),
                'jenis_kegiatan' => 'Pelatihan',
                'tanggal_kegiatan' => '2026-0' . ($i % 6 + 1) . '-15',
                'mitra_id' => $mitra->id,
                'provinsi' => $mitra->provinsi,
                'level_kegiatan' => 'Kabupaten',
                'peserta_perempuan' => $perempuan,
                'peserta_laki' => $laki,
                'link_daftar_hadir' => 'https://example.com/daftar-hadir',
                'link_dokumentasi' => 'https://example.com/dokumentasi',
                'periode' => '2026-Q' . ($i % 2 + 1),
                'tahun_lapor' => 2026,
                'status_verifikasi' => 'Terverifikasi',
            ]);
        }
    }
}
