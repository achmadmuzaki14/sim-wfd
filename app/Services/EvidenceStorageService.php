<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class EvidenceStorageService
{
    private const ALLOWED_MIMES = ['pdf', 'jpg', 'jpeg', 'png', 'docx', 'xlsx'];
    private const MAX_SIZE = 15360; // 15 MB in KB

    public function store(UploadedFile $file, string $periode, string $kodeIndikator, string $kodeMitra, string $kodeWfd, string $jenis): string
    {
        $this->validate($file);

        $extension = $file->getClientOriginalExtension();
        $safeJenis = Str::slug($jenis);
        $filename = "{$kodeMitra}_{$kodeWfd}_{$safeJenis}.{$extension}";
        $path = "mov/{$periode}/{$kodeIndikator}/{$filename}";

        Storage::disk('private')->putFileAs(dirname($path), $file, basename($path));

        return $path;
    }

    public function generateTemporaryUrl(string $path, int $minutes = 10): string
    {
        return Storage::disk('private')->temporaryUrl($path, now()->addMinutes($minutes));
    }

    public function fileExists(string $path): bool
    {
        return Storage::disk('private')->exists($path);
    }

    public function validate(UploadedFile $file): void
    {
        $extension = strtolower($file->getClientOriginalExtension());

        if (!in_array($extension, self::ALLOWED_MIMES)) {
            throw new \App\Exceptions\FileValidationException(
                'Jenis berkas tidak diizinkan. Hanya PDF, JPG, PNG, DOCX, dan XLSX.'
            );
        }

        if ($file->getSize() > self::MAX_SIZE * 1024) {
            throw new \App\Exceptions\FileValidationException(
                'Ukuran berkas melebihi batas maksimum 15 MB.'
            );
        }
    }
}
