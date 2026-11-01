<?php

use App\Models\AuditLog;
use App\Models\Dokumen;
use App\Models\RefIndikator;
use App\Models\RefMitra;
use App\Models\WfdCapaian;
use App\Models\WfdRoster;
use App\Services\IndikatorCalculationService;
use App\Services\VerificationService;
use App\Support\CodeGenerator;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->seed([\Database\Seeders\MitraSeeder::class, \Database\Seeders\IndikatorSeeder::class]);
});

test('duplicate participant name under the same partner is blocked', function () {
    $mitra = RefMitra::first();

    WfdRoster::create([
        'kode' => 'WFD-0001',
        'nama_lengkap' => 'Siti Aminah',
        'mitra_id' => $mitra->id,
        'kelompok_usia' => '25-44',
        'tahun_bergabung' => 2025,
        'persetujuan_data' => true,
    ]);

    $this->expectException(\Illuminate\Database\QueryException::class);

    WfdRoster::create([
        'kode' => 'WFD-0002',
        'nama_lengkap' => 'siti aminah',
        'mitra_id' => $mitra->id,
        'kelompok_usia' => '25-44',
        'tahun_bergabung' => 2025,
        'persetujuan_data' => true,
    ]);
});

test('the same name under a different partner is allowed', function () {
    $mitra1 = RefMitra::first();
    $mitra2 = RefMitra::skip(1)->first();

    WfdRoster::create([
        'kode' => 'WFD-0001',
        'nama_lengkap' => 'Siti Aminah',
        'mitra_id' => $mitra1->id,
        'kelompok_usia' => '25-44',
        'tahun_bergabung' => 2025,
        'persetujuan_data' => true,
    ]);

    $wfd2 = WfdRoster::create([
        'kode' => 'WFD-0002',
        'nama_lengkap' => 'Siti Aminah',
        'mitra_id' => $mitra2->id,
        'kelompok_usia' => '25-44',
        'tahun_bergabung' => 2025,
        'persetujuan_data' => true,
    ]);

    expect($wfd2)->not->toBeNull();
});

test('duplicate indicator and period for one participant is blocked', function () {
    $mitra = RefMitra::first();
    $indikator = RefIndikator::first();

    $wfd = WfdRoster::create([
        'kode' => 'WFD-0001',
        'nama_lengkap' => 'Test WFD',
        'mitra_id' => $mitra->id,
        'kelompok_usia' => '25-44',
        'tahun_bergabung' => 2025,
        'persetujuan_data' => true,
    ]);

    WfdCapaian::create([
        'kode' => 'CAP-0001',
        'wfd_id' => $wfd->id,
        'indikator_id' => $indikator->id,
        'periode' => '2025-Q1',
        'tahun_lapor' => 2025,
        'jenis_bukti' => 'Daftar hadir',
        'link_mov' => 'https://example.com',
        'status_verifikasi' => 'Belum diverifikasi',
    ]);

    $this->expectException(\Illuminate\Database\QueryException::class);

    WfdCapaian::create([
        'kode' => 'CAP-0002',
        'wfd_id' => $wfd->id,
        'indikator_id' => $indikator->id,
        'periode' => '2025-Q1',
        'tahun_lapor' => 2025,
        'jenis_bukti' => 'Daftar hadir',
        'status_verifikasi' => 'Belum diverifikasi',
    ]);
});

test('verification without evidence is rejected server-side', function () {
    $mitra = RefMitra::first();
    $indikator = RefIndikator::first();

    $wfd = WfdRoster::create([
        'kode' => 'WFD-0001',
        'nama_lengkap' => 'Test WFD',
        'mitra_id' => $mitra->id,
        'kelompok_usia' => '25-44',
        'tahun_bergabung' => 2025,
        'persetujuan_data' => true,
    ]);

    $capaian = WfdCapaian::create([
        'kode' => 'CAP-0001',
        'wfd_id' => $wfd->id,
        'indikator_id' => $indikator->id,
        'periode' => '2025-Q1',
        'tahun_lapor' => 2025,
        'jenis_bukti' => 'Daftar hadir',
        'status_verifikasi' => 'Belum diverifikasi',
    ]);

    $service = app(VerificationService::class);
    $verifikator = \App\Models\User::factory()->create();

    $this->expectException(\App\Exceptions\VerificationException::class);
    $service->verifyCapaian($capaian, $verifikator);
});

