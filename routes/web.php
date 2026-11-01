<?php

use App\Http\Controllers\Web\DashboardController;
use App\Http\Controllers\Web\WfdController;
use App\Http\Controllers\Web\DocumentController;
use App\Http\Controllers\Web\ActivityController;
use App\Http\Controllers\Web\ProcessController;
use App\Http\Controllers\Web\VerificationController;
use App\Http\Controllers\Web\GroupController;
use App\Http\Controllers\Web\ProductSalesController;
use App\Http\Controllers\Web\PolicyController;
use App\Http\Controllers\Web\LearningStoryController;
use App\Http\Controllers\Web\LeverageController;
use App\Http\Controllers\Web\IndicatorController;
use App\Http\Controllers\Web\DataQualityController;
use App\Http\Controllers\Web\ComplianceController;
use App\Http\Controllers\Web\ReportController;
use App\Http\Controllers\Web\AchievementByPartnerController;
use App\Http\Controllers\Web\AdministrationController;
use App\Http\Controllers\Web\VerificationActionController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Indicators
    Route::get('/indicators', [IndicatorController::class, 'index'])->name('indicators.index');
    Route::get('/indicators/{indikator}', [IndicatorController::class, 'show'])->name('indicators.show');

    // WFD Roster
    Route::get('/wfd', [WfdController::class, 'index'])->name('wfd.index');
    Route::get('/wfd/create', [WfdController::class, 'create'])->name('wfd.create');
    Route::post('/wfd', [WfdController::class, 'store'])->name('wfd.store');
    Route::get('/wfd/{wfd}', [WfdController::class, 'show'])->name('wfd.show');
    Route::get('/wfd/{wfd}/edit', [WfdController::class, 'edit'])->name('wfd.edit');
    Route::put('/wfd/{wfd}', [WfdController::class, 'update'])->name('wfd.update');
    Route::post('/wfd/{wfd}/capaian', [WfdController::class, 'addCapaian'])->name('wfd.add-capaian');

    // Documents
    Route::get('/documents', [DocumentController::class, 'index'])->name('documents.index');
    Route::get('/documents/create', [DocumentController::class, 'create'])->name('documents.create');
    Route::post('/documents', [DocumentController::class, 'store'])->name('documents.store');
    Route::get('/documents/{dokumen}', [DocumentController::class, 'show'])->name('documents.show');

    // Activities
    Route::get('/activities', [ActivityController::class, 'index'])->name('activities.index');
    Route::get('/activities/create', [ActivityController::class, 'create'])->name('activities.create');
    Route::post('/activities', [ActivityController::class, 'store'])->name('activities.store');

    // Processes
    Route::get('/processes', [ProcessController::class, 'index'])->name('processes.index');
    Route::get('/processes/create', [ProcessController::class, 'create'])->name('processes.create');
    Route::post('/processes', [ProcessController::class, 'store'])->name('processes.store');
    Route::get('/processes/{proses}', [ProcessController::class, 'show'])->name('processes.show');
    Route::post('/processes/{proses}/update-quarter', [ProcessController::class, 'updateQuarter'])->name('processes.update-quarter');

    // Verification
    Route::get('/verification', [VerificationController::class, 'index'])->name('verification.index');
    Route::post('/verification/{type}/{id}/approve', [VerificationActionController::class, 'approve'])->name('verification.approve');
    Route::post('/verification/{type}/{id}/return', [VerificationActionController::class, 'return'])->name('verification.return');

    // Groups
    Route::get('/groups', [GroupController::class, 'index'])->name('groups.index');
    Route::get('/groups/create', [GroupController::class, 'create'])->name('groups.create');
    Route::post('/groups', [GroupController::class, 'store'])->name('groups.store');

    // Products & Sales
    Route::get('/products-sales', [ProductSalesController::class, 'index'])->name('products-sales.index');

    // Policies
    Route::get('/policies', [PolicyController::class, 'index'])->name('policies.index');

    // Learning Stories
    Route::get('/learning-stories', [LearningStoryController::class, 'index'])->name('learning-stories.index');

    // Leverage
    Route::get('/leverage', [LeverageController::class, 'index'])->name('leverage.index');

    // Achievements by Partner
    Route::get('/achievements-by-partner', [AchievementByPartnerController::class, 'index'])->name('achievements-by-partner.index');

    // Data Quality
    Route::get('/data-quality', [DataQualityController::class, 'index'])->name('data-quality.index');

    // Compliance
    Route::get('/report-compliance', [ComplianceController::class, 'index'])->name('compliance.index');

    // Reports
    Route::get('/reports', [ReportController::class, 'index'])->name('reports.index');

    // Administration
    Route::get('/administration/users', [AdministrationController::class, 'users'])->name('admin.users');
    Route::get('/administration/references', [AdministrationController::class, 'references'])->name('admin.references');
    Route::get('/administration/audit-log', [AdministrationController::class, 'auditLog'])->name('admin.audit-log');
});

require __DIR__ . '/auth.php';
