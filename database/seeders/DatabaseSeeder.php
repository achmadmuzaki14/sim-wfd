<?php

namespace Database\Seeders;

use App\Models\Profile;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            MitraSeeder::class,
            IndikatorSeeder::class,
            TahapanSeeder::class,
            AppSettingSeeder::class,
            UserSeeder::class,
            AcceptanceDataSeeder::class,
        ]);
    }
}