test('only verified person achievements count', function () {
    $mitra = RefMitra::first();
    $indikator = RefIndikator::where('basis_hitung', 'OrangUnik')->first();

    for ($i = 1; $i <= 5; $i++) {
        $wfd = WfdRoster::create([
            'kode' => "WFD-{$i}",
            'nama_lengkap' => "WFD Test {$i}",
            'mitra_id' => $mitra->id,
            'kelompok_usia' => '25-44',
            'tahun_bergabung' => 2025,
            'persetujuan_data' => true,
        ]);

        WfdCapaian::create([
            'kode' => "CAP-{$i}",
            'wfd_id' => $wfd->id,
            'indikator_id' => $indikator->id,
            'periode' => '2025-Q1',
            'tahun_lapor' => 2025,
            'jenis_bukti' => 'Daftar hadir',
            'link_mov' => 'https://example.com',
            'status_verifikasi' => $i <= 3 ? 'Terverifikasi' : 'Belum diverifikasi',
        ]);
    }

    $service = app(IndikatorCalculationService::class);
    $result = $service->calculateForIndicator($indikator, '2025');

    expect($result->capaian_2025)->toBe(3);
});

test('only verified document achievements count', function () {
    $mitra = RefMitra::first();
    $indikator = RefIndikator::where('basis_hitung', 'Dokumen')->whereNull('status_dihitung')->first();

    for ($i = 1; $i <= 4; $i++) {
        Dokumen::create([
            'kode' => "DOK-{$i}",
            'judul' => "Dokumen {$i}",
            'indikator_id' => $indikator->id,
            'jenis_dokumen' => 'Test',
            'status_dokumen' => 'Disusun',
            'mitra_id' => $mitra->id,
            'periode' => '2025-Q1',
            'tahun_lapor' => 2025,
            'level_dokumen' => 'Desa',
            'link_mov' => 'https://example.com',
            'status_verifikasi' => $i <= 2 ? 'Terverifikasi' : 'Belum diverifikasi',
        ]);
    }

    $service = app(IndikatorCalculationService::class);
    $result = $service->calculateForIndicator($indikator, '2025');

    expect($result->capaian_2025)->toBe(2);
});

test('a submitted document does not count when the indicator requires adopted status', function () {
    $mitra = RefMitra::first();
    $indikator = RefIndikator::where('status_dihitung', 'Diadopsi')->first();

    Dokumen::create([
        'kode' => 'DOK-001',
        'judul' => 'Izin belum terbit',
        'indikator_id' => $indikator->id,
        'jenis_dokumen' => 'Izin',
        'status_dokumen' => 'Diajukan',
        'mitra_id' => $mitra->id,
        'periode' => '2025-Q1',
        'tahun_lapor' => 2025,
        'level_dokumen' => 'Kabupaten',
        'link_mov' => 'https://example.com',
        'status_verifikasi' => 'Terverifikasi',
    ]);

    $service = app(IndikatorCalculationService::class);
    $result = $service->calculateForIndicator($indikator, '2025');

    expect($result->capaian_2025)->toBe(0);
});

test('changing the document to the required counted status increases the indicator by exactly one', function () {
    $mitra = RefMitra::first();
    $indikator = RefIndikator::where('status_dihitung', 'Diadopsi')->first();

    $dokumen = Dokumen::create([
        'kode' => 'DOK-001',
        'judul' => 'Izin',
        'indikator_id' => $indikator->id,
        'jenis_dokumen' => 'Izin',
        'status_dokumen' => 'Diajukan',
        'mitra_id' => $mitra->id,
        'periode' => '2025-Q1',
        'tahun_lapor' => 2025,
        'level_dokumen' => 'Kabupaten',
        'link_mov' => 'https://example.com',
        'status_verifikasi' => 'Terverifikasi',
    ]);

    $service = app(IndikatorCalculationService::class);

    expect($service->calculateForIndicator($indikator, '2025')->capaian_2025)->toBe(0);

    $dokumen->update(['status_dokumen' => 'Diadopsi', 'tanggal_terbit' => '2025-06-15']);

    expect($service->calculateForIndicator($indikator, '2025')->capaian_2025)->toBe(1);
});

