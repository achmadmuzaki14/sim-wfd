<?php

namespace Database\Seeders;

use App\Enums\Peran;
use App\Models\Profile;
use App\Models\RefMitra;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        foreach (Peran::cases() as $peran) {
            Role::firstOrCreate(['name' => $peran->value]);
        }

        $pinus = RefMitra::where('kode_mitra', 'PINUS')->first();
        $aman = RefMitra::where('kode_mitra', 'AMAN')->first();

        $users = [
            ['name' => 'Administrator', 'email' => 'admin@example.test', 'peran' => Peran::Admin, 'mitra_id' => null],
            ['name' => 'Verifikator', 'email' => 'verifikator@example.test', 'peran' => Peran::Verifikator, 'mitra_id' => null],
            ['name' => 'Mitra PINUS', 'email' => 'mitra.pinus@example.test', 'peran' => Peran::Mitra, 'mitra_id' => $pinus?->id],
            ['name' => 'Mitra AMAN', 'email' => 'mitra.aman@example.test', 'peran' => Peran::Mitra, 'mitra_id' => $aman?->id],
            ['name' => 'Peninjau', 'email' => 'peninjau@example.test', 'peran' => Peran::Peninjau, 'mitra_id' => null],
        ];

        foreach ($users as $data) {
            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]);

            $user->assignRole($data['peran']->value);

            Profile::create([
                'user_id' => $user->id,
                'nama' => $data['name'],
                'peran' => $data['peran']->value,
                'mitra_id' => $data['mitra_id'],
                'aktif' => true,
            ]);
        }
    }
}
