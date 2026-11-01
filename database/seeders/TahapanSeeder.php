<?php

namespace Database\Seeders;

use App\Models\RefTahapan;
use Illuminate\Database\Seeder;

class TahapanSeeder extends Seeder
{
    public function run(): void
    {
        $ladders = [
            'Advokasi Kebijakan' => [
                'Pemetaan aktor', 'Audiensi awal', 'Draft usulan disusun',
                'Pembahasan resmi', 'Disahkan',
            ],
            'Penguatan Kelembagaan' => [
                'Sosialisasi', 'Musyawarah kelompok', 'Draft SK',
                'SK terbit', 'Pengurus aktif',
            ],
            'Dokumen Perencanaan' => [
                'Penyusunan', 'Konsultasi kelompok', 'Finalisasi',
                'Diajukan ke instansi', 'Diadopsi',
            ],
            'Legalitas Produk' => [
                'Persiapan berkas', 'Pengajuan', 'Verifikasi instansi', 'Izin terbit',
            ],
            'Akses Pasar' => [
                'Penjajakan', 'Negosiasi', 'Draft MoU', 'Ditandatangani',
            ],
            'Pengembangan Produk' => [
                'Pemetaan komoditas', 'Desain produk', 'Uji coba produksi', 'Produksi rutin',
            ],
            'Peningkatan Kapasitas' => [
                'Asesmen kebutuhan', 'Desain modul', 'Pelatihan', 'Pendampingan lanjutan',
            ],
        ];

        foreach ($ladders as $jenis => $tahapanList) {
            $nomor = 1;
            $total = count($tahapanList);
            foreach ($tahapanList as $nama) {
                RefTahapan::create([
                    'jenis_proses' => $jenis,
                    'nomor_tahapan' => $nomor,
                    'nama_tahapan' => $nama,
                    'tahapan_final' => $nomor === $total,
                ]);
                $nomor++;
            }
        }
    }
}