test('updating process progress never changes achievement numbers', function () {
    $mitra = RefMitra::first();
    $indikator = RefIndikator::where('basis_hitung', 'OrangUnik')->first();

    $wfd = WfdRoster::create([
        'kode' => 'WFD-0001',
        'nama_lengkap' => 'Test WFD',
        'mitra_id' => $mitra->id,
        'kelompok_usia' => '25-44',
        'tahun_bergabung' => 2025,
        'persetujuan_data' => true,
    ]);

    WfdCapaian::create([
        'kode' => 'CAP-0001',
        'wfd_id' => $wfd->id,
        'indikator_id' => $indikator->id,
        'periode' => '2025-Q1',
        'tahun_lapor' => 2025,
        'jenis_bukti' => 'Daftar hadir',
        'link_mov' => 'https://example.com',
        'status_verifikasi' => 'Terverifikasi',
    ]);

    $proses = \App\Models\Proses::create([
        'kode' => 'PRS-0001',
        'judul' => 'Test Process',
        'indikator_id' => $indikator->id,
        'mitra_id' => $mitra->id,
        'jenis_proses' => 'Peningkatan Kapasitas',
        'total_tahapan' => 4,
        'tahapan_saat_ini' => 1,
        'status_proses' => 'Berjalan',
        'aktif' => true,
    ]);

    $service = app(\App\Services\ProsesTrackerService::class);
    $user = \App\Models\User::factory()->create();

    $service->updateQuarter($proses, [
        'periode' => '2025-Q2',
        'nomor_tahapan' => 2,
        'perkembangan' => 'Naik tahapan',
    ], $user);

    $calcService = app(IndikatorCalculationService::class);
    $result = $calcService->calculateForIndicator($indikator, '2025');

    expect($result->capaian_2025)->toBe(1);
});

test('activity attendance never affects indicator achievements', function () {
    $mitra = RefMitra::first();
    $indikator = RefIndikator::where('basis_hitung', 'OrangUnik')->first();

    \App\Models\Kegiatan::create([
        'kode' => 'KEG-0001',
        'judul' => 'Kegiatan Test',
        'jenis_kegiatan' => 'Pelatihan',
        'tanggal_kegiatan' => '2025-06-15',
        'mitra_id' => $mitra->id,
        'level_kegiatan' => 'Kabupaten',
        'peserta_perempuan' => 100,
        'peserta_laki' => 50,
        'periode' => '2025-Q2',
        'tahun_lapor' => 2025,
        'status_verifikasi' => 'Terverifikasi',
    ]);

    $service = app(IndikatorCalculationService::class);
    $result = $service->calculateForIndicator($indikator, '2025');

    expect($result->capaian_2025)->toBe(0);
});

test('quarter filters return no annual target', function () {
    $mitra = RefMitra::first();
    $indikator = RefIndikator::first();

    $wfd = WfdRoster::create([
        'kode' => 'WFD-0001',
        'nama_lengkap' => 'Test WFD',
        'mitra_id' => $mitra->id,
        'kelompok_usia' => '25-44',
        'tahun_bergabung' => 2025,
        'persetujuan_data' => true,
    ]);

    WfdCapaian::create([
        'kode' => 'CAP-0001',
        'wfd_id' => $wfd->id,
        'indikator_id' => $indikator->id,
        'periode' => '2025-Q1',
        'tahun_lapor' => 2025,
        'jenis_bukti' => 'Daftar hadir',
        'link_mov' => 'https://example.com',
        'status_verifikasi' => 'Terverifikasi',
    ]);

    $service = app(IndikatorCalculationService::class);
    $result = $service->calculateForIndicator($indikator, '2025-Q1');

    expect($result->target)->toBeNull();
});

