import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import {
    LayoutDashboard,
    Target,
    GitBranch,
    Users,
    FileText,
    Calendar,
    CheckCircle2,
    ShieldCheck,
    Package,
    BookOpen,
    Coins,
    BarChart3,
    FileSpreadsheet,
    Settings,
    History,
    Menu,
    X,
} from 'lucide-react';

interface NavItem {
    label: string;
    href: string;
    icon: typeof LayoutDashboard;
    roles?: string[];
}

interface NavSection {
    title: string;
    items: NavItem[];
}

const navSections: NavSection[] = [
    {
        title: 'MONITORING',
        items: [
            { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
            { label: 'Indikator & Output', href: '/indicators', icon: Target },
            { label: 'Pelacak Proses', href: '/processes', icon: GitBranch },
            { label: 'Capaian per Mitra', href: '/achievements-by-partner', icon: BarChart3 },
        ],
    },
    {
        title: 'REGISTER PROGRAM',
        items: [
            { label: 'Kelompok', href: '/groups', icon: Users },
            { label: 'Produk & Penjualan', href: '/products-sales', icon: Package },
            { label: 'Kebijakan', href: '/policies', icon: ShieldCheck },
            { label: 'Learning Stories', href: '/learning-stories', icon: BookOpen },
            { label: 'Dana Ungkit', href: '/leverage', icon: Coins },
        ],
    },
    {
        title: 'INPUT DATA',
        items: [
            { label: 'Register WFD', href: '/wfd', icon: Users },
            { label: 'Register Dokumen', href: '/documents', icon: FileText },
            { label: 'Register Kegiatan', href: '/activities', icon: Calendar },
        ],
    },
    {
        title: 'KUALITAS DATA',
        items: [
            { label: 'Antrean Verifikasi', href: '/verification', icon: CheckCircle2, roles: ['admin', 'verifikator', 'mitra'] },
            { label: 'Log DQA', href: '/data-quality', icon: ShieldCheck, roles: ['admin', 'verifikator'] },
            { label: 'Kepatuhan Laporan', href: '/report-compliance', icon: FileSpreadsheet, roles: ['admin', 'verifikator'] },
        ],
    },
    {
        title: 'PELAPORAN',
        items: [
            { label: 'Laporan & Ekspor', href: '/reports', icon: FileSpreadsheet },
        ],
    },
    {
        title: 'ADMINISTRASI',
        items: [
            { label: 'Pengguna & Peran', href: '/administration/users', icon: Settings, roles: ['admin'] },
            { label: 'Data Referensi', href: '/administration/references', icon: Settings, roles: ['admin'] },
            { label: 'Audit Log', href: '/administration/audit-log', icon: History, roles: ['admin'] },
        ],
    },
];

export default function AppSidebar() {
    const { auth } = usePage().props as any;
    const userRole = auth?.user?.peran;
    const [mobileOpen, setMobileOpen] = useState(false);

    const canAccess = (item: NavItem) => {
        if (!item.roles) return true;
        return item.roles.includes(userRole);
    };

    return (
        <>
            {/* Mobile toggle */}
            <button
                onClick={() => setMobileOpen(true)}
                className="fixed left-4 top-4 z-50 rounded-lg bg-navy-500 p-2 text-white lg:hidden"
                aria-label="Buka menu"
            >
                <Menu className="h-5 w-5" />
            </button>

            {/* Mobile overlay */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed left-0 top-0 z-40 h-screen w-sidebar overflow-y-auto bg-navy-500 text-white transition-transform duration-300 lg:translate-x-0 ${
                    mobileOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-navy-400/30 px-6 py-4">
                    <div>
                        <h1 className="text-lg font-bold tracking-tight">SIM-WFD</h1>
                        <p className="text-xs text-navy-100">Women Forest Defenders</p>
                    </div>
                    <button
                        onClick={() => setMobileOpen(false)}
                        className="rounded p-1 hover:bg-navy-400 lg:hidden"
                        aria-label="Tutup menu"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Nav */}
                <nav className="px-3 py-4">
                    {navSections.map((section) => {
                        const visibleItems = section.items.filter(canAccess);
                        if (visibleItems.length === 0) return null;

                        return (
                            <div key={section.title} className="mb-6">
                                <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-navy-200">
                                    {section.title}
                                </p>
                                <div className="space-y-1">
                                    {visibleItems.map((item) => {
                                        const Icon = item.icon;
                                        return (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-navy-50 transition-colors hover:bg-navy-400/50 [&.active]:bg-navy-400"
                                                onClick={() => setMobileOpen(false)}
                                            >
                                                <Icon className="h-4 w-4 shrink-0" />
                                                <span>{item.label}</span>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </nav>
            </aside>
        </>
    );
}
