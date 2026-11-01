import { Link, usePage } from '@inertiajs/react';
import { Bell, User, LogOut } from 'lucide-react';
import { useState } from 'react';

export default function AppTopbar() {
    const { auth } = usePage().props as any;
    const user = auth?.user;
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-card px-4 lg:px-6">
            <div className="flex items-center gap-4">
                <h2 className="text-sm font-semibold text-navy-500">
                    Sistem Informasi Monitoring Women Forest Defenders
                </h2>
            </div>

            <div className="flex items-center gap-3">
                {/* Notifications */}
                <button
                    className="relative rounded-lg p-2 text-muted hover:bg-appbg"
                    aria-label="Notifikasi"
                >
                    <Bell className="h-5 w-5" />
                    <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-danger" />
                </button>

                {/* User menu */}
                <div className="relative">
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="flex items-center gap-2 rounded-lg p-2 hover:bg-appbg"
                    >
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-500 text-sm font-semibold text-white">
                            {user?.name?.charAt(0) ?? 'U'}
                        </div>
                        <div className="hidden text-left sm:block">
                            <p className="text-sm font-medium text-navy-500">{user?.name}</p>
                            <p className="text-xs text-muted capitalize">{user?.peran}</p>
                        </div>
                    </button>

                    {menuOpen && (
                        <>
                            <div
                                className="fixed inset-0 z-10"
                                onClick={() => setMenuOpen(false)}
                            />
                            <div className="absolute right-0 top-full z-20 mt-2 w-56 rounded-lg border border-border bg-card py-2 shadow-lg">
                                <div className="border-b border-border px-4 py-2">
                                    <p className="text-sm font-medium text-navy-500">{user?.name}</p>
                                    <p className="text-xs text-muted">{user?.email}</p>
                                    {user?.mitra_nama && (
                                        <p className="text-xs text-teal mt-1">{user.mitra_nama}</p>
                                    )}
                                </div>
                                <Link
                                    href="/profile"
                                    className="flex items-center gap-2 px-4 py-2 text-sm text-navy-500 hover:bg-appbg"
                                >
                                    <User className="h-4 w-4" />
                                    Profil
                                </Link>
                                <Link
                                    href="/logout"
                                    method="post"
                                    as="button"
                                    className="flex w-full items-center gap-2 px-4 py-2 text-sm text-danger hover:bg-danger-50"
                                >
                                    <LogOut className="h-4 w-4" />
                                    Keluar
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