test('quarter filters return no progress percentage', function () {
    $mitra = RefMitra::first();
    $indikator = RefIndikator::first();

    $service = app(IndikatorCalculationService::class);
    $result = $service->calculateForIndicator($indikator, '2025-Q1');

    expect($result->persentase)->toBeNull();
    expect($result->status)->toBe('dinilai per tahun');
});

test('two consecutive unchanged submitted stages mark a process as stalled', function () {
    $mitra = RefMitra::first();
    $indikator = RefIndikator::first();

    $proses = \App\Models\Proses::create([
        'kode' => 'PRS-0001',
        'judul' => 'Test Process',
        'indikator_id' => $indikator->id,
        'mitra_id' => $mitra->id,
        'jenis_proses' => 'Peningkatan Kapasitas',
        'total_tahapan' => 4,
        'tahapan_saat_ini' => 2,
        'status_proses' => 'Berjalan',
        'aktif' => true,
    ]);

    $user = \App\Models\User::factory()->create();

    \App\Models\ProsesUpdate::create([
        'proses_id' => $proses->id,
        'periode' => '2025-Q1',
        'nomor_tahapan' => 2,
        'nama_tahapan' => 'Desain modul',
        'perkembangan' => 'Progress 1',
        'is_carry_forward' => false,
        'diinput_oleh' => $user->id,
        'tanggal_input' => now()->subDays(60),
    ]);

    \App\Models\ProsesUpdate::create([
        'proses_id' => $proses->id,
        'periode' => '2025-Q2',
        'nomor_tahapan' => 2,
        'nama_tahapan' => 'Desain modul',
        'perkembangan' => 'Progress 2',
        'is_carry_forward' => false,
        'diinput_oleh' => $user->id,
        'tanggal_input' => now(),
    ]);

    $service = app(\App\Services\ProsesTrackerService::class);

    expect($service->isStalled($proses))->toBeTrue();
});

test('carry-forward records do not falsely represent submitted progress', function () {
    $mitra = RefMitra::first();
    $indikator = RefIndikator::first();

    $proses = \App\Models\Proses::create([
        'kode' => 'PRS-0001',
        'judul' => 'Test Process',
        'indikator_id' => $indikator->id,
        'mitra_id' => $mitra->id,
        'jenis_proses' => 'Peningkatan Kapasitas',
        'total_tahapan' => 4,
        'tahapan_saat_ini' => 2,
        'status_proses' => 'Berjalan',
        'aktif' => true,
    ]);

    $user = \App\Models\User::factory()->create();

    \App\Models\ProsesUpdate::create([
        'proses_id' => $proses->id,
        'periode' => '2025-Q1',
        'nomor_tahapan' => 2,
        'nama_tahapan' => 'Desain modul',
        'perkembangan' => 'Real progress',
        'is_carry_forward' => false,
        'diinput_oleh' => $user->id,
        'tanggal_input' => now()->subDays(90),
    ]);

    \App\Models\ProsesUpdate::create([
        'proses_id' => $proses->id,
        'periode' => '2025-Q2',
        'nomor_tahapan' => 2,
        'nama_tahapan' => 'Desain modul',
        'perkembangan' => 'Tidak ada pembaruan dari mitra',
        'is_carry_forward' => true,
        'diinput_oleh' => $user->id,
        'tanggal_input' => now(),
    ]);

    $service = app(\App\Services\ProsesTrackerService::class);

    expect($service->isStalled($proses))->toBeFalse();
});

test('audit records are created after changes', function () {
    $mitra = RefMitra::first();

    $wfd = WfdRoster::create([
        'kode' => 'WFD-0001',
        'nama_lengkap' => 'Test WFD',
        'mitra_id' => $mitra->id,
        'kelompok_usia' => '25-44',
        'tahun_bergabung' => 2025,
        'persetujuan_data' => true,
    ]);

    AuditLog::log('wfd_roster', $wfd->id, 'INSERT', null, $wfd->toArray());

    expect(AuditLog::where('record_id', $wfd->id)->where('aksi', 'INSERT')->exists())->toBeTrue();
});

