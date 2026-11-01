<?php

namespace Database\Seeders;

use App\Models\AppSetting;
use Illuminate\Database\Seeder;

class AppSettingSeeder extends Seeder
{
    public function run(): void
    {
        AppSetting::create([
            'key' => 'program_goal',
            'value' => 'Berkontribusi pada Gerakan Perempuan Penjaga Hutan Indonesia dengan memastikan peningkatan kepemimpinan perempuan dalam peran-peran tata kelola hutan serta membangun model yang dapat direplikasi untuk memperkuat pengelolaan hutan di seluruh Indonesia.',
        ]);

        AppSetting::create([
            'key' => 'causal_logic',
            'value' => 'Outcome 1 → Outcome 2 → Outcome 3. Kebijakan yang responsif gender menjadi prasyarat bagi pengelolaan hutan lestari yang melibatkan WFD; pengelolaan lestari itu pada gilirannya menjadi prasyarat naiknya pendapatan dari HHBK.',
        ]);

        AppSetting::create([
            'key' => 'outcome_names',
            'value' => [
                1 => 'Adanya kebijakan pengelolaan hutan yang responsif gender',
                2 => 'Meningkatnya pengelolaan kawasan hutan secara lestari yang melibatkan WFD',
                3 => 'Meningkatnya pendapatan WFD melalui pengelolaan HHBK',
            ],
        ]);

        AppSetting::create([
            'key' => 'open_quarter',
            'value' => '2026-Q2',
        ]);

        AppSetting::create([
            'key' => 'supported_years',
            'value' => [2025, 2026, 2027],
        ]);
    }
}
