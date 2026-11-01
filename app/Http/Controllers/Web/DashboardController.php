<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Services\DashboardService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __construct(
        private DashboardService $dashboardService,
    ) {}

    public function index(Request $request)
    {
        $periodFilter = $request->get('periode', 'ALL');
        $user = $request->user();

        $data = $this->dashboardService->getDashboardData($user, $periodFilter);

        return Inertia::render('Dashboard/Index', $data);
    }
}