test('audit records cannot be updated', function () {
    $mitra = RefMitra::first();

    AuditLog::create([
        'tabel' => 'test',
        'record_id' => fake()->uuid(),
        'aksi' => 'INSERT',
        'waktu' => now(),
    ]);

    $log = AuditLog::first();

    $this->expectException(\Illuminate\Database\QueryException::class);
    $log->update(['aksi' => 'UPDATE']);
});

test('audit records cannot be deleted', function () {
    AuditLog::create([
        'tabel' => 'test',
        'record_id' => fake()->uuid(),
        'aksi' => 'INSERT',
        'waktu' => now(),
    ]);

    $log = AuditLog::first();

    $this->expectException(\Illuminate\Database\QueryException::class);
    $log->delete();
});

test('carry-forward generation is idempotent', function () {
    $mitra = RefMitra::first();
    $indikator = RefIndikator::first();

    $proses = \App\Models\Proses::create([
        'kode' => 'PRS-0001',
        'judul' => 'Test Process',
        'indikator_id' => $indikator->id,
        'mitra_id' => $mitra->id,
        'jenis_proses' => 'Peningkatan Kapasitas',
        'total_tahapan' => 4,
        'tahapan_saat_ini' => 2,
        'status_proses' => 'Berjalan',
        'aktif' => true,
    ]);

    $user = \App\Models\User::factory()->create();

    \App\Models\ProsesUpdate::create([
        'proses_id' => $proses->id,
        'periode' => '2025-Q1',
        'nomor_tahapan' => 2,
        'nama_tahapan' => 'Desain modul',
        'perkembangan' => 'Real progress',
        'is_carry_forward' => false,
        'diinput_oleh' => $user->id,
        'tanggal_input' => now()->subDays(90),
    ]);

    $service = app(\App\Services\ProsesTrackerService::class);

    $first = $service->generateCarryForward($proses, '2025-Q2');
    expect($first)->not->toBeNull();

    $second = $service->generateCarryForward($proses, '2025-Q2');
    expect($second)->toBeNull();
});

test('stall detection does not create duplicate DQA issues', function () {
    $mitra = RefMitra::first();
    $indikator = RefIndikator::first();

    $proses = \App\Models\Proses::create([
        'kode' => 'PRS-0001',
        'judul' => 'Test Process',
        'indikator_id' => $indikator->id,
        'mitra_id' => $mitra->id,
        'jenis_proses' => 'Peningkatan Kapasitas',
        'total_tahapan' => 4,
        'tahapan_saat_ini' => 2,
        'status_proses' => 'Berjalan',
        'aktif' => true,
    ]);

    $user = \App\Models\User::factory()->create();

    \App\Models\ProsesUpdate::create([
        'proses_id' => $proses->id,
        'periode' => '2025-Q1',
        'nomor_tahapan' => 2,
        'nama_tahapan' => 'Desain modul',
        'perkembangan' => 'Progress 1',
        'is_carry_forward' => false,
        'diinput_oleh' => $user->id,
        'tanggal_input' => now()->subDays(60),
    ]);

    \App\Models\ProsesUpdate::create([
        'proses_id' => $proses->id,
        'periode' => '2025-Q2',
        'nomor_tahapan' => 2,
        'nama_tahapan' => 'Desain modul',
        'perkembangan' => 'Progress 2',
        'is_carry_forward' => false,
        'diinput_oleh' => $user->id,
        'tanggal_input' => now(),
    ]);

    $service = app(\App\Services\ProsesTrackerService::class);

    $service->checkStall($proses);
    $service->checkStall($proses);

    $count = \App\Models\DqaLog::where('jenis_isu', 'Proses tidak bergerak')
        ->where('deskripsi', "%{$proses->kode}%")
        ->count();

    expect($count)->toBe(1);
});
