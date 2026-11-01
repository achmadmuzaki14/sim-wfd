<?php

namespace Database\Seeders;

use App\Models\RefMitra;
use Illuminate\Database\Seeder;

class MitraSeeder extends Seeder
{
    public function run(): void
    {
        $partners = [
            ['kode_mitra' => 'PINUS', 'nama' => 'PINUS SUMSEL', 'provinsi' => 'Sumatera Selatan'],
            ['kode_mitra' => 'PIONIR', 'nama' => 'PIONIR', 'provinsi' => 'Kalimantan Utara'],
            ['kode_mitra' => 'KONSEPSI', 'nama' => 'KONSEPSI NTB', 'provinsi' => 'Nusa Tenggara Barat'],
            ['kode_mitra' => 'QBAR', 'nama' => 'Perkumpulan Qbar', 'provinsi' => 'Sumatera Barat'],
            ['kode_mitra' => 'AMAN', 'nama' => 'AMAN Mentawai', 'provinsi' => 'Sumatera Barat'],
            ['kode_mitra' => 'PSPI', 'nama' => 'PSPI', 'provinsi' => 'Nasional'],
            ['kode_mitra' => 'TERAS', 'nama' => 'Teras Mitra', 'provinsi' => 'Nasional'],
        ];

        foreach ($partners as $p) {
            RefMitra::create($p);
        }
    }
}
